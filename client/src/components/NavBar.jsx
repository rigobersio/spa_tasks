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
        <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
          <LinkRouter to="/" onClick={handleClick}>
            SPA-Tasks
          </LinkRouter>
        </li>
        <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
          <LinkRouter to="/tasks" onClick={handleClick}>
            {castelian ? 'Tareas' : 'Tasks'}
          </LinkRouter>
        </li>
        {!isAuthenticated ? (
          <>
            <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
              <LinkRouter to="/register" onClick={handleClick}>
                {castelian ? 'Registro' : 'Register'}
              </LinkRouter>
            </li>
            <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
              <LinkRouter to="/login" onClick={handleClick}>
                {castelian ? 'Iniciar Sesión' : 'Login'}
              </LinkRouter>
            </li>
          </>
        ) : (
          <>
            <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
              <LinkRouter to="/profile" onClick={handleClick}>
                {castelian ? 'Mi perfil' : 'Profile'}
              </LinkRouter>
            </li>
            <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
              <LinkRouter to="/logout" onClick={handleLogout}>
                {castelian ? 'Cerrar sesión' : 'Logout'}
              </LinkRouter>
            </li>
          </>
        )}
      </ul>
    </div>
  );

  return (
    <nav>
      <div className="h-10vh flex justify-between z-50 bg-[#5D9C59] text-yellow-50 lg:py-5 pl-20 pr-1 py-4">
        <div className="flex items-center justify-between w-[40%]">
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
        <div className="lg:flex items center justify-end font-normal hidden text-2xl">
          <div className="flex">
            <ul className="flex gap-8 text-[18]">
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                <LinkRouter to="/">SPA-Tasks</LinkRouter>
              </li>
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                <LinkRouter to="/tasks">{castelian ? 'Tareas' : 'Tasks'}</LinkRouter>
              </li>
              {!isAuthenticated ? (
                <>
                  <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                    <LinkRouter to="/register">{castelian ? 'Registro' : 'Register'}</LinkRouter>
                  </li>
                  <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                    <LinkRouter to="/login">{castelian ? 'Iniciar Sesión' : 'Login'}</LinkRouter>
                  </li>
                </>
              ) : (
                <>
                  <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                    <LinkRouter to="/profile">{castelian ? 'Mi perfil' : 'Profile'}</LinkRouter>
                  </li>
                  <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                    <LinkRouter to="/logout">{castelian ? 'Cerrar sesión' : 'Logout'}</LinkRouter>
                  </li>
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
        <button className="block lg:hidden transition pr-4" onClick={handleClick}>{click ? <FaTimes /> : <CiMenuFries />}</button>
      </div>
    </nav>
  );
};

export default NavBar;
