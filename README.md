# Introduction 
This is a Typescript-based encryption functions repository created with the JavaScript runtime Bun. The main objective of this code is to create an API to encrypt mainly image or text into an AES-256 format with a passkey to encrypt. This was done mainly possible due to the crypto libraries Bun provided and file system. 🔐🗃

## Side Note
This was mainly a hobby for me and I only do this for fun. The current design is only for personal use at the moment. 💫💫

# Installation
## Runtime
1. Ensure you have the latest Bun installed (Version: 1.2.5+ or Above, you're able to check your Bun version if you have one via) 😃
```
bun --version
```
### If you haven't had Bun install, you're able to [Bun.sh](https://bun.sh/) to install it.

2. Once you have ensure the latest Bun is installed, head to the main page and install all the neccesary Bun package there. 🥚
```
bun i 
```
### The only library we have used so far are just the Bun, Typescript and Dotenv.

3. As of the currently, I have neither implement the main index nor implement the backend framework yet you're only able to test function as of the currently in the index.ts. Further detail will be added soon. 🎈

```
bun run index.ts 
```

### ⚠ WORK IN PROGRESS 🔨

## OPTIONAL ENV
1. If you want to test out the secret_key, you can set it up in the .env prop file.

Terminal:
```
mkdir .env
```

.env:
```
SECRET_KEY = "JUSTLIBRARY"
```

index.ts:
```
const key = process.env.SECRET_KEY
```

# List of Feature
## Main-Function from utils>ImageConfig.ts
1. Single-Stream Image to Encrypted String
- Ensure you have a file in the "./storage/image/"
### Sample Code to Run in index.ts
```
    // Declare Object-Variable
    const ImagePayload = {
    FileName: "FuHua35.png", // Placeholder Image
    InitialPoint: "./storage/image/",
    EndPoint: "./storage/encrypted/",
    Format: "png",
    CustomOutput: "OutputImage_1322", // Optional
    Encrypt: true, 
    SecretKey: key, // optional
    };

    ImageCip(ImagePayload); // Pass In Object-Variable
```

2. Single-Stream Decrypt String to Image
- Ensure you have a file in the "./storage/image/"
### Sample Code to Run in index.ts
```
    // Declare Object-Variable
    const ImagePayload: FileObject = {
    FileName: "FuHua35.txt", // Placeholder Text
    InitialPoint: "./storage/encrypted/",
    EndPoint: "./storage/recover/",
    Format: "png",
    CustomOutput: "OutputImage_1322", // also optional
    Encrypt: true, 
    SecretKey: key, // optional
    };

    CipText(ImagePayload); // Pass In Object-Variable
```

### MORE WORK IN PROGRESS 🎞
