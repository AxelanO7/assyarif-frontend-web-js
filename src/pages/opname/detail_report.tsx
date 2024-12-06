import { useEffect, useState } from "react";
import BaseLayout from "../../layouts/base";
import { getBaseUrl } from "@/helpers/api";
import axios from "axios";
import { OutProps, ResOpname, ReturProps, StuffProps } from "@/types/stuff";
import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
} from "@nextui-org/table";

const DetailReportOpname = () => {
  const startDate = window.location.href.split("/")[4];
  const endDate = window.location.href.split("/")[5];

  const [stuffs, setStuffs] = useState<StuffProps[]>([]);

  const getMonth = () => {
    const startDateMonth = new Date(startDate).getMonth();
    const endDateMonth = new Date(endDate).getMonth();
    const monthList = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    if (startDateMonth === endDateMonth) {
      return monthList[startDateMonth];
    } else {
      return `${monthList[startDateMonth]} - ${monthList[endDateMonth]}`;
    }
  };

  const getOpnameByDate = async () => {
    const startDate = window.location.href.split("/")[4];
    const endDate = window.location.href.split("/")[5];
    axios
      .post(`${getBaseUrl()}/opname/private/date`, {
        start_date: startDate,
        end_date: endDate,
      })
      .then((res) => {
        console.log(res.data);
        countProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const countProduct = async (resp: ResOpname) => {
    const inc: StuffProps[] = resp.in || [];
    const out: OutProps[] = resp.out || [];
    const retur: ReturProps[] = resp.rtr || [];

    for (let i = 0; i < inc.length; i++) {
      let total = inc[i].quantity;
      for (let j = 0; j < out.length; j++) {
        if (inc[i].id_stuff === out[j].order.stock.id_stuff) {
          total -= out[j].order.total_order;
        }
      }
      for (let k = 0; k < retur.length; k++) {
        if (inc[i].id_stuff === retur[k].stock.id_stuff) {
          total += retur[k].total_return;
        }
      }
      inc[i].quantity = total;
    }
    setStuffs(inc);
  };

  const fetchData = async () => {
    getOpnameByDate();
    getMonth();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BaseLayout>
        <div className="flex flex-col bg-gray-100 rounded-md shadow-md m-6 text-center">
          <h1 className="text-3xl font-semibold">
            Laporan Stock Opname Bulan {getMonth()}
          </h1>
          <h1>
            {"Tanggal, "}
            {startDate} - {endDate}
          </h1>
          <h6 className="font-semibold text-lg py-1">TOKO ASSYARIF</h6>
          {stuffs.length === 0 ? (
            <h1 className="text-2xl font-semibold mt-8">Tidak ada data</h1>
          ) : (
            // <table className="m-8 border border-gray-400">
            //   {stuffs.map((product, index) => (
            //     <tr
            //       key={index}
            //       className={index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}
            //     >
            //       <td className="p-2">
            //         Nama Barang: {product.name} <br />
            //         Jumlah Barang: {product.quantity} {product.unit} <br />
            //       </td>
            //     </tr>
            //   ))}
            // </table>

            <Table className="w-full mt-4">
              <TableHeader>
                <TableColumn className="border-2 border-gray-300 p-2 text-black text-center w-20">
                  ID
                </TableColumn>
                <TableColumn className="border-2 border-gray-300 p-2 text-black text-center">
                  Nama
                </TableColumn>
                <TableColumn className="border-2 border-gray-300 p-2 text-black text-center">
                  Jenis
                </TableColumn>
                <TableColumn className="border-2 border-gray-300 p-2 text-black text-center">
                  Satuan
                </TableColumn>
                <TableColumn className="border-2 border-gray-300 p-2 text-black text-center">
                  Jumlah
                </TableColumn>
              </TableHeader>
              <TableBody>
                {stuffs.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                      {product.id_stuff}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                      {product.name}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                      {product.type}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                      {product.unit}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-black text-center">
                      {product.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </BaseLayout>
    </>
  );
};

export default DetailReportOpname;
