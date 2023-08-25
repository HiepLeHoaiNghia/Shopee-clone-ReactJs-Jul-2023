## <mark>**Khai báo các kiểu dữ liệu**</mark>

### Khai báo kiểu dữ liệu string

```ts
let car: string
car = 'BMW'
```

### Khai báo kiểu dữ liệu number

```ts
let age: number
age = 20
```

### Khai báo kiểu dữ liệu boolean

```ts
let isLoading: boolean = false
```

### Khai báo kiểu dữ liệu undefined

```ts
let body: undefined = undefined
```

hoặc

```ts
let body: undefined
```

### Khai báo kiểu dữ liệu null

```ts
let body: null = null
```

### Khai báo kiểu dữ liệu any

```ts
let person: any
```

- Có thể gán bất kỳ kiểu dữ liệu nào cho <mark>any</mark>
- Chỉ khi nào không thể xác định được kiểu dữ liệu thì mới dùng <mark>any</mark>
- Hạn chế sử dụng <mark>any</mark> để kiểu dữ liêu được tường minh

### Khai báo kiểu dữ liệu object

```ts
let house: { address: string }
```

- Đối với kiểu dữ liệu <mark>object</mark> trong ts, phải khai báo tường minh các thuộc tính của <mark>object</mark> và kiểu dữ liệu của chúng

- Ngoài ra phải khai báo giá trị khởi tạo cho nó sau khi khai báo kiểu dữ liệu, nếu không khi dùng sẽ gặp lỗi:

```ts
house.address = 'Danang'

Variable 'house' is used before being assigned
```

- Cách fix là phải khai báo giá trị khởi tạo cho nó sau khi khai báo kiểu dữ liệu:

```ts
let house: {
  address: string
} = {
  address: ''
}
```

hoặc cách khác dài dòng hơn:

```ts
let house:
  | {
      address: string
    }
  | undefined

if (house) {
  house.address = 'Danang'
}
```

- Đối với trường hợp thuộc tính của object có thể có hoặc không thì bằng dấu <mark>?:</mark> và không cần có giá trị khởi tạo

```ts
let house: {
  address: string
  color?: string
} = {
  address: ''
}
```

### Khai báo kiểu dữ liệu array

```ts
let products: []
```

- Khi hover vào producs sẽ thấy kiểu dữ liệu của nó là <mark>never[]</mark>, nghĩa là không thể gán bất kỳ giá trị nào cho nó

- Vì vậy khi dùng <mark>products.push(1)</mark> sẽ gặp lỗi:

```ts
Argument of type 'number' is not assignable to parameter of type 'never'.
```

- Để sửa lỗi này thì phải khai báo kiểu dữ liệu cho <mark>array</mark>:

```ts
let products: string[] = []
```

- <mark>string[]</mark>: là khai báo kiểu dữ liệu của array là tập hợp các string
- <mark>[ ]</mark>: giá trị khởi tạo cho array là một array rỗng

- Có thể thay <mark>string</mark> là kiểu dữ liệu bất kỳ theo nhu cầu

### Khai báo kiểu dữ liệu object array

- Kết hợp giữa <mark>object</mark> và <mark>array</mark>:

```ts
let people: {
  name: string
  age: number
}[] = []
```

- Ở ví dụ trên ta có people là một array
- Mỗi phần tử của array là một object có 2 thuộc tính là <mark>name</mark> và <mark>age</mark>. Ví dụ ta có:

```ts
people.push({
  name: 'John',
  age: 20
})
```

- Lúc này array people sẽ là :

```ts
people = [
  {
    name: 'John',
    age: 20
  }
]
```

### Khai báo kiểu dữ liệu function

- Trong ts các tham số sẽ mặc định là <mark>any</mark>
- Ta phải khai báo kiểu dữ liệu cho các tham số truyền vào function:

```ts
const sum = (num1: number, num2: number) => {
  return a + b
}
```

-Lúc này ts sẽ hiểu ta có <mark>function sum</mark> nhận vào 2 tham số là <mark>num1</mark> và <mark>num2</mark> là kiểu <mark>number</mark> và trả về kiểu <mark>number</mark>

-Để rõ ràng hơn ta cũng có thể khai báo kiểu dữ liệu mà <mark>function sum</mark> trả về:

```ts
const sum = (num1: number, num2: number): number => {
  return a + b
}
```

-Khi đã quy định kiểu dữ liệu trả về của <mark>function sum</mark> là <mark>number</mark> thì khi return phải trả về kiểu <mark>number</mark> hoặc khi gọi hàm <mark>sum(1, '2')</mark> sẽ báo lỗi:

```ts
const sum = (num1: number, num2: number): number => {
  return a + b + 'abc'
}

Type 'string' is not assignable to type 'number'.
```

- Ngoài ra ta còn có thể khai báo kiểu dữ liệu cho <mark>function</mark> :

```ts
const sum: (num1: number, num2: number) => number = (num1, num2) => {
  return a + b
}
```

- Ở ví dụ này:

```ts
const sum: (num1: number, num2: number) => number là khai báo kiểu dữ liệu cho function sum
```

và phải có phần:

```ts
= (num1, num2) => {
return a + b
}
```

để khai báo giá trị khởi tạo cho <mark>function sum</mark>.

- Khi funtion không trả về giá trị nào thì ta có thể khai báo kiểu dữ liệu trả về là <mark>void</mark>:

- Ví dụ:

```ts
const handle = () => {
  console.log('abc')
}
```

- Khi hover vào <mark>handle</mark> sẽ thấy kiểu dữ liệu của nó là <mark>() => void</mark>

- Hoặc có thể khai báo rõ ràng hơn:

```ts
const handle = (): void => {
  console.log('abc')
}
```

- Khi khai báo kiểu dữ liệu bất kỳ ví dụ

```ts
age = 20
```

- ts sẽ tự hiểu <mark>age</mark> là kiểu <mảk>number</mảk>
- tương tự với các kiểu khác

## <mark>**Union**</mark>

- <mark>Union</mark> nghĩa là kết hợp các kiểu dữ liệu lại với nhau
- Ví dụ:

```ts
let price: number | string

price = 20
price = '20'
```

- Ở ví dụ trên price có thể là kiểu number hoặc string

* Ví dụ khác:

```ts
let body: { name: string | number } | { firstName: string; lastName: string } = {
  name: 'John'
}
```

- Ở ví dụ trên <mark>body</mark> có thể là <mark>object</mark> có thuộc tính <mark>name</mark> là kiểu <mark>string</mark> hoặc <mark>number</mark>
- hoặc là <mark>object</mark> có 2 thuộc tính <mark>firstName</mark> và <mark>lastName</mark> là kiểu string

## <mark>**Enum**</mark>

- <mark>Enum</mark> là một tập hợp các hằng số
- Ví dụ:

```ts
enum Sizes {
  S,
  M,
  L,
  XL
}
```

- Ở ví dụ trên ta có <mark>enum Sizes</mark> là một tập hợp các hằng số
- Mặc định các hằng số trong <mark>enum</mark> sẽ được đánh số từ <mark>0</mark>
- Ví dụ ta có:

```ts
let size = Sizes.S
```

- lúc này <mark>size</mark> sẽ là <mark>0</mark>

- Hoặc ta có thể đặt giá trị cho các hằng số trong <mark>enum</mark>:

```ts
enum Sizes {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL'
}
```

-Lúc này các hằng số trong <mark>enum</mark> sẽ là <mark>S, M, L, XL</mark>

## <mark>**Interface**</mark>

- <mark>Interface</mark> là một tập hợp các thuộc tính và phương thức
- Ví dụ:

```ts
interface Product {
  name: string
  price: number
  getName(): string
}
```

- Ở ví dụ trên ta có <mark>interface Product</mark> là một tập hợp các thuộc tính và phương thức
- Trong <mark>interface Product</mark> có 2 thuộc tính là <mark>name</mark> và <mark>price</mark> là kiểu <mark>string</mark> và <mark>number</mark>
- Và có một phương thức <mark>getName()</mark> trả về kiểu <mark>string</mark>

## <mark>**Type**</mark>

- <mark>Type</mark> là một tập hợp các kiểu dữ liệu
- Ví dụ:

```ts
type Product = {
  name: string
  price: number
  getName(): string
}
```

- Ở ví dụ trên ta có <mark>type Product</mark> là một tập hợp các kiểu dữ liệu
- Trong <mark>type Product</mark> có 2 thuộc tính là <mark>name</mark> và <mark>price</mark> là kiểu <mark>string</mark> và <mark>number</mark>
- Và có một phương thức <mark>getName()</mark> trả về kiểu <mark>string</mark>

## <mark>**So sánh Interface và type**</mark>

## **Interface**

- <mark>Interface</mark> và <mark>type</mark> khá tương đồng nhau
- Tuy nhiên có một số điểm khác nhau

- Ví dụ khi khai báo <mark>interface</mark> cùng 1 tên nhiều lần thì <mark>interface</mark> cuối cùng sẽ <mark>merge</mark> các <mark>interface</mark> lại với nhau:

```ts
interface Product {
  name: string
}

interface Product {
  price: number
  getName(): string
}

let product: Product = {
  name: 'John',
  price: 20
}
```

- Ở ví dụ trên ta có thể extends từ <mark>interface Product</mark> sang <mark>interface Product</mark> khác
- Và ta có thể khai báo biến <mark>product</mark> có kiểu dữ liệu là <mark>Product</mark>
- Nhưng khi khai báo kiểu dữ liệu <mark>product</mark> là <mark>Product</mark> thì phải truyền đủ các thuộc tính đã khai báo trước đó của <mark>interface Product</mark>, nếu không sẽ báo lỗi:

```ts
Property 'getName' is missing in type '{ name: string; price: number; }' but required in type 'Product'.
```

- fix lỗi trên ta có thể thêm thuộc tính <mark>getName</mark> vào biến <mark>product</mark>:

```ts
let product: Product = {
  name: 'John',
  price: 20,
  getName() {
    return this.name
  }
}
```

- <mark>interface</mark> sẽ không thể <mark>merge</mark> các <mark>interface</mark> lại với nhau bằng toán tử <mark>&</mark> như <mark>type</mark> hoặc <mark>union</mark>

## **Type**

- Đối với <mark>type</mark> thì không thể khai báo trùng tên nhau:

```ts
type Product = {
  name: string
}

type Product = {
  price: number
  getName(): string
}

Duplicate identifier 'Product'.
```

- Ở ví dụ trên ta không thể khai báo <mark>type Product 2</mark> lần

- Đối với <mark>type</mark> ta có thể sử dụng cách khác để <mark>merge</mark> các <mark>type</mark> lại với nhau:

```ts
type Product = {
  name: string
}

type Product2 = {
  price: number
  getName(): string
}

type Product3 = Product & Product2
```

- Ở ví dụ trên ta có thể <mark>merge</mark> 2 <mark>type</mark> lại với nhau bằng cách sử dụng toán tử <mark>&</mark>

- hoặc <mark>Union</mark> với nhau

```ts
type Product3 = Product | Product2
```

- Ở ví dụ trên ta có thể <mark>merge</mark> 2 <mark>type</mark> lại với nhau bằng cách sử dụng toán tử <mark>|</mark>
- <mark>Product3</mark> sẽ có kiểu dữ liệu là <mark>Product</mark> hoặc <mark>Product2</mark>

## **Class**

- <mark>Class</mark> là một bản thiết kế để tạo ra các đối tượng
- Ví dụ:

```ts
class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  getName(): string {
    return this.name
  }
}
```

- Ở ví dụ trên ta có <mark>class Person</mark> là một bản thiết kế để tạo ra các đối tượng
- Trong <mark>class Person</mark> có 2 thuộc tính là <mark>name</mark> và <mark>age</mark> là kiểu <mark>string</mark> và <mark>number</mark>
- Và có một phương thức <mark>getName()</mark> trả về kiểu <mark>string</mark>
- Trong <mark>class Person</mark> có một <mark>constructor</mark> nhận vào 2 tham số là <mark>name</mark> và <mark>age</mark>
- Trong <mark>constructor</mark> ta có <mark>this.name = name</mark> và <mark>this.age = age</mark>
- Điều này có nghĩa là khi ta khởi tạo một đối tượng từ <mark>class Person</mark> thì ta phải truyền vào 2 tham số là <mark>name</mark> và <mark>age</mark>

- Ví dụ:

```ts
const person = new Person('John', 20)
```

- Tính <mark>Private</mark> và <mark>Public</mark> trong <mark>class</mark>:

- Ví dụ:

```ts
class Person {
  private name: string
  public age: number
  readonly money: number = 100

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  getName(): string {
    return this.name
  }

  getMoney(): number {
    const salary = this.money
    return salary
  }
}
```

- Ở ví dụ trên ta có <mark>class Person</mark> là một bản thiết kế để tạo ra các đối tượng
- Trong <mark>class Person</mark> có 3 thuộc tính <mark>name</mark> là <mark>string</mark>, <mark>age</mark> và <mark>money</mark> là <mark>number</mark>
- Và có một phương thức <mark>getName()</mark> trả về kiểu <mark>string</mark>
- Và có một phương thức <mark>getMoney()</mark> trả về kiểu <mark>number</mark>
- thuộc tính <mark>name</mark> được quy định là <mark>private</mark>
- thuộc tính <mark>age</mark> được quy định là <mark>public</mark>
- thuộc tính <mark>money</mark> được quy định là <mark>readonly</mark>
- Điều này có nghĩa ta chỉ có thể truy cập thuộc tính <mark>name</mark> ở trong <mark>class Person</mark> mà không thể truy cập ở bên ngoài <mark>class Person</mark>

-vi dụ:

```ts
getName()
```

có thể truy cập thuộc tính <mark>name</mark> ở trong <mark>class Person</mark>

- Nhưng nếu ta truy cập thuộc tính <mark>name</mark> ở bên ngoài <mark>class Person</mark>:

```ts
person.name
```

thì sẽ báo lỗi:

```ts
Property 'name' is private and only accessible within class 'Person'.
```

- Thuộc tính <mark>money</mark> có kiểu dữ liệu là readonly nghĩa là ta chỉ có thể đọc thuộc tính <mark>money</mark> mà không thể gán giá trị.

-ví dụ:

```ts
getMoney(): number {
    const salary = this.money
    return salary
}
```

- Ở ví dụ trên ta có thể đọc thuộc tính money gán giá trị cho biến <mark>salary</mark>:

```ts
salary = this.money
```

- Nhưng nếu ta gán giá trị cho thuộc tính <mark>money</mark> sẽ báo lỗi:

```ts
Cannot assign to 'money' because it is a read-only property.
```

- Ngoài ra <mark>Class</mark> còn có <mark>shorthand syntax</mark>:

```ts
class Person {
  constructor(public name: string, private age: number) {}
}
```

- Tương tự với khi ta viết:

```ts
class Person {
  public name: string
  private age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}
```

## <mark>**Generic type**</mark>

- <mark>Generic type</mark> là một kiểu dữ liệu có thể thay đổi được
- Nó có khả năng linh động trong việc khai báo kiểu dữ liệu cho các biến và hàm trong quá trình chạy nhưng tường minh hơn <mark>any</mark>
- Ví dụ:

```ts
const handleClick = (value: string): string => value
```

- Ở ví dụ trên ta có hàm <mark>handleClick</mark> có tham số <mark>value</mark> và trả về giá trị của <mark>value</mark> mặc định là <mark>any</mark>
- Nếu muốn quy định kiểu dữ liệu truyền vào <mark>value</mark> 1 cách linh động thì ta có thể sử dụng <mark>generic type</mark>:

```ts
const handleClick = <Type>(value: Type) => value
```

- Ở ví dụ trên ta có <mark>handleClick</mark> là một hàm có tham số <mark>value</mark> có kiểu dữ liệu là <mark>Type</mark> và chưa quy định kiểu dữ liệu <mark>function</mark> trả về
- <mark>Type</mark> là generic
- <mark>value: Type</mark> là quy định kiểu dữ liệu cho tham số <mark>value</mark>
- Nếu muốn truyền vào tham số <mark>value</mark> là kiểu dữ liệu gì khi gọi hàm thì ta chỉ cần truyền vào giá trị đó cho <mark>Type</mark>

- Ví dụ:

```ts
handleClick<string>('John')
```

- Lúc này <mark>Type</mark> sẽ là <mark>string</mark> và value sẽ là 'John'

- Nếu không truyền vào giá trị cho <mark>Type</mark> thì <mark>Type</mark> sẽ là <mark>any</mark>
