// import {useState, useEffect} from "react";
// import { products } from "../constants";

import PopularProductCard from "../components/PopularProductCard";
import ScrapingDataNode from "../constants/ScrapingDataNode"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";

const PopularProducts = () => {
  const fetchData = ScrapingDataNode()
  const list_data = fetchData?.['shop_product_data'];
  const sort_product = list_data?.sort((a, b) => b.review_product - a.review_product)
  const product_populars = sort_product?.slice(0, 10)

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 510;
  }

  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 510;
  }
  // console.log(product_populars)

  return (
    <section id="products"
      className="max-container max-sm:mt-12"
    >
      <div className="flex flex-col justify-start gap-5">
        <h2 className="text-4xl font-palanquin font-bold">
          Produk <span className="text-coral-red">Popular</span> Kami
        </h2>
        <p className="lg:max-w-lg mt-2 text-slate-gray">
          Rasakan kualitas dan gaya terbaik dengan pilihan pilihan kami. Temukan dunia kenyamanan, desain, dan nilai
        </p>
      </div>

      {/* <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14"> */}

      <div className="relative flex items-center group">

        <div className="h-1/2">
          <ChevronLeftIcon
            onClick={slideLeft}
            className="bg-white text-coral-red left-0 ml-1 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block"
            width={50}
          />
        </div>
        <div id="slider" className="flex w-full relative overflow-x-scroll scroll-smooth mt-16 scrollbarWidth">
          {product_populars?.map((product_popular) => (
            <div key={product_popular.product_id}>
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

      {/* {
          products.map((product) => (
            <PopularProductCard key={product.name} {...product} />
          ))
        } */}
      {/* </div> */}

    </section>
  )
}

export default PopularProducts