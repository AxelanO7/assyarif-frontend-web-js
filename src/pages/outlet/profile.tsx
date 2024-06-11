import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { getBaseUrl } from "../../helpers/api";
import { useEffect, useState } from "react";
import { UserProps, OutletProps } from "@/types/user";

const OutletProfile = () => {
  const [outlet, setOutlet] = useState<OutletProps>();
  const [user, setUser] = useState<UserProps>();

  const getOutletByIDUser = ({ id }: { id: string }) => {
    axios
      .get(`${getBaseUrl()}/outlet/private/user/${id}`)
      .then((res) => {
        console.log(res.data);
        const dataRes = res.data.data;
        setOutlet(dataRes);
      })
      .catch((err) => {
        console.error(err);
      });
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
        getOutletByIDUser({ id: dataRes.id });
        setUser(dataRes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Profile Outlet</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Profile Outlet</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Profile Outlet
            </h3>
            <div className="flex mt-4 space-x-16">
              <div>
                <img
                  src="https://via.placeholder.com/200"
                  alt="outlet"
                  className="border-2 border-gray-400"
                />
              </div>
              <div>
                <div>
                  <p className="font-semibold">Nama Outlet</p>
                  <p className="ml-4">{outlet?.name}</p>
                </div>
                <div>
                  <p className="font-semibold">No Telepon Outlet</p>
                  <p className="ml-4">{outlet?.phone}</p>
                </div>
                <div>
                  <p className="font-semibold">Alamat</p>
                  <p className="ml-4">{outlet?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default OutletProfile;
