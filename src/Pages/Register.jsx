import React, { use, useState } from 'react';
import logo from '../assets/icons8-sustainability-64.png'
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../AuthContext/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'sonner';
import authLogo from '../assets/authBg.jpg'

const Register = () => {
  const { createUser, setUser, updateUser, signInWithGoogle,loading,setLoading } = use(AuthContext);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{6,}$/

;
    if (!passPattern.test(password)) {
      setError('Password must be at least six characters long and include at least one uppercase letter, one lowercase letter, and one special character.');
      return;
    }
    try {
    const result = await createUser(email, password);
    const user = result.user;

    await updateUser({ displayName: name, photoURL: photo });

    setUser({ ...user, displayName: name, photoURL: photo });
    navigate("/");  
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};


const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        setUser(result.user);
        navigate("/");
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  const handleToggleShowPass = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };

  return (

      <div className="flex items-center justify-center bg-white p-6 max-sm:rounded-md min-h-screen"style={{ backgroundImage: `url(${authLogo})` }}>
        
        <div className="w-full max-w-sm bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg w-[400px]">
            <div className='flex flex-col items-center'>
                <Link to='/'><img src={logo} alt="logo" title='Go Back to Home' />
</Link>
           <h2 className='text-2xl text-center'>Join <span className='text-base-300 font-medium'>Terra Connect</span>!
          </h2>
            </div>
          <p className="text-gray-600 text-center mb-4">
            Join, act, and grow together for a greener tomorrow.</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                className="w-full border border-[#22577a] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#22577a]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                className="w-full border border-[#22577a] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#22577a]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Photo URL
              </label>
              <input
                name="photo"
                type="url"
                placeholder="Profile Image URL"
                className="w-full border border-[#22577a] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#22577a]"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="Create Password"
                className="w-full border border-[#22577a] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#22577a]"
                required
              />
              <button
                type="button"
                className="absolute top-8 right-3"
                onClick={handleToggleShowPass}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
              {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
            </div>

            <button
            type='submit'
              className={`w-full text-white font-medium py-2 rounded-md transition ${
              loading ? 'bg-secondary cursor-not-allowed' : 'bg-[#22577a] hover:bg-[#45b885]'
            }`}
            disabled={loading}
          >
            {loading ? <span className="loading loading-dots loading-md"></span>
 : 'Register'}
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full border border-[#22577a] text-gray-700 font-medium py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-xl" />
              <p>Continue with Google</p>
            </button>
          </form>

          <div className="mt-3 text-center text-sm">
            <p>
              Already have an account?{' '}
              <Link className="underline text-[#22577a]" to="/authentication/login">
                Log in
              </Link>
            </p>
          </div>
        </div>
</div>
      
    
  );
};

export default Register;