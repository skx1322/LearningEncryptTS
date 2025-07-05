import { getFileExtension } from "elysia/dist/universal/file";
import { FileFormatEnum, reverseExtension, StandardFileSchema, StandardFSObject } from "../fileFormatTemplate";

export function fileSplit(filePath: string): StandardFSObject {
    const firstSplit = filePath.split("/");
    const DotSplit = firstSplit[3].split("_")
    const splitName = DotSplit[1].split(".")

    const searchSplit: StandardFileSchema = {
          fileName: splitName[0],
          fileID: DotSplit[0],
          fileFormat: reverseExtension(splitName[1]),
          fileMainDirectory: firstSplit[1],
          fileDirectory: firstSplit[2],
          compressed: false,
    }
    return {
        error: true,
        success: false,
        message: `File does not exist in `,
        output: searchSplit
    }
}
