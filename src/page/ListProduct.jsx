import { React, useEffect, useState } from 'react'
import { MapPinIcon, XMarkIcon, AdjustmentsHorizontalIcon, MagnifyingGlassIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'
import { star } from "../assets/icons";
import { hamburger } from "../assets/icons";
import ScrapingDataNode from "../constants/ScrapingDataNode";
import { Link } from "react-router-dom";
// import { navLinks } from "../constants";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function ListProduct() {
    const fetchData = ScrapingDataNode();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSortedMinMax, setIsSortedMinMax] = useState('');

    const name_nav = fetchData?.['shop_info_data']?.[0]?.['shopCore']?.['name'];
    const logo_nav = fetchData?.['shop_info_data']?.[0]?.['shopAssets']?.['avatar'];

    const shippingLoc_cityname = fetchData?.['shop_info_data']?.[0]?.['shippingLoc']?.['cityName'];
    const shippingLoc_districtName = fetchData?.['shop_info_data']?.[0]?.['shippingLoc']?.['districtName'];

    const [searchTerm, setSearchTerm] = useState('');
    const list_data_shop_product = fetchData?.['shop_product_data'];
    const [filteredProducts, setFilteredProducts] = useState();

    useEffect(() => {
        let filtered = list_data_shop_product?.filter((product) =>
            product.name_product.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (isSortedMinMax === 'price-desc') {
            filtered = filtered.sort((a, b) => Number(b.price.slice(2)) - Number(a.price.slice(2)));
            // console.log('tinggi ke rendah', filtered)
        } else if (isSortedMinMax === 'price-asc') {
            filtered = filtered.sort((a, b) => Number(a.price.slice(2)) - Number(b.price.slice(2)));
            // console.log('rendah ke tinggi', filtered)
        }

        // setFilteredProducts(list_data_shop_product);
        setFilteredProducts(filtered);
    }, [list_data_shop_product, searchTerm, isSortedMinMax])
    // console.log(list_data_shop_product)

    const list_data_shop_layouts = fetchData?.['shop_layout_data']?.[0];

    const etalase_tokos = fetchData?.['shop_show_case']?.[0];

    // Total halaman
    const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);

    // Indeks item yang akan ditampilkan pada halaman saat ini
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredProducts?.slice(startIndex, endIndex);

    // Fungsi untuk berpindah ke halaman sebelumnya
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Fungsi untuk berpindah ke halaman berikutnya
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    window.addEventListener('scroll', function () {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        parallaxElements.forEach(function (element) {
            let scrollPosition = window.scrollY;
            element.style.transform =
                'translateY(' + scrollPosition * 0.2 + 'px)';
        });
    });

    return (
        <div className='relative font-palanquin'>

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
                                        <h2 className="text-2xl font-semibold mb-4">This is a Modal</h2>
                                        <p className="mb-4">This is the modal content. You can add any content here.</p>
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (<></>)
            }

            <div className='w-full z-50'>
                <nav className='font-palanquin'>
                    <div className='w-full bg-pale-blue'>
                        <div className='flex flex-row justify-between text-lg text-black py-2 max-sm:px-2 px-8'>
                            <div className='font-bold ml-2'>
                                {/* kontak */}
                                <a href='/'>
                                    Home
                                </a>
                                {" > "}
                                <span>
                                    Produk
                                </span>
                            </div>
                            <div className='flex max-sm:hidden'>
                                <MapPinIcon width={20} height={20} />
                                {shippingLoc_cityname},
                                Kec. {shippingLoc_districtName}
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-16 bg-white max-sm:px-2 px-8 my-1'>
                        {/* <div className='flex flex-row justify-center max-lg:justify-between py-3'> */}
                        <div className='flex flex-row justify-between py-3'>
                            <a href="/" className='flex flex-row'>
                                <img
                                    src={logo_nav}
                                    alt='logo'
                                    className='m-0 w-[50px] h-[50px]'
                                />
                                <span className='text-3xl font-bold font-palanquin'>
                                    {name_nav}
                                </span>
                            </a>
                            <div className='px-5 max-lg:hidden flex flex-row gap-3'>
                                {/* {navLinks.map((item) => (
                                    <li key={item.label} className='flex my-4'>
                                        <a
                                            href={item.href}
                                            className='font-montserrat font-bold leading-normal text-xl text-slate-gray hover:text-black'
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))} */}
                                {/* <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="input" /> */}
                            </div>
                            {/* <div className='w-2/6 mt-3 flex justify-end'> */}
                            <div className='mt-5'>
                                <img src={hamburger} className='max-md:block cursor-pointer hidden' alt='hamburger icon' width={25} height={25} onClick={() => setIsModalOpen(true)} />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {/* <div className='w-1/2 max-lg:w-full overflow-x-auto'> */}
            <OwlCarousel className='owl-theme max-sm:-mt-3' autoplay autoplayTimeout={4000} loop animateOut={'fadeOut'} margin={0} items={1} dots={0}>
                {list_data_shop_layouts?.map((list_data_shop_layout) => (
                    <div className='item h-[250px] sm:h-[350px] md:h-[395px] lg:h-[450px] xl:h-[585px]' key={list_data_shop_layout?.linkID}>
                        <img src={list_data_shop_layout.desktopImageUrl}
                            className='w-full mt-14 sm:mt-10 md:mt-0 lg:-my-16 absolute -z-10 parallax-bg bg-cover bg-fixed bg-no-repeat'
                            alt=""
                        />
                    </div>
                ))}
            </OwlCarousel>
            {/* </div> */}

            <section className=''>
                <div className='w-full h-32 justify-center items-center bg-pale-blue py-1'>
                    <div className='h-16 my-4 mx-2 rounded-md bg-coral-red p-3'>
                        <div className='grid grid-cols-2 justify-between text-white'>
                            <div className='inline-flex'>
                                <div className='hidden max-lg:inline-block'>
                                    <AdjustmentsHorizontalIcon className='cursor-pointer' width={36} height={36} />
                                    {/* <span className='inline-flex mt-1 ml-2 text-xl'>Filter</span> */}
                                </div>
                            </div>
                            <div className='items-center max-lg:w-72 w-4/6 -ml-24 px-5 flex'>
                                <input
                                    value={searchTerm}
                                    // onChange={handleSearch}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    type="text"
                                    placeholder='Search products...'
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                                <MagnifyingGlassIcon className='cursor-pointer ml-1' width={32} height={32} />
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section className='px-6 max-md:px-2 flex flex-row max-md:flex-col gap-1'>
                <div className='md:w-1/4 my-1 max-lg:hidden'>
                    <div className='md:rounded-t-lg rounded-lg bg-white shadow-lg px-4 py-8'>
                        <div className="flex flex-col justify-start gap-5">
                            <h2 className="text-2xl font-palanquin font-bold">
                                <span className="text-coral-red">
                                    Filter
                                </span>
                            </h2>
                            <div className="lg:max-w-lg mt-2 text-slate-gray">
                                <p className='text-black font-black'>Availability</p>
                                <div className='flex flex-col mt-3'>
                                    <span className=''><input type="checkbox" /> In Stock </span>
                                    <span className=''><input type="checkbox" /> Out of Stock</span>
                                </div>
                                <span><hr className='border-1 border-black my-4' /></span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-start gap-5">
                            <div className="lg:max-w-lg mt-2 text-slate-gray">
                                <p className='text-black font-black'>Price</p>
                                {/* <p>The highest price is 900.00USD</p> */}
                                <div className='flex flex-row mt-3 gap-2'>
                                    <div className=''>
                                        <label>Min Price:</label>
                                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="input" />
                                    </div>
                                    <div>
                                        <label>Max Price:</label>
                                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="input" />
                                    </div>
                                </div>
                                <span><hr className='border-1 border-black my-4' /></span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-start gap-5">
                            <div className="lg:max-w-lg mt-2 text-slate-gray">
                                <p className='text-black font-black'>Etalase Toko</p>
                            </div>
                            <div className='h-[540px] overflow-y-auto scrollbarWidth'>
                                {etalase_tokos?.map((etalase_toko) => (
                                    <p className='my-1' key={etalase_toko.id}>{etalase_toko.title}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white px-6 max-md:px-1 py-4 my-1 md:w-full rounded-t-lg gap-2'>
                    <div className=''>
                        <div className="flex flex-row max-lg:flex-col justify-between gap-5">
                            <h2 className="text-3xl font-palanquin font-bold">
                                Semua <span className="text-coral-red">Produk</span>
                            </h2>
                            <div className='mt-3 mr-2 max-lg:flex justify-end'>
                                <span>Urutkan</span>
                                <select onChange={(e) => setIsSortedMinMax(e.target.value)} className='text-black w-36 ml-2 shadow border -mt-1 rounded leading-tight focus:outline-none focus:shadow-outline cursor-pointer' name="" id="">
                                    <option >Terbaru</option>
                                    <option value="price-desc" >Harga Tertinggi</option>
                                    <option value="price-asc" >Harga Terendah</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14">
                            {currentItems?.map((product_popular) => (
                                <div className='flex flex-1 flex-col w-full max-sm:w-full' key={product_popular?.product_id}>

                                    <Link
                                        to={"/produk-detail/" + product_popular?.product_url?.slice(37)}
                                    // to={{ pathname:`/produk-detail/${product_popular?.product_url?.slice(37, -37)}`, query: { productId: `${product_popular?.product_id}` }, item: { productId: `${product_popular?.product_id}` } }} 
                                    // state={{ productId: `${product_popular?.product_id}`, productParams: `${product_popular?.product_url?.slice(37, -37)}` }}
                                    >

                                        <div className='shadow-md rounded bottom-1 max-sm:flex cursor-pointer'>
                                            <img src={product_popular?.img} alt={product_popular?.name_product} className='max-sm:w-1/2' />
                                            <div className='p-2 max-sm:p-0'>
                                                <div className='mt-0 flex justify-start gap-2.5'>
                                                    <img src={star} alt='rating icon' width={24} height={24} />
                                                    {product_popular?.average ?
                                                        <p className='font-montserrat text-lg font-bold leading-normal text-slate-gray'>
                                                            {product_popular?.average}
                                                        </p>
                                                        :
                                                        <p className='font-montserrat text-[14px] mt-1 font-bold leading-normal text-slate-gray'>
                                                            {"Belum Ada Penilaian"}
                                                        </p>
                                                    }
                                                </div>
                                                <div className='h-20'>
                                                    <h3 className='mt-2 text-md max-sm:text-base leading-normal font-semibold font-palanquin'>
                                                        {product_popular?.name_product}
                                                    </h3>
                                                </div>
                                                <p className='mt-3 font-semibold max-sm:text-base font-montserrat text-coral-red text-lg leading-normal'>
                                                    {product_popular?.price}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className='flex mt-5 mb-3 justify-between text-xl'>
                            <button className={`text-white ${currentPage > 1 ? 'visible' : 'invisible'}  `} onClick={handlePrevPage} disabled={currentPage === 1}>
                                <div className='border bg-coral-red rounded-full'>
                                    <ChevronLeftIcon width={32} height={32} />
                                </div>
                            </button>
                            {/* <span className=''> Page {currentPage} of {totalPages} </span> */}
                            <span className=''> {currentPage} </span>
                            <button className={`text-white ${currentPage < totalPages ? 'visible' : 'invisible'} `} onClick={handleNextPage} disabled={currentPage === totalPages}>
                                <div className='border bg-coral-red rounded-full'>
                                    <ChevronRightIcon width={32} height={32} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListProduct