import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import SelectList from "./SelectListRole";
const LISTS = ["Admin", "simple user"];
const LIST = ["Active", "Disabled"];
const Titre = [
  "Collaborateur",
  "Formateur",
  "Responsable opérationnel",
  "Responsable RH",
];
import { useState, useEffect } from "react";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";

const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const [role, setRole] = useState(
    userData ? (userData.isAdmin ? "Admin" : "simple user") : "Admin"
  );
  useEffect(() => {
    console.log("Updated role:", role); // Will log updated role
  }, [role]);

  const [Compte, setCompte] = useState(true);
  const [titre, setTitre] = useState(
    userData ? userData.title : "Collaborateur"
  ); // Default value for titre
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues });

  const dispatch = useDispatch();

  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updatedUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleOnSubmit = async (data) => {
    const isadmin = role === "Admin"; // Use the updated role state directly
    console.log("hetha isadmin", isadmin);

    try {
      if (userData) {
        // Ensure the data is being passed correctly to the mutation
        //const updatedData = { ...data, isAdmin: isadmin}; // Ensure isAdmin is added
        console.log("hetha isadmin", isadmin);
        const updatedData = {
          id: userData.id, // nécessaire si tu l’envoies au backend
          name: data.name,
          title: data.title,
          matricule: data.matricule,
          email: data.email,
          phone: data.phone,
          address: data.address,
          isAdmin: isadmin, // force isAdmin explicite
          isActive: Compte, // si nécessaire
        };

        const response = await updatedUser(updatedData).unwrap(); // Use updatedData

        console.log("User updated response:", response);
        toast.success("User Updated successfully");

        if (userData?.id === user._id) {
          dispatch(setCredentials({ ...response.user }));
        }
      } else {
        const newUserData = {
          name: data.name,
          title: data.title,
          matricule: data.matricule,
          email: data.email,
          motdepasse: data.email, // Using email as password
          isAdmin: isadmin, // Directly use isAdmin here
          phone: data.phone,
          address: data.address,
          isActive: Compte,
        };

        console.log("Creating new user with data:", newUserData); // Debug log for new user data

        const response = await addNewUser(newUserData).unwrap();

        console.log("New user created response:", response);

        toast.success("New User added successfully");
      }

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Something went wrong");
    }
  };
  // Whenever `titre` changes, update react-hook-form value:
  useEffect(() => {
    setValue("title", titre);
  }, [titre, setValue]);
  useEffect(() => {
    if (userData) {
      setRole(userData.isAdmin ? "Admin" : "simple user");
    }
  }, [userData]);

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-blue-900 "
          >
            {userData ? "Modifier" : "Nouveau utilisateur"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col">
            <Textbox
              placeholder="nouveau utilisateur"
              type="text"
              name="name"
              label="Nom et prénom de l’utilisateur"
              className="w-full rounded-xl"
              register={register("name", {
                required: "Nom et prénom est requis!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder="Matricule (Ex: Mat2025Bic)"
              type="text"
              name="matricule"
              label="Matricule de l’utilisateur"
              className="w-full rounded-xl"
              register={register("matricule", {
                required: "la matricule est requise!",
              })}
              error={errors.matricule ? errors.matricule.message : ""}
            />
            <SelectList
              label="Titre de l’utilisateur"
              lists={Titre}
              selected={titre}
              setSelected={(value) => {
                setTitre(value);
                console.log("Titre selected:", value);
              }}
            />
            <Textbox
              placeholder="BicUser@email.com"
              type="email"
              name="email"
              label="Email Address"
              className="w-full rounded-xl"
              register={register("email", {
                required: "Adresse e-mail est requise!",
              })}
              error={errors.email ? errors.email.message : ""}
            />
            <Textbox
              placeholder="26 123 457"
              type="tel"
              name="phone"
              label="Phone Number"
              className="w-full rounded-xl"
              register={register("phone", {
                required: "Numéro de téléphone est requise!",
              })}
              error={errors.phone ? errors.phone.message : ""}
            />

            <SelectList
              label="Role"
              lists={LISTS}
              selected={role}
              setSelected={(value) => {
                setRole(value);
                console.log("Role selected:", value); // Debug log for role selection
              }}
            />

            <Textbox
              placeholder="ex: 7021, rue de la République"
              type="text"
              name="address"
              label="Adresse de l’utilisateur"
              className="w-full rounded-xl"
              register={register("address", {
                required: "la matricule est requise!",
              })}
              error={errors.address ? errors.address.message : ""}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4  gap-2 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-900 px-8 rounded-2xl text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                label="Submit"
              />

              <Button
                type="button"
                className="bg-gray-500 px-8 text-sm rounded-2xl font-semibold text-white sm:w-auto"
                onClick={() => setOpen(false)}
                label="Annuler"
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;
