import { readdirSync, statSync } from "fs";
import path, { join } from "path";
import { readdir } from "fs/promises";
import { lstat } from "fs/promises";

interface FileObject {
  fileName: string,
  fileDate: string,
  fileSize: number,
  fileDirectory: string,
  fileReceived: boolean,
  isLocked: boolean,
}

export async function getFilesInFolder(folderPath: string): Promise<FileObject[]> {
  try {
    const items = readdirSync(`./storage/${folderPath}/`);
    const fileObjects: FileObject[] = items.map(file => {
      const fullPath = `./storage/${folderPath}/${file}`;
      const fileExtension = path.extname(file).toLocaleLowerCase();
      const stats = statSync(fullPath)
      return {
        fileName: file,
        fileDate: stats.mtime.toLocaleString(), 
        fileSize: stats.size, 
        fileDirectory: fullPath, 
        fileReceived: true,
        isLocked: fileExtension === ".txt",
      };

    })

    return fileObjects;
  } catch (error) {
    console.error(`Unable to read folder ${error}`)
    return [];
  }
}


interface folderInfo {
  folderName: string,
  folderDirectory: string,
  fileNum: number,
}

export async function getFolderInFolder(folderPath: string) {
  try {
    const folders = await readdir(folderPath);
    const folderData: folderInfo[] = [];

    for (const folder of folders) {
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
