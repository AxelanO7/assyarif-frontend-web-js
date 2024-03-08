import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";

const Po = () => {
  const data = [
    {
      id: 1,
      name: "Outlet 1",
      total: 100000,
      date: "01-01-2021",
      status: "active",
    },
    {
      id: 2,
      name: "Outlet 2",
      total: 100000,
      date: "01-01-2021",
      status: "pending",
    },
    {
      id: 3,
      name: "Outlet 3",
      total: 100000,
      date: "01-01-2021",
      status: "inactive",
    },
  ];

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">PO Outlet</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">PO Outlet</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">PO Outlet</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {data.map((item) => (
                <div
                  className="bg-white p-4 rounded-md shadow-md"
                  key={item.id}
                >
                  <div className="flex justify-between">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Total Barang {item.total}
                  </p>
                  <div className="flex items-center text-xs w-full space-x-4 justify-between mt-2">
                    <button className="w-full bg-gray-200 hover:bg-gray-300 rounded-md p-2">
                      lorem
                    </button>
                    <button
                      className={`
                        w-full hover:bg-gray-300 rounded-md p-2 ${
                          item.status === "active"
                            ? "bg-green-400"
                            : item.status === "pending"
                            ? "bg-yellow-400"
                            : "bg-red-500"
                        }
                      `}
                    >
                      {item.status}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default Po;
