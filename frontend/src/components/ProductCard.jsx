import React from 'react'

const ProductCard = ({name,image,price}) => {
  return (

    <div className='border rounded-xl shadow-sm p-3 w-full max-w-[220px]'>
        <img src={image} alt={name} className='w-full h-[250px] object-cover rounded-md'/>
        <div className="mt-2">
        <h3 className="text-sm font-semibold line-clamp-2">{name}</h3>
        <p className="text-gray-700 font-medium mt-1">{price}</p>
      </div>
    </div>
  )
}

export default ProductCard
