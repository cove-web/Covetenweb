'use client';

import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition, Menu } from '@headlessui/react';

import {
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import {
    FaCaretDown,
} from 'react-icons/fa';
import Link from 'next/dist/client/link';
import Dropdown from '@/components/Navbar/Dropdown/Dropdown';
import Services from '@/components/Navbar/Dropdown/Services';
import Features from '@/components/Navbar/Features';


import { toast } from 'react-hot-toast';
import getUserStatus from '@/shared/graphQl/queries/getUserStatus';
import Error from '@/components/Error';
import Loading from './loading';
import AuthConfig from '@/firebase/oauth.config';
import { useRouter } from 'next/navigation';
import DropdownIndustry from '@/components/Navbar/Dropdown/DropdownIndusty';
import Solution from '@/components/Navbar/Dropdown/Solution';
import { LuPlusCircle } from 'react-icons/lu';
import { useAuth } from '@/firebase/AuthProvider';
import MobileDropdown from '@/components/Navbar/MobileNav/MobileDropdown';
import IndustryMobile from '@/components/Navbar/MobileNav/IndustryMobile';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar({ services, industries, solutions, features }: any) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userStatus, setUserStatus] = useState('')
    const [currentUserType, setCurrentUserType] = useState('')

    //hooks
    // const { user, logout, authLoading } = AuthConfig()
    const { user, logout, authLoading }: any = useAuth()
    const router = useRouter()

    useEffect(() => {
        getUserData()
    }, [user?.email])

    const getUserData = async () => {
        const userDta = await getUserStatus(user?.email || 'no email')
        if (userDta) {
            setUserStatus(userDta[0]?.status)
            setCurrentUserType(userDta[0]?.user_type)
        }
    }

    const handleDifferentUserRouting = (dest: string) => {
        if (user?.status !== 'APPROVED' && !authLoading) {
            return '/not_approved'
        }
        else if (user?.user_type === 'ADMIN' || user?.user_type === 'COVENTEN_EMPLOYEE' && !authLoading) {
            return `/admin/${dest}`
        }
        else if (user?.user_type === 'CONSUMER' && !authLoading) {
            //redirect to profile if profile is not completed
            if (user?.isProfileCompleted === false && !authLoading) {
                // toast.success('Your profile is not completed, please complete your profile first')
                return '/user/dashboard/profile'
            }
            return `/user/${dest}`
        }
        else if (user?.user_type === 'SERVICE_PROVIDER' && !authLoading) {

            //redirect to profile if profile is not completed
            if (user?.isProfileCompleted === false && !authLoading) {
                // toast.success('Your profile is not completed, please complete your profile first')
                return '/vendor/dashboard/profile'
            }
            return `/vendor/${dest}`
        }
        else if (user?.user_type === 'LAB_ASSISTANT' && !authLoading) {
            return `/vendor/${dest}`
        }
        else {
            return '/'
        }
    }

    if (authLoading) return <Loading />

    return (
        <>
        <header 
        className="relative z-[90005] mainnavb"
        >
                <nav
                    className="mx-auto flex max-w-7xl items-center justify-between 
                    p-2 lg:px-8
                    "
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <img src="/assets/hlogo.png" alt="Logo" className='w-20' style={{ height: '70px', width: '120px' }} />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-center">
                    <Link
                            href="/"
                            className="text-sm font-400 leading-6 text-primaryText mr-8 transform transition-all hover:scale-110 duration-200"
                            //style={{ color: 'white' }}
                        >
                      
                            
                        </Link>
                        <Link
                            href="/"
                            className="text-sm font-400 leading-6 text-primaryText mr-8 transform transition-all hover:scale-110 duration-200"
                            //style={{ color: 'white' }}
                        >
                      
                            
                        </Link>
                        <Link
                            href="/"
                            className="text-sm font-400 leading-6 text-primaryText mr-8 transform transition-all hover:scale-110 duration-200"
                            // //style={{ color: 'white' }}
                        >
                            Home
                        </Link>
                        {/* <Features features={features} /> */}
                        <Link
                            href="/fea/"
                            className="text-sm font-400 leading-6 text-primaryText mr-8 transform transition-all hover:scale-110 duration-200"
                            //style={{ color: 'white' }}
                            
                        >
                            
                            Features
                        </Link>
                        <Link
                            href={`/about_us`}
                            className="text-sm font-400 leading-6 text-primaryText mr-8 transform transition-all hover:scale-110 duration-200"
                            //style={{ color: 'white' }}
                        >
                            About
                        </Link>
                        {/* #21618c */}
                        <Link
                            href="/ser"
                            className="text-sm font-400 leading-6 text-primaryText mr-8 transform transition-all hover:scale-110 duration-200"
                            //style={{ color: 'white' }}
                        >
                      
                            
                            Services
                        </Link>
                        {/* <DropdownIndustry data={industries} /> */}
                        {/* <Services servicesData={services} /> */}
                        <Link
                            href="/products"
                            className="text-sm font-400 leading-6 text-primaryText mr-8 transform transition-all hover:scale-110 duration-200"
                            //style={{ color: 'white' }}
                        >
                            
                            Products
                        </Link>
                        {/* <Solution solutionData={solutions} /> */}

                        <Link
                            href="/learn"
                            className="text-sm font-400 leading-6 text-primaryText mr-8 transform transition-all hover:scale-110 duration-200"
                            //style={{ color: 'white' }}
                        >
                            
                            Learn
                        </Link>
                        <Link
                            href="/events/search"
                            className="text-sm font-400 leading-6 text-primaryText mr-8 transform transition-all hover:scale-110 duration-200"
                            //style={{ color: 'white' }}
                        >
                            
                            Events
                        </Link>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {
                            user?.email ?
                                <div className='flex items-center justify-center space-x-3'>
                                    {
                                        currentUserType === 'CONSUMER' ?
                                            <Link href='/user/dashboard/projects/create'
                                                className='text-sm flex items-center justify-center font-400 leading-6 gradient-bg text-white px-2 py-1.5 rounded-md'>
                                                <span className='mr-1 text-lg'><LuPlusCircle /></span>
                                                <span>New Project</span>
                                            </Link>
                                            : <p></p>
                                    }

                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                            <Menu.Button className="">
                                                <div className="w-9 h-9 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
                                                    <img src="/assets/no_user.png" alt="User Avatar" className="w-full h-full object-cover" />
                                                </div>
                                            </Menu.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href={handleDifferentUserRouting("dashboard")}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                Dashboard
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href={handleDifferentUserRouting("dashboard/profile")}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                Profile
                                                            </Link>
                                                        )}
                                                    </Menu.Item>

                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                type="submit"
                                                                onClick={() => {
                                                                    logout()
                                                                    router.push('/')
                                                                }}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block w-full px-4 py-2 text-left text-sm'
                                                                )}
                                                            >
                                                                Sign out
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                                :
                                <div className='space-x-4 flex items-center justify-center'>
                                    <Link
                                        href="/auth/login"
                                        className="-mx-3 block rounded-lg py-2.5 px-3 text-sm font-400 leading-6 text-primaryText hover:bg-gray-50"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        className="block rounded-md py-1.5 px-3 text-sm font-400 leading-6 text-white gradient-bg"
                                        style={{ backgroundColor: '#e71a41' }}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                        }
                    </div>
                </nav>

                {/* mobile */}
                <Dialog
                    as="div"
                    className="lg:hidden"
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                >
                    <div className="fixed inset-0 z-10" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="/" className="-m-1.5 p-1.5">
                                <Image
                                    height={200}
                                    width={200}
                                    className="block h-8 w-auto rounded-lg"
                                    src="/assets/log.png"
                                    alt="Logo"
                                />{' '}
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        {/* small device */}
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <Link
                                        href="/"
                                        className="text-md font-400 leading-6 text-primaryText mr-8"
                                    >
                                        HOME
                                    </Link>
                                    <div>
                                        <Link
                                            href="/features"
                                            className="text-md block pb-3 font-400 leading-6 text-primaryText mr-8"
                                            style={{ textTransform: "uppercase" }}
                                        >
                                            Features
                                        </Link>
                                        <Link
                                            href="/products"
                                            className="text-md block pb-3 font-400 leading-6 text-primaryText mr-8"
                                            style={{ textTransform: "uppercase" }}
                                        >
                                            Products
                                        </Link>
                                        <Link
                                            href="/learn"
                                            className="text-md block pb-3 font-400 leading-6 text-primaryText mr-8"
                                            style={{ textTransform: "uppercase" }}
                                        >
                                            Learn
                                        </Link>
                                        <Link
                                            href="/events"
                                            className="text-md block pb-3 font-400 leading-6 text-primaryText mr-8"
                                            style={{ textTransform: "uppercase" }}
                                        >
                                            Events
                                        </Link>
                                        <div>
                                            <MobileDropdown data={services} />
                                        </div>
                                        <div>
                                            <IndustryMobile data={industries} />
                                        </div>
                                    </div>
                                </div>
                                <div className="py-6">
                                    {
                                        user?.email ?
                                            <>
                                                <Link
                                                    href={handleDifferentUserRouting("dashboard")}
                                                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-400 leading-7 text-primaryText hover:bg-gray-50"
                                                >
                                                    Dashboard
                                                </Link>
                                                <p
                                                    onClick={() => {
                                                        logout()
                                                        router.push('/')
                                                    }}
                                                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-400 leading-7 text-primaryText hover:bg-gray-50"
                                                >
                                                    SignOut
                                                </p>
                                            </>
                                            :
                                            <Link
                                                href="/auth/login"
                                                className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-400 leading-7 text-primaryText hover:bg-gray-50"
                                            >
                                                Log in
                                                <span aria-hidden="true">&rarr;</span>
                                            </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </>
    );
}
