import { copyrightSign } from "../assets/icons";
// import { footerLogo } from "../assets/images";
import { footerLinks, socialMedia } from "../constants";
import ScrapingDataNode from "../constants/ScrapingDataNode"

const Footer = () => {
  const fetchData = ScrapingDataNode()
  const name_nav = fetchData?.['shop_info_data']?.[0]?.['shopCore']?.['name'];
  const logo_nav = fetchData?.['shop_info_data']?.[0]?.['shopAssets']?.['avatar'];
  const product_footers = fetchData?.['shop_show_case']?.[0]?.slice(0, 4);

  return (
    <footer className='max-container'>
      <div className='flex justify-between items-start gap-20 flex-wrap max-lg:flex-col'>
        <div className='flex flex-col items-start'>
          <div className="flex flex-row gap-2">
            <a href='/'>
              <img
                src={logo_nav}
                alt='logo'
                width={72}
                height={46}
                className='m-0 rounded-full'
              />
            </a>
            <span className='mt-6 text-2xl font-bold leading-8 font-montserrat text-white-400 sm:max-w-sm'>
              {name_nav}
            </span>
          </div>
          <p className='mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm'>
            Get shoes ready for the new term at your nearest Nike store. Find
            Your perfect Size In Store. Get Rewards
          </p>
          <div className='flex items-center gap-5 mt-8'>
            {socialMedia.map((icon) => (
              <div
                className='flex justify-center items-center w-12 h-12 bg-white rounded-full hover:bg-coral-red cursor-pointer'
                key={icon.alt}
              >
                <img src={icon.src} alt={icon.alt} width={24} height={24} />
              </div>
            ))}
          </div>
        </div>

        {/* <div className='flex flex-1 justify-around lg:gap-10 gap-20 flex-wrap'> */}
        <div className='flex flex-1 lg:justify-around xl:justify-around lg:gap-10 gap-20'>
          <div>
            <h4 className='font-montserrat text-2xl leading-normal font-medium mb-6 text-white'>
              Produk
            </h4>
            <ul>
              {product_footers?.map(product_footer => (
                <li
                  className='mt-3 font-montserrat text-base leading-normal text-white-400 hover:text-slate-gray'
                  key={product_footer?.id}
                >
                  <a href={product_footer?.link}>{product_footer?.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-row">
            {footerLinks.slice(1).toReversed().slice(1).map((section) => (
              <div key={section.title}>
                <h4 className='font-montserrat text-2xl leading-normal font-medium mb-6 text-white'>
                  {section.title}
                </h4>
                <ul>
                  {section.links.map((link) => (
                    <li
                      className='mt-3 font-montserrat text-base leading-normal text-white-400 hover:text-slate-gray'
                      key={link.name}
                    >
                      <a href={link.link}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className='flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center'>
        <div className='flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer'>
          <img
            src={copyrightSign}
            alt='copyright sign'
            width={20}
            height={20}
            className='rounded-full m-0'
          />
          <p>Copyright. All rights reserved.</p>
        </div>
        <p className='font-montserrat cursor-pointer'>Terms & Conditions</p>
      </div>
    </footer>
  );
};

export default Footer;