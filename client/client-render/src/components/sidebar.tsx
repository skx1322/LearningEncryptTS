import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";

export function Sidebar() {
  return (
    <div className="h-screen not-lg:h-auto bg-blue-900 flex flex-col items-stretch justify-start gap-4">
      <Link
        to="/"
        className="text-2xl text-white px-10 py-2 transform transistion-normal duration-500 hover:bg-blue-600 mt-4"
      >
        <FaUser className="lg:text-3xl"></FaUser>
      </Link>
      {/* <a
        href="/"
        class="text-2xl text-white px-10 py-2 transform transistion-normal duration-500 hover:bg-blue-600 mt-4"
      >
        <i class="fa-solid fa-user"></i>
      </a> */}
      <Link
        to="/uploadPage"
        className="text-2xl text-white px-10 py-2 transform transistion-normal duration-500 hover:bg-blue-600 mt-4"
      >
        <FaCloudUploadAlt className="lg:text-4xl"></FaCloudUploadAlt>
      </Link>
    </div>
  );
}