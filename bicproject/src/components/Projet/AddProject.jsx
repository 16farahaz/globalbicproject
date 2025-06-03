import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { MdDriveFolderUpload } from "react-icons/md";
import { toast } from "sonner";

import {
  useAddProjectMutation,
  useUpdateProjectMutation,
} from "../../redux/slices/api/ProjectApiSlice";
import { useGetFormationListQuery } from "../../redux/slices/api/FormationApiSlice";

import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import ScrollingList from "./ScrollingList";

const AddProject = ({ open, setOpen, projet }) => {
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;

  const params = useParams();
  const status = params?.status || "";

  const { data, isLoading } = useGetFormationListQuery(id);
  const formations = data || [];

  const [selectedFormation, setSelectedFormation] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      titre: "",
    },
  });

  const [addProject, { isLoading: isAdding }] = useAddProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  useEffect(() => {
    if (projet) {
      setValue("titre", projet.titre || "");
      setSelectedFormation(projet.formationId || "");
      if (projet.file) {
        setSelectedFile({ name: projet.file }); // simulate file name
      }
    } else {
      setValue("titre", "");
      setSelectedFormation("");
      setSelectedFile(null);
    }
  }, [projet, setValue]);

  const handleFormationSelection = (id) => {
    setSelectedFormation(id);
  };

  const handleSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("titre", data.titre);
      formData.append("formationId", selectedFormation);
      formData.append("userId", id);

      if (selectedFile instanceof File) {
        formData.append("file", selectedFile);
      }

      if (projet) {
        
        formData.append("id", projet.id);
        await updateProject({ id: projet.id, formData }).unwrap();
        toast.success("Projet modifié avec succès");
      } else {
        await addProject(formData).unwrap();
        toast.success("Projet ajouté avec succès");
      }
      setOpen(false);
    } catch (error) {
        console.log( error?.data?.message)
      toast.error( error?.data?.message);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog.Title className="text-base font-bold flex gap-40 leading-6 text-blue-900 pb-4">
          {projet ? "Modifier le projet" : "Nouveau projet"}
          {(isLoading || isAdding || isUpdating) && <Loading />}
        </Dialog.Title>

        <div className="flex flex-col gap-4">
          <ScrollingList
            formations={formations}
            onSelectFormation={handleFormationSelection}
            selectedFormation={selectedFormation}
          />

          <Textbox
            placeholder="Saisissez le titre de projet"
            type="text"
            label="Titre"
            name="titre"
            className="w-full rounded-xl"
            register={register("titre", {
                required: "Titre est requis!",
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s]+$/,
                  message: "Seules les lettres et les espaces sont autorisés.",
                },
              })}
            error={errors.titre?.message}
          />

          <div className="w-full flex items-center  justify-center mt-4">
            <label
              className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer pt-8 my-4"
              htmlFor="imgUpload"
            >
              <input
                type="file"
                className="hidden"
                id="imgUpload"
                onChange={handleSelect}
                accept=".pptx,.pdf,.doc,.jpg,.png,.jpeg,.pptx,.ppt"
              />

              <div className="w-8 h-8 flex items-center justify-center rounded-full text-white bg-blue-900">
                <MdDriveFolderUpload size={20} />
              </div>
              <span className="text-blue-900 text-lg">
                Importez un document
              </span>
              {selectedFile && (
              <span className="ml-3 text-sm text-gray-600">
                {selectedFile.name}
              </span>
            )}
            </label>

            
          </div>

          <div className="flex flex-row-reverse gap-4">
            <Button
              label="Submit"
              type="submit"
              className="bg-blue-900 px-8 text-sm font-semibold text-white hover:bg-blue-700 rounded-2xl sm:w-auto"
            />

            <Button
              type="button"
              label="Annuler"
              onClick={() => setOpen(false)}
              className="bg-gray-600 px-8 text-sm font-semibold text-white hover:bg-gray-400 rounded-2xl sm:w-auto"
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddProject;
