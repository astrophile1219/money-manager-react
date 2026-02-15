import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import singup from "../assets/signup.jpg";
import Input from "../components/Input";
import Validation from "../util/Validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import uploadProfileImage from "../util/uploadProfileImage";

const SignUp = () => {
  // State management as shown in your code snippet
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto,setProfilePhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageURL = "";
    setIsLoading(true);

    // basic validation
    if (!fullName.trim()) {
      setError("Please enter your full name");
      setIsLoading(false);
      return;
    }
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

    // signup api call
    try {
      // upload image if present
      if (profilePhoto) {
        const imageUrl = await uploadProfileImage(profilePhoto);
        profileImageURL = imageUrl || "";
      }

      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullname: fullName,
        email,
        password,
        profileImageURL
      });
      if (response.status === 201) {
        toast.success("Profile created successfully.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Something went wrong!", err);
      setError(err.message);
    }
  };

  return (
    <div className=" h-screen w-full relative flex items-center justify-center overflow-hidden ">
      <img
        src={singup}
        alt="BG_IMG"
        className="absolute inset-0 w-full h-full  object-cover blur-sm "
      />

      <div className="relative z-10 w-full max-w-lg px-6 ">
        <div className="bg-white opacity-95 rounded-lg  backdrop-blur-sm shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl text-black font-semibold text-center mb-2">
            Create an Account
          </h3>
          <p className="text-sm text-center mb-8 text-slate-700">
            Start tracking your spendings by joining with us.
          </p>

          <form onSubmit={handleSubmit} className="space-y-0">
            <div className="flex justify-center mb-4">
              <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <Input
                placeholder="David Warner"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
              />
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
            </div>
            {error && (
              <p className="text-red-500 bg-red-100 rounded text-center text-sm p-2 mb-3">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-indigo-700 shadow-lg shadow-indigo-500/50  hover:bg-indigo-600 cursor-pointer p-3 py-2 rounded text-xl font-medium flex items-center justify-center gap-2 ${isLoading ? "cursor-not-allowed opacity-60" : ""}`}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
            <p className="text-sm text-slate-800 text-center mt-6">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-blue-700 underline hover:text-blue-800 transition-colors"
              >
                Login{" "}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
