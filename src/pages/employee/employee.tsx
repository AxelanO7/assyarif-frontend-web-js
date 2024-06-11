import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { getBaseUrl } from "@/helpers/api";
import { useEffect, useState } from "react";
import { EmployeeProps } from "@/types/user";

const Employee = () => {
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);

  const getEmployees = () => {
    axios
      .get(`${getBaseUrl()}/employee/private/account`)
      .then((res) => {
        const data = res.data.data;
        setEmployees(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddEmployee = () => {
    window.location.href = "/employee/add";
  };

  const handleEditEmployee = (id: number) => {
    window.location.href = `/employee/${id}`;
  };

  const handleDeleteEmployee = (id: number) => {
    deleteEmployee(id);
  };

  const deleteEmployee = (id: number) => {
    axios
      .delete(`${getBaseUrl()}/employee/private/account/${id}`)
      .then((res) => {
        console.log(res.data);
        alert("Berhasil menghapus data");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Pegawai</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Tambah Akun</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Data Pegawai
            </h3>
            <div className="flex justify-between mt-4">
              <div className="flex space-x-4">
                <button
                  className="bg-c-dark-blue rounded-md px-3 text-white"
                  onClick={handleAddEmployee}
                >
                  Tambah Pegawai
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
                  <th className="border-2 border-gray-300 p-2">No</th>
                  <th className="border-2 border-gray-300 p-2">Nama</th>
                  <th className="border-2 border-gray-300 p-2">No Telepon</th>
                  <th className="border-2 border-gray-300 p-2">Alamat</th>
                  <th className="border-2 border-gray-300 p-2">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-700">
                {employees.map((employee, index) => (
                  <tr key={employee.id}>
                    <td className="border-2 border-gray-300 p-2">
                      {index + 1}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {employee.name}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {employee.phone}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {employee.address}
                    </td>
                    <td className="border-2 border-gray-300 flex space-x-2 text-white p-2">
                      <button
                        className="bg-blue-500 rounded-md w-full p-1"
                        onClick={() =>
                          handleEditEmployee(parseInt(employee.id))
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 rounded-md w-full p-1"
                        onClick={() =>
                          handleDeleteEmployee(parseInt(employee.id))
                        }
                      >
                        Hapus
                      </button>
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

export default Employee;
