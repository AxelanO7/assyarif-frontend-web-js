import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../layouts/base";

const Dashboard = () => {
  const stocks = [
    {
      id: 1,
      name: "Bimoli",
      type: "Minyak",
      amount: 12,
      unit: "1 Liter",
      price: 20000,
    },
  ];

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Dashboard</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Dashboard</p>
        </div>
        <div className="px-6">
          <input
            type="date"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
          />
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Stok Barang
            </h3>
            <div className="flex justify-end items-center">
              <input
                type="search"
                className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cari barang"
              />
              <MagnifyingGlassIcon className="w-10 h-10 text-white bg-c-c-dark-blue rounded-md p-2 ml-2 cursor-pointer bg-blue-500" />
            </div>
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="border-2 border-gray-300 p-2">ID</th>
                  <th className="border-2 border-gray-300 p-2">Nama</th>
                  <th className="border-2 border-gray-300 p-2">Jenis</th>
                  <th className="border-2 border-gray-300 p-2">Jumlah</th>
                  <th className="border-2 border-gray-300 p-2">Satuan</th>
                  <th className="border-2 border-gray-300 p-2">Harga</th>
                  <th className="border-2 border-gray-300 p-2">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-700">
                {stocks.map((stock) => (
                  <tr key={stock.id}>
                    <td className="border-2 border-gray-300 p-2">{stock.id}</td>
                    <td className="border-2 border-gray-300 p-2">
                      {stock.name}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {stock.type}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {stock.amount}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {stock.unit}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {stock.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td className="border-2 border-gray-300 flex space-x-2 text-white p-2">
                      <button className="bg-blue-500 rounded-md w-full">
                        Edit
                      </button>
                      <button className="bg-red-500 rounded-md w-full">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default Dashboard;
