
import { useEffect, useState } from "react";
import { arrowRight } from "../assets/icons";
import { bigShoe1 } from "../assets/images";
// import { statistics } from "../constants";
import { Button, ShoeCard } from "../components";
import ScrapingDataNode from "../constants/ScrapingDataNode";
import { Link } from "react-router-dom";

const Hero = () => {
  const fetchData = ScrapingDataNode()
  const [bigShoeImg, setBigShoeImg] = useState(bigShoe1);
  const [urlProduct, setURLProduct] = useState();

  const list_data_shop = fetchData['shop_info_data'];
  const list_data_products = fetchData['shop_product_data'];

  const name_title = list_data_shop?.[0]?.['customSEO']?.['title'];
  const desc_nav = list_data_shop?.[0]?.['customSEO']?.['description'];

  const product_active = list_data_shop?.[0]?.['activeProduct'];
  const product_favorite = list_data_shop?.[0]?.['favoriteData']?.['totalFavorite'];
  const product_sold = list_data_shop?.[0]?.['shopStats']?.['productSold'];

  const new_products = list_data_products?.slice(0, 3)
  // console.log(product_active)

  useEffect(() => {
    // eslint-disable-next-line
    const newProducts = () => {
      const thumbnail = list_data_products?.[0]?.['img']
      setBigShoeImg(thumbnail)
    }
    newProducts();
  }, [list_data_products]);

  return (
    <section
      id='home'
      className='w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container'
    >
      <div className='relative xl:w-2/5 flex flex-col justify-center items-start w-full  max-xl:padding-x pt-28'>
        <p className='text-xl font-montserrat text-coral-red'>
          Our Summer collections
        </p>

        {/* <h1 className='mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold'> */}
        <h1 className='mt-10 font-palanquin text-[37px] max-sm:text-[45px] max-sm:leading-[82px] font-bold'>
          <span className='xl:whitespace-nowrap relative z-10 pr-10'>
            {/* The New Arrival */}
            {name_title}
          </span>
          <br />
          <div className="inline-block whitespace-nowrap max-sm:text-[30px] mt-3">
            <span className='text-coral-red'>Pakaian</span> 
            &nbsp; dan &nbsp;
            <span className='text-coral-red'>Sepatu</span>
          </div>
        </h1>
        <p className='font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-lg'>
          {/* Discover stylish Nike arrivals, quality comfort, and innovation for
          your active life. */}
          {desc_nav}
        </p>

        <Link to={urlProduct ? "/produk-detail/" + urlProduct?.slice(37) : "/produk-detail/" + new_products?.[0]?.product_url?.slice(37)}>
          <Button label='Belanja Sekarang' iconURL={arrowRight} />
        </Link>
        

        <div className='flex justify-start items-start flex-wrap w-full mt-12 gap-16'>
          {/* {statistics?.map((stat, index) => (
            <div key={index}>
              <p className='text-4xl font-palanquin font-bold'>{stat.value}</p>
              <p className='leading-7 font-montserrat text-slate-gray'>
                {stat.label}
              </p>
            </div>
          ))} */}
          <div>
            <p className='text-4xl font-palanquin font-bold'>{product_active >= 1000 ? product_active?.toString()?.slice(0, -3) + " k+" : product_active} </p>
            <p className='leading-7 font-montserrat text-slate-gray'>
              Product
            </p>
          </div>
          <div>
            <p className='text-4xl font-palanquin font-bold'>{product_favorite >= 1000 ? product_favorite?.toString()?.slice(0, -3) + " K+" : product_favorite} </p>
            <p className='leading-7 font-montserrat text-slate-gray'>
              Favorite
            </p>
          </div>
          <div>
            <p className='text-4xl font-palanquin font-bold'>{product_sold ? product_sold?.toString()?.slice(0, -3) + " K+" : product_sold} </p>
            <p className='leading-7 font-montserrat text-slate-gray'>
              Sold Out
            </p>
          </div>
        </div>
      </div>

      <div className='relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:pb-36 max-xl:pt-10 bg-primary bg-hero bg-cover bg-center'>
        <div className="bg-white xl:rounded-r-xl max-xl:rounded-xl xl:pl-10">
          <img
            src={bigShoeImg ? bigShoeImg : list_data_products?.[0]?.['img']}
            // src={bigShoeImg}
            alt='shoe colletion'
            width={550}
            height={502}
            className='object-contain relative -z-1 rounded-xl'
          />
        </div>

        {/* <div className='flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6'> */}
        <div className="max-lg:flex max-lg:-bottom-[5%] gap-4 xl:ml-7 lg:space-y-2 py-10 max-xl:absolute lg:right-0 md:right-auto">
          {new_products?.map((new_product, index) => (
            <div key={index}>
              <ShoeCard
                index={index}
                dataParent={new_product}
                setURLProduct={setURLProduct}
                changeBigShoeImage={(new_product) => setBigShoeImg(new_product)}
                bigShoeImg={bigShoeImg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;