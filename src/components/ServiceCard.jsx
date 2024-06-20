const ServiceCard = ({ image, name }) => {
    return (
        <div className='flex flex-col sm:w-[350px] items-center sm:min-w-[350px] w-full text-center rounded-[20px] shadow-3xl px-10 py-16 max-sm:py-5'>
            <div className='w-20 h-20 flex justify-center items-center bg-coral-red rounded-full'>
                <img src={image} alt={name} width={64} height={64} />
            </div>
            <h3 className='mt-5 font-palanquin text-3xl leading-normal font-bold'>
                {name}
            </h3>
            {/* <p className='mt-3 break-words font-montserrat text-lg leading-normal text-slate-gray'>
                {subtext}
            </p> */}
        </div>
    );
};

export default ServiceCard;