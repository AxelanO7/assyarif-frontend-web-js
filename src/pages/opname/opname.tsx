import { DocumentTextIcon, HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { getBaseUrl } from "@/helpers/api";
import axios from "axios";
import { useState, useEffect } from "react";
import { OpnameProps } from "@/types/stuff";
import Swal from "sweetalert2";

const Opname = () => {
  const [formState, setFormState] = useState({
    id_opname: "",
    name: "",
    start_date: "",
    end_date: "",
  });

  const getOpnames = () => {
    axios
      .get(`${getBaseUrl()}/opname/private/stuff`)
      .then((res) => {
        console.log(res.data);
        setOpnames(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDetailOpname = (val: OpnameProps) => {
    window.location.href = `/detail-opname/${val.start_date}/${val.end_date}`;
  };

  const handleAddOpname = () => {
    const payload = {
      id_opname: formState.id_opname,
      name: formState.name,
      start_date: formState.start_date,
      end_date: formState.end_date,
    };
    axios
      .post(`${getBaseUrl()}/opname/private/stuff`, payload)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil disimpan",
        });
        getOpnames();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [opnames, setOpnames] = useState<OpnameProps[]>([]);
  useEffect(() => {
    getOpnames();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Stok Opname</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Stok Opname</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Stok Opname
            </h3>
            <div className="flex justify-between mt-4">
              <div className="flex items-center space-x-2 w-full">
                <div className="w-full">
                  <label>ID Laporan</label>
                  <input
                    className="p-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    onChange={(e) =>
                      setFormState({ ...formState, id_opname: e.target.value })
                    }
                  />
                </div>
                <div className="w-full">
                  <label>Nama Laporan</label>
                  <input
                    className="p-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                  />
                </div>
                <div className="w-full">
                  <label>Tanggal Awal</label>
                  <input
                    type="date"
                    className="p-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    onChange={(e) =>
                      setFormState({ ...formState, start_date: e.target.value })
                    }
                  />
                </div>
                <div className="w-full">
                  <label>Tanggal Akhir</label>
                  <input
                    type="date"
                    className="p-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    onChange={(e) =>
                      setFormState({ ...formState, end_date: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-c-dark-blue rounded-md px-4 py-1 text-white"
                onClick={handleAddOpname}
              >
                Simpan
              </button>
            </div>
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="border-2 border-gray-300 p-2">ID</th>
                  <th className="border-2 border-gray-300 p-2">Nama</th>
                  <th className="border-2 border-gray-300 p-2">Tanggal Awal</th>
                  <th className="border-2 border-gray-300 p-2">
                    Tanggal Akhir
                  </th>
                  <th className="border-2 border-gray-300 p-2">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-700">
                {opnames.map((opname) => (
                  <tr key={opname.id}>
                    <td className="border-2 border-gray-300 p-2">
                      {opname.id}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {opname.name}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {opname.start_date}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {opname.end_date}
                    </td>
                    <td
                      className="border-2 border-gray-300"
                      onClick={() => handleDetailOpname(opname)}
                    >
                      <DocumentTextIcon className="rounded-md  w-6 h-6 text-blue-500 mx-auto cursor-pointer" />
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

export default Opname;
