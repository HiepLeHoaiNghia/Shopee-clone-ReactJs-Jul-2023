import CartHeader from 'src/components/CartHeader'
import Footer from 'src/components/Footer'

interface Props {
  children?: React.ReactNode
}

export default function CartLayout({ children }: Props) {
  return (
    <div className='flex min-h-screen flex-col'>
      <CartHeader />
      <div className='flex flex-1 items-center justify-center bg-neutral-100'>{children}</div>
      <Footer />
    </div>
  )
}
