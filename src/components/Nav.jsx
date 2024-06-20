import { React, useState } from "react";
import { hamburger } from "../assets/icons";
import { XMarkIcon } from "@heroicons/react/20/solid";
// import { headerLogo } from "../assets/images";
import { navLinks } from "../constants";
import ScrapingDataNode from "../constants/ScrapingDataNode"

const Nav = () => {
    // const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = ScrapingDataNode()
    const name_nav = fetchData?.['shop_info_data']?.[0]?.['shopCore']?.['name'];
    const logo_nav = fetchData?.['shop_info_data']?.[0]?.['shopAssets']?.['avatar'];

    // console.log(fetchData['shop_info_data']['name'])


    return (
        // <header className={`padding-x top-0 py-8 fixed z-20 transition-colors duration-200 w-full ${isScrolled ? "bg-white" : {}}`}>
        <div>
            {
                isModalOpen ?
                    (
                        <div className='fixed bg-gray-600 bg-opacity-50 z-20 flex justify-center items-center w-full h-full lg:hidden'>
                            <div className="absolute inset-x-0 top-0">
                                <div className="bg-white p-5 rounded shadow-lg">
                                    <div className="flex justify-end">
                                        <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800">
                                            {/* &times; */}
                                            <XMarkIcon width={36} />
                                        </button>
                                    </div>
                                    <div>

                                        <ul className='flex-1 flex flex-col justify-center items-center pb-8 gap-16'>
                                            {navLinks.map((item) => (
                                                <li key={item.label}>
                                                    <a
                                                        href={item.href}
                                                        className='font-montserrat leading-normal text-lg text-slate-gray hover:text-black'
                                                    >
                                                        {item.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* <button
                                            className="px-4 py-2 bg-red-500 text-white rounded"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Close
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (<></>)
            }

            <header className='padding-x py-8 absolute z-10 w-full'>

                <nav className='flex justify-between items-center max-container'>
                    <a href='/' className="text-2xl flex font-palanquin font-bold">
                        <div className="-mt-4">
                            <img
                                src={logo_nav}
                                alt='logo'
                                // width={90}
                                // height={90}
                                className='m-0 w-[70px] h-[70px]'
                            />
                        </div>
                        <span>
                            {name_nav}
                        </span>
                    </a>
                    <ul className='flex-1 flex justify-center items-center gap-16 -mt-4 max-lg:hidden'>
                        {navLinks.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className='font-montserrat leading-normal text-lg text-slate-gray hover:text-black'
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className='flex gap-2 text-lg -mt-4 leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24'>
                        {/* <a href='/'>Sign in</a>
                    <span>/</span> */}
                        <a href='/produk' className="text-coral-red">Jelajahi Sekarang</a>
                    </div>
                    <div className='hidden max-lg:block'>
                        <img src={hamburger} alt='hamburger icon' className="cursor-pointer" width={25} height={25} onClick={() => setIsModalOpen(true)} />
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Nav;