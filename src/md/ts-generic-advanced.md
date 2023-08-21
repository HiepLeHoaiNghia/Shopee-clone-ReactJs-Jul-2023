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

```

## <mark>**Khai báo type cho generic:**</mark>

```ts
+

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
```

## <mark>**Trick khi khai báo function**</mark>

```ts
+ Gán function cho 1 biến
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

+ Ví dụ khác:
+ Ta có type:
```

## <mark>**Generic sử dụng Record type**</mark>

```ts

+ Ví dụ:

type ValueWithMatchingKeys<T, K extends Record<keyof T, any>> = {
  object: T;
  keyObject: K;
};

+ type ValueWithMatchingKeys là khai báo 1 type có tên là ValueWithMatchingKeys
+ <T, K extends Record<keyof T, any>> là generic sẽ truyền vào cho tham số của type ValueWithMatchingKeys
+ K extends Record<keyof T, any> generic K phải là một loại (bản ghi) có các key là các key của generic T và giá trị của các key là bất kỳ kiểu dữ liệu nào.
+ Record<keyof T, any> là một loại (bản ghi) có các key là các key của generic T và giá trị của các key là bất kỳ kiểu dữ liệu nào.
+ {object: T; keyObject: K;} là kiểu dữ liệu return của type ValueWithMatchingKeys
```

## <mark>**Generic sử dụng các phương thức**</mark>

```ts
+ Ngoài sử dụng type Record  để khai báo generic, còn có thể sử dụng mapped type để khai báo generic:

type ValueWithMatchingKeys<T, K extends { [P in keyof T]: any }> = {
  object: T;
  keyObject: K;
};

+ type ValueWithMatchingKeys là khai báo 1 type có tên là ValueWithMatchingKeys
+ T đại diện cho loại đối tượng có key và cấu trúc mà K phải khớp.
+ K đại diện cho loại đối tượng khác có các key cần khớp với các key của T và các giá trị có thể thuộc bất kỳ loại nào.
+ { [P in keyof T]: any } là phương thức map lặp qua tất cả các key của T và trả về một loại đối tượng mới với các key tương tự như T và : any là các giá trị có thể thuộc bất kỳ loại nào.

+ Cách sử dụng type ValueWithMatchingKeys:

+ Ví dụ:

const person = {
  name: 'John',
  age: 20,
}

const keys = {
  name: true,
  age: false,
}

const result: ValueWithMatchingKeys<typeof person, typeof keys> = {
  object: person,
  keyObject: keys,
}

+ const person là khai báo 1 biến có tên là person có kiểu dữ liệu là typeof person
+ const keys là khai báo 1 biến có tên là keys có kiểu dữ liệu là typeof keys
+ const result là khai báo 1 biến có tên là result có kiểu dữ liệu phải tuân thủ theo ValueWithMatchingKeys<typeof person, typeof keys>
+ typeof person là kiểu dữ liệu của biến person
+ typeof keys là kiểu dữ liệu của biến keys

+ Ví dụ :

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

+ const getValueWithMatchingKeys là khai báo 1 function có tên là getValueWithMatchingKeys
+ <T, K extends Record<keyof T, any>> là generic sẽ truyền vào cho tham số của function getValueWithMatchingKeys
+(obj: T, keyObject: K) là tham số truyền vào cho function getValueWithMatchingKeys có kiểu dữ liệu là T và K
+ : ValueWithMatchingKeys<T, K> là kiểu dữ liệu return của function getValueWithMatchingKeys
+ const result: ValueWithMatchingKeys<T, K> là khai báo 1 biến có tên là result có kiểu dữ liệu phải tuân thủ theo ValueWithMatchingKeys<T, K>
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
