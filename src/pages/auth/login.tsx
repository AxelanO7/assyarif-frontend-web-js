const Login = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-50 w-screen min-h-screen">
        <h1 className="text-4xl font-bold">TOKO ASSYARIF</h1>
        <h3 className="text-sm font-semibold">
          Jl. Letda Reta No.50, Denpasar Timur
        </h3>
        <form className="shadow-md p-4 rounded-md w-96 mt-4 bg-c-powder-blue flex flex-col">
          <h3 className="text-xl font-bold mb-4">Login</h3>
          <input
            className="border border-gray-300 rounded-md p-2"
            placeholder="Username"
          />
          <input
            className="border border-gray-300 rounded-md p-2 mt-4"
            placeholder="Password"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex">
              <input
                type="checkbox"
                className="border border-gray-300 rounded-md"
              />
              <p className="ml-2">Ingatkan Saya</p>
            </div>
            <button className="bg-white border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
