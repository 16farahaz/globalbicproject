import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/slices/api/AuthApiSlice';
import { toast } from "sonner";
import { setCredentials } from '../redux/slices/authSlice';
import Loader from '../components/Loader';
import { ReactTyped } from "react-typed";
import logo from '../assets/bic3.png'





const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (data) => {
    try {
      const res = await login(data).unwrap();

      dispatch(setCredentials(res));
      navigate("/");
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]  to-black'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3'>
              <img src={logo} alt="logo" className="w-40 h-17 " />
            </span>
            <span className='flex gap-1 py-1 px-3  text-2xl  text-yellow-500 '>Gérez toutes vos tâches en un seul endroit !</span>

            <div>
    <p className="text-2xl font-bold text-gray-800 text-center">
                            

<ReactTyped
      strings={[
        "Bonjour ! ",
        "Gérez toutes vos tâches !",
        "Je suis un Gestionnaire . ",
        "Profitez de nos services.",
      ]}
      typeSpeed={40}
      backSpeed={50}
      attr="placeholder"
      loop
    >
      <input type="text" />
    </ReactTyped>
                        </p>
    {/* <div className='circle rotate-in-up-left'>


    </div> */}
    </div> 
          </div>
        </div>

        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
          >
            <div>
              <p className='text-yellow-600 text-3xl font-bold text-center'>
                Bonjour !
              </p>
              <p className='text-center text-base text-gray-700 dark:text-gray-500'>
                Gardez toutes vos informations d'identification en sécurité !
              </p>
            </div>
            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='you@example.com'
                type='email'
                name='email'
                label='Adresse Email'
                className='w-full rounded-full'
                register={register("email", {
                  required: "L'adresse e-mail est requise !",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='********'
                type='password'
                name='password'
                label='mot de passe'
                className='w-full rounded-full'
                register={register("password", {
                  required: "mot de passe est requise !",
                })}
                error={errors.password ? errors.password?.message : ""}
              />
              <span className='text-sm text-gray-600 hover:underline cursor-pointer'>
                J'ai oublié la mot de passe ?
              </span>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <Button
                type='submit'
                label='Se connecter'
                className='w-full h-10 bg-yellow-600 text-white rounded-full'
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;