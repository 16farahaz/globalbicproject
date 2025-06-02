import { Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Sidebare from './components/Sidbar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Evaluationachaud from './pages/Evaluationachaud';
import EvaluationaFroid from './pages/Evaluationafroid';
import Formation from './pages/Formation';
import Users from './pages/Users';
import FormationDetails from "./pages/FormationDetails";
import Login from "./pages/Login";
import AllEvaluations from "./pages/AllEvaluations";
import AllFormation from "./pages/AllFormations";
import Visualisation from "./pages/Visualisation";
import { useForm } from "react-hook-form";
import { setOpenSidebar } from "./redux/slices/authSlice";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white  sticky top-0 hidden md:block'>
        <Sidebare />
      </div>

      <MobileSidebar />

      <div className='flex-1 overflow-y-auto'>
        <Navbar />

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/log-in' state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={`md:hidden w-full h-full bg-black/40 transition-transform duration-700 transform
             ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            onClick={() => closeSidebar()}
          >
            <div className='bg-white w-3/4 h-full'>
              <div className='w-full flex justify-end px-5 pt-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoMdClose size={25} />
                </button>
              </div>

              <div className='-mt-10'>
                <Sidebare/>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

const App = () => {
  const theme = "light";

  return (
    <main className={theme}>
      <div className='w-full min-h-screen bg-[#f3f4f6]'>
        <Routes>
          <Route element={<Layout />}>
            <Route index psth='/' element={<Navigate to='/dashboard' />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/evaluationac/:id' element={<Evaluationachaud/>} />
            <Route path='/evaluationaf/:id' element={<EvaluationaFroid/>} />
            <Route path='/allevaluations/:id' element={<AllEvaluations />} />
            <Route path='/allformation' element={<AllFormation />} />
            <Route path='/formation' element={<Formation/>} />
            <Route path='/formation/:id' element={<FormationDetails />} />
            <Route path='/users' element={<Users/>} />
            <Route path='/visualisation' element={<Visualisation/>} />
          </Route>
          <Route path='/log-in' element={<Login />} />
        </Routes>
      </div>

      <Toaster richColors position='bottom-right' />
    </main>
  );
};

export default App;