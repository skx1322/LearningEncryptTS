interface FileObject {
    name: string,
    file: File,
    directory: string,
}

type fileFormat = "png" | "jpg" | "gif" | "txt" | ""; 
const validFormat: fileFormat[] = ["png", "jpg", "gif","txt" ,""];
interface FileReturn{
    directory: string,
    fileType: fileFormat,
    fileSize: number,
    uploaded: boolean,
}

export async function uploadImage(image: FileObject):Promise<FileReturn> {
    try {
        const {name, file, directory} = image
        
        const buffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(buffer);

        const extract = file.type.split("/")[1] || "jpg"
        const fileType: fileFormat = validFormat.includes(extract as fileFormat) ? (extract as fileFormat) : "jpg";

        const fullPath = `./storage/${directory}/${name}.${fileType}`
        await Bun.write(fullPath, fileBuffer);

        return {
            directory: fullPath,
            fileType: fileType,
            fileSize: (await file.bytes()).length,
            uploaded: true,
        }
    } catch (error) {
        return {
            directory: "Error",
            fileType: "",
            fileSize: 0,
            uploaded: false,
        }
    }
}