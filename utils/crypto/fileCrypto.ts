import { randomBytes } from "crypto";
import { Encrypt, Decrypt } from "../crypto/encrypt";

const key: Buffer = randomBytes(32);
const vita: Buffer = randomBytes(16);

const SecretPath = "./Content/Text.txt";
const file2 = Bun.file(SecretPath);
const fileText: string = await file2.text();

// encrypt
const { encrypted, iv, tag } = Encrypt(fileText, key, vita);

console.log(`Encrypted: ${encrypted}`);
console.log("IV:", iv.toString('base64'));

// decrypt
const decryptedMessage = Decrypt(encrypted, key, iv, tag);
console.log(decryptedMessage);