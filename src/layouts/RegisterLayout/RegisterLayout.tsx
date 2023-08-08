import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

interface Props {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <div className='flex min-h-screen flex-col'>
      <RegisterHeader />
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  )
}
