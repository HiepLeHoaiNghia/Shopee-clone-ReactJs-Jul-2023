## <mark>**Generic type nâng cao**</mark>

```ts

+ Để quy định kiểu dữ liệu cho các thuộc tính của một đối tượng, ta sử dụng generic như sau:

+ Generic với arrow function:

const identity = <Type>(value: Type) = value

+ Ở đây ta có function identity có 1 tham số là value, kiểu dữ liệu của value là Type, <Type> là generic.
+ Việc truyền kiểu dữ liệu cho generic sẽ do ta quy định khi gọi function identity.

+ Ví dụ:

const result = identity('Hello World')

+ Khi không quy định kiểu dữ liêu nào cho generic, thì kiểu dữ liệu của generic sẽ là kiểu dữ liệu của tham số truyền vào.Ở đây kiểu dữ liệu sẽ là hello world.

+ Nếu muốn quy định kiểu dữ liệu cho generic, ta sử dụng cú pháp sau:

const result = identity<string>('Hello World')

+ Khi đó kiểu dữ liệu của generic sẽ là string.

+ Khai báo type cho generic:

type user = {
    name: string
    age: number
}

const result = identity<user>({
  name: 'John',
  age: 20
})

+ Khi đó kiểu dữ liệu của generic sẽ là User.
+ User là 1 object có 2 thuộc tính là name và age, name có kiểu dữ liệu là string, age có kiểu dữ liệu là number.

+ Nếu như ta thêm 1 thuộc tính khác vào User mà không khai báo trước :
const result = identity<user>({
  name: 'John',
  age: 20,
  address: 'New York'
})

+ Khi đó sẽ báo lỗi vì User không có thuộc tính address.

+ Generic với function bình thường:

function identity<Type>(value: Type) {
  return value
}

+ Ngoài ra ta còn có trick khi khai báo function:
+ Ví dụ:

const myIdentity: <Type>(value: Type) => Type = identity

+ Ở đây ta có function myIdentity là 1 function có 1 tham số là value, kiểu dữ liệu của value là Type, <Type> là generic, và trả về kiểu dữ liệu là Type.
+ Sau đó ta gán function myIdentity bằng function identity.
+ Khi đó kiểu dữ liệu của myIdentity cũng sẽ là Type như function identity.

+ const myIdentity là khai báo 1 function có tên là myIdentity
+ <Type> là generic
+ (value: Type) là tham số của function myIdentity lấy từ generic
+ => Type là kiểu dữ liệu return của function myIdentity
+ identity là function myIdentity gán bằng

+ Ngoải ra ta còn có thể sử dụng 1 object để khải báo function:
+ Ví dụ:

const myIdentity: {<Type>(value: Type): Type} = identity

+ const myIdentity là khai báo 1 function có tên là myIdentity
+ {<Type>(value: Type) là generic và tham số của function myIdentity lấy từ generic
+ : Type} là kiểu dữ liệu return của function myIdentity

+ Ngoài ra còn có thể khai báo type cho generic:

type Identity = {<Type>(value: Type): Type}

+ Hoăc interface:

interface Identity {
  <Type>(value: Type): Type
}

+ Và gán nó vào function:

const myIdentity: Identity = identity

+ Khi đó kiểu dữ liệu của myIdentity sẽ là Identity.

+ Trường họp ta muốn quy định kiểu dữ liệu cho generic đã khai báo bằng type hoặc interface thì ta sử dụng cú pháp sau:

interface Identity<Type> {
 (value: Type): Type
}

+ Bằng viết thêm Generic sau tên type hoặc interface và trước tham số của function.
+ Lúc này kiểu dữ liệu truyền vào cho generic <Type> sẽ là kiểu dữ liệu của tham số truyền vào của function.

+ interface Identity là khai báo 1 function có tên là Identity
+ <Type> là generic sẽ đc truyền vào cho tham số và kiểu dữ liệu return của function Identity
+ (value: Type) là tham số của function Identity lấy từ generic
+ : Type là kiểu dữ liệu return của function Identity

+ ta có thể linh động thay đổi kiểu dữ liệu của generic khi gọi function:

const myIdentity: Identity<string> = identity

+ Khi đó kiểu dữ liệu của myIdentity sẽ là Identity<string>.
+ Khi dùng function myIdentity thì kiểu dữ liệu của tham số truyền vào sẽ phải là string.

+ Ví dụ:

myIdentity("hello")

```

## <mark>**Ràng buộc Generic**</mark>

```ts

Nếu ta có:

const logIdentity = <Type>(value: Type): Type => {
  console.log(value.length)
  return value
}

+ Ở đây sẽ có lỗi vì kiểu dữ liệu của Type không có thuộc tính length.

+ Để giải quyết vấn đề này ta sử dụng ràng buộc generic:

const logIdentity = <Type extends {length: number}>(value: Type): Type => {
  console.log(value.length)
  return value
}

+ const logIdentity là khai báo 1 function có tên là logIdentity
+ <Type extends {length: number}> là generic sẽ truyền vào cho tham số và kiểu dữ liệu return của function logIdentity
+ generic Type sẽ phải có thuộc tính length và kiểu dữ liệu của thuộc tính length phải là number
+ (value: Type) là tham số của function logIdentity lấy từ generic
+ : Type là kiểu dữ liệu return của function logIdentity

+ Ta có thể khai báo interface cho generic:

interface LengthObj {
  length: number
}

const logIdentity = <Type extends LengthObj>(value: Type): Type => {
  console.log(value.length)
  return value
}

+ <Type extends LengthObj> generic Type ở đây sẽ phải có thuộc tính length và kiểu dữ liệu của thuộc tính length phải là number

+ Ta còn có thể truyền nhiều generic vào cho function:

+ Ví dụ:

const getValue = <Obj, Key>(obj: Obj, key: Key) => {
  console.log(obj)
  console.log(key)
}

+ const getValue là khai báo 1 function có tên là getValue
+ <Obj, Key> là generic sẽ truyền vào cho tham số của function getValue
+ (obj: Obj, key: Key) là tham số của function getValue lấy từ generic, obj có kiểu dữ liệu nhận từ generic Obj, key có kiểu dữ liệu nhận từ generic Key

+ Khi gọi function getValue ta sẽ truyền 2 tham số vào cho function:

getValue<{name:string}, string>({name: 'John'}, 'name')

+ getValue gọi function getValue
+ <{name:string}, string> quy định kiểu cho generic Obj và Key
+ ({name: 'John'}, 'name') truyền tham số cho function getValue

+ Trường hợp khác:
+ Ví dụ:
+ Chũng ta muốn return ra giá trị của key trong obj:

const getValue = <Obj, Key>(obj: Obj, key: Key) => {
  console.log(obj[key])
}

+ Nếu chỉ viết như trên sẽ gặp lỗi:
Type 'Key' cannot be used to index type 'Obj'.

+ Để giải quyết vấn đề này ta sử dụng ràng buộc generic:

const getValue = <Obj, Key extends keyof Obj>(obj: Obj, key: Key) => {
  console.log(obj[key])
}

+ <Obj, Key extends keyof Obj> generic Key sẽ phải là 1 trong các key của generic Obj.

+ Ví dụ khi sử dụng function getValue:

getValue(
  {
    name: 'John', age: 20
  },
  'name'
)

+ Lúc này key sẽ phải là 1 trong các key của obj.
+ Cụ thể ở đây key buộc phải là name hoặc age
+ nêu ta chuyền key là address thì sẽ gặp lỗi:

Argument of type '"address"' is not assignable to parameter of type '"name" | "age"'.

+ Vì key address không thuộc 1 trong các key của obj.

```

## <mark>**Generic mặc định**</mark>

```ts
+ Ví dụ ta có 1 interface như sau:

interface Box<Type> {
  value: Type
}

+ Ví dụ khi ta khai báo 1 biến có kiểu dữ liệu là Box:
const box : Box = {
  value: 'hello'
}

+ Lúc này sẽ gặp lỗi:
Generic type 'Box' requires 1 type argument(s).

+ Để giải quyết vấn đề này ta phải khai báo kiểu cho generic Type, cụ thể ở đây là string:

const box : Box<string> = {
  value: 'hello'
}

+ Để tránh việc phải khai báo kiểu cho generic Type ta có thể khai báo generic mặc định cho interface Box:

interface Box<Type = string> {
  value: Type
}

+ Lúc này generic Type sẽ có kiểu dữ liệu mặc định là string.

+ Muốn khai báo kiểu dữ liệu khác cho generic Type ta phải khai báo khi khai báo biến:

const box : Box<number> = {
  value: 10
}

```
