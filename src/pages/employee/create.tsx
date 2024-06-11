import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { useEffect, useState } from "react";
import { getBaseUrl } from "@/helpers/api";

const CreateEmployee = () => {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const [userLastNumber, setUserLastNumber] = useState("");

  const getUserLast = () => {
    axios
      .get(`${getBaseUrl()}/employee/private/last`)
      .then((res) => {
        const resLastNumber = res.data.data;
        // const withPrefixZero = (num: number) => {
        //   return num.toString().padStart(4, "0");
        // };
        // const finalNumber = `IN-${withPrefixZero(resLastNumber + 1)}`;
        const finalNumber = resLastNumber;
        setUserLastNumber(finalNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const submit = () => {
    const payload = {
      name,
      phone,
      address,
      id_user: 4,
    };

    axios
      .post(`${getBaseUrl()}/employee/private/account`, payload)
      .then((res) => {
        console.log(res.data);
        alert("Berhasil menambahkan pegawai");
        window.location.href = "/employee";
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal menambahkan pegawai");
      });
  };

  useEffect(() => {
    getUserLast();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Pegawai</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Pegawai</p>
          <p className="ml-2 font-semibold">{">"}</p>
          <p className="ml-2 font-semibold">Tambah Akun</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-semibold text-gray-500">Pegawai</h3>
              <h6 className="font-semibold text-lg py-1">{dateNow}</h6>
            </div>
            <div className="flex space-x-4 mt-4">
              <div>
                <label>ID User</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  value={userLastNumber}
                  disabled
                />
              </div>
              <div>
                <label>Nama Pegawai</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>No Telepon</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label>Alamat</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full justify-end flex mt-4">
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default CreateEmployee;
