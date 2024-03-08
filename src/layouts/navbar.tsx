import { useRecoilState } from "recoil";
import { sidebarState } from "../core/store";
import { Bars3Icon } from "@heroicons/react/16/solid";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarState);

  const toogleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="flex justify-between py-4 h-16 items-center w-screen fixed top-0 z-10 shadow-md ps-4 pe-8 border-b-2 bg-gray-800 select-none text-white">
        <div className="flex items-center font-bold">
          <Bars3Icon className="h-6 w-6" onClick={toogleSidebar} />
          <p className="ml-4">TOKO ASSYARIF</p>
        </div>
        <div className="flex items-center">
          <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center" />
          <p className="ml-4">Admin</p>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
