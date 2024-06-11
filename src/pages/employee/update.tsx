import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { useEffect, useState } from "react";
import { getBaseUrl } from "@/helpers/api";
import { EmployeeProps } from "@/types/user";
import axios from "axios";

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState<EmployeeProps>({
    id: "",
    name: "",
    address: "",
    phone: "",
    id_user: 0,
  });
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const getEmployee = (id: number) => {
    axios
      .get(`${getBaseUrl()}/employee/private/account/${id}`)
      .then((res) => {
        const data = res.data.data;
        setEmployee(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateEmployee = () => {
    const id = window.location.pathname.split("/")[2];
    const intId = parseInt(id);

    axios
      .put(`${getBaseUrl()}/employee/private/account/${intId}`, {
        id: parseInt(employee.id),
        name: employee.name,
        phone: employee.phone,
        address: employee.address,
        id_user: employee.id_user,
      })
      .then((res) => {
        console.log(res.data);
        alert("Berhasil mengubah data");
        window.location.href = "/employee";
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal mengubah data");
      });
  };

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    const intId = parseInt(id);
    getEmployee(intId);
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Pegawai</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Pegawai</p>
          <p className="ml-2 font-semibold">{">"}</p>
          <p className="ml-2 font-semibold">Ubah Barang</p>
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
                  value={employee.id}
                  disabled
                />
              </div>
              <div>
                <label>Nama Pegawai</label>
                <input
                  defaultValue={employee.name}
                  onChange={(e) =>
                    setEmployee({ ...employee, name: e.target.value })
                  }
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div>
                <label>No Telepon</label>
                <input
                  defaultValue={employee.phone}
                  onChange={(e) =>
                    setEmployee({ ...employee, phone: e.target.value })
                  }
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div>
                <label>Alamat</label>
                <input
                  defaultValue={employee.address}
                  onChange={(e) =>
                    setEmployee({ ...employee, address: e.target.value })
                  }
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
            <div className="w-full justify-end flex mt-4">
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleUpdateEmployee}
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

export default UpdateEmployee;
