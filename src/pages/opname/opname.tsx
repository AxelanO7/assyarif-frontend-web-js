import {
  HomeIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "@/helpers/api";
import { Stuff } from "@/types/stuff";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import BaseLayout from "@/layouts/base";
import { Input } from "@/shadcn/components/ui/input";
import { EmptyDataTable } from "@/components/table";

const Opname = () => {
  const [stocks, setStocks] = useState<Stuff[]>([]);
  const [stocksTemp, setStocksTemp] = useState<Stuff[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stuff[]>([]);
  const [search, setSearch] = useState("");
  const [, setDate] = useState("");

  const getStocks = () => {
    const role = localStorage.getItem("role");
    axios
      .get(
        `${getBaseUrl()}/${
          role === "supplier" ? "stock" : "stock_outlet"
        }/private/stuff`
      )
      .then((res) => {
        console.log(res.data);
        const data: Stuff[] = res.data.data;
        setFilteredStocks(data);
        setStocksTemp(data);
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
      return stock.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredStocks(filtered);
  };

  const handleFilterDate = (
    date: string = new Date().toISOString().split("T")[0]
  ) => {
    setDate(date);
    const filtered = stocks.filter((stock) => {
      return (
        stock.created_at && stock.created_at.toString().split("T")[0] === date
      );
    });
    setFilteredStocks(filtered);
  };

  const resetFilteredStocks = () => {
    setFilteredStocks(stocks);
  };

  const handleTapSave = () => {
    const payload = stocksTemp.map((stock) => {
      return {
        id: stock.id_stuff,
        description: stock?.description || "",
      };
    });
    console.log(payload);
    try {
      axios.put(
        `${getBaseUrl()}/stock/private/stuff/update-description/multiple`,
        payload
      );
      alert("Data berhasil disimpan");
      getStocks();
    } catch (err) {
      console.log(err);
      alert("Data gagal disimpan");
    }
  };

  useEffect(() => {
    checkToken();
    getStocks();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Dashboard</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Dashboard</p>
        </div>
        <div className="px-6">
          <div className="flex items-center mt-6">
            <input
              type="date"
              className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                handleFilterDate(e.target.value);
              }}
            />
            <XMarkIcon
              className="w-10 h-10 text-white bg-c-c-dark-blue rounded-md p-2 ml-2 cursor-pointer bg-red-500"
              onClick={resetFilteredStocks}
            />
          </div>
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Stok Barang
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
                    Keterangan
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStocks.length === 0 && (
                  <EmptyDataTable columnSpan={7} />
                )}
                {filteredStocks.map((stock) => (
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
                    <TableCell className="border-2 border-gray-300 p-2 text-center">
                      <Input
                        type="text"
                        defaultValue={stock.description}
                        onChange={(e) => {
                          setStocksTemp((prev) =>
                            prev.map((prevStock) => {
                              if (prevStock.id_stuff === stock.id_stuff) {
                                return {
                                  ...prevStock,
                                  description: e.target.value,
                                };
                              }
                              return prevStock;
                            })
                          );
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
                onClick={handleTapSave}
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

export default Opname;
