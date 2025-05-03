import { ImageToText, MultiImageToText } from "../utils/ImageToText"
import { MultiRecoverImage, RecoverImage } from "../utils/TextToImage";
import { DeleteFile } from "./fs/DeleteFunction";
import { getFilesInFolder } from "./fs/folderList";
import { join } from "path";

type fileFormat = "png" | "jpg" | "gif" | "txt" | "";

interface FileObject {
    FileName: string,
    InitialPoint: string,
    EndPoint: string,
    Format: fileFormat
    CustomOutput?: string,
    Encrypt?: boolean,
    SecretKey?: string,
}

interface FolderObject {
    InitialFolder: string,
    EndPoint: string,
    Format: fileFormat,
    OutTag?: string,
    SecretKey?: string,
}

export async function ImageCip(File: FileObject): Promise<void> {
    const {FileName, InitialPoint, EndPoint, Format, CustomOutput, Encrypt, SecretKey} = File
    try {
        const fullPath = join(`./storage/${InitialPoint}`, FileName)
        const outputFileName = (CustomOutput) ? `${CustomOutput}.${Format}` : File.FileName.replace(/\.[^/.]+$/, "") + `${Format}`;
        const outputPath = join(`/storage/${InitialPoint}`, outputFileName)
        console.log(outputPath);
        const success = await ImageToText(fullPath, EndPoint, Encrypt, SecretKey, outputPath)
        if (!success) {
            console.error(`Failed to process image to text`)
        }
        await DeleteFile(fullPath);
    } catch (error) {
        console.error(`Failed to encrypt content ${error}`)
    }
}

export async function CipText(File: FileObject): Promise<void> {
    const {FileName, InitialPoint, EndPoint, Format, Encrypt, SecretKey} = File
    try {
        const fullPath = join(InitialPoint, FileName);
        const outputFileName = FileName.replace(/\.[^/.]+$/, "");
        const success = await RecoverImage(fullPath, EndPoint, Encrypt, SecretKey, Format, outputFileName)
        if (!success) {
            console.error(`Failed to process image to text`)
        }
        await DeleteFile(`${InitialPoint}${FileName}`)
    } catch (error) {
        console.error(`Failed to decrypt content ${error}`)
    }
}

export async function EncryptObject(Folder: FolderObject): Promise<void> {
    try {
        const fileList: string[] = await getFilesInFolder(Folder.InitialFolder);
        fileList.map(async files => {
            const path = `${Folder.InitialFolder}${files}`
            const outputFileName = files.replace(/\.[^/.]+$/, "") + `${Folder.Format}`;
            // const outputPath = join(destinationFolder, outputFileName);
            console.log(`Encrypting: ${files}`);
            await MultiImageToText(path, Folder.EndPoint, true, Folder.SecretKey, outputFileName);
        })
    } catch (error) {
        console.error(`Failed to encrypt folder content ${error}`)
        return;
    }
}

export async function DecryptImage(Folder: FolderObject): Promise<void> {
    try {
        const fileList: string[] = await getFilesInFolder(Folder.InitialFolder);
        fileList.map(async files => {
            const path = `${Folder.InitialFolder}${files}`
            const baseName = files.replace(".txt", "");
            const OutputTag = (Folder.OutTag) ? Folder.OutTag : "Recovered";
            const outputFileName = `${baseName}_${OutputTag}`
            // const outputPath = join(destinationFolder, outputFileName);
            console.log(`Decrypting: ${files}`);
            await MultiRecoverImage(path, Folder.EndPoint, true, Folder.SecretKey, Folder.Format, outputFileName);
        })
    } catch (error) {
        console.error(`Failed to decrypt folder content ${error}`)
        return;
    }
}
