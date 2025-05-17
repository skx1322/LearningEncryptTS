import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SummaryApi, { baseURL } from "../common/API";
import { FolderList } from "./sub-components/FolderRender";

export function MainContent() {
  const [folderView, setFolderView] = useState(false);
  const folderRef = useRef<HTMLButtonElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const [newFolder, setNewFolder] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseURL}/${SummaryApi.createFolder.url}`,
        { name: newFolder }
      );
      console.log("Folder created:", response.data);
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const toggleView = () => {
    setFolderView((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        folderRef.current &&
        !folderRef.current.contains(event.target as Node) &&
        event.target !== toggleButtonRef.current // Prevent hiding if clicking the button
      ) {
        setFolderView(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-100 p-6 grow-2 relative">
      <div className="flex items-center gap-4">
        <p className="text-2xl">Directory: </p>
        <button
          className="text-xl bg-gray-300 py-1 px-3 rounded cursor-pointer transform transistion-normal duration-500 hover:bg-gray-700 hover:text-white"
          id="createFolder"
          type="button"
          onClick={toggleView}
          ref={toggleButtonRef}
        >
          Create
        </button>
        <div
          className={`${
            folderView ? "absolute" : "hidden"
          } bg-gray-300 rounded-b-2xl p-4 translate-x-[120px] translate-y-[70px] z-20`}
        >
          <form onSubmit={handleSubmit}>
            <section className="flex flex-col gap-4 items-center">
              <div className="text-xl flex gap-2 self-start">
                <label htmlFor="folderName">Folder Name:</label>
                <input
                  className="bg-gray-200"
                  type="text"
                  name="folderName"
                  id="folderName"
                  value={newFolder}
                  onChange={(e) => setNewFolder(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="text-xl bg-gray-200 px-3 py-1 rounded-xl cursor-pointer"
              >
                Create
              </button>
            </section>
          </form>
        </div>
      </div>
      <section className="not-md:flex-col p-4 gap-12">
        <FolderList></FolderList>
      </section>
    </div>
  );
}
