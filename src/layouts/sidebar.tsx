import {
  HomeIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  ClipboardIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { useRecoilValue } from "recoil";
import { sidebarState } from "../core/store";

const Sidebar = () => {
  const sidebarOpen = useRecoilValue(sidebarState);

  const handleSidebar = (route: string) => {
    window.location.href = route;
  };

  return (
    <>
      <div className="h-screen fixed top-16 left-0 z-10 select-none bg-gray-800 text-white">
        <p
          className={`${
            sidebarOpen ? "text-2xl py-4" : "text-xl py-3"
          } font-bold text-center border-b-2 border-gray-700`}
          onClick={() => handleSidebar("/dashboard")}
        >
          {sidebarOpen ? "Main Menu" : "A"}
        </p>
        <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
          <div
            className={`${
              sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
            } flex items-center h-16`}
            onClick={() => handleSidebar("/dashboard")}
          >
            <HomeIcon className="h-6 w-6" />
            {sidebarOpen && <p className="ml-2">Dashboard</p>}
          </div>
        </div>
        <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
          <div
            className={`${
              sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
            } flex items-center`}
            onClick={() => handleSidebar("/in")}
          >
            <DocumentArrowDownIcon className="h-6 w-6 " />
            {sidebarOpen && <p className="ml-2">Barang Masuk</p>}
          </div>
        </div>
        <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
          <div
            className={`${
              sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
            } flex items-center`}
            onClick={() => handleSidebar("/out")}
          >
            <DocumentArrowUpIcon className="h-6 w-6 " />
            {sidebarOpen && <p className="ml-2">Barang Keluar</p>}
          </div>
        </div>
        <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
          <div
            className={`${
              sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
            } flex items-center`}
            onClick={() => handleSidebar("/opname")}
          >
            <ClipboardIcon className="h-6 w-6 " />
            {sidebarOpen && <p className="ml-2">Stok Opname</p>}
          </div>
        </div>
        <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
          <div
            className={`${
              sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
            } flex items-center`}
            onClick={() => handleSidebar("/employee")}
          >
            <UserIcon className="h-6 w-6" />
            {sidebarOpen && <p className="ml-2">Akun</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
