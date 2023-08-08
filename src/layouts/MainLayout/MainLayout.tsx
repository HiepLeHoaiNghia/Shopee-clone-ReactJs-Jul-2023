import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  )
}
