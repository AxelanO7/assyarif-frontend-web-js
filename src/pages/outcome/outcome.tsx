import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { useState, useEffect } from "react";
import { getBaseUrl } from "../../helpers/api";
import { Out } from "../../types/stuff";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { EmptyDataTable } from "@/components/table";

const Outcome = () => {
  const [outs, setOuts] = useState<Out[]>([]);
  const [filteredOuts, setFilteredOuts] = useState<Out[]>([]);
  const [search, setSearch] = useState("");

  const baseUrl = () => {
    return getBaseUrl();
  };

  const getOuts = () => {
    axios
      .get(`${baseUrl()}/stuff/out`)
      .then((res) => {
        console.log(res.data);
        const data: Out[] = res.data.data;
        setOuts(data);
        setFilteredOuts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTapSearch = () => {
    const filtered = outs.filter((out) => {
      return out.order.outlet.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredOuts(filtered);
  };

  const addOut = () => {
    window.location.href = "/out/add";
  };

  useEffect(() => {
    getOuts();
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
              <div className="flex space-x-4 text-base font-semibold text-white">
                <button
                  className="bg-c-dark-blue rounded-md px-3"
                  onClick={addOut}
                >
                  Tambah Barang
                </button>
              </div>
              <div className="flex items-center">
                <input
                  type="search"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cari outlet"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <MagnifyingGlassIcon
                  className="w-10 h-10 text-white bg-c-dark-blue rounded-md p-2 ml-2 cursor-pointer"
                  onClick={handleTapSearch}
                />
              </div>
            </div>
            <Table className="w-full mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    ID
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Tanggal
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Nama Outlet
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Nama
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Jumlah Barang
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Total
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Bayar
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Kembalian
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOuts.length === 0
                  ? EmptyDataTable({ columnSpan: 8 })
                  : filteredOuts.map((out) => (
                      <TableRow key={out.id}>
                        <TableCell className="border-2 border-gray-300 p-2 text-center">
                          {out.out_id}
                        </TableCell>
                        <TableCell className="border-2 border-gray-300 p-2 text-center">
                          {new Date(
                            out.created_at?.toString() || new Date()
                          ).toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="border-2 border-gray-300 p-2 text-center">
                          {out.order.outlet.name}
                        </TableCell>
                        <TableCell className="border-2 border-gray-300 p-2 text-center">
                          {out.order.stock.name}
                        </TableCell>
                        <TableCell className="border-2 border-gray-300 p-2 text-center">
                          {out.order.total_order}
                        </TableCell>
                        <TableCell className="border-2 border-gray-300 p-2 text-center">
                          {out.order.total_paid.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </TableCell>
                        <TableCell className="border-2 border-gray-300 p-2 text-center">
                          {out.total_paided.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </TableCell>
                        <TableCell className="border-2 border-gray-300 p-2 text-center">
                          {out.return_cash.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
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

export default Outcome;
