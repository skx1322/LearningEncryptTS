import { Elysia, t } from "elysia";
import { html, Html } from "@elysiajs/html";
import { Children } from "@kitajs/html";
import {
  HeadSection,
  Sidebar,
  MainContent,
  DirectoryContent,
  UploadPage,
} from "./components/SectionPage";
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
          <HeadSection />
          <body class="lg:px-96 bg-gray-600">
            <section class="flex h-screen">
              <Sidebar></Sidebar>
              <MainContent folders={FolderData}></MainContent>
            </section>
            <script>
              {`
              
                window.toggleDropdown = function(index) {
                  document.querySelectorAll("[id^='dropdown-']").forEach(el => {
                    if (!el.classList.contains("hidden")) {
                      el.classList.add("hidden");
                    }
                  });
                  const dropdown = document.getElementById('dropdown-' + index);
                  if (dropdown) {
                    dropdown.classList.toggle('hidden');
                  }
                  window.__activeDropdown = dropdown;
                };

                document.addEventListener('click', function(event) {
                  const active = window.__activeDropdown;
                  if (
                    active &&
                    !active.contains(event.target) &&
                    !event.target.closest(".fa-ellipsis")
                  ) {
                    active.classList.add("hidden");
                    window.__activeDropdown = null;
                  }
                });
              `}
            </script>
          </body>
        </html>
      );
    } catch (error) {
      set.status = 401;
      return <Error500></Error500>;
    }
  })
  .get("/directory/:id", async ({ params, set }) => {
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
            <HeadSection />
            <body class="lg:px-96 bg-gray-600">
              <section class="flex h-screen">
                <Sidebar></Sidebar>
                <DirectoryContent files={FileData}></DirectoryContent>
              </section>
            </body>
          </html>
        );
      } catch (error) {
        set.status = 401;
        return <Error500></Error500>;
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .get("/uploadPage", async({set, request, redirect})=>{
    try {
      const response = await fetch("http://localhost:3000/api/StorageFolder");
      const jsonRes = await response.json();
      const FolderData = jsonRes.success ? jsonRes.output : [];

      const url = new URL(request.url);
      
      const folderParam = url.searchParams.get("folder");
  
      const currentFolder = folderParam
        ? decodeURIComponent(folderParam)
        : "";

      set.status = 200;

      return (
        <html lang="en">
          <HeadSection />
          <body class="lg:px-96 bg-gray-600">
            <section class="flex h-screen">
              <Sidebar></Sidebar>
              <UploadPage folders={FolderData} currentFolder={currentFolder}></UploadPage>
            </section>
          </body>
        </html>
      );
    } catch (error) {
      set.status = 401;
      return <Error500></Error500>;
    }
  });
