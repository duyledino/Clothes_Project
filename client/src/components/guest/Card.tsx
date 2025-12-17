// (alias) const products: {
//     _id: string;
//     name: string;
//     description: string;
//     price: number;
//     image: StaticImageData[];
//     category: string;
//     subCategory: string;
//     sizes: string[];
//     date: number;
//     bestseller: boolean;
// }[]


type Product={
  title: string;
  imageUrl: string;
  price: number;
}

const Card = ({title,price,imageUrl}:Product) => {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="w-full h-[350px] overflow-hidden relative">
        <img
          src={imageUrl}
          alt="product"
          className="w-full h-full object-cover hover:scale-110 transition-all"
        />
      </div>
      <p className="text-[12px] text-black">
        {title}
      </p>
      <h1 className="text-black font-bold">{price}</h1>
    </div>
  );
};

export default Card;
