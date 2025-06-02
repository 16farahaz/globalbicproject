import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import AddTesttechnique from "../components/Testtechnique/AddTesttechnique";
import { useGetAlltestByUserIdQuery,useDeleteTestTechniqueMutation } from "../redux/slices/api/testApiSlice";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { formatDate } from "../utils";

const Testtechnique = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;
  console.log("userId", userId);
  //// lhne ya lbnet na3tiw lacces ken ll in li 3ndo title "responsible RH" bch ychoufou les utilisateur
  // Restrict access to admin with title "responsible RH"
  /* if (!(user?.isAdmin && user?.title === "Responsable RH")) {
    return null; // or return <p>Access denied</p>;
  } */

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  /* const { data, isLoading, error, refetch } = useGetTeamListQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [userAction] = useUserActionMutation(); */
  const { data, isLoading, error, refetch } =useGetAlltestByUserIdQuery(userId);
  console.log("hethom les test : ppt li importehom ", data);
  const tests = data;
  const [deletetest] = useDeleteTestTechniqueMutation();

  const deleteHandler = async () => {
    try {
      const result = await deletetest(selected).unwrap();
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

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Created Date</th>
        <th className="py-2">Titre de formation</th>
        <th className="py-2"> Nom de formation </th>
        
      </tr>
    </thead>
  );

  const TableRow = ({ test }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="p-2">{formatDate(new Date(test?.createdAt))}</td>
      <td className="p-2">{test?.titre}</td>
      <td className="p-2"> {test?.Formation?.title} </td>
      
      <td className="p-2 flex gap-4 justify-end">
        <Button
          className="text-blue-900 hover:text-blue-500 font-semibold sm:px-0"
          label="Modifier"
          type="button"
          onClick={() => editClick(test)}
        />
        <Button
          className="text-red-800 hover:text-red-500 font-semibold sm:px-0"
          label="Supprimer"
          type="button"
          onClick={() => deleteClick(test?.id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="flex justify-between flex-col w-full gap-4">
        <div className="flex items-center justify-between mb-8">
          <Title title="Test technique" />
          <div>
            <Button
              label="Ajouter un test technique"
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
                {data &&
                  Object.values(data).map((test) => (
                    <TableRow key={test.id} test={test} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddTesttechnique
        open={open}
        setOpen={setOpen}
        test={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default Testtechnique;
