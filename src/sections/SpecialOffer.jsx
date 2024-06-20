import { arrowRight } from "../assets/icons";
// import { offer } from "../assets/images";
import { Button } from "../components";
import ScrapingDataNode from "../constants/ScrapingDataNode";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const SpecialOffer = () => {
  const fetchData = ScrapingDataNode()
  const list_data = fetchData?.['shop_layout_data'];
  // const special_offer_products = list_data?.[2]?.[0]?.['desktopImageUrl'];
  const special_offer_products = list_data?.[2];
  // console.log(special_offer_products_check)

  return (
    <section className='flex justify-between items-center max-xl:flex-col-reverse gap-10 max-container'>
      <div className='w-1/2 max-lg:w-full overflow-x-auto'>

        <OwlCarousel className='owl-theme' loop autoplay autoplayTimeout={4000} animateOut={'fadeOut'} margin={0} items={1} dots={0}>
          {
            special_offer_products?.map((special_offer_product) => (
              <div className="item" key={special_offer_product.linkID}>
                <img
                  // src={offer}
                  src={special_offer_product?.['desktopImageUrl']}
                  alt='Shoe Promotion'
                  width={773}
                  height={687}
                  className='object-contain w-full'
                />
              </div>
            ))
          }
        </OwlCarousel>

      </div>
      <div className='flex flex-1 flex-col'>
        <h2 className='text-4xl font-palanquin font-bold'>
          <span className='text-coral-red'>Special </span>
          Offer
        </h2>
        <p className='mt-4 info-text'>
          Mulailah perjalanan berbelanja yang mendefinisikan kembali pengalaman Anda dengan penawaran yang tidak ada duanya.
          Dari pilihan terbaik hingga penghematan luar biasa, kami menawarkan nilai tak tertandingi yang membedakan kami.
        </p>
        <p className='mt-6 info-text'>
          Jelajahi berbagai kemungkinan yang dirancang untuk memenuhi keinginan unik Anda,
          melampaui ekspektasi tertinggi. Perjalanan Anda bersama kami sungguh luar biasa.
        </p>
        <div className='mt-11 flex flex-wrap gap-4'>
        <a href="/produk">
          <Button label='Belanja Sekarang' iconURL={arrowRight} />
        </a>
          {/* <Button
            label='Learn more'
            backgroundColor='bg-white'
            borderColor='border-slate-gray'
            textColor='text-slate-gray'
          /> */}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;