import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import SummaryApi, { baseURL } from "../common/API";
import axios from "axios";

export function UploadPage() {
  interface folderInfo {
    folderName: string;
    folderDirectory: string;
    fileNum: number;
  }

  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "text/plain",
    "application/zip",
    "application/x-7z-compressed",
    "application/octet-stream",
    "application/gz",
  ];
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [folders, setFolders] = useState<folderInfo[]>([]);

  const handleFolderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFolder(e.target.value);
  }

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const res = await axios.get<{ output: folderInfo[] }>(
          `${baseURL}/${SummaryApi.getFolder.url}`
        );
        setFolders(res.data.output || []);
      } catch (error) {
        console.error("Error when getting folders data, ", error);
      }
    };

    fetchFolder();
  }, []);
  return (
    <div className=" bg-gray-100 p-6 grow-2 flex flex-col">
      <Link
        to="/"
        className="flex items-center transform transistion-normal duration-500 hover:text-blue-600 text-xl"
      >
        <FaArrowLeft className="mr-2 text-2xl"></FaArrowLeft>
        Go Back
      </Link>
      <p className="text-2xl mt-4">Folder Selection</p>
      <section className="flex items-center gap-4">
        <div className="flex items-center gap-12 mt-6">
          <p className="text-xl">Folder:</p>
          <select
            id="folder"
            name="folder"
            onChange={handleFolderChange}
            value={selectedFolder ?? ""}
            required
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
          >
            <option value="" disabled selected>
              -- Select a folder --
            </option>
            {folders.map((data) => {
              return (
                <option
                  key={data.folderDirectory}
                  value={data.folderDirectory}
                >
                  {data.folderName}
                </option>
              );
            })}
          </select>
        </div>
      </section>
      <p className="text-2xl mt-8 border-t-2 border-gray-400">Upload Files</p>
      <section className="flex items-center self-center">
        <div className="flex flex-col items-center">
          <form action={`/api/uploadImage`} method="post">
            <div className="flex flex-col items-center">
              <div className="mt-4 flex text-xl text-gray-600 p-12 gap-4 flex-col">
                <label
                  htmlFor="file"
                  className="relative p-16 cursor-pointer rounded-md bg-white font-semibold text-gray-600 focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-gray-500"
                >
                  <span>Upload a file: </span>
                  <input type="file" name="file" id="file" required 
                  accept={allowedTypes.join(`, `)}
                  />
                </label>
                <p className="text-center">Or drag and drop</p>
              </div>
              <p className="text-xs/5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex text-xl text-gray-600 p-12 gap-4 flex-col">
                <label
                  htmlFor="passKey"
                  className="grid grid-cols-2 items-center gap-4"
                >
                  <span>Enter Passkey For Image: </span>
                  <input
                    type="text"
                    name="passKey"
                    id="passKey"
                    className="border-2 border-gray-400 rounded px-4 py-1"
                    value=""
                    required
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

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
