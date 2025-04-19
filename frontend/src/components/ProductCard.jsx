import React from 'react';
import {motion} from 'framer-motion' ;

const ProductCard = ({product})=>{
  const {name,price,image,productUrl, brand , category} = product ;

  return(
    <motion.div
    whileHover={{scale: 1.05}}
    initial={{opacity: 0 , y:  40}}
    animate={{opacity:1, y: 0}}
    transition={{duration: 0.3}}
    className='bg-black border border-green-500 rounded-2xl overflow-hidden shadow-md p-4 flex flex-col justify-between text-white hover:border-orange-500'
    >
      <img src={image}
      alt={name}
      className='w-full h-60 object-cover rounded-xl mb-4'
      />

      <div className='flex flex-col gap-2'>
      <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-green-400">{brand} | {category}</p>
        <p className="text-md text-orange-400 font-bold">{price}</p>
        <a
          href={productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-sm underline text-white hover:text-orange-400"
        >
          View Product
        </a>
      </div>
    </motion.div>
  )
}

export default ProductCard;