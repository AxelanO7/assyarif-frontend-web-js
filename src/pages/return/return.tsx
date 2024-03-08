import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";

const Return = () => {
  const data = [
    {
      id: 1,
      name: "Outlet 1",
      total: 100000,
      date: "01-01-2021",
      status: "active",
      random1: 1,
      random2: 2,
    },
    {
      id: 2,
      name: "Outlet 2",
      total: 100000,
      date: "01-01-2021",
      status: "pending",
      random1: 1,
      random2: 2,
    },
    {
      id: 3,
      name: "Outlet 3",
      total: 100000,
      date: "01-01-2021",
      status: "inactive",
      random1: 1,
      random2: 2,
    },
  ];

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Return</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Return</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">Return</h3>
            <table className="w-full mt-4">
              <thead>
                <tr className="bg-gray-300">
                  <th className="py-2 border border-gray-400">No</th>
                  <th className="py-2 border border-gray-400">Outlet</th>
                  <th className="py-2 border border-gray-400">Total</th>
                  <th className="py-2 border border-gray-400">Date</th>
                  <th className="py-2 border border-gray-400">Status</th>
                  <th className="py-2 border border-gray-400">1</th>
                  <th className="py-2 border border-gray-400">2</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                    } text-center`}
                  >
                    <td className="py-2 border border-gray-400">{item.id}</td>
                    <td className="py-2 border border-gray-400">{item.name}</td>
                    <td className="py-2 border border-gray-400">
                      {item.total}
                    </td>
                    <td className="py-2 border border-gray-400">{item.date}</td>
                    <td className="py-2 border border-gray-400">
                      {item.status}
                    </td>
                    <td className="py-2 border border-gray-400">
                      {item.random1}
                    </td>
                    <td className="py-2 border border-gray-400">
                      {item.random2}
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

export default Return;
