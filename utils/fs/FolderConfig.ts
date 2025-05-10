import { mkdir, rm } from "fs/promises"
import { join } from "path";

export async function CreateFolder(folderPath: string, folderName: string): Promise<boolean> {
    const fullPath = join(folderPath, folderName)
    try {
        await mkdir(fullPath, { recursive: true });
        return true;
    } catch (error) {
        console.error(`Failed to create folder: ${error}`)
        return false;
    }
}

export async function DeleteFolder(folderPath: string): Promise<boolean> {
    try {
        await rm(folderPath, { recursive: true, force: true });
        console.log(`Folder Deleted: ${folderPath}`);
        return true
    } catch (error) {
        console.error(`Failed to delete folder: ${error}`)
        return false;
    }
}
