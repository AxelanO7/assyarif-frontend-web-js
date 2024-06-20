import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { useEffect, useState } from "react";
import { getBaseUrl } from "../../helpers/api";
import axios from "axios";
import Swal from "sweetalert2";

const CreateIncome = () => {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const [idLastNumber, setIdLastNumber] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("pcs");

  const baseUrl = () => {
    return getBaseUrl();
  };

  const getInLast = () => {
    axios
      .get(`${baseUrl()}/stuff/last/in`)
      .then((res) => {
        const resLastNumber = res.data.data;
        const withPrefixZero = (num: number) => {
          return num.toString().padStart(4, "0");
        };
        const finalNumber = `IN-${withPrefixZero(resLastNumber + 1)}`;
        setIdLastNumber(finalNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitIn = () => {
    const idLast = idLastNumber.toString().split("-")[1];
    const idFinal = parseInt(idLast);

    const payloadIn = {
      id_stuff: idFinal,
      name: name,
      type: type,
      quantity: quantity,
      total: total,
      price: price,
      unit: unit,
    };

    axios
      .post(`${baseUrl()}/stuff/in`, payloadIn)
      .then((res) => {
        console.log(res);
        resetForm();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data berhasil disimpan",
        });
        createStock();
        window.location.href = "/in";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createStock = () => {
    const idLast = idLastNumber.toString().split("-")[1];
    const idFinal = parseInt(idLast);

    const payloadStock = {
      id_stuff: idFinal,
      name: name,
      type: type,
      quantity: quantity,
      unit: unit,
      price: price,
    };

    axios
      .post(`${baseUrl()}/stock/private/stuff`, payloadStock)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetForm = () => {
    getInLast();
    setName("");
    setType("");
    setQuantity(0);
    setTotal(0);
    setPrice(0);
    setUnit("pcs");
  };

  const updateTotal = (val: number, type: string) => {
    if (type === "price") {
      setTotal(val * quantity);
    } else {
      setTotal(price * val);
    }
  };

  useEffect(() => {
    getInLast();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Barang Masuk</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Barang Masuk</p>
          <p className="ml-2 font-semibold">{">"}</p>
          <p className="ml-2 font-semibold">Tambah Barang</p>
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
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  value={idLastNumber}
                  disabled
                />
              </div>
              <div>
                <label>Nama Barang</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Jenis Barang</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <div>
                <label>Jumlah Barang</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  type="number"
                  onChange={(e) => {
                    setQuantity(parseInt(e.target.value));
                    updateTotal(parseInt(e.target.value), "quantity");
                  }}
                />
              </div>
              <div>
                <label>Harga Sub Total</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  value={total.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                  disabled
                />
              </div>
              <div>
                <label>Harga</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  type="number"
                  onChange={(e) => {
                    setPrice(parseInt(e.target.value));
                    updateTotal(parseInt(e.target.value), "price");
                  }}
                />
              </div>
            </div>
            <div className="flex-col flex mt-4">
              <label>Satuan</label>
              <select
                className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-max bg-white"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
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
                onClick={submitIn}
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

export default CreateIncome;
