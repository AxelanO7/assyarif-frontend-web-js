import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { useState, useEffect } from "react";
import { getBaseUrl } from "../../helpers/api";
import { StuffProps } from "@/types/stuff";

const OutcomeOutlet = () => {
  const [stocks, setStocks] = useState<StuffProps[]>([]);

  const baseUrl = () => {
    return getBaseUrl();
  };

  const getIns = () => {
    axios
      .get(`${baseUrl()}/stuff/out`)
      .then((res) => {
        console.log(res.data);
        setStocks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getIns();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Barang Keluar</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Barang Keluar</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Barang Keluar
            </h3>
            <div className="flex justify-between mt-4">
              <button className="bg-c-dark-blue rounded-md px-3 text-white">
                Tambah Barang
              </button>
              <div className="flex items-center">
                <input
                  type="search"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cari barang"
                />
                <MagnifyingGlassIcon className="w-10 h-10 text-white bg-c-dark-blue rounded-md p-2 ml-2 cursor-pointer" />
              </div>
            </div>
            <table className="w-full mt-4 table-auto">
              <thead>
                <tr>
                  <th className="border-2 border-gray-300 p-2">Lorem</th>
                  <th className="border-2 border-gray-300 p-2">Lorem</th>
                  <th className="border-2 border-gray-300 p-2">Lorem</th>
                  <th className="border-2 border-gray-300 p-2">Lorem</th>
                  <th className="border-2 border-gray-300 p-2">Lorem</th>
                  <th className="border-2 border-gray-300 p-2">Lorem</th>
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
                      {stock.quantity}
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

export default OutcomeOutlet;
