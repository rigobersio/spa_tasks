import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { useLanguage } from '../context/LanguageContext';


const Footer = () => {
  const { castelian } = useLanguage();

  return (
    <footer className="relative bg-[#5D9C59] text-yellow-50 transition">
      <div className="relative top-0 left-0 w-[100%] overflow-hidden">
        <svg data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none">
          <path
            d="M1200 0L0 0 598.97 114.72 1200 0z"
            className="relative block h-[600px] fill-[#DDF7E3]"></path>
        </svg>
        <div className="grid lg:grid-cols-4 gap-20 sm:grid-cols-1 p-20">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl text-pink-500">{castelian? "Acerca de SPA-Tasks" : "About SPA-Tasks"}</h2>
            <p>
              {
                castelian ?
                "SPA-Tasks es una aplicación web con una interfaz sencilla, asistida por perritos 🐶, que permite a los usuarios crear, visualizar, editar y eliminar tareas, manteniéndolas organizadas en un solo lugar. 📝"
                :
                "SPA-Tasks is a web application with a simple interface, assisted by puppies 🐶, that allows users to create, view, edit, and delete tasks, keeping them organized in one place. 📝"
              }
            </p>
          </div>

          <div>
            <li className="text-[22px] list-none font-semibold text-pink-500 py-2 uppercase">
              Rigoberto Martínez
            </li>
            <img
              className="my-4 rounded-full w-20 h-20 object-cover"
              src="https://res.cloudinary.com/dqh2illb5/image/upload/v1715016763/myPerfil/1710771555673_Git-Hub_unujoi.jpg"
              alt="Rigoberto Martínez"
            />
            <li className="my-4 list-none flex items-center gap-3">
              <CgWebsite className="mr-1" />
              <a href="https://porfolio-rigoberto.vercel.app/" target="_blank" rel="noreferrer" className="ml-1 text-white hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out">Portafolio</a>
            </li>
            <li className="my-4 list-none flex items-center gap-3">
              <FaLinkedinIn className="mr-1" />
              <a href="https://www.linkedin.com/in/rigoberto-martinez/" target="_blank" rel="noreferrer" className="ml-1 text-white hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out">LinkedIn</a>
            </li>
          </div>

          <div>
            <li className="text-[22px] list-none font-semibold text-pink-500 py-2 uppercase">
              Franco De Vincentis
            </li>
            <img
              className="my-4 rounded-full w-20 h-20 object-cover"
              src="https://res.cloudinary.com/dqh2illb5/image/upload/v1723593004/SPA-Tasks/Franco-perfil_wwmbmu.jpg"
              alt="Franco De Vincentis"
            />
            <li className="my-4 list-none flex items-center gap-3">
              <CgWebsite className="mr-1" />
              <a href="" target="_blank" rel="noreferrer" className="ml-1 text-white hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out">Portafolio</a>
            </li>
            <li className="my-4 list-none flex items-center gap-3">
              <FaLinkedinIn className="mr-1" />
              <a href="https://www.linkedin.com/in/franco-de-vincentis/" target="_blank" rel="noreferrer" className="ml-1 text-white hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out">LinkedIn</a>
            </li>
          </div>
          <div className="mb-4 md:mb-0">
            <h2 className="text-[22px] font-semibold text-pink-500 py-2 uppercase">{castelian ? "Contacto" : "Contact"}</h2>
            <p className="text-[16px] my-4">{castelian ? "Correos electrónicos" : "Emails:"}</p>
            <li className="my-4 list-none flex items-center">rigoberto.developer@tutanota.com</li>
            <li className="my-4 list-none flex items-center">devincentisf35@gmail.com</li>
            <li className="my-4 list-none flex items-center gap-3">
              <FaGithub className="mr-1" />
              <a href="https://github.com/rigobersio/spa_tasks" className="ml-1 text-white hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out">{castelian ? "Repositorio" : "Repository"}</a>
            </li>
          </div>
        </div>

        <h6 className="text-center">Copyright © 2025 - All right reserved by UnMomentum</h6>
      </div>
    </footer>
  );
};

export default Footer;