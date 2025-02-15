import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { useEffect, useState } from "react";
import axios from "axios";
import { Retur } from "@/types/stuff";
import { getBaseUrl } from "@/helpers/api";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { EmptyDataTable } from "@/components/table";

const Return = () => {

  const getReturns = () => {
    axios
      .get(`${getBaseUrl()}/return/private/stuff`)
      .then((res) => {
        console.log(res.data);
        const data: Retur[] = res.data.data;
        setReturns(data);
        setOriginalReturns(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [returns, setReturns] = useState<Retur[]>();
  const [originalReturns, setOriginalReturns] = useState<Retur[]>();
  const [search, setSearch] = useState("");

  const handleTapSearch = () => {
    const filtered = originalReturns?.filter((retur) => {
      return retur.stock.name.toLowerCase().includes(search.toLowerCase());
    });
    setReturns(filtered);
  };

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
                onChange={(e) => setSearch(e.target.value)}
              />
              <MagnifyingGlassIcon
                className="w-10 h-10 text-white bg-c-dark-blue rounded-md p-2 ml-2 cursor-pointer"
                onClick={handleTapSearch}
              />
            </div>
            <Table className="w-full mt-4">
              <TableHeader>
                <TableRow className="bg-gray-300">
                  <TableHead className="py-2 border border-gray-400">
                    No
                  </TableHead>
                  <TableHead className="py-2 border border-gray-400">
                    Outlet
                  </TableHead>
                  <TableHead className="py-2 border border-gray-400">
                    Barang
                  </TableHead>
                  <TableHead className="py-2 border border-gray-400">
                    Jumlah
                  </TableHead>
                  <TableHead className="py-2 border border-gray-400">
                    Alasan
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {returns?.length === 0 && EmptyDataTable({ columnSpan: 6 })}
                {returns?.map((retur, index) => (
                  <TableRow key={retur.id} className="text-center">
                    <TableCell className="py-2 border border-gray-400">
                      {index + 1}
                    </TableCell>
                    <TableCell className="py-2 border border-gray-400">
                      {retur.outlet.name}
                    </TableCell>
                    <TableCell className="py-2 border border-gray-400">
                      {retur.stock.name}
                    </TableCell>
                    <TableCell className="py-2 border border-gray-400">
                      {retur.total_return}
                    </TableCell>
                    <TableCell className="py-2 border border-gray-400">
                      {retur.reason}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default Return;
