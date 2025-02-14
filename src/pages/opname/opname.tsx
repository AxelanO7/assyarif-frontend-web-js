// import { DocumentTextIcon, HomeIcon } from "@heroicons/react/20/solid";
// import BaseLayout from "../../layouts/base";
// import { getBaseUrl } from "@/helpers/api";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { OpnameProps } from "@/types/stuff";
// import Swal from "sweetalert2";

// const Opname = () => {
//   const [formState, setFormState] = useState({
//     id_opname: "",
//     name: "",
//     start_date: "",
//     end_date: "",
//   });

//   const getOpnames = () => {
//     axios
//       .get(`${getBaseUrl()}/opname/private/stuff`)
//       .then((res) => {
//         console.log(res.data);
//         setOpnames(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleDetailOpname = (val: OpnameProps) => {
//     window.location.href = `/detail-opname/${val.start_date}/${val.end_date}`;
//   };

//   const handleAddOpname = () => {
//     const payload = {
//       id_opname: formState.id_opname,
//       name: formState.name,
//       start_date: formState.start_date,
//       end_date: formState.end_date,
//     };
//     axios
//       .post(`${getBaseUrl()}/opname/private/stuff`, payload)
//       .then((res) => {
//         console.log(res.data);
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil",
//           text: "Data berhasil disimpan",
//         });
//         getOpnames();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const [opnames, setOpnames] = useState<OpnameProps[]>([]);
//   useEffect(() => {
//     getOpnames();
//   }, []);

//   return (
//     <>
//       <BaseLayout>
//         <h1 className="text-3xl font-bold mx-6 pt-4">Stok Opname</h1>
//         <div className="flex items-center bg-gray-300 px-6 py-2">
//           <HomeIcon className="w-5 h-5" />
//           <p className="ml-2 font-semibold">Stok Opname</p>
//         </div>
//         <div className="px-6">
//           <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
//             <h3 className="text-3xl font-semibold text-gray-500">
//               Stok Opname
//             </h3>
//             <div className="flex justify-between mt-4">
//               <div className="flex items-center space-x-2 w-full">
//                 <div className="w-full">
//                   <label>ID Laporan</label>
//                   <input
//                     className="p-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                     onChange={(e) =>
//                       setFormState({ ...formState, id_opname: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="w-full">
//                   <label>Nama Laporan</label>
//                   <input
//                     className="p-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                     onChange={(e) =>
//                       setFormState({ ...formState, name: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="w-full">
//                   <label>Tanggal Awal</label>
//                   <input
//                     type="date"
//                     className="p-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                     onChange={(e) =>
//                       setFormState({ ...formState, start_date: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="w-full">
//                   <label>Tanggal Akhir</label>
//                   <input
//                     type="date"
//                     className="p-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                     onChange={(e) =>
//                       setFormState({ ...formState, end_date: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end mt-4">
//               <button
//                 className="bg-c-dark-blue rounded-md px-4 py-1 text-white"
//                 onClick={handleAddOpname}
//               >
//                 Simpan
//               </button>
//             </div>
//             <table className="w-full mt-4">
//               <thead>
//                 <tr>
//                   <th className="border-2 border-gray-300 p-2">ID</th>
//                   <th className="border-2 border-gray-300 p-2">Nama</th>
//                   <th className="border-2 border-gray-300 p-2">Tanggal Awal</th>
//                   <th className="border-2 border-gray-300 p-2">
//                     Tanggal Akhir
//                   </th>
//                   <th className="border-2 border-gray-300 p-2">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody className="text-center text-gray-700">
//                 {opnames.map((opname) => (
//                   <tr key={opname.id}>
//                     <td className="border-2 border-gray-300 p-2">
//                       {opname.id}
//                     </td>
//                     <td className="border-2 border-gray-300 p-2">
//                       {opname.name}
//                     </td>
//                     <td className="border-2 border-gray-300 p-2">
//                       {opname.start_date}
//                     </td>
//                     <td className="border-2 border-gray-300 p-2">
//                       {opname.end_date}
//                     </td>
//                     <td
//                       className="border-2 border-gray-300"
//                       onClick={() => handleDetailOpname(opname)}
//                     >
//                       <DocumentTextIcon className="rounded-md  w-6 h-6 text-blue-500 mx-auto cursor-pointer" />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </BaseLayout>
//     </>
//   );
// };

// export default Opname;

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
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="border-2 border-gray-300 p-2"
                    >
                      Data tidak ditemukan
                    </TableCell>
                  </TableRow>
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
