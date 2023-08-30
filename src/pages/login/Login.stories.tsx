import type { Meta, StoryObj } from '@storybook/react'
import Login from './Login'
import path from 'src/constants/path'
import RegisterLayout from 'src/layouts/RegisterLayout'

const meta = {
  title: 'pages/Login',
  component: Login,
  argTypes: {
    children: {
      description: 'body of page',
      table: { type: { summary: 'React.ReactNode' } }
    }
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    reactRouter: {
      routing: { path: path.login }
    }
  }
} satisfies Meta<typeof Login>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
export const LoginPage: Story = {
  args: {},
  //? chỉ định cho story này sẽ render component nào
  render: () => {
    return (
      <RegisterLayout>
        <Login />
      </RegisterLayout>
    )
  }
}
