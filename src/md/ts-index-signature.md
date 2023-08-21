## <mark>**Index signature**</mark>

```ts

+ Index signature cho phép bạn xác định loại giá trị có thể được truy cập bằng cách sử dụng ký hiệu chỉ mục (ví dụ: đối tượng[key]).
+ Index signature đặc biệt hữu ích khi làm việc với các đối tượng có khóa động, như dictionaries or mappings.
+ Ví dụ:
interface FruitCount {
  [key: string]: number;
}

const fruitCount: FruitCount = {
  apple: 28,
  orange: 17,
  mango: 5,
};

+ Trong ví dụ trên, [key: string]: number; cho phép bạn đặt bất kỳ chuỗi nào làm key và value phải là một số.
+ Key chỉ có thể là 'string', 'number', 'symbol', hoặc template literal.
```

## <mark>**Union các key và value trong Index signature**</mark>

```ts

+ Ví dụ:

type Fruits = 'apple' | 'orange' | 'mango'
type FruitCount = {
  [key in Fruits]: number | string
}
const fruitCount: FruitCount = {
  apple: 28,
  orange: '17',
  mango: 5
}
+ type Fruits = 'apple' | 'orange' | 'mango' là một union type

+ [key in Fruits] là một index signature quy định key phải là union type Fruits

+ number | string là union type quy định value phải là union type number hoặc string
```

## <mark>**Index signature với thuộc tính rõ ràng**</mark>

```ts

+ Ví dụ:

interface FruitCount {
  [key: number]: number;
  mango: number;
  lychee: number;
}

const fruitCount: FruitCount = {
  1: 28,
  2: 17,
  mango: 5,
  lychee: 10,
};

+ Trong ví dụ trên, [key: number]: number; cho phép bạn đặt bất kỳ số nào làm key và value phải là một số.
+ Tuy nhiên, bạn cũng có thể đặt các thuộc tính rõ ràng như mango và lychee.
+ Trong trường hợp này key của object fruitCount phải là kiểu number hoặc kiểu được quy định rõ ràng là 'mango' hoặc là 'lychee'.

+ Nếu thêm 1 key khác ngoài các key đã được quy định thì sẽ gặp lỗi
+ Ví dụ:

const fruitCount: FruitCount = {
  1: 28,
  2: 17,
  mango: 5,
  lychee: 10,
  mushroom: 3
}

+ Lỗi: Type '{ 1: number; 2: number; mango: number; lychee: number; mushroom: number; }' is not assignable to type 'FruitCount'.
  Object literal may only specify known properties, and 'mushroom' does not exist in type 'FruitCount'.
+ Vì mushroom không được khai báo trong interface FruitCount.

```

## <mark>**Key assertion**</mark>

```ts
+ Ví dụ:

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

+ Ở ví dụ trên ta đã khai báo rõ ràng interface FruitCount có key là number và 2 key mango và lychee
+ Vì vậy khi lặp qua các key trong object fruitCount thì ta có thể lấy được key của object fruitCount bằng fruitCount[key]

+ Nhưng nếu interface FruitCount không được khai báo rõ ràng:

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

+ Lúc này ta không thể lấy được key của object fruitCount bằng fruitCount[key] vì key của object fruitCount không được khai báo trước đó bằng index signature
+ Lỗi: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'FruitCount'.
  No index signature with a parameter of type 'string' was found on type 'FruitCount'.
+ Vì vậy ta phải sử dụng key of asssertion:

for (const key in fruitCount) {
  console.log(`${key}, ${fruitCount[key as keyof FruitCount]}`)
}

để ts hiểu được [key] sẽ chắc chắn có kiểu là keyof FruitCount
cụ thể ở đây là 'mango' hoặc 'lychee' đã được khai báo trước đó
```

## <mark>**Type assertion**</mark>

```ts

+ Ví dụ:

Object.keys(fruitCount).map((key) => {
  console.log(fruitCount[key as keyof fruitCount])
})

+ Trong ví dụ này, ta đang sử dụng phương thức Object.keys() để lấy một mảng key từ object fruitCount. Mảng này sẽ chứa các khóa "mango" và "lychee".

+ Sau đó, ta đang sử dụng phương thức .map() để lặp lại từng khóa trong mảng.

+ key là key hiện tại đang được xử lý trong callback .map(). Tuy nhiên, TypeScript coi key là một chuỗi và bạn muốn sử dụng nó làm chỉ mục để truy cập các thuộc tính trên object fruitCount.

+ Lỗi: Element implicitly has an 'any' type because expression of type 'string | number | symbol' can't be used to index type 'FruitCount'.

No index signature with a parameter of type 'string' was found on type 'FruitCount'

+ Vì vậy ta phải sử dụng key of asssertion và cả type of assertion:

Object.keys(fruitCount).map((key) => {
  console.log(fruitCount[key as keyof typeof fruitCount]);
});

+ key as keyof typeof fruitCount là một xác nhận kiểu cho TypeScript biết rằng bạn biết rằng key đó là key hợp lệ của object fruitCount có type được khai báo là FruitCount. Sử dụng key làm keyof typeof fruitCount mang lại sự an toàn cho loại và đảm bảo rằng bạn chỉ truy cập các thuộc tính thực sự tồn tại trên fruitCount.

+ fruitCount[key as keyof typeof fruitCount] sử dụng key đã được xác nhận kiểu rõ ràng để truy cập các thuộc tính trên object fruitCount.

+ Ví dụ khác:

type Fruits = 'apple' | 'orange' | 'mango'
type FruitCount = Record<Fruits, number | string>

const fruitCount: FruitCount = {
  apple: 28,
  orange: '17',
  mango: 5
}

+ type Fruits = 'apple' | 'orange' | 'mango' là một union type

+ Record<Fruits, number | string> là một index signature quy định key phải là union type Fruits và value phải là union type number hoặc string

+ Ta có object fruitCount có kiểu được khai báo là FruitCount

+ Ví dụ ta dùng vòng lặp qua các key của object fruitCount:

for (const key in fruitCount) {
  console.log(fruitCount[key])
}

+ Ở đây ta không thể lấy được key của object fruitCount bằng fruitCount[key] vì key của object fruitCount không được khai báo trước đó bằng index signature

+ Lỗi: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'FruitCount'.
No index signature with a parameter of type 'string' was found on type 'FruitCount'

+ Để khắc phục lỗi trên phải dùng key assertion và type assertion để khẳng định rằng [key] ở đây chắc chắn là một key của object fruitCount.

for (const key in fruitCount) {
  console.log(fruitCount[key as keyof FruitCount])
}

+ Hoặc

for (const key in fruitCount) {
  console.log(fruitCount[key keyof typeof fruitCount])
}

```
