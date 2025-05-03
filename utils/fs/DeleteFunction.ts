import { getFilesInFolder } from "./folderList";

export async function DeleteFile(filePath: string): Promise<void> {
    try {
        const file = Bun.file(filePath);
        if(!(await file.exists())){
            console.error(`No file found`);
            return;
        }
        await file.delete();
    } catch (error) {
        console.error(`Error deleting file${filePath}: ${error}`);
    }
}

type fileFormat = "png" | "jpg" | "gif";

export async function ClearFolderByType(folderPath: string, fileFormat: fileFormat): Promise<void> {
    try {
        const fileList: string[] = await getFilesInFolder(folderPath);
        const selectedFile: string[] = fileList.filter(file => file.toLowerCase().endsWith(`.${fileFormat}`))
    
        selectedFile.map(async files => {
            const path = `${folderPath}/${files}`
            const file = Bun.file(path);
            await file.delete();
        })
    } catch (error) {
        console.error(`Error deleting file sort by ${fileFormat}: ${error}`);
        return;
    }
}

export async function ClearFolder(folderPath: string): Promise<void> {
    try {
        const fileLists: string[] = await getFilesInFolder(folderPath);
        fileLists.map(async files => {
            const path = `${folderPath}/${files}`
            const file = Bun.file(path);
            await file.delete();
        })
    } catch (error) {
        console.error(`Error clearing folder: ${error}`);
        return;
    }
}
