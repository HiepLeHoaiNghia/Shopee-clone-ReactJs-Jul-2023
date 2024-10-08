import { Link } from 'react-router-dom'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'
import ProductRating from '../ProductRating/ProductRating'
import path from 'src/constants/path'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.3rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute left-0 top-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>{product.name}</div>
        </div>
        <div className='mt-3 flex items-center px-1.5'>
          <div className='max-w-[50%] truncate text-gray-500 line-through'>
            <span className='text-xs'>₫</span>
            <span className='text-sm'>{formatCurrency(product.price_before_discount)}</span>
          </div>
          <div className='m-1 h-[1px] w-5 max-w-[0.5rem] grow bg-gray-400' />
          <div className='max-w-[50%] truncate text-orange'>
            <span className='text-xs'>₫</span>
            <span className='text-sm'>{formatCurrency(product.price)}</span>
          </div>
        </div>
        <div className='mt-3 flex items-center justify-start px-1.5'>
          <ProductRating rating={product.rating} />
          <div className='ml-2 text-sm'>
            <span className='ml-1'>Đã bán </span>
            <span>{formatNumberToSocialStyle(product.sold)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
