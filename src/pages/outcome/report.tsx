import { DocumentTextIcon, HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";

const ReportOutcome = () => {
  const stocks = [
    {
      id: 1,
      name: "Bimoli",
      date: "2021-08-01",
    },
  ];

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Barang Keluar</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Barang Keluar</p>
          <p className="ml-2 font-semibold">{">"}</p>
          <p className="ml-2 font-semibold">Laporan Barang Keluar</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Barang Keluar
            </h3>
            <div className="flex justify-between mt-4">
              <div className="flex items-center space-x-2">
                <div>
                  <label>ID Laporan</label>
                  <input
                    type="text"
                    className="p-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
                <div>
                  <label>Nama Laporan</label>
                  <input
                    type="text"
                    className="p-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
                <div>
                  <label>Tanggal Awal</label>
                  <input
                    type="date"
                    className="p-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
                <div>
                  <label>Tanggal Akhir</label>
                  <input
                    type="date"
                    className="p-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-c-dark-blue rounded-md px-4 py-1 text-white">
                Simpan
              </button>
            </div>
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="border-2 border-gray-300 p-2">ID</th>
                  <th className="border-2 border-gray-300 p-2">Nama</th>
                  <th className="border-2 border-gray-300 p-2">Tanggal</th>
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
                      {stock.date}
                    </td>
                    <td className="border-2 border-gray-300">
                      <DocumentTextIcon className="rounded-md  w-6 h-6 text-blue-500 mx-auto cursor-pointer" />
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

export default ReportOutcome;
