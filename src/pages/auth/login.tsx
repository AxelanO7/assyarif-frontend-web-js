import axios from "axios";
import { useState } from "react";
import swal from "sweetalert2";
import { getBaseUrl } from "../../helpers/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateInput = () => {
    if (!username) {
      swal.fire("Gagal!", "Nama tidak boleh kosong", "error");
      return false;
    }

    if (!password) {
      swal.fire("Gagal!", "Password tidak boleh kosong", "error");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInput()) {
      return;
    }
    axios
      .post(
        `
        ${getBaseUrl()}/user/public/login`,
        {
          username: username,
          password: password,
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.data.role);
        swal.fire("Berhasil!", "Anda berhasil masuk", "success").then(() => {
          window.location.href = "dashboard";
        });
      })
      .catch((err) => {
        swal.fire(
          "Gagal!",
          "Kredensial yang Anda masukkan salah. Silakan coba lagi.",
          "error"
        );
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-50 w-screen min-h-screen">
        <h1 className="text-4xl font-bold">TOKO ASSYARIF</h1>
        <h3 className="text-sm font-semibold">
          Jl. Letda Reta No.50, Denpasar Timur
        </h3>
        <div className="shadow-md p-4 rounded-md w-96 mt-4 bg-c-powder-blue flex flex-col">
          <h3 className="text-xl font-bold mb-4">Login</h3>
          <input
            className="border border-gray-300 rounded-md p-2"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-md p-2 mt-4"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex">
              <input
                type="checkbox"
                className="border border-gray-300 rounded-md"
              />
              <p className="ml-2">Ingatkan Saya</p>
            </div>
            <button
              className="bg-white border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
