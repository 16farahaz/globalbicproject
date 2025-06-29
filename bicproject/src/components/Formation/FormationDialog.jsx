import React, { Fragment, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BiStar } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import AddFormation from "../Formation/AddFormation";
import ConfirmatioDialog from "../Dialogs";
import { useDeleteFormationMutation } from "../../redux/slices/api/FormationApiSlice";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const FormationDialog = ({ formation }) => {
  const { user } = useSelector((state) => state.auth);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const [deleteFormation] = useDeleteFormationMutation();

  const deleteClicks = () => {
    setOpenDialog(true);
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteFormation(formation.id).unwrap();
      toast.success(res?.message);
      setOpenDialog(false);
    } catch (err) {
      console.log("formationid", formation?.id);
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const items = [
    {
      label: "Détails de la formation",
      icon: <AiTwotoneFolderOpen className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => navigate(`/formation/${formation?.id}`),
    },
    {
      label: "Evaluer la formation",
      icon: <BiStar className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => navigate(`/evaluationac/${formation?.id}`),
    },
    ...(user?.title === "Responsable RH"
      ? [
          {
            label: "Editer la formation",
            icon: <MdOutlineEdit className="mr-2 h-5 w-5" aria-hidden="true" />,
            onClick: () => setOpenEdit(true),
          },
        ]
      : []),
  ];

  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600">
            <BsThreeDots />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 space-y-2">
                {items.map((el) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el.onClick}
                        className={`${
                          active ? "bg-blue-900 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>

              {user?.title === "Responsable RH" && (
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={deleteClicks}
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-red-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <RiDeleteBin6Line
                          className="mr-2 h-5 w-5 text-red-400"
                          aria-hidden="true"
                        />
                        Supprimer
                      </button>
                    )}
                  </Menu.Item>
                </div>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <AddFormation
        open={openEdit}
        setOpen={setOpenEdit}
        formation={formation}
        key={new Date().getTime()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default FormationDialog;
