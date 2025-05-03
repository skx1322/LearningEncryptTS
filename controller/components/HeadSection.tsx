import { html, Html } from "@elysiajs/html";
import { Children } from "@kitajs/html";

export function HeadSection() {
  return (
    <head>
      <title>Hello World</title>
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      <script src="https://kit.fontawesome.com/cb35bc25b0.js" crossorigin="anonymous"></script>
    </head>
  );
}

export function Sidebar() {
  return <div class="bg-blue-900">Upload</div>;
}

interface FolderData {
  folderName: string;
  folderDirectory: string | null | undefined;
  fileNum: number | null;
}

export function MainContent({ folders }: { folders: FolderData[] }) {
  return (
    <div class="bg-gray-100 p-6">
      <p class="text-2xl">Directory: </p>
      <section class="grid grid-cols-4 p-4 gap-12">
        {folders.map(
          (data) => (
            <a
              class="rounded-2xl h-auto bg-gray-200 cursor-pointer p-6 flex justify-center items-start flex flex-col transform transistion-normal duration-500 hover:bg-blue-600 hover:text-white"
              href={`/directory/${data.folderDirectory}`}
            >
              <p class="text-xl">{data.folderName}</p>
              <p class="text-xl">{data.fileNum} files</p>
            </a>
          )
        )}
      </section>
    </div>
  );
}

interface FileObject {
    fileName: string,
    fileDate: string,
    fileSize: number,
    fileDirectory: string,
    fileReceived: boolean;
  }

export function DirectoryContent({ files }: { files: FileObject[] }) {
    return (
        <div class="bg-gray-100 p-6">
        <a href="/" class="transform transistion-normal duration-500 hover:text-blue-600 text-xl hover:scale-105"><i class="mr-2 fa-solid fa-arrow-left"></i>Go Back</a>
        <p class="text-2xl mt-4">Files</p>
        <section class="grid grid-cols-4 p-4 gap-12">
          {files.map(
            (data: {
              fileName: string;
              fileDate: string;
              fileSize: number;
              fileDirectory: string;
              fileReceived: boolean;
            }) => (
              <div class="rounded-2xl h-auto bg-gray-200 cursor-pointer p-6 flex justify-center items-start flex flex-col transform transistion-normal duration-500 hover:bg-blue-600 hover:text-white">
                <p class="text-xl">{data.fileName}</p>
              </div>
            )
          )}
        </section>
      </div>
    );
  }
  