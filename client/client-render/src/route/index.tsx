import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { MainContent } from "../components/main";
import { UploadPage } from "../components/upload";
import { DirectoryContent } from "../components/directory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
        {
            path: "",
            element: <MainContent/>
        },
        {
            path: "/uploadPage",
            element: <UploadPage/>
        },
        {
            path: "/directory/:directoryID",
            element: <DirectoryContent/>
        },
    ]
  },
]);

export default router;