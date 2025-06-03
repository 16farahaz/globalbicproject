import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { toast } from "sonner";

import {
  useAddTestTechniqueMutation,
  useUpdateTestTechniqueMutation,
} from "../../redux/slices/api/testApiSlice";
import { useGetFormationListQuery } from "../../redux/slices/api/FormationApiSlice";

import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";
import Loading from "../Loader";
import Button from "../Button";
import ScrollingList from "../Projet/ScrollingList";

const AddTesttechnique = ({ open, setOpen, test }) => {
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;

  const params = useParams();
  const status = params?.status || "";

  const { data, isLoading } = useGetFormationListQuery(id);
  const formations = data || [];

  const [selectedFormation, setSelectedFormation] = useState(
    test ? test?.Formation?.id : ""
  );
  

  const form = useForm();

  // Initialiser les champs du formulaire si on a un test en édition
  useEffect(() => {
    if (test) {
      form.reset({
        titre: test.titre || "",
        text: test.text || "",
      });
      setSelectedFormation(test?.Formation?.id);
    }
  }, [test, form]);

  const [addtest, { isLoading: isAdding }] = useAddTestTechniqueMutation();
  const [updatetest, { isLoading: isUpdating }] =
    useUpdateTestTechniqueMutation();

  const handleFormationSelection = (id) => {
    setSelectedFormation(id);
    // Ne pas toucher aux inputs ici, ils restent indépendants
  };

  const handleOnSubmit = async (data) => {
    try {
      if (test) {
        const updatedData = {
          userId: id || test.userId,
          titre: data.titre || test.titre,
          text: data.text || test.text,
          formationId: selectedFormation || test.formationId,
        };
        console.log("updatedDatatest", updatedData);

        await updatetest({ updatedData, id: test.id }).unwrap();

        toast.success("Formation mise à jour avec succès");
      } else {
        const newtestData = {
          userId: id,
          titre: data.titre,
          text: data.text,
          formationId: selectedFormation,
        };
        console.log(newtestData);
        await addtest(newtestData).unwrap();
        toast.success("Nouveau test ajoutée avec succès");
      }

      setTimeout(() => setOpen(false), 1500);
    } catch (error) {
      console.error("API Error:", error);
      const message =
        error?.data?.error || error.message || "Une erreur est survenue";
      toast.error(message);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Dialog.Title className="text-base font-bold flex gap-40 leading-6 text-blue-900 pb-4">
          {test ? "Modifier le test" : "Nouveau test"}
          {(isLoading || isAdding || isUpdating) && <Loading />}
        </Dialog.Title>

        <div className="flex flex-col gap-4">
          <ScrollingList
            formations={formations}
            onSelectFormation={handleFormationSelection}
            selectedFormation={selectedFormation}
          />

          <Textbox
            placeholder="Saisissez le titre de test"
            type="text"
            label="Titre"
            name="titre"
            className="w-full rounded-xl"
            register={form.register("titre", { required: "Titre est requise" ,pattern: {
                  value: /^[A-Za-zÀ-ÿ\s]+$/,
                  message: "Seules les lettres et les espaces sont autorisés.",
                },})}
            error={form.formState.errors.titre?.message}
          />

          <div className="w-full flex flex-col mt-4">
            <textarea
              className="w-full h-full rounded-xl border p-2"
              {...form.register("text", {
                required: "Contenu est requis",
                maxLength: {
                  value: 1000,
                  message: "Le contenu ne doit pas dépasser 1000 caractères",
                },
              })}
              placeholder="Saisissez le contenu du test"
            />
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

export default AddTesttechnique;
