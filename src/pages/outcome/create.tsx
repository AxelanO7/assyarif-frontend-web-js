import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getBaseUrl } from "../../helpers/api";
import { OrderProps } from "@/types/stuff";

const CreateOutcome = () => {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const [idLastNumber, setIdLastNumber] = useState("");
  const [outlet, setOutlet] = useState("");
  const [totalPay, setTotalPay] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [returnMoney, setReturnMoney] = useState(0);

  const [orders, setOrders] = useState<OrderProps>();

  const baseUrl = () => {
    return getBaseUrl();
  };

  const getOutLast = () => {
    axios
      .get(`${baseUrl()}/stuff/last/out`)
      .then((res) => {
        const resLastNumber = res.data.data;
        const withPrefixZero = (num: number) => {
          return num.toString().padStart(4, "0");
        };
        const finalNumber = `OUT-${withPrefixZero(resLastNumber + 1)}`;
        setIdLastNumber(finalNumber);
      })
      .catch((err) => {
        console.log(err);
        const errStatus = err.response.data.status;
        if (errStatus === 400) {
          setIdLastNumber("OUT-0001");
        }
      });
  };

  const getOrders = () => {
    axios
      .get(`${baseUrl()}/order/stuff`)
      .then((res) => {
        console.log(res.data);
        const resData: OrderProps = res.data.data;
        setOrders(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitOut = () => {
    const idLast = idLastNumber.toString().split("-")[1];
    const idFinal = parseInt(idLast);

    const data = {
      out_id: idFinal,
      // outlet_id: ,
      // stock_id: ,
      total_paid: totalPay,
      total_order: quantity,
      return_cash: returnMoney,
    };

    axios
      .post(`${baseUrl()}/stuff/out`, data)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data berhasil disimpan",
        });
        window.location.href = "/in";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const updateTotal = (val: number, type: string) => {
  //   if (type === "price") {
  //     setTotal(val * quantity);
  //   } else {
  //     setTotal(totalMoney * val);
  //   }
  // };

  useEffect(() => {
    getOutLast();
    getOrders();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Barang Keluar</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Barang Keluar</p>
          <p className="ml-2 font-semibold">{">"}</p>
          <p className="ml-2 font-semibold">Tambah Barang</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-semibold text-gray-500">
                Barang Keluar
              </h3>
              <h6 className="font-semibold text-lg py-1">{dateNow}</h6>
            </div>
            <div className="flex space-x-4 mt-4">
              <div>
                <label>Id Pemesanan</label>
                <select
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-white"
                  value={idLastNumber}
                  disabled
                >
                  <option value={idLastNumber}>{idLastNumber}</option>
                </select>
              </div>
              <div>
                <label>Nama Outlet</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  value="Outlet 1"
                  disabled
                />
                {/* <select
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-white"
                  value={outlet}
                  onChange={(e) => setOutlet(e.target.value)}
                >
                  <option value="1">Outlet 1</option>
                  <option value="2">Outlet 2</option>
                  <option value="3">Outlet 3</option>
                </select> */}
              </div>
              <div>
                <label>Jumlah Bayar</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <div>
                <label>Jumlah Barang</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label>Jumlah Uang</label>
                <input className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
              </div>
              <div>
                <label>Kembalian</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  disabled
                />
              </div>
            </div>
            <div className="w-full justify-end flex mt-4 space-x-4">
              <button className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                Hitung
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={submitOut}
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

export default CreateOutcome;
