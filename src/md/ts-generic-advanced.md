## **Generic type nâng cao**

- Để quy định kiểu dữ liệu cho các thuộc tính của một đối tượng, ta sử dụng <mark>generic</mark> như sau:

- <mark>Generic</mark> với <mark>arrow function</mark>:

```ts
const identity = <Type>(value: Type) => value
```

- Ở đây ta có <mark>arrow function identity</mark> có 1 tham số là <mark>value</mark>, kiểu dữ liệu của <mark>value</mark> là <mark>Type</mark>, Type là tên biến đặt cho <mark>generic</mark>.
- Việc truyền kiểu dữ liệu cho <mark>generic</mark> sẽ do ta quy định khi gọi <mark>function identity</mark>.

- Ví dụ:

```ts
const result = identity('Hello World')
```

- Khi không quy định kiểu dữ liêu nào cho <mark>generic</mark>, thì kiểu dữ liệu của <mark>generic</mark> sẽ là kiểu dữ liệu của tham số truyền vào.Ở đây kiểu dữ liệu sẽ là <mark>hello world</mark>.

- Nếu muốn quy định kiểu dữ liệu cho <mark>generic</mark>, ta sử dụng cú pháp sau:

```ts
const result = identity<string>('Hello World')
```

- Khi đó kiểu dữ liệu của <mark>generic</mark> sẽ là <mark>string</mark>.

## **Khai báo type cho generic**

```ts
type user = {
  name: string
  age: number
}

const result = identity<user>({
  name: 'John',
  age: 20
})
```

- Khi đó kiểu dữ liệu của <mark>generic</mark> sẽ là <mark>User</mark>.
- <mark>User</mark> là 1 <mark>object</mark> có 2 thuộc tính là <mark>name</mark> và <mark>age</mark>, <mark>name</mark> có kiểu dữ liệu là <mark>string</mark>, <mark>age</mark> có kiểu dữ liệu là <mark>number</mark>.

- Nếu như ta thêm 1 thuộc tính khác vào <mark>User</mark> mà không khai báo trước :

```ts
const result = identity<user>({
  name: 'John',
  age: 20,
  address: 'New York'
})
```

- Khi đó sẽ báo lỗi vì <mark>User</mark> không có thuộc tính <mark>address</mark>.

- <mark>Generic</mark> với <mark>function bình thường</mark>:

```ts
function identity<Type>(value: Type): Type {
  return value
}
```

## **Trick khi khai báo function**

- Gán <mark>function</mark> cho 1 <mark>biến</mark>
- Ví dụ:

```ts
const myIdentity: <Type>(value: Type) => Type = identity
```

- Ở đây ta có <mark>function myIdentity</mark> là 1 <mark>function</mark> có 1 tham số là <mark>value</mark>, kiểu dữ liệu của <mark>value</mark> là <mark>Type</mark>, <mark>Type</mark> là <mark>generic</mark>, và trả về kiểu dữ liệu là <mark>Type</mark>.

- Sau đó ta gán <mark>function myIdentity</mark> bằng với <mark>function identity</mark>.

- Khi đó kiểu dữ liệu tham số tuyền vào và kết quả return của <mark>identity</mark> cũng sẽ là <mark>Type</mark> như <mark>function myIdentity</mark>.

- const <mark>myIdentity</mark> là khai báo 1 <mark>function</mark> có tên là <mark>myIdentity</mark>

- <mark>Type</mark> là <mark>generic</mark>

- <mark>(value: Type)</mark> là tham số của <mark>function myIdentity</mark> lấy từ <mark>generic</mark>

- <mark> => Type</mark> là kiểu dữ liệu return của <mark>function myIdentity</mark>

- Ngoải ra ta còn có thể sử dụng 1 <mark>object</mark> để khải báo kiểu dữ liệu của <mark>function</mark>:

- Ví dụ:

```ts
const myIdentity: { <Type>(value: Type): Type } = identity
```

- <mark>const myIdentity</mark> là khai báo 1 <mark>function</mark> có tên là <mark>myIdentity</mark>
- <mark>{< Type >(value: Type)</mark> là <mark>generic</mark> và tham số của <mark>function myIdentity</mark>
- <mark>: Type}</mark> là kiểu dữ liệu return của <mark>function myIdentity</mark>

- Ngoài ra còn có thể khai báo <mark>type</mark> cho <mark>generic</mark>:

```ts
type Identity = { <Type>(value: Type): Type }
```

- Hoăc <mark>interface</mark>:

```ts
interface Identity {
  <Type>(value: Type): Type
}
```

- Và gán nó vào <mark>biến</mark>:

```ts
const myIdentity: Identity = identity
```

- Khi đó kiểu dữ liệu của <mark>myIdentity</mark> sẽ là <mark>Identity</mark>.

- Trường họp ta muốn quy định kiểu dữ liệu cho <mark>generic</mark> đã khai báo bằng <mark>type</mark> hoặc <mark>interface</mark> thì ta sử dụng cú pháp sau:

```ts
interface Identity<Type> {
  (value: Type): Type
}
```

- Bằng viết thêm <mark>Generic</mark> sau tên <mark>type</mark> hoặc <mark>interface</mark> và trước tham số của <mark>function</mark>.
- Lúc này kiểu dữ liệu truyền vào cho <mark>generic</mark> <mark>Type</mark> sẽ là kiểu dữ liệu của tham số truyền vào của <mark>function</mark>.

- <mark>interface Identity</mark> là khai báo 1 <mark>function</mark> có tên là <mark>Identity</mark>
- <mark>Type</mark> là <mark>generic</mark> sẽ đc truyền vào cho tham số và kiểu dữ liệu return của <mark>function Identity</mark>
- <mark>(value: Type)</mark>là tham số của <mark>function Identity</mark> lấy từ <mark>generic</mark>
- <mark>: Type</mark> là kiểu dữ liệu return của <mark>function Identity</mark>

- ta có thể linh động thay đổi kiểu dữ liệu của <mark>generic</mark> khi gọi <mark>function</mark>:

```ts
const myIdentity: Identity<string> = identity
```

- Khi đó kiểu dữ liệu của <mark>myIdentity</mark> sẽ là <mark>Identity với generic là < string></mark>.
- Khi dùng <mark>function myIdentity</mark> thì kiểu dữ liệu của tham số truyền vào sẽ phải là <mark>string</mark>.

- Ví dụ:

```ts
myIdentity('hello')
```

## **Ràng buộc Generic**

Nếu ta có:

```ts
const logIdentity = <Type>(value: Type): Type => {
  console.log(value.length)
  return value
}
```

- Ở đây sẽ có lỗi vì kiểu dữ liệu của <mark>Type</mark> không có thuộc tính <mark>length</mark>.

- Để giải quyết vấn đề này ta sử dụng <mark>ràng buộc generic</mark>:

```ts
const logIdentity = <Type extends { length: number }>(value: Type): Type => {
  console.log(value.length)
  return value
}
```

- const <mark>logIdentity</mark> là khai báo 1 <mark>function</mark> có tên là <mark>logIdentity</mark>
- <mark><Type extends {length: number}></mark> là <mark>generic</mark> sẽ truyền vào cho tham số và kiểu dữ liệu return của <mark>function logIdentity</mark>
- <mark>generic Type</mark> sẽ phải có thuộc tính <mark>length</mark> và kiểu dữ liệu của thuộc tính <mark>length</mark> phải là <mark>number</mark>
- <mark>(value: Type)</mark> là tham số của <mark>function logIdentity</mark> lấy từ <mark>generic</mark>
- <mark>: Type</mark> là kiểu dữ liệu return của <mark>function logIdentity</mark>

- Ta có thể khai báo <mark>interface</mark> cho <mark>generic</mark>:

```ts
interface LengthObj {
  length: number
}

const logIdentity = <Type extends LengthObj>(value: Type): Type => {
  console.log(value.length)
  return value
}
```

- <mark>< Type extends LengthObj></mark> <mark>generic Type</mark> ở đây sẽ phải có thuộc tính <mark>length</mark> và kiểu dữ liệu của thuộc tính <mark>length</mark> phải là <mark>number</mark>

- Ta còn có thể truyền <mark>nhiều generic</mark> vào cho <mark>function</mark>:

- Ví dụ:

```ts
const getValue = <Obj, Key>(obj: Obj, key: Key) => {
  console.log(obj)
  console.log(key)
}
```

- <mark>const getValue</mark> là khai báo 1 <mark>function</mark> có tên là <mark>getValue</mark>
- <mark><Obj, Key></mark> là <mark>generic</mark> sẽ truyền vào cho tham số của <mark>function getValue</mark>

- <mark>(obj: Obj, key: Key)</mark> là tham số của <mark>function getValue</mark> lấy từ <mark>generic</mark>, <mark>obj</mark> có kiểu dữ liệu nhận từ <mark>generic Obj</mark>, <mark>key</mark> có kiểu dữ liệu nhận từ <mark>generic Key</mark>

- Khi gọi <mark>function getValue</mark> ta sẽ truyền 2 tham số vào cho <mark>function</mark>:

```ts
getValue<{ name: string }, string>({ name: 'John' }, 'name')
```

- <mark>getValue</mark> gọi function getValue
- <mark><{name:string}, string></mark> quy định kiểu cho generic Obj và Key
- <mark>({name: 'John'}, 'name')</mark> truyền tham số cho <mark>function getValue</mark>

- Trường hợp khác:
- Ví dụ:
- Chũng ta muốn return ra giá trị của <mark>key</mark> trong <mark>obj</mark>:

```ts
const getValue = <Obj, Key>(obj: Obj, key: Key) => {
  console.log(obj[key])
}
```

- Nếu chỉ viết như trên sẽ gặp lỗi:

```ts
  Type 'Key' cannot be used to index type 'Obj'.
```

- Để giải quyết vấn đề này ta sử dụng <mark>ràng buộc generic</mark>:

```ts
const getValue = <Obj, Key extends keyof Obj>(obj: Obj, key: Key) => {
  console.log(obj[key])
}
```

- <mark><Obj, Key extends keyof Obj></mark> <mark>generic Key</mark> sẽ phải là 1 trong các <mark>key</mark> của <mark>generic Obj</mark>.

- Ví dụ khi sử dụng <mark>function getValue</mark>:

```ts
getValue(
  {
    name: 'John',
    age: 20
  },
  'name'
)
```

- Lúc này <mark>key</mark> sẽ phải là 1 trong các <mark>key</mark> của <mark>obj</mark>.
- Cụ thể ở đây <mark>key</mark> buộc phải là <mark>name</mark> hoặc <mark>age</mark>
- nêu ta truyển thêm <mark>key</mark> là <mark>address</mark> thì sẽ gặp lỗi:

```ts
Argument of type '"address"' is not assignable to parameter of type '"name" | "age"'.
```

- Vì <mark>key address</mark> không thuộc 1 trong các <mark>key</mark> của <mark>obj</mark>.

## **Generic sử dụng Record type**

- Ví dụ khác:

```ts
type ValueWithMatchingKeys<T, K extends Record<keyof T, any>> = {
  object: T
  keyObject: K
}
```

- <mark>type ValueWithMatchingKeys</mark> là khai báo 1 <mark>type</mark> có tên là <mark>ValueWithMatchingKeys</mark>
- <mark><T, K extends Record<keyof T, any>></mark> là <mark>generic</mark> sẽ truyền vào cho tham số của <mark>type</mark> <mark>ValueWithMatchingKeys</mark>
- <mark>K extends Record<keyof T, any></mark> <mark>generic K</mark> phải là <mark>một loại (bản ghi)</mark> có các <mark>key</mark> là các <mark>key</mark> của <mark>generic T</mark> và <mark>value</mark> của các <mark>key</mark> là <mark>any</mark>.
- <mark>Record<keyof T, any></mark> là <mark>một loại (bản ghi)</mark> có các <mark>key</mark> là <mark>keyof T</mark> và <mark>value</mark> là <mark>any</mark>
- <mark>{object: T; keyObject: K}</mark> là kiểu dữ liệu return của <mark>type ValueWithMatchingKeys</mark>

## **Generic sử dụng các phương thức**

- Ngoài sử dụng <mark>type Record</mark> để khai báo <mark>generic</mark>, còn có thể sử dụng <mark>mapped type</mark> để khai báo:

```ts
type ValueWithMatchingKeys<T, K extends { [P in keyof T]: any }> = {
  object: T
  keyObject: K
}
```

- <mark>type ValueWithMatchingKeys</mark> là khai báo 1 <mark>type</mark> có tên là <mark>ValueWithMatchingKeys</mark>
- <mark>T</mark> đại diện cho <mark>loại đối tượng</mark> có <mark>key</mark> và cấu trúc mà <mark>K</mark> phải tuân theo.
- <mark>K</mark> đại diện cho <mark>loại đối tượng khác</mark> có các <mark>key</mark> cần khớp với các <mark>key</mark> của <mark>T</mark> và <mark>các value</mark> có thể thuộc bất kỳ loại nào.
- <mark>{ [P in keyof T]: any }</mark> là phương thức <mark>map</mark> lặp qua tất cả các <mark>key</mark> của <mark>T</mark> và trả về một loại đối tượng mới với các key tương tự như T và <mark>: any</mark> là <mark>các value</mark> có thể thuộc bất kỳ loại nào.

- Cách sử dụng <mark>type ValueWithMatchingKeys</mark>:

- Ví dụ:

```ts
const person = {
  name: 'John',
  age: 20
}

const keys = {
  name: true,
  age: false
}

const result: ValueWithMatchingKeys<typeof person, typeof keys> = {
  object: person,
  keyObject: keys
}
```

- <mark>const person</mark> là khai báo 1 <mark>biến</mark> có tên là <mark>person</mark> có kiểu dữ liệu là <mark>typeof person</mark>
- <mark>const keys</mark> là khai báo 1 <mark>biến</mark> có tên là <mark>keys</mark> có kiểu dữ liệu là <mark>typeof keys</mark>
- <mark>const result</mark> là khai báo 1 biến có tên là <mark>result</mark> có kiểu dữ liệu phải tuân thủ theo <mark>ValueWithMatchingKeys<typeof person, typeof keys></mark>
- <mark>typeof person</mark> là kiểu dữ liệu của biến <mark>person</mark>
- <mark>typeof keys</mark> là kiểu dữ liệu của biến <mark>keys</mark>

- Ví dụ :

```ts
const getValueWithMatchingKeys = <T, K extends Record<keyof T, any>>(
  obj: T,
  keyObject: K
): ValueWithMatchingKeys<T, K> => {
  const result: ValueWithMatchingKeys<T, K> = {
    object: obj,
    keyObject: keyObject
  }
  return result
}
```

- <mark>const getValueWithMatchingKeys</mark> là khai báo 1 <mark>function</mark> có tên là <mark>getValueWithMatchingKeys</mark>
- <mark><T, K extends Record<keyof T, any>></mark> là <mark>generic</mark> sẽ truyền vào cho tham số của <mark>function getValueWithMatchingKeys</mark>
- <mark>(obj: T, keyObject: K)</mark> là tham số truyền vào cho <mark>function getValueWithMatchingKeys</mark> có kiểu dữ liệu là <mark>T</mark> và <mark>K</mark>
- <mark>: ValueWithMatchingKeys<T, K></mark> là kiểu dữ liệu return của <mark>function getValueWithMatchingKeys</mark>
- <mark>const result: ValueWithMatchingKeys<T, K></mark> là khai báo 1 <mark>biến</mark> có tên là <mark>result</mark> có kiểu dữ liệu phải tuân thủ theo <mark>ValueWithMatchingKeys<T, K></mark>

## **Generic mặc định**

- Ví dụ ta có 1 <mark>interface</mark> như sau:

```ts
interface Box<Type> {
  value: Type
}
```

- Ví dụ khi ta khai báo 1 <mark>biến</mark> có kiểu dữ liệu là <mark>Box</mark>:

```ts
const box: Box = {
  value: 'hello'
}
```

- Lúc này sẽ gặp lỗi:

```ts
  Generic type 'Box' requires 1 type argument(s).
```

- Để giải quyết vấn đề này ta phải khai báo kiểu cho <mark>generic Type</mark>, cụ thể ở đây là <mark>string</mark>:

```ts
const box: Box<string> = {
  value: 'hello'
}
```

- Để tránh việc phải khai báo kiểu cho <mark>generic Type</mark> ta có thể khai báo <mark>generic mặc định</mark> cho <mark>interface Box</mark>:

```ts
interface Box<Type = string> {
  value: Type
}
```

- Lúc này <mark>generic Type</mark> sẽ có kiểu dữ liệu mặc định là <mark>string</mark>.

- Muốn khai báo kiểu dữ liệu khác cho <mark>generic Type</mark> ta phải khai báo khi khai báo <mark>biến</mark>:

```ts
const box: Box<number> = {
  value: 10
}
```
