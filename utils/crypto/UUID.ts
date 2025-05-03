import { randomUUIDv7 } from "bun";

export default async function generateUUID(): Promise<string> {
    const id = randomUUIDv7("hex");
    return id
}
