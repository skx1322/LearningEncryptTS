import { Elysia } from "elysia";
import { html, Html } from "@elysiajs/html";
import { Children } from "@kitajs/html";

export const home = new Elysia().use(html())
.get("/", async ({ set }) => {
  try {
    const response = await fetch("http://localhost:3000/api/StorageFolder");
    const jsonRes = await response.json();
    const FolderData = jsonRes.success ? jsonRes.output : [];

    set.status = 200;
    return (
      <html lang="en">
        <head>
          <title>Hello World</title>
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        </head>
        <body class="px-96 bg-gray-600">
          <section class="grid grid-cols-[10%_90%] h-screen">
            <div class="bg-blue-900">Upload</div>
            <div class="bg-gray-100 p-6">
              <p class="text-2xl">Directory: </p>
              <section class="grid grid-cols-4 p-4 gap-12">
                {FolderData.map((data: { folderName: string; folderDirectory: string | number | bigint | boolean | Promise<Children> | Children[] | null | undefined; fileNum: string | number | bigint | boolean | Promise<Children> | Children[] | null | undefined; }) => (
                  <a
                    class="rounded-2xl h-auto bg-gray-200 cursor-pointer p-6 flex justify-center items-start flex flex-col transform transistion-normal duration-500 hover:bg-blue-600 hover:text-white"
                    href={`/directory:${data.folderDirectory}`}
                  >
                    <p class="text-2xl">{data.folderName}</p>
                    <p class="text-2xl">{data.fileNum} files</p>
                  </a>
                ))}
              </section>
            </div>
          </section>
        </body>
      </html>
    );
  } catch (error) {
    set.status = 401;
    return (
      <html lang="en">
        <head>
          <title>Hello World</title>
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        </head>
        <body>
          <h1>Error</h1>
        </body>
      </html>
    );
  }
})
.get("/directory:id", async ({ set }) => {

})
;
