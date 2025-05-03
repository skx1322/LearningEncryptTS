import { Elysia, t } from "elysia";
import { html, Html } from "@elysiajs/html";
import { Children } from "@kitajs/html";
import { HeadSection, Sidebar, MainContent, DirectoryContent } from "./components/HeadSection";
import { Error500 } from "./components/Error";
export const home = new Elysia()
  .use(html())
  .get("/", async ({ set }) => {
    try {
      const response = await fetch("http://localhost:3000/api/StorageFolder");
      const jsonRes = await response.json();
      const FolderData = jsonRes.success ? jsonRes.output : [];

      set.status = 200;
      return (
        <html lang="en">
          <HeadSection/>
            <body class="px-96 bg-gray-600">
              <section class="grid grid-cols-[10%_90%] h-screen">
              <Sidebar></Sidebar>
              <MainContent folders={FolderData}></MainContent>
              </section>
            </body>
        </html>
      );
    } catch (error) {
      set.status = 401;
      return (
        <Error500></Error500>
      );
    }
  })
  .get(
    "/directory/:id",
    async ({ params, set }) => {
      const { id } = params;
      try {
        const response = await fetch(
          `http://localhost:3000/api/listFile/${id}`
        );
        const jsonRes = await response.json();
        const FileData = jsonRes.success ? jsonRes.output : [];
        set.status = 200;
        return (
          <html lang="en">
          <HeadSection/>
            <body class="px-96 bg-gray-600">
              <section class="grid grid-cols-[10%_90%] h-screen">
              <Sidebar></Sidebar>
              <DirectoryContent files={FileData}></DirectoryContent>
              </section>
            </body>
        </html>
        );
      } catch (error) {
        set.status = 401;
        return (
          <Error500></Error500>
        );
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
