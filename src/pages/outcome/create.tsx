import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getBaseUrl } from "../../helpers/api";
import { OrderProps } from "@/types/stuff";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/shadcn/components/ui/table";

const CreateOutcome = () => {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const [idLastNumber, setIdLastNumber] = useState("");
  const [totalPay, setTotalPay] = useState(0);
  const [,] = useState(0);
  const [returnMoney] = useState(0);

  const [orders, setOrders] = useState<OrderProps[]>();
  const [selectedOrder, setSelectedOrder] = useState<OrderProps>();

  const getOutLast = () => {
    axios
      .get(`${getBaseUrl()}/stuff/last/out`)
      .then((res) => {
        const resLastNumber = res.data.data;
        const withPrefixZero = (num: number) => {
          return num.toString().padStart(4, "0");
        };
        const finalNumber = `OUT-${withPrefixZero(resLastNumber + 1)}`;
        setIdLastNumber(finalNumber);
      })
      .catch((err) => {
        console.log(err);
        const errStatus = err.response.data.status;
        if (errStatus === 400) {
          setIdLastNumber("OUT-0001");
        }
      });
  };

  const getOrders = () => {
    axios
      .get(`${getBaseUrl()}/order/stuff`)
      .then(async (res) => {
        console.log(res.data);
        const resData: OrderProps[] = res.data.data;
        setOrders(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitOut = () => {
    const idLast = idLastNumber.toString().split("-")[1];
    const idFinal = parseInt(idLast);

    const data = {
      out_id: idFinal,
      order_id: selectedOrder?.id,
      total_paided: totalPay,
      return_cash: returnMoney,
    };

    axios
      .post(`${getBaseUrl()}/stuff/out`, data)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data berhasil disimpan",
        });
        // window.location.href = "/out";
        increaseDashboardOutlet();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const increaseDashboardOutlet = () => {
    const payload = {
      id_stuff: selectedOrder?.stock.id_stuff,
      id_outlet: selectedOrder?.outlet.id,
      name: selectedOrder?.stock.name,
      type: selectedOrder?.stock.type,
      quantity: selectedOrder?.total_order,
      unit: selectedOrder?.stock.unit,
      price: selectedOrder?.stock.price,
    };

    axios
      .post(`${getBaseUrl()}/stock_outlet/private/increase-dashboard`, payload)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data berhasil disimpan",
        });
        window.location.href = "/out";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleSumReturnMoney = () => {
  //   const totalPayed = totalPay;
  //   const totalMoney = selectedOrder?.total_paid || 0;
  //   const result = totalPayed - totalMoney;
  //   if (result < 0) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Tidak ada uang kembalian",
  //     });
  //     return;
  //   }
  //   setReturnMoney(result);
  // };

  useEffect(() => {
    getOutLast();
    getOrders();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Barang Keluar</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Barang Keluar</p>
          <p className="ml-2 font-semibold">{">"}</p>
          <p className="ml-2 font-semibold">Tambah Barang</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-semibold text-gray-500">
                Barang Keluar
              </h3>
              <h6 className="font-semibold text-lg py-1">{dateNow}</h6>
            </div>
            {/* <div className="flex space-x-4 mt-4">
              <div>
                <label>Id Pemesanan</label>
                <select
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-white"
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const selectedOrder = orders?.find(
                      (order) => order.id.toString() === selectedId
                    );
                    setSelectedOrder(selectedOrder);
                  }}
                >
                  {orders?.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.id}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Nama Outlet</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  value={selectedOrder?.outlet.name}
                  disabled
                />
              </div>
              <div>
                <label>Total</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                  value={selectedOrder?.total_paid}
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <div>
                <label>Jumlah Barang</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                  value={selectedOrder?.total_order}
                />
              </div>
              <div>
                <label>Bayar</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  onChange={(e) => setTotalPay(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label>Kembalian</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                  value={returnMoney}
                />
              </div>
            </div> */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Id Pemesanan
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Nama Outlet
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Total
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Jumlah Barang
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
                <TableRow>
                  <TableCell className="border-2 border-gray-300 p-2 text-center">
                    <select
                      className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-white"
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const selectedOrder = orders?.find(
                          (order) => order.id.toString() === selectedId
                        );
                        setSelectedOrder(selectedOrder);
                      }}
                    >
                      {orders?.map((order) => (
                        <option key={order.id} value={order.id}>
                          {order.id}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell className="border-2 border-gray-300 p-2 text-center">
                    {selectedOrder?.outlet.name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-300 p-2 text-center">
                    {selectedOrder?.total_paid}
                  </TableCell>
                  <TableCell className="border-2 border-gray-300 p-2 text-center">
                    {selectedOrder?.total_order}
                  </TableCell>
                  <TableCell className="border-2 border-gray-300 p-2 text-center">
                    <input
                      className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      onChange={(e) => setTotalPay(parseInt(e.target.value))}
                    />
                  </TableCell>
                  <TableCell className="border-2 border-gray-300 p-2 text-center">
                    {((selectedOrder?.total_paid ?? 0) - totalPay)
                      .toString()
                      .replace("-", "") || 0}
                    {/* {returnMoney} */}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="w-full justify-end flex mt-4 space-x-4">
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={submitOut}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default CreateOutcome;
