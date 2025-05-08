import { html, Html } from "@elysiajs/html";
import { Children } from "@kitajs/html";
import { readFileByte } from "../../utils/fs/ReadFileSize";

export function HeadSection() {
  return (
    <head>
      <title>Hello World</title>
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      <script
        src="https://kit.fontawesome.com/cb35bc25b0.js"
        crossorigin="anonymous"
      ></script>
    </head>
  );
}

export function Sidebar() {
  return (
    <div class="bg-blue-900 flex flex-col items-stretch justify-start gap-4">
      <a
        href="/"
        class="text-2xl text-white px-10 py-2 transform transistion-normal duration-500 hover:bg-blue-600 mt-4"
      >
        <i class="fa-solid fa-user-lock"></i>
      </a>
      <a
        href="/"
        class="text-2xl text-white px-10 py-2 transform transistion-normal duration-500 hover:bg-blue-600 mt-4"
      >
        <i class="fa-solid fa-user"></i>
      </a>
      <a
        href="/uploadPage"
        class="text-2xl text-white px-10 py-2 transform transistion-normal duration-500 hover:bg-blue-600 mt-4"
      >
        <i class="fa-solid fa-cloud-arrow-up"></i>
      </a>
    </div>
  );
}

interface FolderData {
  folderName: string;
  folderDirectory: string;
  fileNum: number;
}

export function MainContent({ folders }: { folders: FolderData[] }) {
  const folderView = `absolute`;

  return (
    <div class="bg-gray-100 p-6 grow-2 relative">
      <div class="flex items-center gap-4">
        <p class="text-2xl">Directory: </p>
        <button
          class="text-xl bg-gray-300 py-1 px-3 rounded-xl cursor-pointer transform transistion-normal duration-500 hover:bg-gray-700 hover:text-white"
          id="createFolder"
          type="button"
        >
          Create
        </button>
        <div
          class={`hidden absolute bg-gray-300 rounded-b-2xl p-4 translate-x-[120px] translate-y-[70px] z-20`}
          id="folderDiv"
        >
          <form id="folderForm">
            <section class="flex flex-col gap-4 items-center">
              <div class="text-xl flex gap-2 self-start">
                <label for="folderName">Folder Name:</label>
                <input
                  class="bg-gray-200"
                  type="text"
                  name="folderName"
                  id="folderName"
                  value=""
                  required
                />
              </div>
              <button
                type="submit"
                class="text-xl bg-gray-200 px-3 py-1 rounded-2xl cursor-pointer"
                id="addFolder"
              >
                Submit
              </button>
            </section>
          </form>
        </div>
      </div>
      <section class="grid grid-cols-4 p-4 gap-12">
        {folders.map((data, index: number) => (
          <div class="rounded-2xl h-auto bg-gray-200 p-6 flex justify-center items-stretch flex flex-col relative">
            <div class="flex justify-between items-center">
              <i class="fa-solid fa-folder text-2xl"></i>
              <i
                class="fa-solid fa-ellipsis text-2xl transform transistion-normal duration-300 rounded-xl hover:bg-gray-300 p-1 cursor-pointer"
                onclick={`toggleDropdown(${index})`}
              ></i>
            </div>
            <a
              href={`/directory/${data.folderDirectory}`}
              class="transform transistion-normal duration-500 hover:text-gray-800 cursor-pointer"
            >
              <p class="text-xl">{data.folderName}</p>
              <p class="text-xl">{data.fileNum} files</p>
            </a>
            <div
              class={`absolute z-10 flex flex-col bg-gray-300 gap-2 rounded translate-y-[72px] translate-x-[148px] hidden ${folderView}`}
              id={`dropdown-${index}`}
            >
              <button class="text-xl transform transistion-normal duration-300 hover:bg-gray-400 px-8 py-2 cursor-pointer">
                Rename
              </button>
              <button class="text-xl transform transistion-normal duration-300 hover:bg-gray-400 px-8 py-2 cursor-pointer">
                Upload
              </button>
              <button class="text-xl transform transistion-normal duration-300 hover:bg-gray-400 px-8 py-2 cursor-pointer">
                Download
              </button>
              <button class="text-xl transform transistion-normal duration-300 hover:bg-red-400 px-8 py-2 cursor-pointer border-t-2 border-gray-500"
              type="button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
      <script>
        {`
          document.addEventListener("click", (event) => {
            const folderDiv = document.getElementById("folderDiv");

            if (
              folderDiv &&
              !folderDiv.contains(event.target) && 
              event.target !== document.getElementById("createFolder")
            ) {
              folderDiv.classList.add("hidden");
            }
          });

            document.getElementById("createFolder")?.addEventListener("click", () => {
            const folderDiv = document.getElementById("folderDiv");
            folderDiv?.classList.remove("hidden");
          });


          document.getElementById("addFolder")?.addEventListener("click", () => {
          document.getElementById("folderForm")?.submit();
        });

          document.getElementById("folderForm")?.addEventListener("submit", async (event) => {
          // event.preventDefault(); 

          const folderName = document.getElementById("folderName").value; 
          console.log(folderName);
          const response = await fetch("http://localhost:3000/api/createFolder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: folderName }),
          });

            if (response.ok) {
              console.log("Folder created successfully");
            } else {
              console.error("Error creating folder");
            }
          });

          `}
      </script>
    </div>
  );
}

interface FileObject {
  fileName: string;
  fileDate: string;
  fileSize: number;
  fileDirectory: string;
  fileReceived: boolean;
  isLocked: boolean;
}

export function DirectoryContent({ files }: { files: FileObject[] }) {
  return (
    <div class="bg-gray-100 p-6 grow-2">
      <a
        href="/"
        class="transform transistion-normal duration-500 hover:text-blue-600 text-xl hover:scale-105"
      >
        <i class="mr-2 fa-solid fa-arrow-left"></i>Go Back
      </a>
      <p class="text-2xl mt-4">Files</p>
      <section class="flex p-4 gap-12">
        {files.map((data) => (
          <div class="rounded-2xl h-auto bg-gray-200 cursor-pointer p-6 flex justify-between items-stretch flex flex-col transform transistion-normal duration-500 hover:bg-blue-600 hover:text-white">
            <div class="text-3xl flex justify-between">
              <i class="fa-solid fa-image"></i>
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
            <p class="text-xl">File Size: {data.fileName}</p>
            <p>{readFileByte(data.fileDirectory)} MB</p>
            <p>Uploaded Date: {data.fileDate}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export function UploadPage({
  folders,
  currentFolder,
}: {
  folders: FolderData[];
  currentFolder: string;
}) {
  function handleSelectChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    window.location.href = `/uploadPage/${encodeURIComponent(selectedValue)}`;
  }

  return (
    <div class="bg-gray-100 p-6 grow-2 flex flex-col">
      <a
        href="/"
        class="transform transistion-normal duration-500 hover:text-blue-600 text-xl hover:scale-105"
      >
        <i class="mr-2 fa-solid fa-arrow-left"></i>Go Back
      </a>
      <p class="text-2xl mt-4">Folder Selection</p>
      <section class="flex items-center gap-4">
        <div class="flex items-center gap-12 mt-6">
          <p class="text-xl">Folder:</p>
          <select
            id="folder"
            name="folder"
            required
            onchange="handleFolderChange(event)"
            class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
          >
            <option value="">-- Select a folder --</option>
            {folders.map((data) => {
              const isSelected = data.folderDirectory === currentFolder;
              return (
                <option
                  value={data.folderDirectory}
                  {...(isSelected ? { selected: true } : {})}
                >
                  {data.folderName}
                </option>
              );
            })}
          </select>
        </div>
      </section>
      <p class="text-2xl mt-8 border-t-2 border-gray-400">Upload Files</p>
      <section class="flex items-center self-center">
        <div class="flex flex-col items-center">
          <form
            action={`/api/uploadImage`}
            method="post"
            enctype="multipart/form-data"
          >
            <div class="flex flex-col items-center">
              <div class="mt-4 flex text-xl text-gray-600 p-12 gap-4 flex-col">
                <label
                  for="file"
                  class="relative p-16 cursor-pointer rounded-md bg-white font-semibold text-gray-600 focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-gray-500"
                >
                  <span>Upload a file: </span>
                  <input type="file" name="file" id="file" required />
                </label>
                <p class="text-center">Or drag and drop</p>
              </div>
              <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>

            <div class="flex items-center justify-center">
              <div class="flex text-xl text-gray-600 p-12 gap-4 flex-col">
                <label
                  for="passKey"
                  class="grid grid-cols-2 items-center gap-4"
                >
                  <span>Enter Passkey For Image: </span>
                  <input
                    type="text"
                    name="passKey"
                    id="passKey"
                    class="border-2 border-gray-400 rounded px-4 py-1"
                    placeholder=""
                    required
                    autocomplete="off"
                  ></input>
                </label>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="flex text-xl text-gray-600 p-12 gap-4 flex-col">
                <label for="name" class="grid grid-cols-2 items-center gap-4">
                  <span>Custom Name For Image: (Optional)</span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="border-2 border-gray-400 rounded px-4 py-1"
                    placeholder=""
                    autocomplete="off"
                  ></input>
                </label>
              </div>
            </div>
            <input
              type="hidden"
              name="fileDirectory"
              id="fileDirectory"
              required
            ></input>

            <div class="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                class="text-sm/6 font-semibold text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="cursor-pointer rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </section>
      <script>
        {`

        
          function handleFolderChange(event) {
            const folderName = event.target.value;
            const encoded = encodeURIComponent(folderName);
            window.location.href = '/uploadPage?folder=' + encoded;
          }
            window.addEventListener("DOMContentLoaded", () => {
            const params = new URLSearchParams(window.location.search);
            const folder = params.get("folder");
            if (folder) {
              const hiddenInput = document.getElementById("fileDirectory");
              hiddenInput.value = folder;
            }
          });
        `}
      </script>
    </div>
  );
}
