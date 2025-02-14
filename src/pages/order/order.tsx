import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { useEffect, useState } from "react";
import { getBaseUrl } from "@/helpers/api";
import { UserProps } from "@/types/user";
import axios from "axios";
import { OutletProps } from "react-router-dom";
import { Order } from "@/types/stuff";

const Order = () => {
  const [user, setUser] = useState<UserProps>();
  const [outlet, setOutlet] = useState<OutletProps>();
  const [order, setOrder] = useState<Order[]>([]);

  const getOutletByIDUser = ({ id }: { id: string }) => {
    axios
      .get(`${getBaseUrl()}/outlet/private/user/${id}`)
      .then((res) => {
        console.log(res.data);
        const dataRes = res.data.data;
        getOrderIDOutlet({ id: dataRes.id });
        setOutlet(dataRes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getUserProfile = () => {
    axios
      .get(`${getBaseUrl()}/user/private/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const dataRes: UserProps = res.data.data;
        getOutletByIDUser({ id: dataRes.id });
        setUser(dataRes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getOrderIDOutlet = ({ id }: { id: string }) => {
    axios
      .get(`${getBaseUrl()}/order/private/outlet/${id}`)
      .then((res) => {
        console.log(res.data);
        const dataRes: Order[] = res.data.data;
        setOrder(dataRes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleTapOrder = () => {
    window.location.href = "/order/add";
  };

  const getDateOrder = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
  };

  const getBackgroundColorStatus = (status: number) => {
    if (status === 1) {
      return "bg-green-400";
    } else if (status === 0) {
      return "bg-yellow-400";
    } else {
      return "bg-red-500";
    }
  };

  const getStatusText = (status: number) => {
    if (status === 1) {
      return "Diterima";
    } else if (status === 0) {
      return "Pending";
    } else {
      return "Ditolak";
    }
  };

  const handleTapDetailOrder = (id: string) => {
    window.location.href = `/order/detail-order/${id}`;
  };

  const fetchData = () => {
    getUserProfile();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Pesan Barang</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Pesan Barang</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Pesan Barang
            </h3>
            <button
              className="bg-c-dark-blue text-white px-4 py-2 rounded-md mt-4"
              onClick={handleTapOrder}
            >
              Order
            </button>
            {order.length === 0 ? (
              <div className="text-center mt-4 bg-white p-4 rounded-md shadow-md">
                <p className="text-gray-400">Tidak ada data</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {order.map((item) => (
                  <div
                    className="bg-white p-4 rounded-md shadow-md"
                    key={item.id}
                  >
                    <div className="flex justify-between">
                      <h4 className="font-semibold">{item.outlet.name}</h4>
                      <p className="text-xs text-gray-400">
                        {getDateOrder(item.date_order)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400">
                      Total Barang {item.stock.length}
                    </p>
                    <div className="flex items-center text-xs w-full space-x-4 justify-between mt-2">
                      <button
                        className="w-full bg-gray-200 hover:bg-gray-300 rounded-md p-2"
                        onClick={() => handleTapDetailOrder(item.id)}
                      >
                        {item.total_paid}
                      </button>
                      <button
                        className={`w-full hover:bg-gray-300 rounded-md p-2 ${getBackgroundColorStatus(
                          item.status
                        )}
                      `}
                      >
                        {getStatusText(item.status)}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default Order;
