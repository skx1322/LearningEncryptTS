import { randomBytes } from "crypto";
import { CryptoGenSchema, FileCryptoSchema, FileExtension, FileFormatEnum, getExtension, StandardFSObject } from "../fileFormatTempalte";
import { deriveKey, FileEncrypt } from "./crypto_config";

export async function fileEncrypt(FileObject: FileCryptoSchema): Promise<StandardFSObject> {
    const { fileName, fileID, fileFormat, fileMainDirectory, fileParentDirectory, secretKey } = FileObject;
    const Formatting = {
        oldFileFormat: FileExtension(fileFormat),
        newFileFormat: getExtension(FileFormatEnum.AES)
    }
    const fullPath = `./${fileMainDirectory}/${fileParentDirectory}/${fileID}_${fileName}.${Formatting.oldFileFormat}`;

    const fileCheck = Bun.file(fullPath);
    if (!fileCheck) {
        console.error(`No file found`);
        return {
            error: true,
            success: false,
            message: `File does not exist in ${fullPath}`,
            output: fullPath
        }
    }

    const fileBytes = await fileCheck.bytes();
    const fileBase64String = Buffer.from(fileBytes).toString("base64");
    const newPath = `./${fileMainDirectory}/${fileParentDirectory}/${fileID}_${fileName}.${Formatting.newFileFormat}`
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
            output: {
                FilePath: newPath,
                FileFormat: Formatting.newFileFormat,
                SecretKey: SecretKey.toString("base64"),
            },
        }
    }

    await Bun.write(newPath, fileBase64String);
    return {
        error: false,
        success: true,
        message: `File successfully encrpyted as ${fullPath}`,
        output: {
            FilePath: newPath,
            fileFormat: Formatting.newFileFormat
        },
    }
}

// export async function fileEncryptDirect(FilePath: string): Promise<StandardFSObject> {
//     FilePath
//     const Formatting = {
//         oldFileFormat: FileExtension(fileFormat),
//         newFileFormat: getExtension(FileFormatEnum.AES)
//     }
//     const fileCheck = Bun.file(FilePath);
//     if (!fileCheck) {
//         console.error(`No file found`);
//         return {
//             error: true,
//             success: false,
//             message: `File does not exist in ${fullPath}`,
//             output: fullPath
//         }
//     }

//     const fileBytes = await fileCheck.bytes();
//     const fileBase64String = Buffer.from(fileBytes).toString("base64");
//     const newPath = `./${fileMainDirectory}/${fileParentDirectory}/${fileID}_${fileName}.${Formatting.newFileFormat}`
//     if (secretKey) {
//         const SecretKey = await deriveKey(secretKey);
//         const Vita: Buffer = randomBytes(16);

//         const EncryptPayload: CryptoGenSchema = {
//             FileBuffer: fileBase64String,
//             KeyString: SecretKey,
//             IV: Vita,
//         }
//         const { EncryptedString, Tag } = await FileEncrypt(EncryptPayload);

//         const FinalPayload = JSON.stringify({
//             EncryptedString,
//             Key: SecretKey.toString("base64"),
//             Tag: Tag.toString("base64"),
//         })
//         await Bun.write(newPath, FinalPayload);
//         return {
//             error: false,
//             success: true,
//             message: `File successfully encrpyted as ${fullPath}`,
//             output: {
//                 FilePath: newPath,
//                 FileFormat: Formatting.newFileFormat,
//                 SecretKey: SecretKey.toString("base64"),
//             },
//         }
//     }

//     await Bun.write(newPath, fileBase64String);
//     return {
//         error: false,
//         success: true,
//         message: `File successfully encrpyted as ${fullPath}`,
//         output: {
//             FilePath: newPath,
//             fileFormat: Formatting.newFileFormat
//         },
//     }
// }

