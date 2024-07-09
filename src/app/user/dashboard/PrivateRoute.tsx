'use client'

import { useAuth } from '@/firebase/AuthProvider';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const PrivateRoute = ({ children }: { children: Element; }) => {


    const { user, authLoading }: any = useAuth()
    const router = useRouter()


    useEffect(() => {
        if (user?.status !== "APPROVED")
            router.replace('/not_authorized')
    }, [user, authLoading])



    // return

    // <>
    //     {children}
    // </>



};

export default PrivateRoute;