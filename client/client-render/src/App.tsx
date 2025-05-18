import { Sidebar } from "./components/sidebar"
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const previewPage = location.pathname.startsWith(`/preview`);
  const isNotFound = location.pathname === "/404";

  console.log(location.pathname);
  return (
    <div className={`flex lg:h-screen lg:px-48 bg-gray-600 ${previewPage || isNotFound ? "items-center justify-center h-screen" : ""}`}>
      {!previewPage && !isNotFound && <Sidebar/>}
      <Outlet/>
    </div>
  )
}

export default App
