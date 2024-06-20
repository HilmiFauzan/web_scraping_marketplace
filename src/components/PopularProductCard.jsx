import { star } from "../assets/icons";
import { Link } from "react-router-dom";

const PopularProductCard = ({ name_product, img, price, average, product_url }) => {
    return (
        // <div className='flex flex-1 flex-col w-full max-sm:w-full'>
        <div className='flex flex-1 flex-col w-64'>
            <Link to={img} target="_blank" rel="noopener noreferrer">
                <img src={img} alt={name_product} className='w-[282px] h-[282px]' />
            </Link>
            <div className='mt-8 flex justify-start gap-2.5'>
                <img src={star} alt='rating icon' width={24} height={24} />
                <p className='font-montserrat text-xl leading-normal text-slate-gray'>
                    {/* (4.5) */}
                    {average}
                </p>
            </div>
            <Link to={"/produk-detail/" + product_url?.slice(37)}>
                <h3 className='mt-2 text-xl leading-normal font-semibold font-palanquin'>
                    {name_product}
                </h3>
                <p className='mt-2 font-semibold font-montserrat text-coral-red text-xl leading-normal'>
                    {price}
                </p>
            </Link>
        </div>
    );
};

export default PopularProductCard