import { StandardFSObject } from "../fileFormatTempalte";

export async function fileDelteDirect(filePath: string): Promise<StandardFSObject> {
    try {
        const file = Bun.file(filePath)
        const checker: boolean = await file.exists();
        if (!checker) {
            console.error(`No file existed`)
            return {
                error: true,
                success: false,
                message: `${filePath} file does not exist.`,
                output: filePath,
            };
        };
        await file.delete();
        return {
            error: false,
            success: true,
            message: `Successfully delete file in ${filePath}`,
            output: filePath,
        }
    } catch (error) {
        return {
            error: true,
            success: false,
            message: `Failed to delete file in path ${filePath}`,
            output: error,
        }
    }
}