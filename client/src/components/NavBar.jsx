import React, { useState } from "react";
import { Link as LinkRouter } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineAddReaction } from "react-icons/md";
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const NavBar = () => {
  const [click, setClick] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { castelian, changeLanguage } = useLanguage();

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    logout();
    setClick(false);
  };

  const content = (
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-[#5D9C59] text-yellow-50 transition">
      <ul className="text-center text-xl p-1">
        <LinkRouter to="/" onClick={handleClick}>
          <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">SPA-Tasks</li>
        </LinkRouter>
        <LinkRouter to="/tasks" onClick={handleClick}>
          <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">{castelian ? 'Tareas' : 'Tasks'}</li>
        </LinkRouter>
        {!isAuthenticated ? (
          <>
            <LinkRouter to="/register" onClick={handleClick}>
              <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">{castelian ? 'Registro' : 'Register'}</li>
            </LinkRouter>
            <LinkRouter to="/login" onClick={handleClick}>
              <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">{castelian ? 'Iniciar Sesión' : 'Login'}</li>
            </LinkRouter>
          </>
        ) : (
          <>
            <LinkRouter to="/profile" onClick={handleClick}>
              <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">{castelian ? 'Mi perfil' : 'Profile'}</li>
            </LinkRouter>
            <LinkRouter to="/logout" onClick={handleClick}>
              <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">{castelian ? 'Cerrar sesión' : 'Logout'}</li>
            </LinkRouter>
          </>
        )}
      </ul>
    </div>
  );

  return (
    <nav>
      <div className="h-10vh flex justify-between z-50 bg-[#5D9C59] text-yellow-50 lg:py-5 pl-20 pr-3 py-4">
        <div className="flex items-center">
          <span className="text-3xl font-bold mr-3 lg:mr-0"><MdOutlineAddReaction /></span>
          <div className="lg:hidden flex items-center ml-3 space-x-4">
          <button onClick={() => changeLanguage(true)} className="w-8 h-8">
            <img src="/flag-chile.svg" alt="Chile Flag" className="w-full h-full object-cover" />
          </button>
          <button onClick={() => changeLanguage(false)} className="w-8 h-8">
            <img src="/flag-united-kingdom.svg" alt="UK Flag" className="w-full h-full object-cover" />
          </button>
        </div>
        </div>
        <div className="lg:flex items center justify-end font-normal hidden text-2xl ">
          <div className="flex  mr-2">
            <ul className="flex gap-8 text-[18]">
              <LinkRouter to="/">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">SPA-Tasks</li>
              </LinkRouter>
              <LinkRouter to="/tasks">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">{castelian ? 'Tareas' : 'Tasks'}</li>
              </LinkRouter>
              {!isAuthenticated ? (
                <>
                  <LinkRouter to="/register">
                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">{castelian ? 'Registro' : 'Register'}</li>
                  </LinkRouter>
                  <LinkRouter to="/login">
                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">{castelian ? 'Iniciar Sesión' : 'Login'}</li>
                  </LinkRouter>
                </>
              ) : (
                <>
                  <LinkRouter to="/profile">
                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">{castelian ? 'Mi perfil' : 'Profile'}</li>
                  </LinkRouter>
                  <LinkRouter to="/logout">
                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">{castelian ? 'Cerrar sesión' : 'Logout'}</li>
                  </LinkRouter>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <button onClick={() => changeLanguage(true)} className="w-8 h-8">
            <img src="/flag-chile.svg" alt="Chile Flag" className="w-full h-full object-cover" />
          </button>
          <button onClick={() => changeLanguage(false)} className="w-8 h-8">
            <img src="/flag-united-kingdom.svg" alt="UK Flag" className="w-full h-full object-cover" />
          </button>
        </div>
        <div>{click && content}</div>
        <button className="block lg:hidden transition" onClick={handleClick}>{click ? <FaTimes /> : <CiMenuFries />}</button>
      </div>
    </nav>
  );
};

export default NavBar;
