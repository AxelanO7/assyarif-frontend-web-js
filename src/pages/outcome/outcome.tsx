import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { useState, useEffect } from "react";
import { getBaseUrl } from "../../helpers/api";
import { OutProps } from "../../types/stuff";
import Swal from "sweetalert2";

const Outcome = () => {
  const [outs, setOuts] = useState<OutProps[]>([]);

  const baseUrl = () => {
    return getBaseUrl();
  };

  const getOuts = () => {
    axios
      .get(`${baseUrl()}/stuff/out`)
      .then((res) => {
        console.log(res.data);
        setOuts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addOut = () => {
    window.location.href = "/out/add";
  };

  const editOut = (id: number) => {
    window.location.href = `/out/${id}`;
  };

  const handleDeleteOut = (id: number) => {
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
      .delete(`${baseUrl()}/stuff/out/${id}`)
      .then((res) => {
        console.log(res.data);
        getOuts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOuts();
  }, []);
  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Barang Keluar</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Barang Keluar</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Barang Keluar
            </h3>
            <div className="flex justify-between mt-4">
              <div className="flex space-x-4 text-base font-semibold text-white">
                <button
                  className="bg-c-dark-blue rounded-md px-3"
                  onClick={addOut}
                >
                  Tambah Barang
                </button>
                <button className="bg-c-yellow rounded-md px-3">
                  Cetak Laporan
                </button>
              </div>
              <div className="flex items-center">
                <input
                  type="search"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cari barang"
                />
                <MagnifyingGlassIcon className="w-10 h-10 text-white bg-c-dark-blue rounded-md p-2 ml-2 cursor-pointer" />
              </div>
            </div>
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="border-2 border-gray-300 p-2">ID</th>
                  <th className="border-2 border-gray-300 p-2">Tanggal</th>
                  <th className="border-2 border-gray-300 p-2">Nama Outlet</th>
                  <th className="border-2 border-gray-300 p-2">
                    Jumlah Barang
                  </th>
                  <th className="border-2 border-gray-300 p-2">Harga Barang</th>
                  <th className="border-2 border-gray-300 p-2">Jumlah Bayar</th>
                  <th className="border-2 border-gray-300 p-2">Kembali</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-700">
                {outs.map((out) => (
                  <tr key={out.id}>
                    <td className="border-2 border-gray-300 p-2">
                      {out.out_id}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {new Date(
                        out.created_at?.toString() || new Date()
                      ).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {out.order.outlet.name}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {out.order.total_order}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {out.order.total_paid.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {out.total_paided.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {out.return_cash.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
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

export default Outcome;
