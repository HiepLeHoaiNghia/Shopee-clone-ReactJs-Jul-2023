import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { Helmet } from 'react-helmet-async'
import { Link, createSearchParams } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const purchasesTabs = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã huỷ' }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all

  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchaseList({ status: status as PurchaseListStatus })
  })

  const purchaseInCart = purchaseInCartData?.data.data

  const purchaseTabsLink = purchasesTabs.map((tab) => {
    return (
      <Link
        key={tab.status}
        to={{
          pathname: path.historyPurchase,
          search: createSearchParams({
            status: String(tab.status)
          }).toString()
        }}
        className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
          'border-orange text-orange': status === tab.status,
          'border-b-black/10 text-gray-900': status !== tab.status
        })}
      >
        {tab.name}
      </Link>
    )
  })

  return (
    <div>
      <Helmet>
        <title>Quản lý đơn hàng | Shopee clone</title>
        <meta name='description' content='Trang quản lý đơn hàng user' />
      </Helmet>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='round-t-sm sticky top-0 flex shadow-sm'>{purchaseTabsLink}</div>
          <div>
            {purchaseInCart?.map((purchase) => {
              return (
                <div
                  className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'
                  key={purchase._id}
                >
                  <Link
                    className='flex'
                    to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  >
                    <div className='flex-shrink-0'>
                      <img
                        className='h-20 w-20 object-cover'
                        src={purchase.product.image}
                        alt={purchase.product.name}
                      />
                    </div>
                    <div className='ml-3 flex flex-grow justify-between overflow-hidden'>
                      <div>
                        <div className='truncate'>{purchase.product.name}</div>
                        <div className='mt-3'>x{purchase.buy_count}</div>
                      </div>
                      <div className='flex-shrink-0 '>
                        <span className='truncate text-gray-500 line-through'>
                          ₫{formatCurrency(purchase.product.price_before_discount)}
                        </span>
                        <span className='ml-2 truncate text-orange'>₫{formatCurrency(purchase.product.price)}</span>
                      </div>
                    </div>
                  </Link>
                  <div className='flex items-end justify-end'>
                    <span>Tổng giá tiền</span>
                    <span className='ml-4 text-xl text-orange'>
                      {formatCurrency(purchase.product.price * purchase.buy_count)}₫
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
