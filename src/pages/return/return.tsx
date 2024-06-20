import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReturProps } from "@/types/stuff";
import { getBaseUrl } from "@/helpers/api";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Return = () => {
  const getReturns = () => {
    axios
      .get(`${getBaseUrl()}/return/private/stuff`)
      .then((res) => {
        console.log(res.data);
        setReturns(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [returns, setReturns] = useState<ReturProps[]>();
  useEffect(() => {
    getReturns();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Return</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Return</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">Return</h3>
            <div className="flex items-center w-full justify-end">
              <input
                type="search"
                className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cari barang"
              />
              <MagnifyingGlassIcon className="w-10 h-10 text-white bg-c-dark-blue rounded-md p-2 ml-2 cursor-pointer" />
            </div>
            <table className="w-full mt-4">
              <thead>
                <tr className="bg-gray-300">
                  <th className="py-2 border border-gray-400">No</th>
                  <th className="py-2 border border-gray-400">Outlet</th>
                  <th className="py-2 border border-gray-400">Barang</th>
                  <th className="py-2 border border-gray-400">Jumlah</th>
                  <th className="py-2 border border-gray-400">Alasan</th>
                  <th className="py-2 border border-gray-400">Bukti</th>
                </tr>
              </thead>
              <tbody>
                {returns?.map((retur, index) => (
                  <tr key={retur.id} className="text-center">
                    <td className="py-2 border border-gray-400">{index + 1}</td>
                    <td className="py-2 border border-gray-400">
                      {retur.outlet.name}
                    </td>
                    <td className="py-2 border border-gray-400">
                      {retur.stock.name}
                    </td>
                    <td className="py-2 border border-gray-400">
                      {retur.total_return}
                    </td>
                    <td className="py-2 border border-gray-400">
                      {retur.reason}
                    </td>
                    <td className="py-2 border border-gray-400">
                      {retur.proof}
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

export default Return;
