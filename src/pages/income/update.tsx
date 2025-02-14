import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "../../helpers/api";
import { Stuff } from "../../types/stuff";
import Swal from "sweetalert2";

const UpdateIncome = () => {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const [stuff, setStuff] = useState<Stuff>({
    id: 0,
    name: "",
    type: "",
    quantity: 0,
    price: 0,
    unit: "",
  });

  const baseUrl = () => {
    return getBaseUrl();
  };

  const getIdStuff = () => {
    const idStuff = stuff.id;
    const withPrefixZero = (num: number) => {
      return num.toString().padStart(4, "0");
    };
    const finalNumber = `IN-${withPrefixZero(idStuff)}`;
    return finalNumber;
  };

  const getIncome = (idParam: string) => {
    axios
      .get(`${baseUrl()}/stuff/in/${idParam}`)
      .then(async (res) => {
        setStuff(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitIncome = () => {
    axios
      .put(`${baseUrl()}/stuff/in/${stuff.id}`, stuff)
      .then(async (res) => {
        console.log(res);
        Swal.fire({
          title: "Berhasil",
          text: "Data berhasil diubah",
          icon: "success",
          confirmButtonText: "Ok",
        });
        window.location.href = "/in";
      })
      .catch((err) => {
        Swal.fire({
          title: "Gagal",
          text: "Data gagal diubah",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.log(err);
      });
  };

  useEffect(() => {
    const idParam = window.location.pathname.split("/")[2];
    getIncome(idParam);
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Barang Masuk</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Barang Masuk</p>
          <p className="ml-2 font-semibold">{">"}</p>
          <p className="ml-2 font-semibold">Ubah Barang</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-semibold text-gray-500">
                Barang Masuk
              </h3>
              <h6 className="font-semibold text-lg py-1">{dateNow}</h6>
            </div>
            <div className="flex space-x-4 mt-4">
              <div>
                <label>ID Barang</label>
                <input
                  value={getIdStuff()}
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label>Nama Barang</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  value={stuff.name}
                  onChange={(e) => {
                    setStuff({ ...stuff, name: e.target.value });
                  }}
                />
              </div>
              <div>
                <label>Jenis Barang</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  value={stuff.type}
                  onChange={(e) => {
                    setStuff({ ...stuff, type: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <div>
                <label>Jumlah Barang</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  value={stuff.quantity}
                  disabled
                />
              </div>
              <div>
                <label>Harga Sub Total</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                  value={(stuff.price * stuff.quantity).toLocaleString(
                    "id-ID",
                    {
                      style: "currency",
                      currency: "IDR",
                    }
                  )}
                />
              </div>
              <div>
                <label>Harga</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                  value={stuff.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                />
              </div>
            </div>
            <div className="flex-col flex mt-4">
              <label>Satuan</label>
              <select
                className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-max bg-white"
                defaultValue={stuff.unit}
                onChange={(e) => {
                  setStuff({ ...stuff, unit: e.target.value });
                }}
              >
                <option value="pcs">Pcs</option>
                <option value="kg">Kg</option>
                <option value="liter">Liter</option>
                <option value="m">Meter</option>
              </select>
            </div>
            <div className="w-full justify-end flex mt-4">
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={submitIncome}
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

export default UpdateIncome;
