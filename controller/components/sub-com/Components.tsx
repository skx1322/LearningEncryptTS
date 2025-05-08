import { html, Html } from "@elysiajs/html";
import { Children } from "@kitajs/html";

export function CreateFolderTab() {
    return (
      <div class={`absolute`}>
        <form action="/api/createFolder">
          <section>
            <div>
              <label for="createFolder">Folder Name:</label>
              <input type="text" name="createFolder" id="createFolder" value="NoName"/>
            </div>
            <div>
              <label for="colorFolder">Folder Color:</label>
              <input type="color" name="colorFolder" id="colorFolder" value="#FF0000"/>
            </div>
            <button type="submit">Create</button>
          </section>
        </form>
      </div>
    )
  }