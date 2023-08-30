import type { Meta, StoryObj } from '@storybook/react'
import MainLayout from './MainLayout'
import ProductDetail from 'src/pages/ProductDetail'
import path from 'src/constants/path'

const meta = {
  title: 'Layouts/MainLayout',
  component: MainLayout,
  argTypes: {
    children: {
      description: 'body of layout',
      table: { type: { summary: 'React.ReactNode' } }
    }
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    reactRouter: {
      location: {
        pathParams: { nameId: 'Điện-Thoại-Vsmart-Active-3-6GB64GB--Hàng-Chính-Hãng-i-60afb2c76ef5b902180aacba' }
      },
      routing: { path: path.productDetail }
    }
  }
  //? chỉ định cho story này sẽ render component nào
  // render: () => <ProductDetail />
} satisfies Meta<typeof MainLayout>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {}
}
export const PageProductDetail: Story = {
  args: {
    children: <ProductDetail />
  }
}
