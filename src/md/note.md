##hookform/resolvers ver 3.1.1 error

nếu dùng priceSchema vào useForm ở version 3.1.1 sẽ gặp lỗi với resolver:

```
Type 'Resolver<{ price_max: string | undefined; price_min: string | undefined; }>' is not assignable to type 'Resolver<NoUndefinedField<Pick<{ price_max?: string | undefined; price_min?: string | undefined; email: string; password: string; confirm_password: string; }, "price_max" | "price_min">>, any>'.
Types of parameters 'options' and 'options' are incompatible.
Type 'ResolverOptions<NoUndefinedField<Pick<{ price_max?: string | undefined; price_min?: string | undefined; email: string; password: string; confirm_password: string; }, "price_max" | "price_min">>>' is not assignable to type 'ResolverOptions<{ price_max: string | undefined; price_min: string | undefined; }>'.
Type '{ price_max: string | undefined; price_min: string | undefined; }' is not assignable to type 'NoUndefinedField<Pick<{ price_max?: string | undefined; price_min?: string | undefined; email: string; password: string; confirm_password: string; }, "price_max" | "price_min">>'.ts(2322)
```

Nên phải ép kiểu as ObjectSchema<FormData> cho nó

```ts
type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_max', 'price_min'])

const {
  control,
  handleSubmit,
  trigger,
  formState: { errors }
} = useForm<FormData>({
  defaultValues: {
    price_min: '',
    price_max: ''
  },
  resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>)
})
```

##Phân tích logic star rating

```
index : thứ tự dãy sao theo hàng dọc
indexStar: thứ tự từng sao theo hàng ngang
Lần render cuối index = 4, indexStar đầu tiên từ 0 -> 4
khi indexStar = 0 => 0 < 5 - 4 => return sao vàng
khi indexStar = 1 => 1 = 5 - 4 => return sao trăng
```

##Fix lỗi Typescript FormData trang change password

```ts
type FormData = NoUndefinedField<Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

Ở đây đang khai báo FormData được pick từ UserSchema
Nhưng tại đây:

 const updateProfileMutation = useMutation(userApi.updateProfile)

  const onSubmit = handleSubmit(async (data) => {
    try {
      nếu như để :
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      lỗi ts vì mutateAsync mong muốn nhận vào tham số có type = BodyUpdateProfile mà ở trên đang Pick FormData từ UserSchema -> kiểu dữ liệu không khớp.
      Để fix lỗi phải ép kiểu khi dùng lodash omit để ts hiểu data khi dùng omit sẽ cho ra type đúng với kiểu dữ liệu yêu cầu:
      const res = await updateProfileMutation.mutateAsync(
        omit(data, ['confirm_password']) as unknown as BodyUpdateProfile
      )
    } catch(error) {
      ...
    }
  })
```

```ts
Hoặc có thể fix bằng cách quy định rõ ràng kiểu cho tham số của data sẽ đc truyền vào trong hàm handleSubmit, data sẽ lấy từ FormData và loại bỏ confirm_password:

const onSubmit = handleSubmit(async (data: Omit<FormData, 'confirm_password'>) => {
    try {
      Đồng thời cũng phải ép kiểu khi dùng lodash omit để ts hiểu đúng kiểu dữ liệu mà mutateAsync cần nhận vào:
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']) as BodyUpdateProfile)
    } catch (error) {
      ...
    }
  })
```
