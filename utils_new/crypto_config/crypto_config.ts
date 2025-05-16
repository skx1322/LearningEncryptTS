import { createCipheriv, createDecipheriv, createHash } from "crypto";
import { CryptoGenSchema, DecryptFileSchema, EncryptFileSchema } from "../fileFormatTempalte";

export async function deriveKey(SecretKey: string): Promise<Buffer>{
    return createHash("sha256").update(SecretKey).digest();
}

export async function FileEncrypt(CryptoData: CryptoGenSchema): Promise<EncryptFileSchema>{
    const { FileBuffer, KeyString, IV } = CryptoData;
    const Cipher = createCipheriv("aes-256-gcm", KeyString, IV);
    let EncryptedString = Cipher.update(FileBuffer, "utf-8", "base64");

    EncryptedString += Cipher.final("base64");
    const tag = Cipher.getAuthTag();
    return {
        EncryptedString: EncryptedString,
        IV: IV,
        Tag: tag,
    }
}

export async function FileDecrypt(CryptoData: DecryptFileSchema): Promise<string> {
    const { EncryptedString, Key, IV, Tag } = CryptoData;
    const Decipher = createDecipheriv("aes-256-gcm", Key, IV);

    Decipher.setAuthTag(Tag);

    let DecryptString = Decipher.update(EncryptedString, "base64", "utf-8");
    DecryptString += Decipher.final("utf-8");

    return DecryptString
}