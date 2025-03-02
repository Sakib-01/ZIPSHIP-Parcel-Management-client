import React, { useEffect, useState } from "react";
import AOS from "aos";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";
import login from "../../assets/lottie/login.json";
import Lottie from "lottie-react";
import { saveUser } from "../../api/utils";

const Login = () => {
  useEffect(() => {
    document.title = " Login";
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing function
      once: true, // Whether animation happens only once
    });
  }, []);

  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location?.state?.from?.pathname || "/";
  const from = location?.state?.from?.pathname || "/dashboard";

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;
  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      //User Login
      await signIn(email, password);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
      navigate(from, { replace: true });
      console.log("ok");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const data = await signInWithGoogle();
      // save user info in db if the user is new
      await saveUser(data?.user);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div
      data-aos="fade-right"
      className="flex justify-center items-center pb-10 min-h-[calc(100vh-306px)] my-24"
    >
      <div
        data-aos="fade-right"
        className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl "
      >
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          {/* <div className="flex justify-center mx-auto">{logo}</div> */}

          <p className="mt-3 text-xl text-center text-primary ">
            Welcome back!
          </p>

          <h3 className="mt-3 text-lg bg-slate-300 p-5 rounded-xl text-center text-primary">
            Credentials
          </h3>
          <div className="flex justify-between my-4">
            <button
              onClick={() =>
                setCredentials({
                  email: "user1@gmail.com",
                  password: "User123",
                })
              }
              className=" btn px-4 py-2 bg-primary hover:bg-accent text-black rounded-lg"
            >
              User
            </button>
            <button
              onClick={() =>
                setCredentials({
                  email: "dman@gmail.com",
                  password: "Dman123",
                })
              }
              className="px-4 py-2 bg-primary hover:bg-accent text-black rounded-lg"
            >
              Delivery Man
            </button>
            <button
              onClick={() =>
                setCredentials({
                  email: "admin@gmail.com",
                  password: "Admin123",
                })
              }
              className="px-4 py-2 bg-primary hover:bg-accent text-black rounded-lg"
            >
              Admin
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                autoComplete="email"
                name="email"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 "
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
              </div>

              <input
                id="loggingPassword"
                autoComplete="current-password"
                name="password"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  lg:w-1/4"></span>

            <div className="text-xs text-center text-gray-500 uppercase  hover:underline">
              or login with google
            </div>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <div
            onClick={handleGoogleSignIn}
            className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 "
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Log in with Google
            </span>
          </div>

          <div className="flex flex-col items-center justify-between mt-4">
            <h2 className="text-blue-700 font-bold text-lg">
              Don't have account??
            </h2>
            <span className="w-1/5 border-b  md:w-1/4"></span>

            <Link
              to="/signup"
              className="text-base text-gray-700 uppercase  hover:underline hover:text-black text-center"
            >
              Click to <span className="">Sign up</span>
            </Link>

            <span className="w-1/5 border-b  md:w-1/4"></span>
          </div>
        </div>
        <div className="flex-1 text-center lg:text-left w-96">
          <Lottie animationData={login}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Login;
