import { createCipheriv, createDecipheriv, createHash } from "crypto";

export function deriveKey(secret: string): Buffer {
    return createHash("sha256").update(secret).digest();
}

export function Encrypt(Caeser: string, key: Buffer, iv: Buffer) {
    const cipher = createCipheriv(`aes-256-gcm`, key, iv);
    let encrypted = cipher.update(Caeser, `utf-8`, `base64`);
    encrypted += cipher.final(`base64`);

    const tag = cipher.getAuthTag();

    return { encrypted, iv, tag };
}

export function Decrypt(encrypted: string, key: Buffer, iv: Buffer, tag: Buffer) {
    const decipher = createDecipheriv('aes-256-gcm', key, iv);

    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}