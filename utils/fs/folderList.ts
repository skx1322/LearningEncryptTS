import { readdirSync, statSync } from "fs";
import { join } from "path";
import { readdir } from "fs/promises";
import { lstat } from "fs/promises";


export async function getFilesInFolder(folderPath: string): Promise<string[]> {
    try {
        const items = readdirSync(folderPath);
        const files: string[] = items.filter((item) => {
            const itemPath = join(folderPath, item);
            return statSync(itemPath).isFile();
        });
        return files;
    } catch (error) {
        console.error(`Unable to read folder ${error}`)
        return [];
    }
}

interface folderInfo{
    folderName: string,
    folderDirectory: string,
    fileNum: number,
}

export async function getFolderInFolder(folderPath: string) {
    try {
      const folders = await readdir(folderPath);
      const folderData: folderInfo[] = [];

      for(const folder of folders){
        const folderDirectory = `${folderPath}/${folder}`;
        const stats = await lstat(folderDirectory);

        if (stats.isDirectory()) {
            const fileCount = (await readdir(folderDirectory)).length;
            folderData.push({
                folderName: folder.split("_")[0], // Extract folder name before "_"
                folderDirectory: folder, // Keep the full folder name as an identifier
                fileNum: fileCount
            });
        }
      }
      return folderData;
    } catch (error) {
      console.error("Error reading directory:", error);
      return [];
    }
  }

console.log(await getFolderInFolder("./storage"))