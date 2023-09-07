import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

interface Props {
  children?: React.ReactNode
}

function RegisterLayoutInner({ children }: Props) {
  console.log('render')
  return (
    <div className='flex min-h-screen flex-col'>
      <RegisterHeader />
      <div className='flex-1'>
        {children}
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
const RegisterLayout = memo(RegisterLayoutInner)

export default RegisterLayout
