import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { toast } from "sonner";
import { dateFormatter } from "../../utils";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import SelectList from "../SelectListRole";
import { MdDriveFolderUpload } from "react-icons/md";

import { useAddNewFormationMutation } from "../../redux/slices/api/FormationApiSlice";
import { useUpdateFormationMutation } from "../../redux/slices/api/FormationApiSlice";
import UserList from "./ListUsers";

const TYPE = ["Integré", "Continu", "Certifiant", "Non certifiant"];
const MODE = ["Présentiel", "En ligne", "Hybride"];

const AddFormation = ({ open, setOpen, formation }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const id = user?.id;
  const [text, setText] = useState(formation ? formation.titre : "");

  const [type, setType] = useState(formation ? formation.type : "Integré");
  const [mode, setMode] = useState(formation ? formation.mode : "Présentiel");
  const [participantIds, setParticipantIds] = useState(
    formation?.Participants || []
  );

  const [hiddendate, setHiddenDate] = useState(false);

  const defaultValues = {
    userId: id,
    title: formation?.title || "",
    time: dateFormatter(formation?.time || new Date()),
    type: formation?.type || "Integré",
    mode: formation?.mode || "Présentiel",
    participantIds: formation?.participantIds || [],
    duree: formation?.duree || "",
    lieu: formation?.lieu || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [addNew, { isLoading }] = useAddNewFormationMutation();
  const [update, { isLoading: isUpdating }] = useUpdateFormationMutation();

  const onSubmit = async (data) => {
    try {
      // Transform participantIds to IDs only
      const idsOnly = participantIds.map((p) =>
        typeof p === "object" ? p.id : p
      );

      if (formation) {
        const updatedData = {
          userId: id || formation.userId,
          title: data.title || formation.title,
          mode: mode || formation.mode,
          type: type || formation.type,
          time: data.time || formation.time,
          duree: data.duree || formation.duree,
          participantIds: idsOnly || formation.participantIds,
          lieu: data.lieu || formation.lieu,
        };

        await update({ updatedData, id: formation?.id }).unwrap();
        toast.success("Formation mise à jour avec succès");
      } else {
        const newformationData = {
          userId: id,
          title: data.title,
          mode: mode,
          type: type,
          time: data.time,
          duree: data.duree,
          participantIds: idsOnly,
          lieu: data.lieu,
        };
        await addNew(newformationData).unwrap();
        toast.success("Nouvelle formation ajoutée avec succès");
      }

      setTimeout(() => setOpen(false), 1500);
    } catch (error) {
      console.error("API Error:", error);
      const message =
        error?.data?.message || error.message || "Une erreur est survenue";
      toast.error(message);
    }
  };

  /* 
  //useEffect(() => {
   // console.log("Participant IDs updated:", participantIds);
  },// [participantIds]);
 */
  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog.Title className="text-base font-bold flex gap-40 leading-6 text-blue-900 pb-4">
          {formation ? "Modifier la Formation" : "Nouvelle Formation"}
          {isLoading || isUpdating ? <Loading /> : null}
        </Dialog.Title>

        <div className=" flex flex-col gap-1">
          <Textbox
            placeholder="Saisissez le titre de la formation"
            type="text"
            label="Titre"
            name="title"
            className="w-full rounded-xl"
            register={register("title", {
              required: "Titre est requise",
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "Seules les lettres et les espaces sont autorisés.",
              },
            })}
            error={errors.title?.message}
          />

          <SelectList
            label="Type de Formation"
            lists={TYPE}
            selected={type}
            setSelected={setType}
          />
          <SelectList
            label="Mode de Formation"
            lists={MODE}
            selected={mode}
            setSelected={setMode}
          />
          <UserList
            setParticipantIds={setParticipantIds}
            participantIds={participantIds}
          />
          <Textbox
            placeholder="Sélectionnez la date et l'heure"
            type="datetime-local"
            label="Date et heure"
            name="time"
            className="w-full rounded-xl"
            register={register("time", { required: "La date est requise !" })}
            error={errors.time?.message}
          />

          <Textbox
            placeholder="Duree de la formation"
            type="number"
            label="duree (en heures)"
            name="duree"
            className="w-full rounded-xl"
            register={register("duree", { required: "duree est requise!" })}
            error={errors.duree?.message}
          />
          <Textbox
            placeholder="Lieu de la formation"
            type="text"
            label="Lieu de la formation"
            name="lieu"
            className="w-full rounded-xl"
            register={register("lieu", { required: "lieu est requise!" })}
            error={errors.lieu?.message}
          />

          <div className=" flex flex-row-reverse gap-4 pt-2">
            <Button
              label="Submit"
              type="submit"
              className="bg-blue-900 px-8 text-sm font-semibold text-white hover:bg-blue-700 rounded-2xl sm:w-auto"
            />

            <Button
              type="button"
              label="Cancel"
              onClick={() => setOpen(false)}
              className="bg-gray-600 px-8 text-sm font-semibold text-white hover:bg-gray-400 rounded-2xl sm:w-auto"
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddFormation;
