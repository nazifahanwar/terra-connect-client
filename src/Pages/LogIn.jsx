import React, { use, useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import authLogo from '../assets/authBg.jpg' 
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../AuthContext/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../assets/icons8-sustainability-64.png'
import { toast } from 'sonner';

const LogIn = () => {
  const { signIn, signInWithGoogle, setUser,loading,setLoading} = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const emailRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    signIn(email, password)
      .then(() => {
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false)
      });
  };

  const handleToggleShowPass = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        setUser(result.user);
        navigate(`${location.state ? location.state : "/"}`);
      })
      
  };

  

  return (
      <div className="flex items-center justify-center p-6 max-sm:rounded-md min-h-screen"style={{ backgroundImage: `url(${authLogo})` }}>
        <div className="w-full max-w-sm bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg w-[400px]">
        <div className='flex flex-col items-center'>
            <Link to='/'><img src={logo} alt="logo" title='Go Back to Home' />
            </Link>
          <h2 className="text-2xl font-semibold text-center mb-2">Welcome Back!</h2>
        </div>
          <p className="text-accent text-center mb-6">
            Enter your email and password to access your account.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                ref={emailRef}
                placeholder="Email"
                className="w-full border border-base-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-base-300"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="w-full border border-base-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-base-300"
                required
              />
              <button
                type="button"
                className="absolute top-9 right-2"
                onClick={handleToggleShowPass}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div>
                <Link to='/forget-password' className="text-gray-700 hover:text-black cursor-pointer">Forgot password?</Link>
              </div>
            </div>

            <button
              type="submit"className={`w-full text-white font-medium py-2 rounded-md transition ${
              loading ? 'bg-secondary cursor-not-allowed' : 'bg-[#22577a] hover:bg-[#38a3a5]'
            }`}
            disabled={loading}
          >
            {loading ? <span className="loading loading-dots loading-md"></span>
 : 'Login'}</button>

            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full border border-base-300 text-gray-700 font-medium py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-xl" />
              <p>Continue with Google</p>
            </button>
          </form>

          <div className="mt-3 text-center text-sm">
            <p>
              Don’t have an account?{' '}
              <Link className="underline text-[#22577a]" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>

      
  );
};

export default LogIn;