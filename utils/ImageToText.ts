import { Encrypt, deriveKey } from "./crypto/encrypt";
import { randomBytes } from "crypto";

export async function ImageToText(stringPath: string, mainRoute: string, toEncrypt?: boolean, secretID?: string, outputPath: string = "string.txt"): Promise<boolean> {
    try {
        const file = Bun.file(stringPath);
        if (!(await file.exists())) {
            console.error(`No file found`);
            return false;
        }
        const bytes = await file.bytes();
        const base64String = Buffer.from(bytes).toString("base64");
    
        if (toEncrypt && secretID) {
            const key: Buffer = deriveKey(secretID);
            const vita: Buffer = randomBytes(16);

            const { encrypted, tag } = Encrypt(base64String, key, vita)

            const payload = JSON.stringify({
                encrypted,
                key: key.toString(`base64`),
                iv: vita.toString('base64'),
                tag: tag.toString('base64')
            })

            await Bun.write(`.${outputPath}`, payload)
            return true;
        }
        else {
            await Bun.write(`${mainRoute}${outputPath}`, base64String)
            return true;
        };
    } catch (error) {
        console.error(`Failed to encrypt folder content ${error}`)
        return false;
    }
}

export async function MultiImageToText(
    stringPath: string,
    mainRoute: string,
    toEncrypt?: boolean,
    secretID?: string,
    outputPath: string = "string.txt"
): Promise<void> {
    try {
        const file = Bun.file(stringPath);
        if (!(await file.exists())) {
            console.error(`No file found`);
            return;
        }
        const bytes = await file.bytes();
        const base64String = Buffer.from(bytes).toString("base64");

        if (toEncrypt && secretID) {
            const key: Buffer = deriveKey(secretID);
            const vita: Buffer = randomBytes(16);

            const { encrypted, tag } = Encrypt(base64String, key, vita);

            const payload = JSON.stringify({
                encrypted,
                iv: vita.toString("base64"),
                tag: tag.toString("base64")
            });

            await Bun.write(`${mainRoute}${outputPath}`, payload);
        } else {
            await Bun.write(`${mainRoute}${outputPath}`, base64String);
        }
    } catch (error) {
        console.error(`Failed to encrypt folder content ${error}`)
        return;
    }

}