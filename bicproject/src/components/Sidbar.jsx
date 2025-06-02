import React from 'react';
import {
    MdDashboard,
    MdOutlineAddTask,
    MdOutlinePendingActions,
    MdSettings,
    MdTaskAlt,
    MdEmojiEvents,
  } from "react-icons/md";
  import { FcStatistics } from "react-icons/fc";
  import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
  import { FcTodoList } from "react-icons/fc";

  import { Link, NavLink, useLocation } from "react-router-dom";

import { useDispatch,useSelector } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authSlice';
import clsx from 'clsx';
import logo from '../assets/bic7.jpg';


const linkData = [
    {
      label: "Dashboard",
      link: "dashboard",
      icon: <MdDashboard />,
    },
    {
      label: "Formation",
      link: "formation",
      icon: <FaTasks />,
    },

    {
      label: "Evaluation à froid",
      link: "evaluationaf",
      icon: <MdOutlinePendingActions />,
    },
    {
      label: "Evaluation à chaud",
      link: "evaluationac",
      icon: <FcTodoList />,
    },
    {
      label: "Statistics et visualisation",
      link: "visualisation",
      icon: <FcStatistics/>,
    },
    {
      label: "Team",
      link: "users",
      icon: <FaUsers />,
    },
  ];

  
  
const Sidebare = () =>
{
  const {user} =useSelector(state=>state.auth); //get user from redux store
  const location = useLocation();//get current location
  const dispatch = useDispatch();//dispatch function pour effectuer des actions sur le store et changer l'etat 
  const path = location.pathname.split("/")[1]; //get the first part of the path pour comparer avec les liens du sidebar
  const SidebareLinks = user?.isAdmin ? linkData : linkData.slice(0.4); //if user is Super admin show all links else show only the first 4 links
  const closeSidebar = () => { //close sidebar par la fonction setopenSidebar qui prend en parametre false vers le store dans le slice authSlice
    dispatch(setOpenSidebar(false)); //dispatch est une fonction qui permet de declencher une action pour changer l'etat du store par le reducer dans le slice
  }
  const NavLink=({el})=>{ //component NavLink qui prend en parametre un element du tableau SidebareLinks pour afficher les liens du sidebar
    return(
      //to = {el.link} pour rediriger vers le lien du sidebar et le split pour recuperer le premier element du lien pour comparer avec le path
        <Link  to = {el.link } onClick = {closeSidebar} className={clsx("w-full lg:w-3/4 flex  gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base  hover:bg-[#2564ed2d]",
            path===el.link.split("/")[0]? "bg-blue-900 text-white" : "") }> 

                {el.icon}
                <span className=''>{el.label}</span>
            </Link>
    )
  }
  return (
    <div className='w-full h-full flex flex-col  gap-15 p-3'>
        <div className='flex gap-1 items-center justify-center'>
           
            <img src={logo} alt="logo" className="w-50 h-20" />

        </div>
        <div className=''>
            {
                SidebareLinks.map((link)=>( <NavLink   el={link} key={link.label}  />))
            }
             <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800 pt-5'>
               <MdSettings className='animate-spin'/>
               <span>Settings</span>
             </button>

        </div>
        
    </div>
  )
}

export default Sidebare
