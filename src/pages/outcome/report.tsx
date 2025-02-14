import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { useEffect, useState } from "react";
import { getBaseUrl } from "../../helpers/api";
import { Out, PeriodOut } from "../../types/stuff";
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
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { getFormatDate } from "@/helpers/date";

const ReportOutcome = () => {
  const [outs, setOuts] = useState<PeriodOut[]>([]);
  const [filteredOuts, setFilteredOuts] = useState<PeriodOut[]>([]);
  const [search, setSearch] = useState("");

  const baseUrl = () => {
    return getBaseUrl();
  };

  const getOuts = () => {
    axios
      .get(`${baseUrl()}/stuff/period/out`)
      .then((res) => {
        console.log(res.data);
        const data: PeriodOut[] = res.data.data;
        setOuts(data);
        setFilteredOuts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTapSearch = () => {
    const filtered = outs.filter((out) => {
      return out.date.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredOuts(filtered);
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

  const handleTapDetail = (outs: Out[]) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-c-dark-blue rounded-md px-3 text-white">
            Detail
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Detail Barang Keluar</DialogTitle>
            <div>
              <div id="printTable">
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
                    {outs.map((out, index) => (
                      <TableRow key={index}>
                        <TableCell className="border-2 border-gray-300 p-2 text-center">
                          {index++}
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
    getOuts();
  }, []);
  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Laporan Barang Keluar</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Laporan Barang Keluar</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Laporan Barang Keluar
            </h3>
            <div className="flex justify-end mt-4">
              <div className="flex items-center">
                <input
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
                {filteredOuts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="border-2 border-gray-300 p-2 text-center"
                    >
                      Data tidak ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOuts.map((out, index) => (
                    <TableRow>
                      <TableCell className="border-2 border-gray-300 p-2 text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-center">
                        {getFormatDate(out.date)}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-center">
                        {handleTapDetail(out.outs)}
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

export default ReportOutcome;
function useReactToPrint(arg0: {
  content: () => any;
  pageStyle: string;
  documentTitle: string;
  onAfterPrint: () => void;
}) {
  throw new Error("Function not implemented.");
}
