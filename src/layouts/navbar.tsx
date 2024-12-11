import { useRecoilState } from "recoil";
import { sidebarState } from "../core/store";
import { Bars3Icon } from "@heroicons/react/16/solid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sc/components//ui/popover";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "@/helpers/api";
import { UserProps } from "@/types/user";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarState);
  const [user, setUser] = useState<UserProps>();

  const toogleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const getUserProfile = () => {
    axios
      .get(`${getBaseUrl()}/user/private/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const dataRes: UserProps = res.data.data;
        setUser(dataRes);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          handleLogout();
        }
        console.error(err);
      });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <nav className="flex justify-between py-4 h-16 items-center w-screen fixed top-0 z-10 shadow-md ps-4 pe-8 border-b-2 bg-gray-800 select-none text-white">
        <div className="flex items-center font-bold">
          <Bars3Icon className="h-6 w-6" onClick={toogleSidebar} />
          <p className="ml-4">TOKO ASSYARIF</p>
        </div>
        <Popover>
          <PopoverTrigger className="flex items-center">
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
              <img src="/illust_user.png" />
            </div>
            <p className="ml-2 text-sm">
              {user?.username
                ?.split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </p>
          </PopoverTrigger>
          <PopoverContent
            className="bg-white shadow-md rounded-lg p-0"
            style={{ width: "120px" }}
          >
            <div
              className="flex cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-200  rounded-lg p-2  text-gray-800 text-sm"
              onClick={handleLogout}
            >
              <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
              <p className={clsx("ml-2", "text-gray-800")}>Logout</p>
            </div>
          </PopoverContent>
        </Popover>
      </nav>
    </>
  );
};

export default Navbar;
