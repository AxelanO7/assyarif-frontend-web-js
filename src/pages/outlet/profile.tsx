import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";

const OutletProfile = () => {
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
                  <p className="font-semibold">Username Outlet</p>
                  <p className="ml-4">syarif1</p>
                </div>
                <div>
                  <p className="font-semibold">Passoword</p>
                  <p className="ml-4">password</p>
                </div>
                <div>
                  <p className="font-semibold">Nama Pemilik</p>
                  <p className="ml-4">Syarif</p>
                </div>
                <div>
                  <p className="font-semibold">Alamat</p>
                  <p className="ml-4">Jalan Sidakarya nomor 07</p>
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
