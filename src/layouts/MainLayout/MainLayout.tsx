import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex flex-1 items-stretch justify-center'>{children}</div>
      <Footer />
    </div>
  )
}
