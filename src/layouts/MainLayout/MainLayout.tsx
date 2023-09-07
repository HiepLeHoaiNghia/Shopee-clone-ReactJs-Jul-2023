import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}

function MainLayoutInner({ children }: Props) {
  console.log('render')
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex flex-1 items-stretch justify-center'>
        {children}
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
const MainLayout = memo(MainLayoutInner)
export default MainLayout
