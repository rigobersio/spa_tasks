import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { loginRequest } from "../api/auth";
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';



const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { castelian } = useLanguage();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true); // Desactivar el botón
    toast.info('Logging in, please wait...'); // Mostrar alerta de que el proceso está en curso

    try {
      const res = await loginRequest(data);
      //console.log('Login response:', res);

      if (res.status === 200) {
        //console.log('Login successful!');
        login();
        toast.dismiss(); // Descartar la alerta en curso
        toast.success('Login successful!');
      } else {
        toast.dismiss(); // Descartar la alerta en curso
        console.error("Login failed");
        toast.success('Login failed');
      }
    } catch (error) {
      toast.dismiss(); // Descartar la alerta en curso
      console.log("Login error:", error);
      toast.error('Login error');
      toast.info('The page reloads')
      window.location.reload();
    }
  };

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      console.log("Navigating to /tasks");
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div>
      <div className="bg-green-50 text-green-900 p-6 sm:mx-0 mx-[5%] rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mt-4 mb-5">{castelian ? "Bienvenido a la SPA-Tareas 📝" : "Welcome to the SPA-Tasks Login! 📝"}</h1>
        <p className="text-lg mb-5">
          {castelian ? '¡Bienvenido a la SPA-Tareas! Usa el formulario de abajo para iniciar sesión y continuar organizando tus tareas de forma eficiente. ¡Vamos a simplificar tu vida diaria con nuestra SPA! 🔥' : "We're glad to see you again! Use the form below to log in to your account and continue organizing your tasks efficiently. Let's get back to simplifying your daily life with our SPA! 🔥"}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:px-14 py-12 w-full gap-20">
        <div className="lg:ml-10 m-3 lg:w-[40%] md:w-[50%] w-[70%] border-2 border-solid border-fuchsia-600 bg-[#5D9C59] text-white rounded-md">
          <h2 className="text-2xl font-bold lg:my-12 my-3 text-center">{castelian ? 'Iniciar sesión' : 'Login'}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col mx-6">
              <label htmlFor="email" className="text-lg font-medium">{castelian ? 'Correo electrónico' : 'Email'}</label>
              <input
                id="email"
                type="email"
                className="border border-gray-300 text-yellow-800 px-4 py-2 rounded-md my-2"
                placeholder={castelian ? 'Correo electrónico' : 'Email'}
                {...register("email", { required: "The email is required" })}
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col mx-6">
              <label htmlFor="password" className="text-lg font-medium">{castelian ? 'Contraseña' : 'Password'}</label>
              <input
                id="password"
                type="password"
                className="border border-gray-300 text-yellow-800 px-4 py-2 rounded-md my-2"
                placeholder={castelian ? 'Contraseña' : 'Password'}
                {...register("password", { required: "The password is required" })}
              />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>
            <div className="flex justify-center lg:pt-8 lg:mt-12 pb-5">
              <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-[#5D9C59] lg:py-4 py-2 px-12 rounded-md shadow-md hover:bg-gray-100 transition duration-300"
              >
                {isSubmitting ? {castelian ? "Iniciando sesión..." : "Logging in..."} : <strong>{castelian ? 'Iniciar sesión' : 'Login'}</strong>}
              </button>
            </div>
          </form>
        </div>
        <div className="lg:pl-10 lg:pt-10 lg:w-[60%] w-[70%] flex flex-col items-center justify-center relative">
          <div className="bg-green-50 px-2 pt-6 pb-6 rounded-lg shadow-md text-green-900 w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">{castelian ? 'Inicia rápidamente con la ayuda de Apo 11 🚀🐶' : 'Quick start with the help of Apo 11 🚀🐶'}</h2>
            <p className="text-lg mb-4">
              {castelian ? 
              "¡Hola, humano! Soy Apo 11 🚀🐶, un perro muy relajado 🚀🐶 que está aquí para ayudarte a iniciar sesión. Solo sigue estos pasos:"
              :
              "Hey human! I'm Apo 11 🚀🐶, a super chill dog 🚀🐶 here to help you log in. Just follow these steps:"
              }
            </p>
            <ol className="mb-4 space-y-4">
              <li>{castelian ? "1. Introduce tus datos correctamente" : "1. Enter your info correctly"}</li>
              <li>2. etc.</li>
            </ol>
            <p className="text-lg mb-4">
              {
                castelian ?
                "Si sigues las instrucciones cuidadosamente, no tendrás ningún problema 🚀🚀🚀."
                :
                "If you follow the instructions carefully, you won't have any issues 🚀🚀🚀."
              }
            </p>
          </div>
          <div className="mt-6 w-full flex sm:flex-row flex-col sm:items-end items-center gap-3">
            <img
              className="lg:ml-3 lg:mt-1 sm:w-[30%] w-[60%] sm:mt-[3%] mt-[15%] ml-8 rounded-full shadow-lg"
              src="https://res.cloudinary.com/dqh2illb5/image/upload/v1720464122/login/pexels-steshkawillems-1289557_lbcmki.jpg"
              alt={castelian ? "imagen de un perro mirando como estás iniciando sesión" : "image of a dog looking at how you are logging in"}
            />
            <div className="bg-yellow-200 text-yellow-800 p-2 lg:mx-1 sm:mr-1 md:mx-2 rounded-lg sm:max-w-[60%] w-auto mt-4 sm:mt-0">
              <p className="text-lg">
                {
                  castelian ?
                  "Ahora, con la misma onda: 'Hola, soy yo otra vez, Apo 11 🚀🐶. Si tienes problemas con la autenticación, pídele ayuda a cualquier perro de confianza. Y, hagas lo que hagas, mantente alejado de esos gatos piratas de la web. 🐾"
                  :
                  "Now, with the same vibe: 'Hey, it's me again, Apo 11 🚀🐶. If you're having trouble with authentication, ask any trusted dog for help. And whatever you do, steer clear of those web pirate cats. 🐾"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
