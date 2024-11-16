import { CheckIcon, HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { getBaseUrl } from "@/helpers/api";
import axios from "axios";
import { OutletProps, UserProps } from "@/types/user";
import { useEffect, useState } from "react";
import { StuffProps } from "@/types/stuff";
import { cn } from "@/shadcn/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/shadcn/components/ui/command";
import { Button } from "@/shadcn/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import Swal from "sweetalert2";

const CreateOrder = () => {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const [outlet, setOutlet] = useState<OutletProps>();
  const [user, setUser] = useState<UserProps>();
  const [stocks, setStocks] = useState<StuffProps[]>([]);
  const [selectedStock, setSelectedStock] = useState<StuffProps>();

  const [openName, setOpenName] = useState(false);
  const [nameStuff, setNameStuff] = useState("");

  const [totalOrder, setTotalOrder] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

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
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSelectStuff = (stock: StuffProps) => {
    setSelectedStock(stock);
  };

  const fetchData = async () => {
    getUserProfile();
    getStocks();
  };

  const handleChangeTotalOrder = async (val: number) => {
    if (selectedStock) {
      setTotalOrder(val);
      handleTotalPayment(val);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pilih barang terlebih dahulu",
      });
    }
  };

  const handleTotalPayment = (val: number) => {
    setTotalPayment(val * (selectedStock?.price || 0));
  };

  const handleSaveOrder = () => {
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
  };

  const handleOrder = () => {
    const dateNowISO = new Date().toISOString();
    const payload = {
      outlet_id: outlet?.id,
      stock_id: selectedStock?.id,
      date_order: dateNowISO,
      total_paid: totalPayment,
      total_order: totalOrder,
      status: 0,
    };
    axios
      .post(`${getBaseUrl()}/order/stuff`, payload)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Pesanan berhasil disimpan",
        }).then(() => {
          window.location.href = "/dashboard";
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
            <div className="flex space-x-4 mt-4">
              <div className="flex-1">
                <label>Outlet</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-slate-50"
                  disabled
                  value={outlet?.name}
                />
              </div>
              <div className="flex-1">
                <label>Jumlah Orderan</label>
                <input
                  type="number"
                  onChange={(e) =>
                    handleChangeTotalOrder(parseInt(e.target.value))
                  }
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              {/* <div className="flex-1">
                <label>Jumlah Bayar</label>
                <input
                  disabled
                  value={totalPayment}
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-slate-50"
                />
              </div> */}
            </div>
            {/* <div className="w-full justify-end flex mt-4">
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleSaveOrder}
              >
                Simpan
              </button>
            </div> */}
            <div className="flex space-x-4 mt-4">
              <div className="flex-1 flex-col flex">
                <label>Nama Barang</label>
                {/* <input className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" /> */}
                <Popover open={openName} onOpenChange={setOpenName}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openName}
                      className="w-full justify-between h-11"
                    >
                      {nameStuff
                        ? stocks.find((stock) => stock.name === nameStuff)?.name
                        : "Pilih Barang..."}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>Tidak ada data</CommandEmpty>
                        <CommandGroup>
                          {stocks.map((stock) => (
                            <CommandItem
                              key={stock.id}
                              value={stock.name}
                              onSelect={(currentValue) => {
                                setNameStuff(
                                  currentValue === nameStuff ? "" : currentValue
                                );
                                handleSelectStuff(stock);
                                setOpenName(false);
                              }}
                            >
                              {stock.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  nameStuff === stock.name
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-1">
                <label>Harga Barang</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-slate-50"
                  value={selectedStock?.price}
                  disabled
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <div className="flex-1">
                <label>Jenis Barang</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-slate-50"
                  value={selectedStock?.type}
                  disabled
                />
              </div>
              <div className="flex-1">
                <label>Satuan Barang</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-slate-50"
                  value={selectedStock?.unit}
                  disabled
                />
              </div>
            </div>
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
