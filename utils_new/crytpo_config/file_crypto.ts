import { randomBytes } from "crypto";
import { CryptoGenSchema, FileCryptoOutput, FileCryptoSchema, FileFormatEnum } from "../fileFormatTempalte";
import { deriveKey, FileEncrypt } from "./crypto_config";

export async function fileEncrypt(FileObject: FileCryptoSchema): Promise<FileCryptoOutput> {
    const { fileName, fileID, fileFormat, fileMainDirectory, fileParentDirectory, secretKey, fileFullDirectory } = FileObject;
    const fullPath = fileFullDirectory ? fileFullDirectory : `./${fileMainDirectory}/${fileParentDirectory}/${fileID}_${fileName}.${fileFormat}`;

    const fileCheck = Bun.file(fullPath);
    if (!fileCheck) {
        console.error(`No file found`);
        return {
            error: true,
            success: false,
            message: `File does not exist in ${fullPath}`,
            fileName: fileName,
            fileID: fileID,
            fileFormat: fileFormat,
            fileMainDirectory: fileMainDirectory,
            fileParentDirectory: fileParentDirectory,
            fileFullDirectory: fullPath,
        }
    }

    const fileBytes = await fileCheck.bytes();
    const fileBase64String = Buffer.from(fileBytes).toString("base64");
    const newPath = `./${fileMainDirectory}/${fileParentDirectory}/${fileID}_${fileName}.aes`
    if (secretKey) {
        const SecretKey = await deriveKey(secretKey);
        const Vita: Buffer = randomBytes(16);

        const EncryptPayload: CryptoGenSchema = {
            FileBuffer: fileBase64String,
            KeyString: SecretKey,
            IV: Vita,
        }
        const { EncryptedString, Tag } = await FileEncrypt(EncryptPayload);

        const FinalPayload = JSON.stringify({
            EncryptedString,
            Key: SecretKey.toString("base64"),
            Tag: Tag.toString("base64"),
        })
        await Bun.write(newPath, FinalPayload);
        return {
            error: false,
            success: true,
            message: `File successfully encrpyted as ${fullPath}`,
            fileName: fileName,
            fileID: fileID,
            fileFormat: FileFormatEnum.AES,
            fileMainDirectory: fileMainDirectory,
            fileParentDirectory: fileParentDirectory,
            fileFullDirectory: newPath,
            secretKey: SecretKey.toString("base64"),
        }
    }

    await Bun.write(newPath, fileBase64String);
    return {
        error: false,
        success: true,
        message: `File successfully encrpyted as ${fullPath}`,
        fileName: fileName,
        fileID: fileID,
        fileFormat: FileFormatEnum.AES,
        fileMainDirectory: fileMainDirectory,
        fileParentDirectory: fileParentDirectory,
        fileFullDirectory: newPath,
    }
}