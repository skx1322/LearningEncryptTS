import { Elysia, t } from "elysia";
import { html, Html } from "@elysiajs/html";
import { Children } from "@kitajs/html";

import {
  HeadSection,
} from "./components/SectionPage";

export const home = new Elysia()
  .use(html())
  .get("/preview/:storage/:folder/:imageID", async({params, set})=>{
    const {storage, folder, imageID} = params;
    return(
              <html lang="en">
          <HeadSection />
          <body class="bg-black flex items-center justify-center h-screen">
            <div>
              <img src={`/imagehost/${storage}/${folder}/${imageID}`} alt="Preview" />
            </div>
          </body>
        </html>
    )
  },{
    params: t.Object({
      storage: t.String(),
      folder: t.String(),
      imageID: t.String()
    })
  });
