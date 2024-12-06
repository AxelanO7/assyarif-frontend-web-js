import {
  HomeIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  ClipboardIcon,
  UserIcon,
  ShoppingCartIcon,
  ArrowUturnUpIcon,
  DocumentChartBarIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/16/solid";
import { useRecoilValue } from "recoil";
import { sidebarState } from "../core/store";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shadcn/components/ui/collapsible";

const Sidebar = () => {
  const sidebarOpen = useRecoilValue(sidebarState);

  const handleSidebar = (route: string) => {
    window.location.href = route;
  };

  const [role, setRole] = useState("");

  useEffect(() => {
    const localRole = localStorage.getItem("role");
    setRole(localRole || "outlet");
  }, []);

  return (
    <>
      <div className="h-screen fixed top-16 left-0 z-10 select-none bg-gray-800 text-white min-w">
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
        {role === "supplier" && (
          <div>
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
                onClick={() => handleSidebar("/return")}
              >
                <ArrowUturnUpIcon className="h-6 w-6 " />
                {sidebarOpen && <p className="ml-2">Retur Barang</p>}
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
            {/* employee */}
            <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
              <div
                className={`${
                  sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
                } flex items-center`}
                onClick={() => handleSidebar("/employee")}
              >
                <UserIcon className="h-6 w-6" />
                {sidebarOpen && <p className="ml-2">Pegawai</p>}
              </div>
            </div>
            {/* laporan */}
            {sidebarOpen ? (
              <Collapsible>
                <CollapsibleTrigger className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700 w-[232px]">
                  <div
                    className={`${
                      sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
                    } flex items-center`}
                    // onClick={() => handleSidebar("/employee")}
                  >
                    <DocumentChartBarIcon className="h-6 w-6" />
                    <p className="ml-2">Laporan</p>
                    <ChevronUpDownIcon className="h-6 w-6 ml-auto" />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div
                    className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700 px-16 py-4"
                    onClick={() => handleSidebar("/out/report")}
                  >
                    <p>Barang Keluar</p>
                  </div>
                  <div
                    className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700 px-16 py-4"
                    onClick={() => handleSidebar("/in/report")}
                  >
                    <p>Barang Masuk</p>
                  </div>
                  <div
                    className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700 px-16 py-4"
                    onClick={() => handleSidebar("/return-report")}
                  >
                    <p>Retur</p>
                  </div>
                  <div
                    className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700 px-16 py-4"
                    onClick={() => handleSidebar("/stock-report")}
                  >
                    <p>Stok</p>
                  </div>
                  <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700 px-16 py-4">
                    <p>Order</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <div className="w-full flex justify-center">
                <DocumentChartBarIcon className="h-6 w-6" />
              </div>
            )}
          </div>
        )}
        {role === "outlet" && (
          <div className="min-w-[232px]">
            <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
              <div
                className={`${
                  sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
                } flex items-center`}
                onClick={() => handleSidebar("/order/add")}
              >
                <ShoppingCartIcon className="h-6 w-6 " />
                {sidebarOpen && <p className="ml-2">Pesan Barang</p>}
              </div>
            </div>
            <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
              <div
                className={`${
                  sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
                } flex items-center`}
                onClick={() => handleSidebar("/return/add")}
              >
                <ArrowUturnUpIcon className="h-6 w-6 " />
                {sidebarOpen && <p className="ml-2">Retur Barang</p>}
              </div>
            </div>
            {/* <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
              <div
                className={`${
                  sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
                } flex items-center`}
                onClick={() => handleSidebar("/outlet/profile")}
              >
                <UserCircleIcon className="h-6 w-6" />
                {sidebarOpen && <p className="ml-2">Profil</p>}
              </div>
            </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
