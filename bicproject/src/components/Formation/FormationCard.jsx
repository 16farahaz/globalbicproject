import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate,dateFormatter } from "../../utils/index";
import FormationDialog from "../Formation/FormationDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList, FaStar } from "react-icons/fa";
import logo from "../../assets/bic7.jpg";
import UserInfo from "../UserInfo";





const bgColor = {
  Présentiel: "bg-white",
  Hybride: "bg-white",
  "En ligne": "bg-white",
};

const ICONS = {
    "Présentiel": <MdKeyboardDoubleArrowUp />,
    Hybride: <MdKeyboardArrowUp />,
    "En ligne": <MdKeyboardArrowDown />,
    
  };

const FormationCard = ({formation}) => {
    const {user} = useSelector((state)=>state.auth);
    const [open,setOpen] = useState(false);

 
    
  return (
    <>
        <div className="w-full h-fit shadow-md p-3 rounded-md">
            <div className="w-full flex justify-between">
                 <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium ", PRIOTITYSTYELS[formation?.mode])}>
                   <span className="text-lg">{ICONS[formation.mode]}</span>
                  <span className="uppercase">{formation?.mode}</span>
                 {formation?.time ?
                 <span className="text-sm text-gray-600">{formatDate(new Date(formation?.time))}</span> : ""}
  
               </div>
                           {user && <FormationDialog formation={formation} />}

             </div>

              <>
                      <div className="flex items-center gap-2">
                        

                          <h4 className="line-clamp-1 text-black">{formation?.title}</h4>
                      </div>
                    
                     <div className="w-full h-9 border-t p-1 border-gray-200 my-2  ">
                
                <div className="flex items-center justify-between mb-2 ">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1 items-center text text-sm text-gray-600">
                        < FaStar/>
                        <span>lol</span>

                        </div>
                        
                        

                    </div>

                    <div className="flex flex-row-reverse">
                        {formation?.Participants?.map((m,index)=>(
                            <div
                            key={index}
                            className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",BGS[index % BGS?.length])}
                            >
                             <UserInfo user={m} />
                            </div>
                        ))}
                    </div>

                </div>
              </div>
                      {/* <span className="text-sm text-gray-600">{formatDate(new Date(formation?.createdAt))}</span> */}
                      
              </>
             
  <div className="w-full h-2 border-t border-gray-200 "></div>
              <div className="w-full h-25 overflow-hidden rounded ">
                           <img
                           src={logo}
                           alt={formation?.title}
                           className="w-full h-full object-cover object-top transition-all duration-700 hover:scale-125 hover:z-50"
                            />
                           </div>

             
              
                </div>   
         
    </>
  )
}

export default FormationCard
