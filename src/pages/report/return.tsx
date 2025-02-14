import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { useEffect, useState } from "react";
import axios from "axios";
import { PeriodRetur, Retur } from "@/types/stuff";
import { getBaseUrl } from "@/helpers/api";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { Button } from "@nextui-org/button";
import { Table } from "lucide-react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";

const ReturnReport = () => {
  const getReturns = () => {
    axios
      .get(`${getBaseUrl()}/return/period`)
      .then((res) => {
        console.log(res.data);
        const data: PeriodRetur[] = res.data.data;
        setReturns(data);
        setOriginalReturns(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [returns, setReturns] = useState<PeriodRetur[]>();
  const [originalReturns, setOriginalReturns] = useState<PeriodRetur[]>();
  const [search, setSearch] = useState("");

  const handleTapSearch = () => {
    const filtered = originalReturns?.filter((retur) => {
      return retur.date.toLowerCase().includes(search.toLowerCase());
    });
    setReturns(filtered);
  };

  const handleTapDetail = (retur: Retur[]) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-c-dark-blue rounded-md px-3 text-white">
            Detail
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Detail Retur</DialogTitle>
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
                        Nama
                      </TableHead>
                      <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                        Alasan
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {retur?.map((retur, index) => (
                      <TableRow key={index}>
                        <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                          {retur.outlet.name}
                        </TableCell>
                        <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                          {retur.stock.name}
                        </TableCell>
                        <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                          {retur.total_return}
                        </TableCell>
                        <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                          {retur.reason}
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

  useEffect(() => {
    getReturns();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Laporan Retur</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Laporan Retur</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Laporan Retur
            </h3>
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
            <table className="w-full mt-4">
              <thead>
                <tr className="bg-gray-300">
                  <th className="py-2 border border-gray-400 w-16">No</th>
                  <th className="py-2 border border-gray-400">Tanggal</th>
                  <th className="py-2 border border-gray-400 w-32">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {returns?.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center border border-gray-400 py-2"
                    >
                      No data
                    </td>
                  </tr>
                )}
                {returns?.map((retur, index) => (
                  <tr key={index} className="text-center">
                    <td className="py-2 border border-gray-400">{index + 1}</td>
                    <td className="py-2 border border-gray-400">
                      {retur.date}
                    </td>
                    <td className="py-2 border border-gray-400">
                      {handleTapDetail(retur.rtrs)}
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

export default ReturnReport;
