import { Elysia, t } from "elysia";
import { CipText, ImageCip } from "../utils/ImageConfig";
import { uploadImage } from "../utils/fs/uploadFile";
import { CreateFolder } from "../utils/fs/FolderConfig";
import { getFilesInFolder, getFolderInFolder } from "../utils/fs/folderList";
import generateUUID from "../utils/crypto/UUID";

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

export const upload = new Elysia()
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
    .post('/api/createFolder', async ({ body, set }) => {
        const { name } = body;
        const UUID = await generateUUID();
        try {
            await CreateFolder(`./storage/`, `${name}_${UUID}`)
            set.status = 200;
            return {
                success: true,
                message: "Successfully created a folder.",
                status: set.status,
            }
        } catch (error) {
            set.status = 500;
            return {
                success: false,
                message: "Failed to create folder.",
                status: set.status,
                output: error,
            }
        }
    }, {
        body: t.Object({
            name: t.String(),
        })
    })
    .post('/api/cipherText', async ({ body, set }) => {
        try {
            const { name, fileType, passKey, fileDirectory } = body;

            const TextPlayload: FileObject = {
                FileName: name,
                InitialPoint: `./storage/${fileDirectory}/`,
                EndPoint: `./storage/${fileDirectory}/`,
                Format: fileType || "jpg",
                // CustomOutput: name, 
                Encrypt: true,
                SecretKey: passKey,
            }

            await CipText(TextPlayload)
        } catch (error) {
            set.status = 500;
            return {
                success: false,
                message: "Failed to cipher text.",
                status: set.status,
                output: error,
            }
        }
    }, {
        body: t.Object({
            name: t.String(),
            fileType: t.Optional(t.UnionEnum(["png", "jpg", "gif", "txt", ""])),
            passKey: t.Optional(t.String()),
            fileDirectory: t.String(),
        })
    })
    .post('/api/uploadImage', async ({ body, set }) => {
        const { name, file, passKey, fileDirectory } = body;

        interface FileReturn {
            directory: string,
            fileType: fileFormat,
            fileSize: number,
            uploaded: boolean,
        }
        try {
            const filePayload = {
                name: name,
                file: file,
                directory: fileDirectory,
            }
            const uploaded: FileReturn = await uploadImage(filePayload);

            if (!uploaded.uploaded) {
                set.status = 400;
                return {
                    success: false,
                    message: "Failed to upload image.",
                    status: set.status,
                    output: uploaded,
                }
            }
            const { directory, fileType, fileSize } = uploaded
            const cryptoPayload: FileObject = {
                FileName: `${name}.${fileType}`,
                InitialPoint: fileDirectory,
                EndPoint: directory,
                Format: "txt",
                CustomOutput: name,
                Encrypt: true,
                SecretKey: passKey,
            }
            await ImageCip(cryptoPayload);
            set.status = 200;
            return {
                success: true,
                message: "Successfully stored image.",
                status: set.status,
                output: cryptoPayload.FileName,
            }
        } catch (error) {
            set.status = 500;
            return {
                success: false,
                message: "Failed to store image.",
                status: set.status,
                output: error,
            }
        }
    }, {
        body: t.Object({
            name: t.String(),
            file: t.File(),
            passKey: t.Optional(t.String()),
            fileDirectory: t.String(),
        })
    })