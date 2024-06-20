// import { services } from "../constants";
import { ServiceCard } from "../components";
import ScrapingDataNode from "../constants/ScrapingDataNode"

const Services = () => {
  const fetchData = ScrapingDataNode()
  const list_service_shipments = fetchData?.['shop_info_data']?.[0]?.['shipmentInfo'];

  return (
    <section id="services" className='max-container'>
      <h2 className="text-4xl font-palanquin font-bold text-center">
        Jasa<span className="text-coral-red"> Layanan</span> Pengiriman
      </h2>
      <div className="flex justify-center mt-8 flex-wrap gap-9 max-sm:gap-3">
        {list_service_shipments?.map((list_service_shipment) => (
          <ServiceCard key={list_service_shipment.name} {...list_service_shipment} />
        ))}
      </div>
    </section>
  );
};

export default Services;