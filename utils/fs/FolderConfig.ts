import { mkdir, rm } from "fs/promises"
import { join } from "path";

export async function CreateFolder(folderPath: string, folderName: string): Promise<void> {
    const fullPath = join(folderPath, folderName)
    try {
        await mkdir(fullPath, { recursive: true });
    } catch (error) {
        console.error(`Failed to create folder: ${error}`)
        return;
    }
}

export async function DeleteFolder(folderPath: string): Promise<void> {
    try {
        await rm(folderPath, { recursive: true, force: true });
        console.log(`Folder Deleted: ${folderPath}`);
    } catch (error) {
        console.error(`Failed to delete folder: ${error}`)
        return;
    }
}
