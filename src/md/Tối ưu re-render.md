### Tối ưu re-render

- Để tối ưu re-render thì nên ưu tiên dùng <Outlet /> thay cho {children}
- Lưu ý là <Outlet /> nên đặt ngay trong component `element` thì mới có tác dụng tối ưu
- Chứ không phải đặt bên trong children của component `element`

##✅ Code

```tsx
export default memo(function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Outlet />
      <Footer />
    </div>
  )
})
```

// ❌ Không tối ưu được vì `<Outlet />` đặt vào vị trí children
// Khi `<Outlet />` thay đổi tức là children thay đổi
// Dẫn đến component `RegisterLayout` bị re-render dù cho có dùng React.memo như trên

```tsx
<RegisterLayout>
  <Outlet />
</RegisterLayout>
```
