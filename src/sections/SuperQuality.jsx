// import { shoe8 } from "../assets/images";
// import { Button } from "../components";
import ScrapingDataNode from "../constants/ScrapingDataNode";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const SuperQuality = () => {
  const fetchData = ScrapingDataNode()
  const list_data = fetchData?.['shop_layout_data'];
  // const super_quality_products = list_data?.[0]?.[0]?.['desktopImageUrl']
  const super_quality_products = list_data?.[0]
  const super_quality_title = fetchData?.['shop_info_data']?.[0]?.['shopCore']?.['tagLine'];
  const super_quality_description = fetchData?.['shop_info_data']?.[0]?.['shopCore']?.['description'];
  // console.log(fetchData?.['shop_info_data']?.[0]?.['shopCore'])

  const deskripsi = super_quality_description?.split('\n');
  
  return (
    <section
      id='about-us'
      className='flex justify-between items-center max-lg:flex-col gap-10 w-full max-container'
    >
      <div className='flex flex-1 flex-col'>
        <h2 className='font-palanquin capitalize text-4xl lg:max-w-lg font-bold'>
          <span className='text-coral-red'>{super_quality_title?.slice(0, 7)} </span> {super_quality_title?.slice(7)}
        </h2>

        <div className='mt-8 lg:max-w-lg info-text'>
          {deskripsi?.map((line, index) => (
            <div key={index}>
              {line}
              {index < deskripsi.length - 1 && <br />}
            </div>
          ))}
          {/* {super_quality_description?.slice(0, 125)} */}
        </div>
        {/* <p className='mt-6 lg:max-w-lg info-text'>
          {super_quality_description?.slice(-14)}
        </p> */}
        {/* <div className='mt-11'>
          <Button label='View details' />
        </div> */}
      </div>

      {/* <div className='flex-1 flex justify-center items-center'>
        <img
          // src={shoe8}
          src={super_quality_products}
          alt='product detail'
          width={600}
          height={522}
          className='object-contain'
        />
      </div> */}
      <div className="w-1/2 max-lg:w-full overflow-x-auto">
        <OwlCarousel className='owl-theme' loop autoplay autoplayTimeout={4000} animateOut={'fadeOut'} margin={0} items={1} dots={1}>
          {super_quality_products?.map((super_quality_product) => (
            <div className="item" key={super_quality_product.linkID}>
              <img
                src={super_quality_product?.['desktopImageUrl']}
                alt='product detail'
                width={600}
                height={522}
                className='object-contain'
              />
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  )
}

export default SuperQuality