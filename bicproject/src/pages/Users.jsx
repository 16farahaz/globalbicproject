
import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";
import {
  useDeleteUserMutation,
  useGetTeamListQuery,
  useUserActionMutation,
} from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Users = () => {
  const { user } = useSelector((state) => state.auth);
 //// lhne ya lbnet na3tiw lacces ken ll in li 3ndo title "responsible RH" bch ychoufou les utilisateur 
  // Restrict access to admin with title "responsible RH"
  if (!(user?.isAdmin && user?.title === "Responsable RH")) {
    return null; // or return <p>Access denied</p>;
  }

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, error, refetch } = useGetTeamListQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [userAction] = useUserActionMutation();

  const userActionHandler = async () => {
    try {
      const result = await userAction({
        isactive: !selected?.isactive,
        id: selected?.id,
      }).unwrap();

      toast.success(result.message);
      setOpenAction(false);
      setSelected(null);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err?.message || "Something went wrong");
    }
  };

  const deleteHandler = async () => {
    try {
      const result = await deleteUser(selected).unwrap();
      refetch();
      toast.success(result?.message);
      setSelected(null);
      setTimeout(() => setOpenDialog(false), 500);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const userStatusClick = (el) => {
    setSelected(el);
    setOpenAction(true);
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Nom et prénom</th>
        <th className="py-2">Titre</th>
        <th className="py-2">E-mail</th>
        <th className="py-2">Administrateur</th>
        <th className="py-2">Active</th>
        <th className="py-2 text-right">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="p-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
            <span className="text-xs md:text-sm text-center">
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>
      <td className="p-2">{user.title}</td>
      <td className="p-2">{user.email || "user.email.com"}</td>
      <td>
        <button
          onClick={() => userStatusClick(user)}
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            user?.isAdmin
              ? "text-red-900 font-semibold"
              : "text-green-600 font-semibold"
          )}
        >
          {user?.isAdmin ? "Admin" : "User"}
        </button>
      </td>
      <td>
        <button
          onClick={() => userStatusClick(user)}
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            user?.isactive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isactive ? "Active" : "Disabled"}
        </button>
      </td>
      <td className="p-2 flex gap-4 justify-end">
        <Button
          className="text-blue-900 hover:text-blue-500 font-semibold sm:px-0"
          label="Modifier"
          type="button"
          onClick={() => editClick(user)}
        />
        <Button
          className="text-red-800 hover:text-red-500 font-semibold sm:px-0"
          label="Supprimer"
          type="button"
          onClick={() => deleteClick(user?.id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="flex justify-between flex-col w-full gap-4">
        <div className="flex items-center justify-between mb-8">
          <Title title="Team Members" />
          <div className={user.isAdmin ? "" : "hidden"}>
            <Button
              label="Nouveau membre"
              icon={<IoMdAdd className="text-lg" />}
              className="flex flex-row-reverse gap-1 items-center bg-blue-900 text-white rounded-md 2xl:py-2.5"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>

        <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded mt-6">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {data?.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default Users;