import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type categoryType = {
    id: number,
    name: string,
    image: string,
    link: string
}

const Categories = () => {

    const Categories = [
        {
            id: 1,
            name: "Design System",
            image: '/assets/home/lab1.jpg',
            link: "/services/design"

        },
        // {
        //     id: 2,
        //     name: "Food Testing Lab",
        //     image: '/assets/home/lab2.jpg',
        //     link: "/services/design"
        // },
        // {
        //     id: 3,
        //     name: "Soil Testing Lab",
        //     image: '/assets/home/lab3.jpg',
        //     link: "/services/design"
        // },
        // {
        //     id: 4,
        //     name: "Metal Testing Lab",
        //     image: '/assets/home/lab4.jpg',
        //     link: "/services/design"
        // },
        // {
        //     id: 5,
        //     name: "Electronics Testing Lab",
        //     image: '/assets/home/lab5.jpg',
        //     link: "/services/design"
        // },
        // {
        //     id: 6,
        //     name: "Chemical Testing Lab",
        //     image: '/assets/home/lab6.jpg',
        //     link: "/services/design"
        // },
        // {
        //     id: 7,
        //     name: "Petroleum Testing Lab",
        //     image: '/assets/home/lab4.jpg',
        //     link: "/services/design"

        // },
        // {
        //     id: 8,
        //     name: "Material Testing Lab",
        //     image: '/assets/home/lab2.jpg',
        //     link: "/services/design"
        // }
    ]




    return (
        <>
            <div className="bg-white py-6 sm:py-8 lg:py-12 dark:bg-darkBg dark:text-white">
                <div className="mx-auto max-w-screen-2xl px-2 lg:px-12">

                    <div className="mb-10 md:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold  md:mb-3 lg:text-3xl">Categories</h2>

                        <p className="mx-auto max-w-screen-md text-center text-dimText dark:text-darkDimText md:text-sm">Our aim is to increase quality consciousness of every man-made product, and to reduce manufacturing efforts of young entrepreneurs, we believe in best manufacturing practices will bring out best products, we help every customer getting their best product and every manufacturer producing them best at most sustainable ways…</p>
                    </div>


                    <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                        {
                            Categories.map((category) =>
                                <Link
                                    href={category.link}
                                    key={category.id} className="group relative flex h-48 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-64 xl:h-80">
                                    <Image src={category?.image} height={500} width={500} loading="lazy" alt="Photo by Minh Pham" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 to-primary/30  md:via-transparent"></div>

                                    <div className="relative mt-auto p-4">

                                        <h2 className="mb-2 text-xl font-semibold text-white transition duration-100">{category?.name}</h2>

                                        <span className="font-semibold text-primary">Read more</span>
                                    </div>
                                </Link>)
                        }





                    </div>
                </div>
            </div>
        </>
    );
};

export default Categories;