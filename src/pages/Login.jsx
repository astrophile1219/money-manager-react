import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signup from "../assets/signup.jpg";
import Input from "../components/Input";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { AppContext } from "../context/AppContext";
import { LoaderCircle } from "lucide-react";
import Validation from "../util/Validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // basic validation
    if (!Validation(email)) {
      setError("Please enter valid email address");
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }
    setError("");

    // Login API call
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      }
      else {
        console.error("Something went wrong", err);
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" h-screen w-full relative flex items-center justify-center overflow-hidden ">
      <img
        src={signup}
        alt="BG_IMG"
        className="absolute inset-0 w-full h-full  object-cover blur-sm "
      />

      <div className="relative z-10 w-full max-w-lg px-6 ">
        <div className="bg-white opacity-95 rounded-lg  backdrop-blur-sm shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl text-black font-semibold text-center mb-2">
            Welcome Back
          </h3>
          <p className="text-sm text-center mb-8 text-slate-700">
            Please enter your detailse to login in
          </p>

          <form onSubmit={handleSubmit} className="space-y-0">
            <Input
              placeholder="name@example.com"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
            />
            <div className="col-span-2">
              <Input
                placeholder="********"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
              />
            </div>
            {error && (
              <p className="text-red-500 bg-red-50 rounded text-center text-sm p-2 mb-2">
                {error}
              </p>
            )}
            <button
              type="submit"
              className={`w-full bg-indigo-700 shadow-lg shadow-indigo-500/50  hover:bg-indigo-600 cursor-pointer p-3 py-2 rounded text-xl font-medium flex items-center justify-center gap-2 ${isLoading ? "cursor-not-allowed opacity-60" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Logging in...
                </>
              ) : (
                "LOGIN"
              )}
            </button>
            <p className="text-sm text-slate-800 text-center mt-6">
              Don't have an account?
              <Link
                to="/signup"
                className="font-medium text-blue-700 underline hover:text-blue-800 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
