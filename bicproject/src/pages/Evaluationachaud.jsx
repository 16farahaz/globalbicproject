import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { PRIOTITYSTYELS, formatDate } from "../utils";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useGetFormationDetailsQuery } from "../redux/slices/api/FormationApiSlice";
import { useAddNewEvaluationMutation } from "../redux/slices/api/EvaluationApiSlice";
import Loader from "../components/Loader";
import Score from "../components/Evaluationachaud/score";
import Button from "../components/Button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ICONS = {
  Présentiel: <MdKeyboardDoubleArrowUp />,
  Hybride: <MdKeyboardArrowUp />,
  "En ligne": <MdKeyboardArrowDown />,
};

const bgColor = {
  Présentiel: "bg-white",
  Hybride: "bg-white",
  "En ligne": "bg-white",
};

const Evaluationachaud = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetFormationDetailsQuery(id);
  const [addNewEvaluation] = useAddNewEvaluationMutation();

  const [q1, setQ1] = useState(0);
  const [q2, setQ2] = useState(0);
  const [q3, setQ3] = useState(0);
  const [q4, setQ4] = useState(0);
  const [q5, setQ5] = useState(0);

  if (isLoading) return <Loader />;

  const formation = data;

  const handleSubmit = async () => {
    try {
      const evaluationData = {
        userId,
        formationId: id,
        question1: q1,
        question2: q2,
        question3: q3,
        question4: q4,
        question5: q5,
      };

      await addNewEvaluation(evaluationData).unwrap();
      toast.success("Évaluation enregistrée avec succès !");
      Navigate("/formation");
    } catch (err) {
      toast.error(
        err?.data?.message ||
          "Une erreur s'est produite lors de l'enregistrement de l'évaluation."
      );
      navigate("/formation");

      
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 mb-4 rounded-md overflow-y-auto">
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
            <strong>Date & Heure:</strong> {formatDate(new Date(formation.time))}
          </p>

          <p className="text-gray-500">
            <strong>Durée (heures):</strong> {formation.duree} h
          </p>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 flex flex-col gap-5 items-center justify-center">
          <p className="text-gray-500 font-semibold text-2xl">
            Évaluer la formation
          </p>

          <div className="w-full flex items-center shadow-xl bg-gray-100 rounded-md p-4 gap-40">
            <strong className="text-gray-600">
              La salle a été bien équipée
            </strong>
            <Score onChange={(value) => setQ1(value)} />
          </div>

          <div className="w-full flex items-center shadow-xl bg-gray-100 rounded-md p-4 gap-27">
            <strong className="text-gray-600">
              La formation a été bien organisée
            </strong>
            <Score onChange={(value) => setQ2(value)} />
          </div>

          <div className="w-full flex items-center shadow-xl bg-gray-100 rounded-md p-4 gap-15">
            <strong className="text-gray-600">
              Le formateur a bien modéré la formation
            </strong>
            <Score onChange={(value) => setQ3(value)} />
          </div>

          <div className="w-full flex items-center shadow-xl bg-gray-100 rounded-md p-4 ">
            <strong className="text-gray-600">
              Le contenu de la formation a répondu à mes attentes
            </strong>
            <Score onChange={(value) => setQ4(value)} />
          </div>

          <div className="w-full flex items-center shadow-xl bg-gray-100 rounded-md p-4 gap-25">
            <strong className="text-gray-600">
              La documentation a été structurée
            </strong>
            <Score onChange={(value) => setQ5(value)} />
          </div>

          <div className="w-full md:w-1/2 flex justify-end">
            <div className="py-3 mt-4 gap-2 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-900 px-8 rounded-xl text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
                label="Évaluer"
                onClick={handleSubmit}
              />
              <Button
                type="button"
                className="bg-gray-500 px-8 text-sm rounded-xl font-semibold text-white sm:w-auto"
                label="Annuler"
                onClick={() => window.history.back()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluationachaud;
