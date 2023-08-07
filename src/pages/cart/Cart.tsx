import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import { Purchase } from 'src/types/purchase'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'
interface ExtendedPurchases extends Purchase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>([])
  const { isAuthenticated } = useContext(AppContext)
  const { data: purchaseInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchaseList({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })
  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const purchasesInCart = purchaseInCartData?.data.data
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  const checkedPurchases = extendedPurchases.filter((purchase) => purchase.checked)
  const chekedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasePrice = checkedPurchases.reduce((result, current) => {
    return result + current.product.price * current.buy_count
  }, 0)
  const totalCheckedPurchaseSavingPrice = checkedPurchases.reduce((result, current) => {
    return result + (current.product.price_before_discount - current.product.price) * current.buy_count
  }, 0)
  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(extendedPurchasesObject[purchase._id]?.checked)
        })) || []
      )
    })
  }, [purchasesInCart])

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) => prev.map((purchaseApi) => ({ ...purchaseApi, checked: !isAllChecked })))
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchasesId = extendedPurchases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchasesId])
  }

  const handleDeleteManyPurchases = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchasesMutation.mutate(purchaseIds)
  }

  const handleBuyPurchases = () => {
    if (chekedPurchasesCount > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductsMutation.mutate(body)
    }
  }
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            {extendedPurchases.length > 0 && (
              <div className='my-3 rounded-sm bg-white p-5 shadow'>
                {extendedPurchases?.map((purchase, index) => {
                  return (
                    <div
                      key={purchase._id}
                      className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                    >
                      <div className='col-span-6'>
                        <div className='flex'>
                          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                            <input
                              type='checkbox'
                              className='h-5 w-5 accent-orange'
                              checked={purchase.checked}
                              onChange={handleCheck(index)}
                            />
                          </div>
                          <div className='flex-grow'>
                            <div className='flex'>
                              <Link
                                className='h-20 w-20 flex-shrink-0'
                                to={`${path.home}${generateNameId({
                                  name: purchase.product.name,
                                  id: purchase.product._id
                                })}`}
                              >
                                <img className='' alt={purchase.product.name} src={purchase.product.image} />
                              </Link>
                              <div className='flex-grow px-2 pb-2 pt-1'>
                                <Link
                                  to={`${path.home}${generateNameId({
                                    name: purchase.product.name,
                                    id: purchase.product._id
                                  })}`}
                                  className='text-left line-clamp-2'
                                >
                                  {purchase.product.name}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-6'>
                        <div className='grid grid-cols-5 items-center'>
                          <div className='col-span-2'>
                            <div className='flex items-center justify-center'>
                              <span className='text-gray-300 line-through'>
                                ₫{formatCurrency(purchase.price_before_discount)}
                              </span>
                              <span className='ml-3'>₫{formatCurrency(purchase.price)}</span>
                            </div>
                          </div>
                          <div className='col-span-1'>
                            <QuantityController
                              classNameWrapper='flex items-center'
                              max={purchase.product.quantity}
                              value={purchase.buy_count}
                              onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                              onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                              onFocusOut={(value) =>
                                handleQuantity(
                                  index,
                                  value,
                                  value >= 1 &&
                                    value <= purchase.product.quantity &&
                                    value !== (purchasesInCart as Purchase[])[index]?.buy_count
                                )
                              }
                              onType={handleTypeQuantity(index)}
                              disabled={purchase.disabled}
                            />
                          </div>
                          <div className='col-span-1'>
                            <span className='text-orange'>₫{formatCurrency(purchase.price * purchase.buy_count)}</span>
                          </div>
                          <div className='col-span-1'>
                            <button
                              onClick={handleDelete(index)}
                              className='transition-color bg-none text-black hover:text-orange'
                            >
                              Xoá
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border bg-white p-5 shadow-gray-300 sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-orange'
                checked={isAllChecked}
                onChange={handleCheckAll}
              />
            </div>
            <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
              Chọn tất cả ({extendedPurchases.length})
            </button>
            <button onClick={handleDeleteManyPurchases} className='mx-3 border-none bg-none'>
              Xoá
            </button>
          </div>
          <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div className='flex '>
              <div className='flex items-center justify-end'>
                <div>Tổng thanh toán ({chekedPurchasesCount} sản phẩm):</div>
                <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
              </div>
              <div className='flex items-center sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
              </div>
            </div>
            <Button
              onClick={handleBuyPurchases}
              disabled={buyProductsMutation.isLoading}
              className='mt-5 flex h-10 w-52 items-center justify-center self-center bg-red-500 text-center text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
