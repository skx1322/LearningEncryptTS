import { Elysia, t } from "elysia";
import { getFilesInFolder, getFolderInFolder } from "../utils/fs/folderList";

export const getFileInfo = new Elysia()
    .get("/api/StorageFolder", async ({ set }) => {
        try {
            const folderList = await getFolderInFolder("./storage");
            set.status = 200;
            return {
                success: true,
                message: "Successfully retrieved storage data.",
                status: set.status,
                output: folderList,
            }
        } catch (error) {
            return {
                success: true,
                message: "Successfully retrieved storage data.",
                status: set.status,
                output: error,
            }
        }
    })
    .get("/api/listFile/:directoryID", async ({ params, set }) => {
        const { directoryID } = params;
        const file = await getFilesInFolder(directoryID);
        if (!file) {
            set.status = 400;
            return {
                success: false,
                message: `Failed to retrieve data.`,
                status: set.status,
                output: file,
            }
        }
        set.status = 200;
        return {
            success: true,
            message: `Successfully retrieved file data from ${directoryID}.`,
            status: set.status,
            output: file,
        }
    }, {
        params: t.Object({
            directoryID: t.String(),
        })
    })