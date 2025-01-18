import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getBaseUrl } from "../../helpers/api";
import { OrderProps, StuffProps } from "@/types/stuff";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/shadcn/components/ui/table";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import { Input } from "@/shadcn/components/ui/input";

export interface CreateOutcomeProps {
  orders: OrderProps;
  totalPay: number;
  returnMoney: number;
}

export interface CreateOutcomePayload {
  out_id: number;
  order_id: number;
  total_paided: number;
  return_cash: number;
}

export interface CreateStockOutletPayload {
  id_stuff: number;
  id_out: number;
  id_outlet: number;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  price: number;
}

const CreateOutcome = () => {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const [idLastNumber, setIdLastNumber] = useState("");
  // const [totalPay, setTotalPay] = useState(0);
  const [,] = useState(0);
  // const [returnMoney] = useState(0);

  const [, setOrders] = useState<OrderProps[]>();
  const [finalOrders, setFinalOrders] = useState<CreateOutcomeProps[]>([]);
  const [listSelectedOrder, setListSelectedOrder] = useState<
    CreateOutcomeProps[]
  >([]);

  // const [selectedOrder, setSelectedOrder] = useState<OrderProps>();

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
        const finalData: CreateOutcomeProps[] = resData.map((item) => {
          return {
            orders: item,
            totalPay: 0,
            returnMoney: 0,
          };
        });
        setFinalOrders(finalData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitOut = () => {
    // const idLast = idLastNumber.toString().split("-")[1];
    // const idFinal = parseInt(idLast);

    // const data = {
    //   out_id: idFinal,
    //   order_id: selectedOrder?.id,
    //   total_paided: totalPay,
    //   return_cash: returnMoney,
    // };

    // axios
    //   .post(`${getBaseUrl()}/stuff/out`, data)
    //   .then((res) => {
    //     console.log(res);
    //     Swal.fire({
    //       icon: "success",
    //       title: "Success",
    //       text: "Data berhasil disimpan",
    //     });
    //     // window.location.href = "/out";
    //     increaseDashboardOutlet();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const idLast = idLastNumber.toString().split("-")[1];
    const idFinal = parseInt(idLast);
    const listSelectedOrderLength = listSelectedOrder.length;
    const listIdFinal: number[] = [];
    for (let i = 0; i < listSelectedOrderLength; i++) {
      listIdFinal.push(idFinal + i);
    }

    const data: CreateOutcomePayload[] = listSelectedOrder.map(
      (item, index) => {
        return {
          out_id: listIdFinal[index],
          order_id: item.orders.id,
          total_paided: item.totalPay,
          return_cash: item.returnMoney,
        };
      }
    );

    axios
      .post(`${getBaseUrl()}/stuff/out/multiple`, data)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data berhasil disimpan",
        });
        increaseDashboardOutlet(data);
        const payloadStock: StuffProps[] = listSelectedOrder.map((item) => {
          return {
            id: item.orders.stock.id,
            id_stuff: item.orders.stock.id_stuff,
            name: item.orders.stock.name,
            type: item.orders.stock.type,
            quantity: item.orders.total_order,
            unit: item.orders.stock.unit,
            price: item.orders.stock.price,
            created_at: item.orders.stock.created_at,
            updated_at: item.orders.stock.updated_at,
            deleted_at: item.orders.stock.deleted_at,
          };
        });
        decreaseDashboard(payloadStock);
        handleDeleteOrders();
        getOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const increaseDashboardOutlet = (data: CreateOutcomePayload[]) => {
    // const payload = {
    //   orders: listSelectedOrder,
    // };

    // axios
    //   .post(`${getBaseUrl()}/stock_outlet/private/increase-dashboard`, payload)
    //   .then((res) => {
    //     console.log(res);
    //     Swal.fire({
    //       icon: "success",
    //       title: "Success",
    //       text: "Data berhasil disimpan",
    //     });
    //     window.location.href = "/out";
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const prePayload: CreateStockOutletPayload[] = listSelectedOrder.map(
      (item, index) => {
        return {
          id_stuff: item.orders.stock_id,
          id_out: data[index].out_id,
          id_outlet: parseInt(item.orders.outlet.id),
          name: item.orders.stock.name,
          type: item.orders.stock.type,
          quantity: item.orders.total_order,
          unit: item.orders.stock.unit,
          price: item.orders.stock.price,
        };
      }
    );

    const payload = {
      // orders: listSelectedOrder,
      orders: prePayload,
    };

    axios
      .post(
        `${getBaseUrl()}/stock_outlet/private/increase-dashboard/multiple`,
        payload
      )
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data berhasil disimpan",
        });
        // window.location.href = "/out";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const decreaseDashboard = (data: StuffProps[]) => {
    try {
      axios
        .put(
          `${getBaseUrl()}/stock/private/stuff/decrease-dashboard/multiple`,
          data
        )
        .then((res) => {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Data berhasil disimpan",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
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

  const handleDeleteOrders = async () => {
    const newFinalOrders = [];
    for (let i = 0; i < finalOrders.length; i++) {
      if (listSelectedOrder.includes(finalOrders[i])) {
        newFinalOrders.push(finalOrders[i].orders.id);
      }
    }
    try {
      axios.delete(`${getBaseUrl()}/order/stuff/multiple/delete`, {
        data: newFinalOrders,
      });
    } catch (error) {
      console.log("error delete orders", error);
    }
  };

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
                    Nama Barang
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
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finalOrders?.map((order) => (
                  <TableRow key={order.orders.id}>
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      {order.orders.id}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      {order.orders.outlet.name}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      {order.orders.stock.name}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      {order.orders.total_paid}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      {order.orders.total_order}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      <Input
                        min={0}
                        type="number"
                        disabled={
                          !listSelectedOrder.some(
                            (item) => item.orders.id === order.orders.id
                          )
                        }
                        onChange={(value) => {
                          const newOrder = {
                            ...order,
                            totalPay: parseInt(value.target.value),
                            returnMoney:
                              parseInt(value.target.value) -
                                order.orders.total_paid <
                              0
                                ? 0
                                : parseInt(value.target.value) -
                                  order.orders.total_paid,
                          };
                          const newFinalOrders = finalOrders.map((item) => {
                            if (item.orders.id === order.orders.id) {
                              listSelectedOrder.includes(item) &&
                                setListSelectedOrder([
                                  ...listSelectedOrder.filter(
                                    (item) => item.orders.id !== order.orders.id
                                  ),
                                  newOrder,
                                ]);
                              return newOrder;
                            }
                            return item;
                          });
                          setFinalOrders(newFinalOrders);
                        }}
                      />
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      {order.returnMoney || 0}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      <Checkbox
                        onCheckedChange={(value) => {
                          if (value) {
                            setListSelectedOrder([...listSelectedOrder, order]);
                          } else {
                            const newListSelectedOrder =
                              listSelectedOrder.filter(
                                (item) => item.orders.id !== order.orders.id
                              );
                            setListSelectedOrder(newListSelectedOrder);
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
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
