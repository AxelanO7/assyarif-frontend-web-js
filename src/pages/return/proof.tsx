import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";

const Proof = () => {
  const data = {
    id1: "001",
    id2: "12/12/2023",
    id3: "Order2",
    image1: "https://via.placeholder.com/150",
    image2: "https://via.placeholder.com/150",
    image3: "https://via.placeholder.com/150",
  };

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
            <div className="flex">
              <p className="text-gray-500 text-center border border-gray-400 p-2">
                {data.id1}
              </p>
              <p className="text-gray-500 text-center border border-gray-400 p-2">
                {data.id2}
              </p>
              <p className="text-gray-500 text-center border border-gray-400 p-2">
                {data.id3}
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <img
                src={data.image1}
                alt="image1"
                className="w-32 h-32 rounded-md"
              />
              <img
                src={data.image2}
                alt="image2"
                className="w-32 h-32 rounded-md"
              />
              <img
                src={data.image3}
                alt="image3"
                className="w-32 h-32 rounded-md"
              />
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default Proof;
