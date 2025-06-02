import clsx from "clsx";
import React from "react";
import { useParams } from "react-router-dom";
import { formations } from "../assets/data";
import { PRIOTITYSTYELS, formatDate } from "../utils";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import logo from "../assets/bic7.jpg"
const ICONS = {
  Présentiel: <MdKeyboardDoubleArrowUp/>, // You can replace with your icons
  Hybride: <MdKeyboardArrowUp />,
  "En ligne": <MdKeyboardArrowDown />,
  
};
import { useGetFormationDetailsQuery } from "../redux/slices/api/FormationApiSlice";
import Loader from "../components/Loader";

const bgColor = {
  Présentiel: "bg-white",
  Hybride: "bg-white",
  "En ligne": "bg-white",
};

const FormationDetails = () => {
  // Using id from params but will fallback to id=0 if not found or not provided
  const { id } = useParams();
  const { data, isLoading, error } = useGetFormationDetailsQuery(id);
  if (isLoading) return <Loader />;

  // Find formation by id
  const formation = data;
  console.log("formation", formation);

  return (
    <div className="w-full flex flex-col gap-3 mb-4 rounded-md overflow-y-hidden">
      <h1 className="text-2xl text-gray-600 font-bold">{formation.title}</h1>

      <div
        className={clsx(
          "w-full flex flex-col md:flex-row gap-5 2xl:gap-8 shadow-md p-8 overflow-y-auto rounded-sm",
          bgColor[formation.mode]
        )}
      >
        {/* Left side details */}
        <div className="w-full md:w-1/2 space-y-8">
          <div
            className={clsx(
              "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
              PRIOTITYSTYELS[formation.mode],
              bgColor[formation.mode]
            )}
          >
            <span className="text-lg">{ICONS[formation.mode]}</span>
            <span className="uppercase">{formation.mode}</span>
          </div>

          <p className="text-gray-500 pt-5">
            <strong>Type:</strong> {formation.type}
          </p>

          <p className="text-gray-500">
            <strong>Lieu:</strong> {formation.lieu}
          </p>

          <p className="text-gray-500">
            <strong>Date & Heure:</strong>{" "}
            {formatDate(new Date(formation.time))}
          </p>

          <p className="text-gray-500">
            <strong>Durée (heures):</strong> {formation.duree} h
          </p>
        </div>

        {/* Right side: placeholder image or asset */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <p className='text-gray-500 font-semibold text-lg pb-5'>Images de formation </p>
          <img
            src={logo}
            alt={formation.title}
            className="w-60 h-30 "
          />
        </div>
      </div>
    </div>
  );
};

export default FormationDetails;
