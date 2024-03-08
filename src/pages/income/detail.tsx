import BaseLayout from "../../layouts/base";

const DetailIncome = () => {
  const detailProduct = ["Kopi", "Teh", "Susu"];

  return (
    <>
      <BaseLayout>
        <div className="flex flex-col bg-gray-100 rounded-md shadow-md m-6 text-center">
          <h1 className="text-3xl font-semibold">Detail Produk</h1>
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
        </div>
      </BaseLayout>
    </>
  );
};

export default DetailIncome;
