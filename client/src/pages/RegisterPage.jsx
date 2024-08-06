import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { registerRequest } from "../api/auth";
//import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [usernameCreated, setUsernameCreated] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await registerRequest(data);
      if (res.status === 200) {
        //toast.success(`User ${res.data.username} created successfully!`);
        setUsernameCreated(true);
      } else {
        //toast.error('Registration failed');
      }
    } catch (error) {
      //toast.error('Registration error');
      console.log("Registration error:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated || usernameCreated) {
      navigate("/login");
    }
  }, [isAuthenticated, usernameCreated, navigate]);

  return (
    <div>
      <div className="bg-green-50 text-green-900 p-6 sm:mx-0 mx-[5%] rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mt-4 mb-5">Welcome to the SPA-Tasks Register! 📝</h1>
        <p className="text-lg mb-5">
          Register now and start simplifying your daily life with our SPA! 🙂
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:px-14 py-12 w-full gap-20">
        <div className="lg:ml-10 m-3 lg:w-[40%] md:w-[50%] w-[70%] border-2 border-solid border-fuchsia-600 bg-[#5D9C59] text-white rounded-md">
          <h2 className="text-2xl font-bold lg:my-12 my-3 text-center">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col mx-6">
              <label htmlFor="username" className="text-lg font-medium">Username</label>
              <input
                id="username"
                type="text"
                className="border border-gray-300 text-yellow-800 px-4 py-2 rounded-md my-2"
                placeholder="Username"
                {...register("username", { required: "The username is required" })}
              />
              {errors.username && <p className="text-red-600">{errors.username.message}</p>}
            </div>
            <div className="flex flex-col mx-6">
              <label htmlFor="email" className="text-lg font-medium">Email</label>
              <input
                id="email"
                type="email"
                className="border border-gray-300 text-yellow-800 px-4 py-2 rounded-md my-2"
                placeholder="email@example.com"
                {...register("email", { required: "The email is required" })}
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col mx-6">
              <label htmlFor="password" className="text-lg font-medium">Password</label>
              <input
                id="password"
                type="password"
                className="border border-gray-300 text-yellow-800 px-4 py-2 rounded-md my-2"
                placeholder="Password"
                {...register("password", { required: "The password is required" })}
              />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>
            <div className="flex justify-center lg:pt-8 lg:mt-12 pb-5">
              <button type="submit" className="bg-white text-[#5D9C59] lg:py-4 py-2 px-12 rounded-md shadow-md hover:bg-gray-100 transition duration-300">
                <strong>Register</strong>
              </button>
            </div>
          </form>
        </div>
        <div className="lg:pl-10 lg:pt-10 lg:w-[60%] w-[70%] flex flex-col items-center justify-center relative">
          <div className="bg-green-50 px-2 pt-6 pb-6 rounded-lg shadow-md text-green-900 w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Quick Registration with Philanthropist 🐾</h2>
            <p className="text-lg mb-4">
              Hello human! I'm Philanthropist, the organized dog 🐕 You probably need an app to remember important walks and naps. All fields in the form are required. Send me your information to start organizing your days! 🐾
            </p>
          </div>
          <div className="mt-6 w-full flex sm:flex-row flex-col sm:items-end items-center gap-3">
            <img
              className="lg:ml-3 lg:mt-1 lg:pt-10 sm:w-[40%] w-[60%] sm:mt-[3%] mt-[15%] ml-8 rounded-full shadow-lg"
              src="https://res.cloudinary.com/dqh2illb5/image/upload/v1719868462/login/pexels-charlesdeluvio-1851164_ryomfx.jpg"
              alt="image of a dog looking at how you are registering"
            />
            <div className="bg-yellow-200 text-yellow-800 p-2 lg:mx-1 sm:mr-1 md:mx-2 rounded-lg sm:max-w-[60%] w-auto mt-4 sm:mt-0">
              Remember! All fields are required 🐾 Send the form and you can have your life more organized thanks to SPA-Tasks! 🐶
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
