import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SummaryApi, { baseURL } from "../common/API";
import axios from "axios";
import { FaArrowLeft, FaEllipsisH } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa";

export function DirectoryContent() {
  interface FileObject {
    fileName: string;
    fileDate: string;
    fileSize: number;
    fileDirectory: string;
    fileReceived: boolean;
    isLocked: boolean;
  }

  const [files, setFiles] = useState<FileObject[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { directoryID } = useParams();

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const res = await axios.get<{ output: FileObject[] }>(
          `${baseURL}/${SummaryApi.getFile.url}/${directoryID}`
        );
        console.log(res);
        setFiles(res.data.output || []);
      } catch (error) {
        console.error("Error when getting folders data, ", error);
      }
    };

    fetchFolder();
  }, []);
  return (
    <div className="bg-gray-100 p-6 grow-2">
      <Link
        to="/"
        className="flex items-center transform transistion-normal duration-500 hover:text-blue-600 text-xl"
      >
        <FaArrowLeft className="mr-2 text-2xl"></FaArrowLeft>
        Go Back
      </Link>
      <p className="text-2xl mt-4">Files</p>
      <section className="grid lg:grid-cols-4 p-4 gap-12">
        {files.map((data, index) => (
          <div
            key={index}
            className="rounded-2xl h-auto bg-gray-200 p-6 flex justify-between items-stretch flex flex-col relative"
          >
            <div className="text-2xl flex justify-between">
              <FaFileImage className="text-2xl"></FaFileImage>
              <span>
                <FaEllipsisH
                  className="text-2xl transform transistion-normal duration-300 rounded-xl hover:bg-gray-300 p-1 cursor-pointer"
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                ></FaEllipsisH>
                <div
                  className={`${
                    activeIndex === index ? "absolute" : "hidden"
                  } z-10 flex flex-col bg-gray-300 gap-2 rounded`}
                  id={`dropdown-${index}`}
                >
                  <Link
                    className="text-xl transform transistion-normal duration-300 hover:bg-gray-400 px-8 py-2 cursor-pointer"
                    to={`/preview/${data.fileDirectory}`}
                  >
                    Preview
                  </Link>
                  <button
                    className="text-xl transform transistion-normal duration-300 hover:bg-gray-400 px-8 py-2 cursor-pointer"
                    file-data={data.fileDirectory}
                  >
                    {data.isLocked ? `Decrypt` : `Encrypt`}
                  </button>
                  <button className="text-xl transform transistion-normal duration-300 hover:bg-gray-400 px-8 py-2 cursor-pointer">
                    Download
                  </button>
                  <button
                    className="text-xl transform transistion-normal duration-300 hover:bg-red-400 px-8 py-2 cursor-pointer border-t-2 border-gray-500"
                    type="button"
                    data-folder={data.fileDirectory}
                  >
                    Delete
                  </button>
                </div>
              </span>
            </div>
            <p className="text-xl truncate">File Size: {data.fileName}</p>
            <p className="text-lx">{Math.round(data.fileSize / (Math.pow(1024, 2)) * 1000) / 1000} MB</p>
            <p className="text-lx">Uploaded Date: {data.fileDate}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
