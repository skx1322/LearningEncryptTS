import { Decrypt, deriveKey } from "../utils/crypto/encrypt";

type fileFormat = "png" | "jpg" | "gif" | "txt" | "";

export async function RecoverImage(
    stringPath: string,
    mainRoute: string,
    encrypted: boolean = false,
    secretID?: string,
    fileFormat: fileFormat = "jpg",
    fileOutputName: string = "image"): Promise<boolean> {
    console.log(mainRoute);
    console.log(fileOutputName);
    try {
        const textFile = Bun.file(stringPath);
        const content = await textFile.text();

        if (!(await textFile.exists())) {
            console.error(`No file found`);
            return false;
        }

        let base64Text: string;
        if (encrypted && secretID) {
            const { encrypted: encryptedText, iv, tag } = JSON.parse(content);

            const key = deriveKey(secretID);
            try {
                const decrypted = Decrypt(
                    encryptedText,
                    key,
                    Buffer.from(iv, "base64"),
                    Buffer.from(tag, "base64"),
                );
                base64Text = decrypted;
            } catch (error) {
                console.error(`Invalid ID/Misisng Data`);
                return false;
            }
        } else if (!encrypted) {
            base64Text = content;
        } else {
            console.error("Missing ID for encryption");
            return false;
        }

        const imageBuffer = Buffer.from(base64Text, `base64`);
        await Bun.write(`${mainRoute}.${fileFormat}`, imageBuffer)
        return true;
    } catch (error) {
        console.error(`Failed to decrypt text ${error}`)
        return false;
    }
}

export async function MultiRecoverImage(
    stringPath: string,
    mainRoute: string,
    encrypted: boolean = false,
    secretID?: string,
    fileFormat: fileFormat = "jpg",
    outputName?: string
): Promise<void> {
    try {
        const textFile = Bun.file(stringPath);
        const content = await textFile.text();

        if (!(await textFile.exists())) {
            console.error(`No file found`);
            return;
        }

        let base64Text: string;
        if (encrypted && secretID) {
            const { encrypted: encryptedText, iv, tag } = JSON.parse(content);

            const key = deriveKey(secretID);
            try {
                const decrypted = Decrypt(
                    encryptedText,
                    key,
                    Buffer.from(iv, "base64"),
                    Buffer.from(tag, "base64"),
                );
                base64Text = decrypted;
            } catch (error) {
                console.error(`Invalid ID/Missing Data`);
                return;
            }
        } else if (!encrypted) {
            base64Text = content;
        } else {
            console.error("Missing ID for encryption");
            return;
        }

        const imageBuffer = Buffer.from(base64Text, `base64`);
        const outputFileName = outputName || "RecoveredImage";
        await Bun.write(`${mainRoute}${outputFileName}.${fileFormat}`, imageBuffer);
    } catch (error) {
        console.error(`Failed to decrypt folder content text ${error}`)
        return;
    }
}
