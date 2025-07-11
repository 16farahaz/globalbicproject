import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Loader from "./Loader";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    console.log(data)
    if (data.motdepasse !== data.cmotdepasse) {
      console.log(data.motdepasse,data.cmotdepasse);
      toast.warning("Les deux mots de passe ne sont pas identiques");
      return;
    }
    try {
      const res = await changeUserPassword(data).unwrap();
      toast.success("Mot de passe modifié avec succès");

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error || "Erreur inconnue");
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 pb-2 text-gray-700 mb-4'
          >
            Changez votre mot de passe pour sécuriser votre compte 
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6 '>
            <Textbox
              placeholder='Nouveau mot de passe'
              type='password'
              name='mot de passe'
              label='Nouveau mot de passe'
              className='w-full rounded-xl'
              register={register("motdepasse", {
                required: "Veuillez saisir un nouveau mot de passe !!",
              })}
              error={errors.motdepasse ? errors.motdepasse.message : ""}
            />
            <Textbox
              placeholder='Confirm New Passowrd'
              type='password'
              name='cmotdepasse'
              label='Confirmer le mot de passe'
              className='w-full rounded-xl'
              register={register("cmotdepasse", {
                required: "Veuillez confirmer le nouveau mot de passe",
              })}
              error={errors.cmotdepasse ? errors.cmotdepasse.message : ""}
            />
          </div>

          {isLoading ? (
            <div className='py-5'>
              <Loader />
            </div>
          ) : (
            <div className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
              <Button
                type='submit'
                className='bg-blue-900 px-8 text-sm font-semibold rounded-xl text-white hover:bg-blue-700  sm:w-auto'
                label='Enregistrer'
              />

              <button
                type='button'
                className='bg-gray-600 px-6 ml-1 text-sm font-semibold text-white sm:w-auto rounded-xl hover:bg-gray-200'
                onClick={() => setOpen(false)}
              >
                Annuler
              </button>
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default ChangePassword;