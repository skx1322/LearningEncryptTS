import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { MainContent } from "../components/main";
import { UploadPage } from "../components/upload";
import { DirectoryContent } from "../components/directory";
import { PreviewImage } from "../components/preview";
import { Error404 } from "../components/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MainContent />,
      },
      {
        path: "*",
        element: < Error404/>,
      },
      {
        path: "/uploadPage",
        element: <UploadPage />,
      },
      {
        path: "/directory/:directoryID",
        element: <DirectoryContent />,
      },
      {
        path: "/preview/:storage/:folder/:imageID",
        element: <PreviewImage />,
      },
    ],
  },
]);

export default router;
