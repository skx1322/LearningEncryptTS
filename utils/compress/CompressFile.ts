import {writeFile} from "fs/promises";
import { DeleteFile } from "../fs/DeleteFunction";

export async function CompressCall(File: string, OutputPath: string, DeleteEncrypt: boolean = false): Promise<void> {
    try {
        const file = Bun.file(File);
        if(!(await file.exists())){
            console.error(`No file found`);
            return;
        }
        const bytes = await file.arrayBuffer();
        const compressed = Bun.gzipSync(new Uint8Array(bytes));
        if (DeleteEncrypt) {
            DeleteFile(File);
        }
        await writeFile(`${OutputPath}.gz`, compressed);
    } catch (error) {
        console.error(`Error Compressing File: ${error}`);
        return;
    }
}

export async function DecompressCall(File: string, OutputPath: string, DeleteCompress: boolean = false): Promise<void> {
    try {
        const file = Bun.file(File);
        if(!(await file.exists())){
            console.error(`No file found`);
            return;
        }
        const bytes = await file.arrayBuffer();
        const decompressed = Bun.gunzipSync(bytes);
        if (DeleteCompress) {
            DeleteFile(File);
        }
        await writeFile(`${OutputPath}.txt`, decompressed);
    } catch (error) {
        console.error(`Error Compressing File: ${error}`);
        return;
    }
}

CompressCall("./storage/encrypted/FuHua.txt", "./storage/encrypted/FuHua35", true)