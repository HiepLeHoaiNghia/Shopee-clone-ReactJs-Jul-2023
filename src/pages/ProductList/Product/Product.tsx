import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <Link to='/'>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.3rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src='https://down-vn.img.susercontent.com/file/vn-11134201-23030-l6wob9lc3bov1c_tn'
            alt=''
            className='absolute left-0 top-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>
            Mũ lưỡi trai ❤️ Nón kết thêu chữ phong cách Ulzzang form unisex nam nữ N01
          </div>
        </div>
        <div className='mt-3 flex items-center'>
          <div className='max-w-[50%] truncate text-gray-500 line-through'>
            <span className='text-xs'>₫</span>
            <span>9.000</span>
          </div>
          <div className='max-w-[50%] truncate text-orange'>
            <span className='text-xs'>₫</span>
            <span>39.000</span>
          </div>
        </div>
        <div className='mt-3 flex items-center justify-start'>
          <div className='flex items-center'>
            <div className='relative'>
              <div className='absolute left-0 top-0 h-full overflow-hidden' style={{ width: '50%' }}>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className='h-3 w-3 fill-yellow-300 text-yellow-300'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
              <svg
                enableBackground='new 0 0 15 15'
                viewBox='0 0 15 15'
                x={0}
                y={0}
                className='h-3 w-3 fill-current text-gray-300'
              >
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
          </div>
          <div className='ml-2 text-sm'>
            <span className='ml-1'>Đã bán </span>
            <span>5.66k</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
