import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { getBaseUrl } from "@/helpers/api";
import axios from "axios";
import { OutletProps, UserProps } from "@/types/user";
import { useEffect, useState } from "react";
import { StuffProps } from "@/types/stuff";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import { Input } from "@/shadcn/components/ui/input";

const CreateOrder = () => {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const [outlet, setOutlet] = useState<OutletProps>();
  const [, setUser] = useState<UserProps>();
  const [stocks, setStocks] = useState<StuffProps[]>([]);
  const [finalStocks, setFinalStocks] = useState<StuffProps[]>([]);
  // const [selectedStock, setSelectedStock] = useState<StuffProps>();
  const [listSelectedStock, setListSelectedStock] = useState<StuffProps[]>([]);

  // const [openName, setOpenName] = useState(false);
  // const [nameStuff, setNameStuff] = useState("");

  // const [totalOrder, setTotalOrder] = useState(0);
  // const [totalPayment, setTotalPayment] = useState(0);

  const getOutletByIDUser = ({ id }: { id: string }) => {
    axios
      .get(`${getBaseUrl()}/outlet/private/user/${id}`)
      .then((res) => {
        console.log(res.data);
        const dataRes = res.data.data;
        setOutlet(dataRes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getUserProfile = () => {
    axios
      .get(`${getBaseUrl()}/user/private/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const dataRes: UserProps = res.data.data;
        getOutletByIDUser({ id: dataRes.id });
        setUser(dataRes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getStocks = () => {
    axios
      .get(`${getBaseUrl()}/stock/private/stuff`)
      .then((res) => {
        console.log(res.data);
        const dataRes: StuffProps[] = res.data.data;
        setStocks(dataRes);
        setFinalStocks(dataRes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const handleSelectStuff = (stock: StuffProps) => {
  //   setSelectedStock(stock);
  // };

  const handleToggleCheckbox = ({
    stock,
    value,
  }: {
    stock: StuffProps;
    value: boolean;
  }) => {
    if (value) {
      setListSelectedStock([...listSelectedStock, stock]);
    } else {
      setListSelectedStock(
        listSelectedStock.filter((stock) => stock.id !== stock.id)
      );
    }
  };

  const fetchData = async () => {
    getUserProfile();
    getStocks();
  };

  // const handleChangeTotalOrder = async (val: number) => {
  //   if (selectedStock) {
  //     setTotalOrder(val);
  //     handleTotalPayment(val);
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Pilih barang terlebih dahulu",
  //     });
  //   }
  // };

  // const handleTotalPayment = (val: number) => {
  //   setTotalPayment(val * (selectedStock?.price || 0));
  // };

  // const handleSaveOrder = () => {
  // const payload = {
  //   outlet_id: outlet?.id,
  //   stock_id: selectedStock?.id,
  //   date_order: Date.now(),
  //   total_paid: totalPayment,
  //   total_order: totalOrder,
  //   status: 0,
  // };
  // set localStorage list order
  // const orderList = localStorage.getItem("order");
  // if (orderList) {
  //   localStorage.setItem(
  //     "order",
  //     JSON.stringify([...JSON.parse(orderList), order])
  //   );
  // } else {
  //   localStorage.setItem("order", JSON.stringify([order]));
  // }
  // Swal.fire({
  //   icon: "success",
  //   title: "Berhasil",
  //   text: "Pesanan berhasil disimpan",
  // });
  // window.location.reload();
  // resetState();
  // };

  const handleOrder = () => {
    // const dateNowISO = new Date().toISOString();
    // const payload = {
    //   outlet_id: outlet?.id,
    //   stock_id: selectedStock?.id,
    //   date_order: dateNowISO,
    //   total_paid: totalPayment,
    //   total_order: totalOrder,
    //   status: 0,
    // };
    // axios
    //   .post(`${getBaseUrl()}/order/stuff`, payload)
    //   .then((res) => {
    //     console.log(res.data);
    //     Swal.fire({
    //       icon: "success",
    //       title: "Berhasil",
    //       text: "Pesanan berhasil disimpan",
    //     }).then(() => {
    //       window.location.href = "/dashboard";
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Gagal menyimpan pesanan",
    //     });
    //   });

    // const payload = listSelectedStock.map((item) => {
    //   return {
    //     outlet_id: outlet?.id,
    //     stock_id: item.id,
    //     date_order: Date.now(),
    //     total_paid: item.price * item.quantity,
    //     total_order: item.quantity,
    //     status: 0,
    //   };
    // });

    const payload: any[] = [];
    listSelectedStock.forEach((item) => {
      finalStocks.forEach((stock) => {
        if (stock.id === item.id) {
          payload.push({
            outlet_id: outlet?.id,
            stock_id: item.id,
            date_order: Date.now(),
            total_paid: item.price * item.quantity,
            total_order: stock.quantity,
            status: 0,
          });
        }
      });
    });

    // const payload = finalStocks.map((item) => {
    //   listSelectedStock.includes(item) &&
    //     console.log("item", item) &&
    //     console.log("listSelectedStock", listSelectedStock);
    //   return {
    //     outlet_id: outlet?.id,
    //     stock_id: item.id,
    //     date_order: Date.now(),
    //     total_paid: item.price * item.quantity,
    //     total_order: item.quantity,
    //     status: 0,
    //   };
    // });

    // adjust final stock from listSelectedStock only quantity
    // const payload = listSelectedStock.map((item) => {
    //   finalStocks.map((stock) => {
    //     if (stock.id === item.id) {
    //       return {
    //         outlet_id: outlet?.id,
    //         stock_id: item.id,
    //         date_order: Date.now(),
    //         total_paid: item.price * item.quantity,
    //         total_order: stock.quantity,
    //         status: 0,
    //       };
    //     }
    //     return stock;
    //   });
    // });

    axios
      .post(`${getBaseUrl()}/order/stuff/multiple`, payload)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Pesanan berhasil disimpan",
        }).then(() => {
          // window.location.href = "/dashboard";
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal menyimpan pesanan",
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Pesan Barang</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Pesan Barang</p>
          <p className="ml-2 font-semibold">{">"}</p>
          <p className="ml-2 font-semibold">Order</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-semibold text-gray-500">
                Pesan Barang
              </h3>
              <h6 className="font-semibold text-lg py-1">{dateNow}</h6>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    ID Barang
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Nama
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Jenis
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Jumlah
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Satuan
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Harga
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finalStocks.map((stock) => (
                  <TableRow key={stock.id}>
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
                      {/* TODO: Add validation greater than quantity */}
                      <Input
                        type="number"
                        className="border-2 border-gray-300 p-2 text-center"
                        defaultValue={stock.quantity}
                        min={0}
                        max={
                          stocks.find((item) => item.id === stock.id)?.quantity
                        }
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          const newStocks = finalStocks.map((item) => {
                            if (item.id === stock.id) {
                              listSelectedStock.includes(stock) &&
                                setListSelectedStock(
                                  listSelectedStock.map((item) => {
                                    if (item.id === stock.id) {
                                      return { ...item, quantity: value };
                                    }
                                    return item;
                                  })
                                );
                              return { ...item, quantity: value };
                            }
                            return item;
                          });
                          setFinalStocks(newStocks);
                        }}
                        disabled={
                          !listSelectedStock.some(
                            (item) => item.id === stock.id
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      {stock.unit}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      {stock.price}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      <Checkbox
                        onCheckedChange={(value) =>
                          handleToggleCheckbox({ stock, value: !!value })
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="w-full justify-end flex mt-4">
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleOrder}
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default CreateOrder;
