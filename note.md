##hookform/resolvers ver 3.1.1 error

```ts
Type 'Resolver<{ price_max: string | undefined; price_min: string | undefined; }>' is not assignable to type 'Resolver<NoUndefinedField<Pick<{ price_max?: string | undefined; price_min?: string | undefined; email: string; password: string; confirm_password: string; }, "price_max" | "price_min">>, any>'.
Types of parameters 'options' and 'options' are incompatible.
Type 'ResolverOptions<NoUndefinedField<Pick<{ price_max?: string | undefined; price_min?: string | undefined; email: string; password: string; confirm_password: string; }, "price_max" | "price_min">>>' is not assignable to type 'ResolverOptions<{ price_max: string | undefined; price_min: string | undefined; }>'.
Type '{ price_max: string | undefined; price_min: string | undefined; }' is not assignable to type 'NoUndefinedField<Pick<{ price_max?: string | undefined; price_min?: string | undefined; email: string; password: string; confirm_password: string; }, "price_max" | "price_min">>'.ts(2322)
```
