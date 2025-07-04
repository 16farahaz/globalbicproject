import React from 'react'
import { setOpenSidebar } from '../redux/slices/authSlice'
import { MdOutlineSearch } from "react-icons/md"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import UserAvatar from './UserAvatar'


const Navbar = () => {
    const {user} = useSelector(state=>state.auth); //get user from redux store
    const dispatch = useDispatch(); //dispatch function to dispatch actions to the store
    
    
    

  return (
    <div className='flex justify-between bg-white px-4 py-3 '>
        <div className='flex gap-4 '>

            <button  onClick={() => dispatch(setOpenSidebar(true))} className='text-2xl text-gray-500 block md:hidden '>
            ☰             
            </button> 
            <div className='w-80 2xl:w-[400px] flex item-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
            <MdOutlineSearch  className='text-gray-500 text-xl '/>
            <input type="text" placeholder='Search ...' className=' flex-1 outline-none  bg-transparent placeholder:text-gray-500 text-gray-800' />

            </div>

        </div>
        <div className='flex gap-4 items-center '>
            <UserAvatar/>

        </div>
      
    </div>
  )
}

export default Navbar
