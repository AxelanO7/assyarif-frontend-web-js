import BaseLayout from "../../layouts/base";

const DetailOrderOutlet = () => {
  const detailProduct = ["Kopi", "Teh", "Susu"];
  const startDate = "01/11/2023";

  return (
    <>
      <BaseLayout>
        <div className="flex flex-col bg-gray-100 rounded-md shadow-md m-6 text-center">
          <h1 className="text-3xl font-semibold">Pemesanan Barang</h1>
          <h1>{startDate}</h1>
          <h6 className="font-semibold text-lg py-1">TOKO ASSYARIF</h6>
          <table className="m-8 border border-gray-400">
            {detailProduct.map((product, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}
              >
                <td className="p-2">{product}</td>
              </tr>
            ))}
          </table>
          <div className="flex ml-4 text-white font-bold ">
            <button className="bg-yellow-500 hover:bg-yellow-700 py-2 px-4 rounded m-4">
              Pending
            </button>
            <button className="bg-green-500 hover:bg-green-700 py-2 px-4 rounded m-4">
              Diterima
            </button>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default DetailOrderOutlet;
