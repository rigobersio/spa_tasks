import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { logoutRequest } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';


const LogoutPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { logout } = useAuth();
  const { castelian } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsSubmitting(true); // Desactivar el botón
    toast.info('Logging out, please wait...'); // Mostrar alerta de que el proceso está en curso
    
    try {
      await logoutRequest();
      logout();
      toast.dismiss(); // Descartar la alerta en curso
      toast.success("Logout successful!");
      navigate("/");
    } catch (error) {
      //console.log("Logout error:", error);
      toast.dismiss(); // Descartar la alerta en curso
      toast.error("Logout error");
      windows.location.reload();
    }
  };

  return (
    <div className='text-justify'>
      <div className="bg-green-50 text-green-900 p-6 sm:mx-0 mx-[5%] rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mt-4 mb-5">{castelian ? "SPA-Tasks te desea una buena jornada 📝" : "Goodbye from SPA-Tasks! 📝"}</h1>
        <p className="text-lg mb-5">
          {
            castelian ?
            `¡Nos da pena que te vayas! Usa el botón de abajo para cerrar sesión y volver pronto. Recuerda, ¡tus tareas te están esperando! 🔥`
            :
            `We're sad to see you go! Use the button below to log out and come back soon. Remember, your tasks are waiting for you! 🔥"`
          }
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:px-14 py-12 w-full gap-20">
        <div className="lg:ml-10 m-3 w-[70%] sm:w-[50%] lg:w-[25%] border-2 border-solid border-fuchsia-600 bg-[#5D9C59] text-white rounded-md">
          <h2 className="text-2xl font-bold lg:pt-3 lg:my-1 my-3 text-center">{castelian ? "Cerrar sesión" : "Logout"}</h2>
          <div className="flex justify-center lg:pt-5 pb-5 lg:mb-2">
            <button
              onClick={handleLogout}
              disabled={isSubmitting}
              className="bg-white text-[#5D9C59] py-2 px-12 rounded-md shadow-md hover:bg-gray-100 transition duration-300"
            >
            {isSubmitting ?
              (castelian ? 'Se está cerrando sesión ...' : 'Logging out...')
              :
              <strong>{castelian ? "Cerrar sesión" : "Logout"}</strong>
            }
            </button>
          </div>
        </div>
        <div className="lg:pl-10 lg:pt-10 lg:w-[60%] w-[70%] flex flex-col items-center justify-center relative">
          <div className="bg-green-50 px-2 pt-6 pb-6 rounded-lg shadow-md text-green-900 w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">{castelian ? "Cierre de sesión rápido con la ayuda de Apo 11 🚀🐶" : "Quick logout with the help of Apo 11 🚀🐶"}</h2>
            <p className="text-lg mb-4">
              {
                castelian ?
                "¡Hola, humano! Soy Apo 11 🚀🐶, tu guía de confianza 🚀🐶. Cerrar sesión es fácil, solo sigue estos pasos:"
                :
                "Hey human! I'm Apo 11 🚀🐶, your trusty guide 🚀🐶. Logging out is easy, just follow these steps:"
              }
            </p>
            <ol className="mb-4 space-y-4">
              <li>{castelian ? '1. Toca o haz click en el botón "Cerrar sesión"' : '1. Tap or click on the "Logout" button'}</li>
              <li>{castelian ? "2. Ahora solo tienes que esperar porque el proceso ocurre en automágico 🚗🪄" : "2. Wait for the magic to happen 🚀✨"}</li>
            </ol>
            <p className="text-lg mb-4">
              {
                castelian ?
                "Recuerda, siempre estaré aquí para guiarte en tus tareas cuando regreses 🚀🚀🚀."
                :
                "Remember, I'll always be here to guide you through your tasks when you return 🚀🚀🚀."
              }
            </p>
          </div>
          <div className="mt-6 w-full flex sm:flex-row flex-col sm:items-end items-center gap-3">
            <img
              className="lg:ml-3 lg:mt-1 sm:w-[30%] w-[60%] sm:mt-[3%] mt-[15%] ml-8 rounded-full shadow-lg"
              src="https://res.cloudinary.com/dqh2illb5/image/upload/v1720464122/login/pexels-steshkawillems-1289557_lbcmki.jpg"
              alt={castelian ? "imagen de un perro mirando como cierras tu sesión" : "image of a dog looking at how you are logging out"}
            />
            <div className="bg-yellow-200 text-yellow-800 p-2 lg:mx-1 sm:mr-1 md:mx-2 rounded-lg sm:max-w-[60%] w-auto mt-4 sm:mt-0">
              <p className="text-lg">
                {
                  castelian ?
                  "Soy yo otra vez, Apo 11 🚀🐶. Si tienes algún problema para cerrar sesión, no dudes en pedir ayuda. ¡Y ten siempre cuidado con esos gatos piratas de la web! 🐾"
                  :
                  "It's me again, Apo 11 🚀🐶. If you have any trouble logging out, feel free to ask for help. And always be wary of those web pirate cats! 🐾"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
