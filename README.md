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

3. Once all neccesary libraries are installed, head to your server and run the main index.ts inside src by watch. 

```
bun run dev
```

4. It'll show you a web url with the localhost running on port 3000 by default(You can customize the port in .env file). Click or use the url as provided and you'll be lead to the webiste

```
http://localhost:3000/
```
![alt text](./image/image-2.png)

### ⚠ WORK IN PROGRESS 🔨

## OPTIONAL ENV
1. If you want to configure your hosting port, you can set it up in the .env prop file.

Terminal:
```
mkdir .env
```

.env:
```
PORT = 8000 
```

index.ts:
```
const key = process.env.SECRET_KEY
```

### MORE WORK IN PROGRESS 🎞

### Expected Interface (Work in Progress 🔨 ding ding)
![alt text](./image/image.png)

## Current Feature:
1. Upload Image
- Ensure you select a folder before you upload one and make sure you remember your passkey. 🎇
![alt text](./image/image-1.png)
