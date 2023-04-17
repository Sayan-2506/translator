import { React, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "antd";
import bgImage from "../assets/bg.jpg";
import logo from "../assets/logowhite.png";
import { Context } from "../index";


const Register = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState(false);

  const [error, setError] = useState({
    bool: false,
    message: "",
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
      e.preventDefault();
  
      if (password.length >= 8){
        setPasswordError(false);
        if (
          username &&
          password
        ) {
          let data = new FormData();
          data.append("username", username);
          data.append("password", password);
    
          store.registration(data).then((result) => {
            if (result?.error) {
              const error = result?.error?.response;
              switch (error) {
                case 400:
                  setError({
                    bool: true,
                    message: `${error.data?.email && error.data?.email + "\r\n"}${
                      error.data?.username && error.data?.username
                    }`,
                  });
                  setTimeout(() => setError(false), 5000);
                  break;
                default:
                  setError({ bool: true, message: error?.detail });
                  setTimeout(() => setError(false), 5000);
                  break;
              }
            } else {
              navigate("/home", { replace: true });
            }
          });
        }
      } else {
        setPasswordError(true);
        return;
      }
    };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <img
          src={bgImage}
          className="w-full h-full object-cover"
          alt="bgimage"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="overflow-y-hidden flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            {error.bool && (
              <Alert
              message="Қате"
              description={error.message}
              type="error"
              showIcon
              className="absolute top-24"
            />
            )}
            <img className="mb-6" src={logo} width="130px" alt="logo" />
            <div className="overflow-y-auto h-auto w-80 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Аккаунт құру
                </h1>

                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={(e) => onSubmit(e)}
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Логин
                    </label>
                    <input
                      onChange={onChange}
                      id="username"
                      type="text"
                      name="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="username"
                      value={username}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Құпия сөз
                    </label>
                    <input
                      onChange={onChange}
                      id="password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={password}
                      required
                    />
                    {passwordError && (
                      <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        Құпия сөз кем дегенде 8 символдан тұру қажет
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-violet-500 to-90% w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Аккаунт құру
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Аккаунт бар?{" "}
                    <Link
                      to="login"
                      className="text-blue-400 font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Кіру
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
