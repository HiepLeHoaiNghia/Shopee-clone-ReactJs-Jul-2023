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
