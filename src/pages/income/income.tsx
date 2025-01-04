import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { getBaseUrl } from "../../helpers/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { StuffProps } from "../../types/stuff";
import Swal from "sweetalert2";
import { PencilIcon } from "@heroicons/react/16/solid";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { Input } from "@/shadcn/components/ui/input";
import { Button } from "@nextui-org/button";
import { resourceUsage } from "process";

const Income = () => {
  const [stocks, setStocks] = useState<StuffProps[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StuffProps[]>([]);
  const [search, setSearch] = useState("");

  const baseUrl = () => {
    return getBaseUrl();
  };

  const getIns = () => {
    axios
      .get(`${baseUrl()}/stuff/in`)
      .then((res) => {
        console.log(res.data);
        const data: StuffProps[] = res.data.data;
        setStocks(data);
        setFilteredStocks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTapSearch = () => {
    const filtered = stocks.filter((stock) => {
      return stock.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredStocks(filtered);
  };

  const addIn = () => {
    window.location.href = "/in/add";
  };

  const editIn = (id: number) => {
    window.location.href = `/in/${id}`;
  };

  const increaseDashboard = () => {
    try {
      console.log("filteredStocks", filteredStocks);
      console.log("stocks", stocks);
      const payload = filteredStocks.map((item) => {
        const stock = stocks.find((stock) => stock.id === item.id);
        if (stock?.quantity !== item.quantity) {
          return {
            id: item.id,
            id_stuff: item.id_stuff,
            name: item.name,
            type: item.type,
            quantity: item.quantity,
            unit: item.unit,
            price: item.price,
            id_out: item.id_out,
            description: item.description,
            created_at: item.created_at,
            updated_at: item.updated_at,
            deleted_at: item.deleted_at,
          };
        }
      });
      payload.forEach((item) => {
        if (item === undefined) {
          const index = payload.indexOf(item);
          payload.splice(index, 1);
        }
      });
      console.log("payload", payload);
      // const payload = filteredStocks.map((item) => {
      // stocks.forEach((stock) => {
      //   if (stock.quantity !== item.quantity) {
      //     console.log("stock", stock.quantity + " item", item.quantity);
      //     return {
      //       id: item.id,
      //       id_stuff: item.id_stuff,
      //       name: item.name,
      //       type: item.type,
      //       quantity: item.quantity,
      //       unit: item.unit,
      //       price: item.price,
      //       id_out: item.id_out,
      //       description: item.description,
      //       created_at: item.created_at,
      //       updated_at: item.updated_at,
      //       deleted_at: item.deleted_at,
      //     };
      //   }
      // });
      //   stocks.map((stock) => {
      //     if (stock.quantity !== item.quantity) {
      //       console.log("stock", stock.quantity + " item", item.quantity);
      //       return {
      //         id: item.id,
      //         id_stuff: item.id_stuff,
      //         name: item.name,
      //         type: item.type,
      //         quantity: item.quantity,
      //         unit: item.unit,
      //         price: item.price,
      //         id_out: item.id_out,
      //         description: item.description,
      //         created_at: item.created_at,
      //         updated_at: item.updated_at,
      //         deleted_at: item.deleted_at,
      //       };
      //     }
      //   });
      // });
      // console.log(payload);
      axios
        .put(
          `${getBaseUrl()}/stock/private/stuff/increase-dashboard/multiple`,
          payload
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

  const handleTapDetail = async (id: number) => {
    await axios
      .get(`${baseUrl()}/stuff/in/${id}`)
      .then((res) => {
        console.log(res.data);
        const data: StuffProps = res.data.data;
        Swal.fire({
          title: "Detail Barang",
          html: `
            <div class="text-left">
              <p><span class="font-semibold">ID Barang:</span> ${
                data.id_stuff
              }</p>
              <p><span class="font-semibold">Nama:</span> ${data.name}</p>
              <p><span class="font-semibold">Jenis:</span> ${data.type}</p>
              <p><span class="font-semibold">Jumlah:</span> ${data.quantity}</p>
              <p><span class="font-semibold">Satuan:</span> ${data.unit}</p>
              <p><span class="font-semibold">Harga:</span> ${data.price.toLocaleString(
                "id-ID",
                {
                  style: "currency",
                  currency: "IDR",
                }
              )}</p>
            </div>
          `,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            console.log("OK");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteIn = (id: number) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStuff(id);
      }
    });
  };

  const deleteStuff = (id: number) => {
    axios
      .delete(`${baseUrl()}/stuff/in/${id}`)
      .then((res) => {
        Swal.fire("Berhasil!", "Data berhasil dihapus.", "success");
        getIns();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Gagal!", "Data gagal dihapus.", "error");
      });
  };

  useEffect(() => {
    getIns();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Barang Masuk</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Barang Masuk</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Barang Masuk
            </h3>
            <div className="flex justify-between mt-4">
              <div className="flex space-x-4 text-base font-semibold text-white">
                <button
                  className="bg-c-dark-blue rounded-md px-3"
                  onClick={addIn}
                >
                  Tambah Barang
                </button>
                {/* <button className="bg-c-yellow rounded-md px-3">
                  Cetak Laporan
                </button> */}
              </div>
              <div className="flex items-center">
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
            </div>
            <Table className="w-full mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center w-20">
                    ID
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Tanggal
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Nama
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Jenis
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Satuan
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center w-32">
                    Quantity
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2 text-black text-center">
                    Total
                  </TableHead>
                  {/* <TableHead className="border-2 border-gray-300 p-2 text-black text-center w-24">
                    Aksi
                  </TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStocks.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="border-2 border-gray-300 p-2"
                    >
                      Data tidak ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStocks.map((stock) => (
                    <TableRow key={stock.id}>
                      <TableCell className="border-2 border-gray-300 p-2 text-center">
                        {stock.id_stuff}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-center">
                        {new Date(
                          stock.created_at?.toString() || new Date()
                        ).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </TableCell>

                      <TableCell className="border-2 border-gray-300 p-2 text-center">
                        {stock.name}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-center">
                        {stock.type}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-center">
                        {stock.unit}
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-center">
                        <Input
                          type="number"
                          defaultValue={0}
                          onChange={(e) => {
                            setFilteredStocks(
                              filteredStocks.map((item) => {
                                if (item.id === stock.id) {
                                  return {
                                    ...item,
                                    quantity: parseInt(e.target.value),
                                  };
                                }
                                return item;
                              })
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell className="border-2 border-gray-300 p-2 text-center">
                        {stock.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </TableCell>
                      {/* <TableCell className="border-2 border-gray-300 space-x-2 text-white font-semibold">
                        <div className="w-full flex justify-center">
                          <PencilIcon
                            className="w-5 h-5 cursor-pointer text-black"
                            onClick={() => editIn(stock.id)}
                          />
                        </div>
                      </TableCell> */}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <div className="flex justify-end mt-4">
              <Button color="primary" onClick={() => increaseDashboard()}>
                Simpan
              </Button>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default Income;
