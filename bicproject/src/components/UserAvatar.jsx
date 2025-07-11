import React from 'react'
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitials } from '../utils';
import { useLogoutMutation } from '../redux/slices/api/authApiSlice';
import { toast } from 'sonner';
import { logout } from '../redux/slices/authSlice';
import AddUser from './AddUser';
import ChangePassword from './ChangePassword';





const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const {user} = useSelector(state=>state.auth); //get user from redux store
     const dispatch = useDispatch(); //dispatch function to dispatch actions to the store
     const navigate = useNavigate();
     const [logoutUser]  = useLogoutMutation();
 
     const logoutHandler = async () =>{
       try{
         await logoutUser().unwrap();
         dispatch(logout());
         navigate("/login")
       }catch(error){
         console.log(error)
         toast.error("somthing went wrong" , error);
       }
 
   
     };
     

  return (
   <>
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
        <Menu.Button className='w-8 h-8 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-900'>
              <span className='text-white font-semibold'>
               {getInitials(user?.name)}
              </span>
            </Menu.Button>
        </div>
           
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right
              divide-gray-100 rounded-md bg-white shadow-2xl ring-black/5 focus:outline-none z-[9999] ">
               <div className='p-4'>
                <Menu.Item >
                    {({active})=>(
                        <button onClick={()=>setOpen(true)} className='text-gray-700  group flex w-full items-center 
                                                                         rounded-md gap-2 px-2 py-2 text-base '>
                            <FaUser className='mr-2' aria-hidden='true'/>
                            Profile 

                        </button>
                    )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenPassword(true)}
                      className={`text-gray-700 group flex w-full items-center rounded-md gap-2 px-2 py-2 text-base`}
                    >
                      <FaUserLock className='mr-2' aria-hidden='true' />
                      Change Password
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutHandler}
                      className={`text-red-700 group flex w-full items-center rounded-md gap-2 px-2 py-2 text-base`}
                    >
                      <IoLogOutOutline className='mr-2' aria-hidden='true' />
                      Logout
                    </button>
                  )}
                </Menu.Item>
               </div>  
            </Menu.Items>
 

        </Transition>

      </Menu> 
    </div>
    <AddUser open={open} setOpen={setOpen} userData={user} />
    <ChangePassword open={openPassword} setOpen={setOpenPassword} />
   
   </>
  )
}

export default UserAvatar
