import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";

const UpdateOutcome = () => {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Barang Keluar</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Barang Keluar</p>
          <p className="ml-2 font-semibold">{">"}</p>
          <p className="ml-2 font-semibold">Ubah Barang</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-semibold text-gray-500">
                Barang Keluar
              </h3>
              <h6 className="font-semibold text-lg py-1">{dateNow}</h6>
            </div>
            <div className="flex space-x-4 mt-4">
              <div>
                <label>ID Barang</label>
                <input
                  type="text"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label>Nama Barang</label>
                <input
                  type="text"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div>
                <label>Jenis Barang</label>
                <input
                  type="text"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <div>
                <label>Jumlah Barang</label>
                <input
                  type="text"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label>Harga Sub Total</label>
                <input
                  type="text"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label>Harga</label>
                <input
                  type="text"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                />
              </div>
            </div>
            <div className="flex-col flex mt-4">
              <label>Satuan</label>
              <select className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-max bg-white">
                <option value="pcs">Pcs</option>
                <option value="kg">Kg</option>
                <option value="liter">Liter</option>
                <option value="m">Meter</option>
              </select>
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

export default UpdateOutcome;
