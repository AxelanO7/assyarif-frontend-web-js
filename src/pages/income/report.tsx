import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { getBaseUrl } from "../../helpers/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { PeriodIn, Stuff } from "../../types/stuff";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { Button } from "@nextui-org/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { getFormatDate } from "@/helpers/date";

const ReportIncome = () => {
  const [stocks, setStocks] = useState<PeriodIn[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<PeriodIn[]>([]);
  const [search, setSearch] = useState("");

  const baseUrl = () => {
    return getBaseUrl();
  };

  const getIns = () => {
    axios
      .get(`${baseUrl()}/stuff/period/in`)
      .then((res) => {
        console.log(res.data);
        const data: PeriodIn[] = res.data.data;
        setStocks(data);
        setFilteredStocks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTapSearch = () => {
    const filtered = stocks.filter((stock) => {
      return stock.date.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredStocks(filtered);
  };

  const handleTapDetail = (ins: Stuff[]) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-c-dark-blue rounded-md px-3 text-white">
            Detail
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Detail Barang Masuk</DialogTitle>
            <>
              <Table className="w-full mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                      No
                    </TableHead>
                    <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                      Tanggal
                    </TableHead>
                    <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                      Nama
                    </TableHead>
                    <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                      Jenis
                    </TableHead>
                    <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                      Satuan
                    </TableHead>
                    <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                      Quantity
                    </TableHead>
                    <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ins.map((stock, index) => (
                    <TableRow key={index}>
                      <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                        {new Date(
                          stock.created_at?.toString() || new Date()
                        ).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                        {stock.name}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                        {stock.type}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                        {stock.unit}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                        {stock.quantity}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                        {stock.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  useEffect(() => {
    getIns();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Laporan Barang Masuk</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Laporan Barang Masuk</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Laporan Barang Masuk
            </h3>
            <div className="flex justify-end mt-4">
              <div className="flex items-center">
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
            </div>
            <Table className="w-full mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center w-16">
                    No
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Tanggal
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center w-32">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStocks.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="border-2 border-gray-300 p-2 text-center"
                    >
                      Data tidak ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStocks.map((ins, index) => (
                    <TableRow key={index}>
                      <TableCell className="border-2 border-gray-300 p-2 text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-center">
                        {getFormatDate(ins.date)}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-center">
                        {handleTapDetail(ins.ins)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default ReportIncome;
