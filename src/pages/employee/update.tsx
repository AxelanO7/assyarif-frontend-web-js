import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";

const UpdateEmployee = () => {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Pegawai</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Pegawai</p>
          <p className="ml-2 font-semibold">{">"}</p>
          <p className="ml-2 font-semibold">Ubah Barang</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-semibold text-gray-500">Pegawai</h3>
              <h6 className="font-semibold text-lg py-1">{dateNow}</h6>
            </div>
            <div className="flex space-x-4 mt-4">
              <div>
                <label>ID User</label>
                <input
                  type="text"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label>Nama Pegawai</label>
                <input
                  type="text"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div>
                <label>No Telepon</label>
                <input
                  type="text"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-4 items-center">
              <div>
                <label>Alamat</label>
                <input
                  type="text"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label>Jabatan</label>
                <select className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-max bg-white">
                  <option value="admin">Admin</option>
                  <option value="kasir">Kasir</option>
                  <option value="gudang">Gudang</option>
                </select>
              </div>
            </div>
            <div className="w-full justify-end flex mt-4">
              <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default UpdateEmployee;
