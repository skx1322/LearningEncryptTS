import { Sidebar } from "./components/sidebar"
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex h-auto lg:px-48 bg-gray-600">
      <Sidebar></Sidebar>
      <Outlet></Outlet>
    </div>
  )
}

export default App
