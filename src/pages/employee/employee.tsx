import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { getBaseUrl } from "@/helpers/api";
import { useEffect, useState } from "react";
import { EmployeeProps } from "@/types/user";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { EmptyDataTable } from "@/components/table";

const Employee = () => {
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
  const [originalEmployees, setOriginalEmployees] = useState<EmployeeProps[]>(
    []
  );
  const [search, setSearch] = useState("");

  const getEmployees = () => {
    axios
      .get(`${getBaseUrl()}/employee/private/account`)
      .then((res) => {
        const data = res.data.data;
        setEmployees(data);
        setOriginalEmployees(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSearch = () => {
    if (search === "") {
      setEmployees(originalEmployees);
    } else {
      const filtered = originalEmployees.filter((employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase())
      );
      setEmployees(filtered);
    }
  };

  const handleAddEmployee = () => {
    window.location.href = "/employee/add";
  };

  const handleEditEmployee = (id: number) => {
    window.location.href = `/employee/${id}`;
  };

  const handleDeleteEmployee = (id: number) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda tidak dapat mengembalikan data yang sudah dihapus",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteEmployee(id);
        getEmployees();
      }
    });
  };

  const deleteEmployee = (id: number) => {
    axios
      .delete(`${getBaseUrl()}/employee/private/account/${id}`)
      .then((res) => {
        console.log(res.data);
        alert("Berhasil menghapus data");
        getEmployees();
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
                  placeholder="Cari pegawai"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <MagnifyingGlassIcon
                  className="w-10 h-10 text-white bg-c-dark-blue rounded-md p-2 ml-2 cursor-pointer"
                  onClick={handleSearch}
                />
              </div>
            </div>

            <Table className="w-full mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead className="border-2 border-gray-300 p-2">
                    No
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2">
                    Nama
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2">
                    No Telepon
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2">
                    Alamat
                  </TableHead>
                  <TableHead className="border-2 border-gray-300 p-2">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center text-gray-700">
                {employees.length === 0 && EmptyDataTable({ columnSpan: 5 })}
                {employees.map((employee, index) => (
                  <TableRow key={employee.id}>
                    <TableCell className="border-2 border-gray-300 p-2">
                      {index + 1}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2">
                      {employee.name}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2">
                      {employee.phone}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 p-2">
                      {employee.address}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 flex space-x-2 text-white p-2">
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default Employee;
