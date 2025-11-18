import React, { use, useRef} from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { toast } from "sonner";
import authLogo from "../assets/authBg.jpg";
import { Link } from "react-router";


const ForgetPass = () => {
  const { resetPassword,loading,setLoading} = use(AuthContext);
  const emailRef = useRef();

  const handleForgetPassword = async () => {
    const email = emailRef.current.value.trim();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email);
      toast.success("Reset link sent! Please check your gmail.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="   min-h-screen relative" style={{ backgroundImage: `url(${authLogo})` }}>
            <div className="absolute inset-0 bg-black/40 "></div>
      <div
      className="container mx-auto flex items-center justify-center min-h-screen">

      <div className="px-2">
        <div className="relative w-full max-w-sm bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg z-10">
        <h2 className="text-2xl text-center">
          Reset Password
        </h2>

        <p className="text-accent text-center mb-6">
          Enter your email and we will send you a password reset link.
        </p>

        <div className="space-y-4">
          <input
            ref={emailRef}
            type="email"
            placeholder="Your Email"
            className="w-full border border-[#22577a] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#22577a]"
            required
          />

          <button
            onClick={handleForgetPassword}
            className={`w-full text-white font-medium py-2 rounded-md transition ${
              loading
                ? "bg-secondary cursor-not-allowed"
                : "bg-[#22577a] hover:bg-[#38a3a5]"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "Send Reset Link"
            )}
          </button>

          <Link to='/login'><button
            className="w-full border border-[#22577a] text-gray-700 font-medium py-2 rounded-md hover:bg-gray-100 transition"
          >
            Back to Login
          </button></Link>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default ForgetPass;
