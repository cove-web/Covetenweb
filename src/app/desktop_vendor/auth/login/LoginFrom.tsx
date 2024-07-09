'use client'

import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation } from 'graphql-hooks';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import AuthConfig from '@/firebase/oauth.config';
import ForgotPassModal from './ForgotPassModal';



interface IFormInput {
    email: string;
    password: string;
}
const GET_TOKEN = `
mutation SignIn($email: String!) {
    signIn(email: $email)
  }
`


// component
const LoginFrom = () => {

    // states 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)

    // hooks
    const router = useRouter()
    const client = useGqlClient()
    const { logInWithEmailAndPassword } = AuthConfig()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormInput>()


    // query to get token
    const [getTokenFn, state] = useMutation(GET_TOKEN, { client });



    // handle authentication
    const handleAuthentication: SubmitHandler<IFormInput> = async (data) => {
        setLoading(true)
        try {
            const newUser = await logInWithEmailAndPassword(data?.email, data?.password);
            if (newUser.uid) {

                const { data: tokenData } = await getTokenFn({
                    variables: {
                        email: data?.email
                    }
                })
                if (tokenData.signIn) {
                    // saving token to cookie
                    Cookies.set('conventenToken', tokenData.signIn)
                    setLoading(false)
                    toast.success('Login Successful')

                    router.push('/desktop_vendor/dashboard')
                } else {
                    setError('User Not Found')
                    setLoading(false)
                }


            }
        } catch (error: any) {
            setError(error.message)
            setLoading(false)
        }


    }








    // render
    return (
        <>

            <p className='text-red-600 font-semibold text-sm'>{error.substring(10)}</p>

            <form
                onSubmit={handleSubmit(handleAuthentication)}
                className="space-y-5"
            >

                <div>
                    <label className="font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        {...register("email")}
                        className="block w-full rounded-md shadow-sm focus:ring focus:ri focus:ri dark:bg-gray-800 py-4"
                    />
                </div>
                {/* ------- */}
                <div>
                    <label className="font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        {...register("password")}
                        className="block w-full rounded-md shadow-sm focus:ring focus:ri focus:ri dark:bg-gray-800 py-4"
                    />
                </div>
                {/* <Link href='/auth/verify '> */}
                <button
                    type='submit'
                    className="w-full px-4 mt-10 py-4 text-white font-medium bg-desktopPrimary hover:bg-desktopPrimary active:bg-desktopPrimary rounded-lg duration-150"
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>
                {/* </Link> */}

                <p onClick={() => setIsModalOpen(true)} className='text-desktopDESKbg-desktopPrimary text-sm cursor-pointer hover:underline'>Forgot Password</p>
            </form>
            <ForgotPassModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </>
    );
};

export default LoginFrom;