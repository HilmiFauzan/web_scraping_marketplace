import { React, useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { hamburger } from "../assets/icons";
import { ChevronRightIcon, ChevronLeftIcon, MapPinIcon, XMarkIcon } from "@heroicons/react/20/solid";
import ScrapingDataNode from "../constants/ScrapingDataNode"
import { star } from "../assets/icons";
import { Link } from "react-router-dom";
import PopularProductCard from "../components/PopularProductCard";

const ProductDetail = () => {
    const fetchData = ScrapingDataNode()
    const { productParams } = useParams();
    const [detailProduk, setDetailProduk] = useState([]);
    const [changeProductImage, setChangeProductImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const name_nav = fetchData?.['shop_info_data']?.[0]?.['shopCore']?.['name'];
    const logo_nav = fetchData?.['shop_info_data']?.[0]?.['shopAssets']?.['avatar'];
    const shippingLoc_cityname = fetchData?.['shop_info_data']?.[0]?.['shippingLoc']?.['cityName'];
    const shippingLoc_districtName = fetchData?.['shop_info_data']?.[0]?.['shippingLoc']?.['districtName'];

    const detail_produk_basic_info = detailProduk?.['data']?.['pdpGetLayout']?.['basicInfo']
    const detail_produk_components = detailProduk?.['data']?.['pdpGetLayout']?.['components']
    const detail_produk_components_media = detailProduk?.['data']?.['pdpGetLayout']?.['components']?.[1]?.['data']?.[0]
    let item_size_products = detail_produk_components?.[11]?.['data']?.[0]?.['children']
    const size_products = item_size_products?.sort((a, b) => Number(a.optionName[0]) - Number(b.optionName[0]));

    const list_data = fetchData?.['shop_product_data'];
    const sort_product = list_data?.sort((a, b) => b.review_product - a.review_product)
    const product_populars = sort_product?.slice(0, 10)

    // console.log(detail_produk_basic_info)
    // console.log(detail_produk_components)

    const datadetailProduct = async () => {
        try {
            const { data } = await axios.get(`/produk-detail/${productParams}`)
            return setDetailProduk(data);
        } catch (error) {
            return console.log(error)
        }
    }

    const removeWord = () => {
        setSearchTerm('');
        setFilteredProducts([]);
    }

    const handleClick = (img) => {
        setChangeProductImage(img['target']['src']);
        removeWord();
        setIsModalOpen(false);
        // console.log()
    };

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 510;
    }

    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 510;
    }

    useEffect(() => {
        // eslint-disable-next-line
        if (searchTerm === '') {
            setFilteredProducts([]);
        } else {
            const filtered = list_data.filter((product) =>
                product.name_product.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        }

        datadetailProduct();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [productParams, searchTerm]);

    let number = 1;
    const lines_deskripsi = detail_produk_components?.[17]?.['data']?.[0]?.['content']?.[5]?.['subtitle'].split('\n');

    return (
        <div className='text-white w-full text-center font-palanquin'>

            {
                isModalOpen ?
                    (
                        <div className='fixed bg-gray-600 bg-opacity-50 z-30 flex justify-center items-center w-full h-full lg:hidden'>
                            <div className="absolute inset-x-0 top-0">
                                <div className="bg-white text-black p-5 rounded shadow-lg">
                                    <div className="flex justify-end">
                                        <button onClick={() => { setIsModalOpen(false); removeWord(); }} className="text-gray-500 hover:text-gray-800">
                                            {/* &times; */}
                                            <XMarkIcon width={36} />
                                        </button>
                                    </div>
                                    <div className='mt-6'>
                                        <div className='flex'>
                                            <input
                                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                type="input"
                                                placeholder='Search products...'
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded mt-6"
                                            onClick={() => { setIsModalOpen(false); removeWord() }}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                                {filteredProducts.length > 0 && (
                                    <ul className="z-auto dropdown text-black font-palanquin w-1/2 max-lg:w-full flex flex-col scrollbarWidth rounded-b-md">
                                        {filteredProducts.slice(0, 10).map((product) => (
                                            <Link
                                                to={"/produk-detail/" + product?.product_url?.slice(37)}
                                                key={product.product_id}
                                                onClick={handleClick}
                                            >
                                                <li className="dropdown-item">
                                                    <img src={product.img} alt={product.name_product} className="dropdown-image" />
                                                    <span>{product.name_product}</span>
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )
                    :
                    (<></>)
            }

            <div className='w-full fixed z-20'>
                <nav className='font-palanquin'>
                    <div className='w-full bg-pale-blue'>
                        <div className='flex flex-row justify-between text-lg text-black py-2 px-8 max-sm:px-0 max-sm:text-sm'>
                            <div className='font-bold ml-2'>
                                {/* kontak */}
                                <a href='/'>
                                    Home
                                </a>
                                {" > "}
                                <a href='/produk'>
                                    Produk
                                </a>
                                {" > "}
                                <span>
                                    Detail Produk
                                </span>
                            </div>
                            <div className='flex max-sm:hidden'>
                                <MapPinIcon width={20} height={20} />
                                {shippingLoc_cityname},
                                Kec. {shippingLoc_districtName}
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-16 bg-white px-8'>
                        <div className='flex flex-row justify-center max-lg:justify-between py-2'>
                            <a href="/" className='flex flex-row mr-64'>
                                <img
                                    src={logo_nav}
                                    alt='logo'
                                    // width={90}
                                    // height={90}
                                    className='m-0 w-[50px] h-[50px]'
                                />
                                <span className='text-2xl text-black mt-2 font-bold font-palanquin'>
                                    {name_nav}
                                </span>
                            </a>
                            <div className='w-2/6 px-5 max-lg:hidden inline-flex'>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    type="input"
                                    placeholder='Search products...'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <XMarkIcon
                                    className='text-black cursor-pointer'
                                    onClick={removeWord}
                                    width={35}
                                />
                            </div>
                            <div className='w-2/6 mt-3 flex justify-end'>
                                <img
                                    src={hamburger}
                                    className='max-lg:block hidden cursor-pointer'
                                    alt='hamburger icon'
                                    width={25} height={25}
                                    onClick={() => setIsModalOpen(true)}
                                />
                            </div>
                        </div>
                    </div>
                </nav>

                {filteredProducts.length > 0 && (
                    <ul className="dropdown text-black font-palanquin w-1/2 max-sm:w-full flex flex-col scrollbarWidth rounded-b-md">
                        {filteredProducts.slice(0, 10).map((product) => (
                            <Link
                                to={"/produk-detail/" + product?.product_url?.slice(37)}
                                key={product.product_id}
                                onClick={handleClick}
                            >
                                <li className="dropdown-item">
                                    <img src={product.img} alt={product.name_product} className="dropdown-image" />
                                    <span>{product.name_product}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}


            </div>

            <section className='pt-28 max-md:mb-0 lg:mb-10 xl:mb-0'>
                <div className='flex max-sm:mb-0 -mb-20 flex-row max-lg:flex-col max-lg:justify-center max-lg:items-center'>
                    <div className='max-xl:w-full w-3/5 max-lg:px-0 px-20'>
                        <div className='flex flex-row max-lg:flex-col gap-12 max-lg:gap-1'>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='max-sm:w-full max-lg:w-[400px] max-xl:w-5/6'>
                                    <img className='bg-cover rounded-md shadow-md bg-center bg-transparent' src={changeProductImage ? changeProductImage : detail_produk_components_media?.['media']?.[0]?.['urlMaxRes']} alt="" />
                                </div>
                                <div className='max-sm:px-5'>
                                    <div className='flex max-sm:my-8 flex-row gap-2 my-4 overflow-auto h-28 scrollbarWidth w-96 max-sm:w-full'>
                                        {detail_produk_components_media?.['media']?.map((list_detail_product) => (
                                            <img
                                                className='border-2 border-coral-red rounded-md cursor-pointer bg-cover bg-center bg-transparent'
                                                key={number += number}
                                                onClick={handleClick}
                                                src={list_detail_product?.['urlMaxRes']}
                                                width={120}
                                                alt=""
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='max-lg:pt-16 max-lg:mx-3 pt-8'>
                                <div className='max-lg:w-full max-sm:h-full lg:w-[490px] xl:w-[700px] rounded-lg h-[500px] bg-coral-red text-start p-6 relative'>
                                    <div className='flex flex-row justify-between'>
                                        <div className='max-md:text-sm text-xl'>
                                            Terjual : {detail_produk_basic_info?.['txStats']?.['countSold']}
                                        </div>
                                        <div className='flex gap-2'>
                                            <div className='bg-white p-1 rounded-full'>
                                                <img className='text-white max-sm:w-4' src={star} alt='rating icon' />
                                            </div>
                                            {detail_produk_basic_info?.['stats']?.['rating']}
                                        </div>
                                        <div className='max-md:text-sm text-xl'>
                                            Berat : {detail_produk_basic_info?.weight} {detail_produk_basic_info?.weightUnit}
                                        </div>
                                    </div>

                                    <span className='max-lg:text-md text-2xl font-bold'>
                                        {detail_produk_components?.[6]?.['data']?.[0]?.['name']}
                                    </span>

                                    <div className='flex flex-row gap-2 max-sm:flex-col justify-between my-4'>
                                        <div className='w-full'>
                                            <p className='text-xl font-bold'>
                                                Kategori : {detail_produk_basic_info?.['category']?.['name']}
                                            </p>
                                            Kondisi : {detail_produk_basic_info?.condition}
                                            <p>
                                                Min. Pemesanan : {detail_produk_basic_info?.minOrder}
                                            </p>
                                            <p className='text-lg font-bold'>
                                                Etalase : {detail_produk_basic_info?.['menu']?.['name']}
                                            </p>
                                        </div>
                                        <div className='w-full'>
                                            <span>Ukuran :</span>
                                            <div className='mt-1 flex flex-row gap-1 w-96 max-sm:w-full overflow-auto scrollbarWidth'>
                                                {
                                                    size_products?.map((size_product) => (
                                                        <div className='border-white max-sm:text-sm border-2 px-1 hover:text-coral-red hover:bg-white cursor-pointer' key={size_product?.['productID']}>
                                                            {size_product?.['optionName']?.join(" ")}
                                                        </div>
                                                    ))
                                                }
                                                {/* {console.log(detail_produk_components?.[11]?.['data']?.[0]?.['children']?.[0]?.['optionName']?.[0])} */}
                                            </div>
                                        </div>
                                    </div>


                                    <div className='mt-2'>
                                        {/* <span className='font-bold'>
                                            Deskripsi :
                                        </span> */}
                                        <div className='text-pretty max-sm:h-[115px] h-[165px] overflow-y-auto scrollbarWidth'>
                                            <div>
                                                {lines_deskripsi?.map((line, index) => (
                                                    <div key={index}>
                                                        {line}
                                                        {index < lines_deskripsi.length - 1 && <br />}
                                                    </div>
                                                ))}
                                            </div>
                                            {/* {console.log(detail_produk_components?.[17]?.['data']?.[0]?.['content']?.[5])} */}
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='xl:absolute inset-x-0 bottom-0 mx-7 my-7'>
                                            <div className='flex max-sm:flex-col-reverse flex-row justify-between max-sm:items-center'>
                                                <div className='max-sm:mt-0 -mt-5'>
                                                    <span className='text-3xl font-bold'>
                                                        {detail_produk_components?.[6]?.['data']?.[0]?.['price']?.['priceFmt']}
                                                    </span>
                                                    <span className='text-md mx-4'>
                                                        <span className='line-through mx-2'>
                                                            {detail_produk_components?.[6]?.['data']?.[0]?.['price']?.['slashPriceFmt']}
                                                        </span>
                                                        {detail_produk_components?.[6]?.['data']?.[0]?.['price']?.['discPercentage']}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className='w-36 cursor-pointer py-1 rounded-xl text-lg text-center font-bold bg-white text-coral-red'>
                                                        + KERANJANG
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className='w-full flex justify-center bg-white text-coral-red rounded-3xl py-2 mt-1 text-2xl'>
                                                Beli
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className='relative flex-1 -z-10 flex justify-center items-center xl:min-h-screen max-xl:pb-12 max-xl:pt-10 bg-primary bg-hero bg-cover bg-center'
                    >
                    </div>
                </div>
            </section>

            <div className='w-full bg-white px-10 pt-10 pb-20'>
                <div className="flex flex-col justify-start gap-5">
                    <h2 className="text-4xl max-sm:text-3xl font-palanquin font-bold">
                        <span className="text-coral-red">Produk Popular</span>
                    </h2>
                </div>

                <div className="relative flex items-center group">
                    <div className="h-1/2">
                        <ChevronLeftIcon
                            onClick={slideLeft}
                            className="bg-white text-coral-red left-0 ml-1 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block"
                            width={50}
                        />
                    </div>
                    <div id="slider" className="flex w-full relative overflow-x-scroll scroll-smooth mt-16 scrollbarWidth text-black">
                        {product_populars?.map((product_popular) => (
                            <div onClick={handleClick} key={product_popular.product_id}>
                                <PopularProductCard {...product_popular} />
                            </div>
                        ))}
                    </div>
                    <div className="h-1/2">
                        <ChevronRightIcon
                            onClick={slideRight}
                            className="bg-white text-coral-red right-0 mr-1 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block"
                            width={50}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetail