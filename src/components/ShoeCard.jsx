const ShoeCard = ({ dataParent, changeBigShoeImage, bigShoeImg, setURLProduct }) => {
  const handleClick = () => {
    if (bigShoeImg !== dataParent.img) {
      changeBigShoeImage(dataParent.img);
      setURLProduct(dataParent.product_url)
      // console.log(dataParent.product_url)
    }
  };

  return (
    <div
      className={`border-2 rounded-xl ${
        bigShoeImg === dataParent.img
          ? "border-coral-red"
          : "border-transparent"
      } cursor-pointer max-sm:flex-1`}
      onClick={handleClick}
    >
      <div className='flex justify-center items-center bg-card bg-center bg-cover sm:w-[125px] sm:h-[125px] rounded-xl max-sm:p-4'>
        <img
          src={dataParent.img}
          alt='shoe colletion'
          width={111}
          height={103.34}
          className='object-contain rounded-xl'
        />
      </div>
    </div>
  );
};

export default ShoeCard;