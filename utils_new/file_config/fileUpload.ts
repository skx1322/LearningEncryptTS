import { resolve } from "bun";
import { FileUploadSchema, StandardFileSchema, StandardFSObject } from "../fileFormatTemplate";
import { UUIDHex } from "../generator_config/IDGen";

async function fileToBuffer(file: File): Promise<Buffer> {
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    return fileBuffer;
}

export async function fileUpload(file: FileUploadSchema): Promise<StandardFSObject> {
    const { fileName, uploadedFile, fileMainDirectory = "storage", fileFormat, fileDirectory } = file;
    const fileID = `${await UUIDHex("hex", 4)}`
    const fullPath = `./${fileMainDirectory}/${fileDirectory}/${fileID}_${fileName}.${fileFormat}`
    try {
        const fileBuffer: Buffer = await fileToBuffer(uploadedFile);
        await Bun.write(fullPath, fileBuffer);

        const payload: StandardFileSchema = {
            fileName: fileName,
            fileID: fileID,
            fileFormat: fileFormat,
            fileMainDirectory: fileMainDirectory,
            fileDirectory: fullPath,
            compressed: false,
        }

        return {
            error: false,
            success: true,
            message: `Successfully uploaded file in ${fullPath}`,
            output: payload,
        }
    } catch (error) {
        return {
            error: true,
            success: false,
            message: `Failed to write file in path ${fullPath}`,
            output: error,
        }
    }
}