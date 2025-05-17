import { Elysia, t } from "elysia";
import { CipText, ImageCip } from "../utils/ImageConfig";
import { uploadImage } from "../utils/fs/uploadFile";
import { CreateFolder, DeleteFolder } from "../utils/fs/FolderConfig";
import { getFilesInFolder, getFolderInFolder } from "../utils/fs/folderList";
import generateUUID from "../utils/crypto/UUID";
import { existsSync, readFileSync, createReadStream } from "fs";

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
            const status = await CreateFolder(`./storage/`, `${name}_${UUID}`)
            if (!status) {
                set.status = 400;
                return {
                    success: false,
                    message: "Failed to create a folder.",
                    status: set.status,
                }
            }
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
                InitialPoint: fileDirectory,
                EndPoint: fileDirectory,
                Format: fileType || "jpg",
                // CustomOutput: name, 
                Encrypt: true,
                SecretKey: passKey,
            }

            const check = await CipText(TextPlayload)
            if (!check) {
                set.status = 400;
                return {
                    success: false,
                    message: `Failed to decrypt the file ${name}.`,
                    status: set.status,
                }
            }
            set.status = 200;
            return {
                success: true,
                message: `Successfully decrypt the file ${name}.`,
                status: set.status,
            }
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
    .post('/api/uploadImage', async ({ body, set, redirect }) => {
        const { name, file, passKey, fileDirectory } = body;
        console.log(body);
        interface FileReturn {
            directory: string,
            fileType: fileFormat,
            fileSize: number,
            uploaded: boolean,
        }
        const fileName = name || (file.name).replace(".", "_");
        try {
            const filePayload = {
                name: fileName,
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
                FileName: `${fileName}.${fileType}`,
                InitialPoint: fileDirectory,
                EndPoint: directory,
                Format: "txt",
                CustomOutput: fileName,
                Encrypt: true,
                SecretKey: passKey,
            }
            const success: boolean = await ImageCip(cryptoPayload);
            if (!success) {
                console.error("Failed to upload data.")
                return redirect(`/uploadPage?folder=${fileDirectory}`)
            }
            set.status = 200;
            return redirect(`/uploadPage?folder=${fileDirectory}`)
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
            name: t.Optional(t.String()),
            file: t.File(),
            passKey: t.Optional(t.String()),
            fileDirectory: t.String(),
        })
    })
    .delete(`/api/deleteFolder`, async ({ body, set }) => {
        const { folderDirectory } = body;
        const status = await DeleteFolder(`./storage/${folderDirectory}`);
        if (!status) {
            set.status = 400;
            return {
                success: false,
                message: `Failed to delete folder ${folderDirectory}.`,
                status: set.status,
            }
        }
        set.status = 200;
        return {
            success: true,
            message: `Successfully deleted a folder ${folderDirectory}.`,
            status: set.status,
        }
    }, {
        body: t.Object({
            folderDirectory: t.String()
        })
    })
    .get("/imagehost/:storage/:folder/:imageID", async ({ params, set }) => {
        const { storage, folder, imageID } = params;
        const imagePath = `./${storage}/${folder}/${imageID}`;

        if (!existsSync(imagePath)) {
            set.status = 404;
            return { error: "Image not found" };
        }

        set.status = 200
        set.headers["Content-Type"] = "image/png"

        return createReadStream(imagePath);
    }, {
        params: t.Object({
            storage: t.String(),
            folder: t.String(),
            imageID: t.String()
        })
    });
