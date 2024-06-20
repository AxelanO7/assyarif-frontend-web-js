import { CheckIcon, HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { useState, useEffect } from "react";
import { getBaseUrl } from "../../helpers/api";
import { StuffProps } from "@/types/stuff";
import { OutletProps, UserProps } from "@/types/user";
import { Button } from "@/shadcn/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import { cn } from "@/shadcn/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@sc/components/ui/command";
import { Input } from "@/shadcn/components/ui/input";
import Swal from "sweetalert2";

const CreateReturn = () => {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const [outlet, setOutlet] = useState<OutletProps>();
  const [stocks, setStocks] = useState<StuffProps[]>([]);
  const [selectedStock, setSelectedStock] = useState<StuffProps>();
  const [openName, setOpenName] = useState(false);
  const [nameStuff, setNameStuff] = useState("");
  const [returnTotal, setReturnTotal] = useState(0);
  const reasons = [
    "Kurang",
    "Rusak",
    "Kadaluarsa",
    "Salah Kirim",
    "Salah Pesan",
    "Lainnya",
  ];
  const [selectedReason, setSelectedReason] = useState("");
  const [proof, setProof] = useState<File>();

  const submit = () => {
    const payload = {
      outlet_id: outlet?.id,
      stock_id: selectedStock?.id,
      total_return: returnTotal,
      reason: selectedReason,
      proof: proof?.name,
    };
    axios
      .post(`${getBaseUrl()}/return/private/stuff`, payload)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data berhasil disimpan",
        });
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const handleChangeReturnTotal = (value: number) => {
    if (value > selectedStock!.quantity) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Jumlah return melebihi jumlah barang, hanya ${selectedStock?.quantity} yang tersedia`,
      });
      return;
    }
    setReturnTotal(value);
  };

  useEffect(() => {
    getUserProfile();
    getStocks();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Return</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Return</p>
          {/* <p className="ml-2 font-semibold">{">"}</p>
          <p className="ml-2 font-semibold">Tambah Barang</p> */}
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-semibold text-gray-500">Return</h3>
              <h6 className="font-semibold text-lg py-1">{dateNow}</h6>
            </div>
            <div className="flex space-x-4 mt-4">
              {/* outlet */}
              <div>
                <label>Outlet</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                  value={outlet?.name}
                />
              </div>
              {/* total return */}
              <div>
                <label>Jumlah Return</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  type="number"
                  // onChange={(e) => setReturnTotal(parseInt(e.target.value))}
                  onChange={(e) =>
                    handleChangeReturnTotal(parseInt(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              {/* stuff */}
              <div>
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
              {/* reason */}
              <div>
                <label>Alasan</label>
                <select
                  className="border-2 rounded-md  flex bg-white w-full h-11 px-2"
                  onChange={(e) => setSelectedReason(e.target.value)}
                >
                  {reasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* bukti return */}
            <div className="mt-4 flex flex-col">
              <p>Upload Bukti</p>
              <Input
                type="file"
                className="w-max"
                onChange={(e) => setProof(e.target.files![0])}
              />
            </div>
            <div className="flex justify-end w-full">
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
                onClick={submit}
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

export default CreateReturn;
