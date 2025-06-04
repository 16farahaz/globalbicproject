import React, { useState } from 'react';
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
  MdEmojiEvents,
} from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";

import { IoIosArrowDown } from "react-icons/io";
import { BsArrow90DegDown } from 'react-icons/bs';
import { FcStatistics } from "react-icons/fc";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";

import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authSlice';
import clsx from 'clsx';
import logo from '../assets/bic7.jpg';

const linkData = [
  {
    label: "Accueil",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Formation",
    link: "formation",
    icon: <FaTasks />,
  },
  // We'll replace this entry by a dropdown
  /*
  {
    label: "Evaluation à froid",
    link: "evaluationaf",
    icon: <MdOutlinePendingActions />,
  },
  */
  {
    label: "Dashboard",
    link: "visualisation",
    icon: <FcStatistics />,
  },
  {
    label: "Utilisateur",
    link: "users",
    icon: <FaUsers />,
  },
];

const Sidebare = () => {
  const { user } = useSelector(state => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const path = location.pathname.split("/")[1];
  const SidebareLinks = user?.isAdmin ? linkData : linkData.slice(0, 4);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  // State to toggle dropdown open/close
  const [evalOpen, setEvalOpen] = useState(false);

  // Custom NavLink component for normal links
  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
          path === el.link.split("/")[0] ? "bg-blue-900 text-white" : ""
        )}
      >
        {el.icon}
        <span>{el.label}</span>
      </Link>
    );
  };

  // Dropdown for Evaluation
  const EvaluationDropdown = () => {
    const items = [
      { label: "Espace de dépot de projet", link: "projet" },
      { label: "Test technique", link: "testtechnique" },
    ];

    // Check if current path is in evaluation dropdown items
    const isActive = items.some(item => path === item.link);

    return (
      <div className="w-full lg:w-3/4">
        <button
          onClick={() => setEvalOpen(!evalOpen)}
          className={clsx(
            "w-full flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
            isActive ? "bg-blue-900 text-white" : ""
          )}
        >
          <MdOutlinePendingActions />
          <span>Evaluation à froid</span>
          <span className="ml-auto">{evalOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
        </button>
        {evalOpen && (
          <div className="flex flex-col pl-8 gap-2 mt-1">
            {items.map(item => (
              <Link
                key={item.link}
                to={item.link}
                onClick={() => {
                  closeSidebar();
                  setEvalOpen(false);
                }}
                className={clsx(
                  "py-1 text-gray-700 hover:text-blue-600",
                  path === item.link ? "font-bold text-blue-700" : ""
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-10 p-3">
      <div className="flex gap-1 items-center justify-center">
        <img src={logo} alt="logo" className="w-50 h-20" />
      </div>
      <div className='w-full h-full'>
        {/* Render the first 2 links normally */}
        {SidebareLinks.slice(0, 2).map(link => (
          <NavLink el={link} key={link.label} />
        ))}

        {/* Render Evaluation dropdown */}
        <EvaluationDropdown />

        {/* Render the remaining links */}
        {SidebareLinks.slice(2).map(link => (
          <NavLink el={link} key={link.label} />
        ))}

        <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-800 pt-5">
          <MdSettings className="animate-spin" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebare;
