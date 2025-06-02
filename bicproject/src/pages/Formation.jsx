import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import Title from "../components/Title";
import BoardView from "../components/Formation/BordView";
import AddFormation from "../components/Formation/AddFormation";
import { MdOutlineSearch } from "react-icons/md";
import { useSelector } from "react-redux";
//import { formations } from "../assets/data";  // <-- import
import { useGetFormationListQuery } from "../redux/slices/api/FormationApiSlice";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
];

const Formation = () => {
  const { user } = useSelector(state => state.auth);
  const id = user?.id;

  const params = useParams();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const status = params?.status || "";
  const {data , isLoading,refetch }= useGetFormationListQuery(id);
  const formations = data || []; // Utilisation de l'import formations   
  // Utilisation directe de l'import formations
  console.log("data mt3 les formations",data);

  // Suppose que isLoading est défini quelque part ou met une valeur par défaut


  return isLoading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <>
      <div className="w-full flex items-center justify-between mb-4">
     <Title title="Formations" />
        <div className="w-full flex items-center justify-end gap-4 mb-4">
          <div className='w-60 2xl:w-[400px] flex flex-row-reverse py-2 px-3 gap-2 rounded-full bg-[#ffffff]'>
            <MdOutlineSearch className='text-gray-500 text-xl' />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='...'
              className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
            />
          </div>

          {!status && (
            <Button
              onClick={() => setOpen(true)}
              label='Ajouter une Formation'
              icon={<IoMdAdd className='text-lg' />}
              className='flex flex-row-reverse items-center bg-blue-900 text-white rounded-full py-2 2xl:py-2.5'
            />
          )}
        </div>
      </div>
      <div className='w-full'>
        <BoardView formations={formations} search={search} />
        <AddFormation open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Formation;
