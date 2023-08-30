import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    isLoading: {
      defaultValue: false,
      description: 'Loading state of button'
    },
    children: {
      description: 'Content of button',
      table: { type: { summary: 'React.ReactNode' }, defaultValue: { summary: '' } }
    },
    className: {
      description: 'Classname of button for CSS',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    }
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Đăng nhập',
    className:
      'inline-flex items-center justify-center bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600',
    isLoading: true,
    disabled: true
  }
}

export const Secondary: Story = {
  args: {
    children: 'Đăng Ký',
    className:
      'inline-flex items-center justify-center bg-gray-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-gray-600',
    isLoading: true,
    disabled: true
  }
}
