import { lstat, readdir } from "fs/promises";

type ByteFormat = "kb" | "mb" | "gb" | "tb";
export async function readFileByte(filePath: string, ByteFormat: ByteFormat = "mb"): Promise<number> {
    const file = Bun.file(filePath);
    let bytes: number = (await file.bytes()).length;
    switch (ByteFormat) {
        case 'kb':
            return Math.round((bytes / (1024) * 100)) / 100;
        case 'mb':
            return Math.round((bytes / (Math.pow(1024, 2)) * 1000)) / 1000;
        case 'gb':
            return Math.round((bytes / (Math.pow(1024, 3)) * 100000)) / 100000;
        case 'tb':
            return Math.round((bytes / (Math.pow(1024, 4)) * 10000000)) / 10000000;
        default:
            return bytes;
    }
}
export async function ReadFolderSize(folderPath: string): Promise<number> {
    let totalSize: number = 0;
    try {
        const entries = await readdir(folderPath);
        for (const entry of entries) {
            const fullPath = `${folderPath}/${entry}`
            const stat = await lstat(fullPath);
            if (stat.isDirectory()) {
                totalSize += await ReadFolderSize(fullPath);
            }
            else if (stat.isFile()) {
                totalSize += await readFileByte(fullPath);
            }
        }
        return totalSize;
    } catch (error) {
        console.error(`Failed to read folder: ${error}`)
        return 0;
    }
}

interface Checker{
    Limit: boolean,
    Message: string,
    CurrentSize: string,
    LimitSize: string,    
}

export async function Limiter(FileSize: number, LimitSize: number): Promise<object> {
    try {
        if (FileSize !> LimitSize) {
            const message: Checker ={
                Limit: true,
                Message: "Limit reached",
                CurrentSize: `${FileSize}MB`,
                LimitSize: `${LimitSize}MB`,  
            }
            return message;
        }
        const message: Checker ={
            Limit: false,
            Message: "Limit not reached",
            CurrentSize: `${FileSize}MB`,
            LimitSize: `${LimitSize}MB`,  
        }
        return message;
    } catch (error) {
        console.error(`Failed to read folder: ${error}`)
        return {};
    };
};
