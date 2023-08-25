## **Index signature**

- <mark>Index signature</mark> cho phép bạn xác định loại giá trị có thể được truy cập bằng cách sử dụng ký hiệu chỉ mục.
- <mark>Index signature</mark> đặc biệt hữu ích khi làm việc với các đối tượng có khóa động, như <mark>dictionaries</mark> or <mark>mappings</mark>.

- Ví dụ:

```ts
interface FruitCount {
  [key: string]: number
}

const fruitCount: FruitCount = {
  apple: 28,
  orange: 17,
  mango: 5
}
```

- Trong ví dụ trên, <mark>[key: string]: number</mark> cho phép bạn đặt bất kỳ <mark>string</mark> nào làm <mark>key</mark> và <mark>value</mark> phải là <mark>number</mark>.
- <mark>Key</mark> chỉ có thể là <mark>string</mark>, <mark>number</mark>, <mark>symbol</mark>, hoặc <mark>template</mark> <mark>literal</mark>.

## **Union các key và value trong Index signature**

- Ví dụ:

```ts
type Fruits = 'apple' | 'orange' | 'mango'
type FruitCount = {
  [key in Fruits]: number | string
}
const fruitCount: FruitCount = {
  apple: 28,
  orange: '17',
  mango: 5
}
```

- <mark>type Fruits = 'apple' | 'orange' | 'mango'</mark> là một union type

- <mark>[key in Fruits]</mark> là một <mark>index signature</mark> quy định <mark>key</mark> phải là <mark>apple</mark> hoặc <mark>orange</mark> hoặc <mark>mango</mark>

- <mark>number | string</mark> là <mark>union type</mark> quy định <mark>value</mark> phải là <mark>number</mark> hoặc <mark>string</mark>

## <mark>**Index signature với thuộc tính rõ ràng**</mark>

- Ví dụ:

```ts
interface FruitCount {
  [key: number]: number
  mango: number
  lychee: number
}

const fruitCount: FruitCount = {
  1: 28,
  2: 17,
  mango: 5,
  lychee: 10
}
```

- Trong ví dụ trên, <mark>[key: number]: number</mark> cho phép bạn đặt bất kỳ số nào làm <mark>key</mark> và <mark>value</mark> phải là <mark>number</mark>.
- Tuy nhiên, ta cũng có thể đặt các thuộc tính rõ ràng như <mark>mango</mark> và <mark>lychee</mark>.
- Trong trường hợp này key của object <mark>fruitCount</mark> phải là kiểu <mark>number</mark> hoặc kiểu được quy định rõ ràng là <mark>mango</mark> hoặc là <mark>lychee</mark>.

- Nếu thêm 1 <mark>key</mark> khác ngoài các <mark>key</mark> đã được quy định thì sẽ gặp lỗi
- Ví dụ:

```ts
const fruitCount: FruitCount = {
  1: 28,
  2: 17,
  mango: 5,
  lychee: 10,
  mushroom: 3
}

Type '{ 1: number; 2: number; mango: number; lychee: number; mushroom: number; }' is not assignable to type 'FruitCount'.
Object literal may only specify known properties, and 'mushroom' does not exist in type 'FruitCount'.

```

- Vì <mark>mushroom</mark> không được khai báo trong <mark>interface FruitCount</mark>.

## <mark>**Key assertion**</mark>

- Ví dụ:

```ts
interface FruitCount {
  [key: number]: number
  mango: number
  lychee: number
}

const fruitCount: FruitCount = {
  1: 28,
  2: 17,
  mango: 5,
  lychee: 10
}

for (const key in fruitCount) {
  console.log(`${key}, ${fruitCount[key]}`)
}
```

- Ở ví dụ trên ta đã khai báo rõ ràng <mark>interface FruitCount</mark> có <mark>key</mark> có thể là <mark>number</mark> và 2 <mark>key</mark> <mark>mango</mark> và <mark>lychee</mark>
- Vì vậy khi lặp qua các <mark>key</mark> trong <mark>object fruitCount</mark> thì ta có thể lấy được <mark>key</mark> của <mark>object fruitCount</mark> bằng <mark>fruitCount[key]</mark>

- Nhưng nếu <mark>interface FruitCount</mark> không được khai báo rõ ràng:

```ts
interface FruitCount {
  mango: number
  lychee: number
}

const fruitCount: FruitCount = {
  mango: 5,
  lychee: 10
}

for (const key in fruitCount) {
  console.log(`${key}, ${fruitCount[key]}`)
}
```

- Lúc này ta không thể lấy được <mark>key</mark> của <mark>object fruitCount</mark> bằng <mark>fruitCount[key]</mark> vì <mark>key</mark> của <mark>object fruitCount</mark> không được khai báo trước đó bằng <mark>index signature</mark>

```ts
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'FruitCount'.
  No index signature with a parameter of type 'string' was found on type 'FruitCount'.
```

- Vì vậy ta phải sử dụng key of asssertion:

```ts
for (const key in fruitCount) {
  console.log(`${key}, ${fruitCount[key as keyof FruitCount]}`)
}
```

để ts hiểu được <mark>[key]</mark> sẽ chắc chắn có kiểu là <mark>keyof FruitCount</mark>
cụ thể ở đây là <mark>mango</mark> hoặc <mark>lychee</mark> đã được khai báo trước đó

## <mark>**Type assertion**</mark>

- Ví dụ:

```ts
Object.keys(fruitCount).map((key) => {
  console.log(fruitCount[key as keyof fruitCount])
})
```

- Trong ví dụ này, ta đang sử dụng phương thức <mark>Object.keys()</mark> để lấy một mảng <mark>key</mark> từ <mark>object fruitCount</mark>. Mảng này sẽ chứa các khóa <mark>mango</mark> và <mark>lychee</mark>.

- Sau đó, ta sử dụng phương thức <mark>.map()</mark> để lặp lại từng <mark>key</mark> trong <mark>object</mark>.

- <mark>key</mark> là <mark>key</mark> hiện tại đang được xử lý trong <mark>callback</mark> .map(). Tuy nhiên, TypeScript coi <mark>key</mark> là một <mark>string</mark> và bạn muốn sử dụng nó làm chỉ mục để truy cập các thuộc tính trên <mark>object fruitCount</mark>.

```ts
Element implicitly has an 'any' type because expression of type 'string | number | symbol' can't be used to index type 'FruitCount'.

No index signature with a parameter of type 'string' was found on type 'FruitCount'
```

- Vì vậy ta phải sử dụng <mark>keyof asssertion</mark> và cả <mark>typeof assertion</mark> để thông báo cho ts biết răng đây là <mark>key</mark> của <mark>object</mark> có kiểu là như <mark>fruitCount</mark>:

```ts
Object.keys(fruitCount).map((key) => {
  console.log(fruitCount[key as keyof typeof fruitCount])
})
```

- Trong ví dụ trên:
- <mark>key as keyof typeof fruitCount</mark> là một xác nhận kiểu cho TypeScript biết rằng bạn biết rằng <mark>key</mark> đó là <mark>key</mark> hợp lệ của <mark>object fruitCount</mark> có <mark>type</mark> được khai báo là <mark>FruitCount</mark>.
  -Sử dụng <mark>key</mark> làm <mark>keyof typeof fruitCount</mark> mang lại sự an toàn và đảm bảo rằng bạn chỉ truy cập các thuộc tính thực sự tồn tại trên <mark>fruitCount</mark>.

- <mark>fruitCount[key as keyof typeof fruitCount]</mark> sử dụng <mark>key</mark> đã được xác nhận kiểu rõ ràng để truy cập các thuộc tính trên <mark>object fruitCount</mark>.

- Ví dụ khác:

```ts
type Fruits = 'apple' | 'orange' | 'mango'
type FruitCount = Record<Fruits, number | string>

const fruitCount: FruitCount = {
  apple: 28,
  orange: '17',
  mango: 5
}
```

- <mark>type Fruits = 'apple' | 'orange' | 'mango'</mark> là khai báo một union type

- <mark>Record<Fruits, number | string></mark> là khai báo một <mark>index signature</mark> quy định <mark>key</mark> phải là <mark>union type Fruits</mark> và <mark>value</mark> phải là <mark>number</mark> hoặc <mark>string</mark>

- Ta có <mark>object fruitCount</mark> có kiểu được khai báo là <mark>FruitCount</mark>

- Ví dụ ta dùng vòng lặp qua các <mark>key</mark> của <mark>object fruitCount</mark>:

```ts
for (const key in fruitCount) {
  console.log(fruitCount[key])
}
```

- Ở đây ta không thể lấy được <mark>key</mark> của <mark>object fruitCount</mark> bằng <mark>fruitCount[key]</mark> vì <mark>key</mark> của <mark>object fruitCount</mark> không được khai báo trước đó bằng <mark>index signature</mark>

```ts
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'FruitCount'.

No index signature with a parameter of type 'string' was found on type 'FruitCount'
```

- Để khắc phục lỗi trên phải dùng <mark>key assertion</mark> và <mark>type assertion</mark> để khẳng định rằng <mark>[key]</mark> ở đây chắc chắn là một <mark>key</mark> của <mark>object fruitCount</mark>.

```ts
for (const key in fruitCount) {
  console.log(fruitCount[key as keyof FruitCount])
}
```

- Hoặc

```ts
for (const key in fruitCount) {
console.log(fruitCount[key keyof typeof fruitCount])
}
```
