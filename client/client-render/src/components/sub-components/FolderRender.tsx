import { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi, { baseURL } from "../../common/API";
import { Link } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";

export function FolderList() {
  interface folderInfo {
    folderName: string;
    folderDirectory: string;
    fileNum: number;
  }

  const [folders, setFolders] = useState<folderInfo[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
    <section className="grid lg:grid-cols-4 not-md:flex-col p-4 gap-12">
      {folders.map((data: folderInfo, index) => (
        <div
          className="rounded-2xl h-auto bg-gray-200 p-6 flex justify-center items-stretch flex flex-col relative"
          key={index}
        >
          <div className="flex justify-between items-center">
            <FaFolder className="text-2xl"></FaFolder>
            <span
              className="text-2xl transform transistion-normal duration-300 rounded-xl hover:bg-gray-300 p-1 cursor-pointer"
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            >
              <FaEllipsisH></FaEllipsisH>
              <div
                className={`${
                  activeIndex === index ? "absolute" : "hidden"
                } z-10 flex flex-col bg-gray-300 gap-2 rounded `}
              >
                <button className="text-xl transform transistion-normal duration-300 hover:bg-gray-400 px-8 py-2 cursor-pointer">
                  Rename
                </button>
                <button className="text-xl transform transistion-normal duration-300 hover:bg-gray-400 px-8 py-2 cursor-pointer">
                  Upload
                </button>
                <button className="text-xl transform transistion-normal duration-300 hover:bg-gray-400 px-8 py-2 cursor-pointer">
                  Download
                </button>
                <button
                  className="text-xl transform transistion-normal duration-300 hover:bg-red-400 px-8 py-2 cursor-pointer border-t-2"
                  type="button"
                  data-folder={data.folderDirectory}
                >
                  Delete
                </button>
              </div>
            </span>
          </div>
          <Link
            to={`/directory/${data.folderDirectory}`}
            className="transform transistion-normal duration-500 hover:text-gray-800 cursor-pointer"
          >
            <p className="text-xl truncate">{data.folderName}</p>
            <p className="text-xl">{data.fileNum} files</p>
          </Link>
        </div>
      ))}
    </section>
  );
}
