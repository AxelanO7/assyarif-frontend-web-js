import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "@/helpers/api";
import { PeriodStock, Stuff } from "@/types/stuff";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import BaseLayout from "@/layouts/base";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { Button } from "@nextui-org/button";
import { getFormatDate } from "@/helpers/date";

const StockReport = () => {
  const [stocks, setStocks] = useState<PeriodStock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<PeriodStock[]>([]);
  const [search, setSearch] = useState("");

  const getStocks = () => {
    const role = localStorage.getItem("role");
    axios
      .get(
        `${getBaseUrl()}/${
          role === "supplier"
            ? "stock/period/stock"
            : "stock_outlet/private/stuff"
        }`
      )
      .then((res) => {
        console.log(res.data);
        const data: PeriodStock[] = res.data.data;
        setFilteredStocks(data);
        setStocks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkToken = () => {
    const localToken = localStorage.getItem("token");
    if (localToken === null) {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  const handleTapSearch = () => {
    const filtered = stocks.filter((stock) => {
      return stock.date.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredStocks(filtered);
  };

  const handleTapPrint = () => {
    const printTable = document.getElementById("printTable");
    if (printTable) {
      const printContents = printTable.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      // make empty space for image signature
      const emptySpace = document.createElement("div");
      emptySpace.style.height = "200px";
      document.body.appendChild(emptySpace);
      // add  signature
      const divParent = document.createElement("div");
      divParent.style.position = "absolute";
      divParent.style.right = "10px";
      divParent.style.bottom = "10px";
      divParent.style.fontSize = "12px";

      divParent.innerHTML = `
        <p class="font-bold text-center">Mengetahui</p>
        <p class="font-bold text-center">Kepala Toko</p>
        <br>
        <br>
        <br>
        <br>
        <p class="font-bold text-center">Syarif</p>
      `;

      document.body.appendChild(divParent);

      window.print();
      document.body.innerHTML = originalContents;
      printTable.innerHTML = printContents;
      // close the dialog
      window.location.reload();
    }
  };

  const handleTapDetail = (stock: Stuff[]) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-c-dark-blue rounded-md px-3 text-white">
            Detail
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Detail Stok</DialogTitle>
            <div>
              <div id="printTable">
                <Table className="w-full mt-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                        ID Barang
                      </TableHead>
                      <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                        Nama
                      </TableHead>
                      <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                        Tipe
                      </TableHead>
                      <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                        Kuantitas
                      </TableHead>
                      <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                        unit
                      </TableHead>
                      <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                        Harga
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stock.map((stock, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="border-2 border-gray-300 p-2 text-center">
                            {stock.id_stuff}
                          </TableCell>
                          <TableCell className="border-2 border-gray-300 p-2 text-center">
                            {stock.name}
                          </TableCell>
                          <TableCell className="border-2 border-gray-300 p-2 text-center">
                            {stock.type}
                          </TableCell>
                          <TableCell className="border-2 border-gray-300 p-2 text-center">
                            {stock.quantity}
                          </TableCell>
                          <TableCell className="border-2 border-gray-300 p-2 text-center">
                            {stock.unit}
                          </TableCell>
                          <TableCell className="border-2 border-gray-300 p-2 text-center">
                            {stock.price.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  className="bg-c-dark-blue rounded-md px-3 text-white"
                  onClick={handleTapPrint}
                >
                  Cetak
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  useEffect(() => {
    checkToken();
    getStocks();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Laporan Stok</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Laporan Stok</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Laporan Stok
            </h3>
            <div className="flex justify-end items-center">
              <input
                type="search"
                className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cari barang"
                onChange={(e) => setSearch(e.target.value)}
              />
              <MagnifyingGlassIcon
                className="w-10 h-10 text-white bg-c-c-dark-blue rounded-md p-2 ml-2 cursor-pointer bg-blue-500"
                onClick={handleTapSearch}
              />
            </div>
            <Table className="w-full mt-4 ">
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
                {filteredStocks.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="border-2 border-gray-300 p-2"
                    >
                      Data tidak ditemukan
                    </TableCell>
                  </TableRow>
                )}
                {filteredStocks.map((stock, index) => (
                  <TableRow key={index}>
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      {getFormatDate(stock.date)}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      {handleTapDetail(stock.stocks)}
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

export default StockReport;
