import { useEffect, useState } from "react";
import BaseLayout from "../../layouts/base";
import { getBaseUrl } from "@/helpers/api";
import axios from "axios";
import { OrderProps } from "@/types/stuff";
import clsx from "clsx";
import { TrashIcon } from "@heroicons/react/20/solid";
import Swal from "sweetalert2";

const DetailOrderOutlet = () => {
  const detailProduct = ["Kopi", "Teh", "Susu"];

  const [order, setOrder] = useState<OrderProps>();

  const idParam = window.location.pathname.split("/")[3];

  const getOrderByID = () => {
    axios
      .get(`${getBaseUrl()}/order/stuff/${idParam}`)
      .then((res) => {
        console.log(res.data);
        const dataRes: OrderProps = res.data.data;
        console.log(dataRes);
        setOrder(dataRes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getDate = (date: string) => {
    const dateObj = Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "numeric",
      day: "2-digit",
    }).format(new Date(date));
    const finalDate = dateObj.replace(/\//g, "-");
    return finalDate;
  };

  const getStatusText = (status: number) => {
    if (status === 1) {
      return "Diterima";
    } else if (status === 0) {
      return "Pending";
    } else {
      return "Ditolak";
    }
  };

  const fetchData = () => {
    getOrderByID();
  };

  const handleDelete = () => {
    axios
      .delete(`${getBaseUrl()}/order/stuff/${idParam}`)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil dihapus",
        });
        setTimeout(() => {
          window.location.href = "/outlet/order";
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (idParam) {
      fetchData();
    }
  }, [idParam]);

  return (
    <>
      <BaseLayout>
        <div
          className={clsx("w-full bg-gray-300 p-4 mt-8 flex justify-end px-8")}
        >
          <TrashIcon
            className="h-6 w-6 text-red-500"
            onClick={() => {
              Swal.fire({
                title: "Apakah anda yakin?",
                text: "Data yang dihapus tidak dapat dikembalikan",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Hapus",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDelete();
                }
              });
            }}
          />
        </div>

        <div className="flex flex-col bg-gray-100 rounded-md shadow-md m-6 text-center">
          <h1 className="text-3xl font-semibold">Pemesanan Barang</h1>
          <h1>{getDate(order?.date_order || new Date().toISOString())}</h1>
          <h6 className="font-semibold text-lg py-1">TOKO ASSYARIF</h6>
          <table className="m-8 border border-gray-400 text-left">
            <tr className="bg-gray-100">
              <td className="p-2 font-bold">Profile Outlet</td>
            </tr>
            <tr className="bg-gray-200">
              <td className="p-2">Nama : {order?.outlet?.name}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="p-2">Alamat : {order?.outlet?.address}</td>
            </tr>
            <tr className="bg-gray-200">
              <td className="p-2">Telepon :{order?.outlet?.phone}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="p-2 font-bold">Pesanan Barang</td>
            </tr>
            <tr className="bg-gray-200">
              <td className="p-2">Nama Barang : {order?.stock?.name}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="p-2">Jumlah Order : {order?.total_order}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="p-2 font-bold">Total Bayar</td>
            </tr>
            <tr className="bg-gray-200">
              <td className="p-2">Rp. {order?.total_paid}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="p-2 font-bold">Status Order</td>
            </tr>
            <tr className="bg-gray-200">
              <td className="p-2">{getStatusText(order?.status || 0)}</td>
            </tr>
          </table>
        </div>
      </BaseLayout>
    </>
  );
};

export default DetailOrderOutlet;
