## <mark>**Khai báo các kiểu dữ liệu**</mark>

```ts
+ Khai báo kiểu dữ liệu string
let car: string
car = 'BMW'

+ Khai báo kiểu dữ liệu number
let age: number
age = 20

+ Khai báo kiểu dữ liệu boolean
let isLoading: boolean = false

+ Khai báo kiểu dữ liệu undefined
let body: undefined = undefined
hoặc
let body: undefined

+ Khai báo kiểu dữ liệu null
let body: null = null

+ Khai báo kiểu dữ liệu any
let person: any
- Có thể gán bất kỳ kiểu dữ liệu nào cho any
- Chỉ khi nào không thể xác định được kiểu dữ liệu thì mới dùng any, hạn chế sử dụng any để kiểu dữ liêu được tường minh

+ Khai báo kiểu dữ liệu object

let house: {
  address: string
}

- Đối với kiểu dữ liệu object trong ts, phải khai báo tường minh các thuộc tính của object và kiểu dữ liệu của chúng

- Ngoài ra phải khai báo giá trị khởi tạo cho nó sau khi khai báo kiểu dữ liệu, nếu không khi dùng sẽ gặp lỗi:

house.address = 'Danang'

- Lỗi: Variable 'house' is used before being assigned.

-Cách fix là phải khai báo giá trị khởi tạo cho nó sau khi khai báo kiểu dữ liệu:

let house: {
  address: string
} = {
  address: ''
}

hoặc cách khác dài dòng hơn:

let house: {
  address: string
} | undefined

if(house) {
  house.address = 'Danang'
}

+ Đối với trường hợp thuộc tính của object có thể có hoặc không thì bằng dấu ?: và không cần có giá trị khởi tạo

let house: {
  address: string
  color?: string
} = {
  address: ''
}

+ Khai báo kiểu dữ liệu array

let products: []

- Khi hover vào producs sẽ thấy kiểu dữ liệu của nó là never[], nghĩa là không thể gán bất kỳ giá trị nào cho nó

- Vì vậy ví dụ khi dùng products.push(1) sẽ gặp lỗi:

Argument of type 'number' is not assignable to parameter of type 'never'.

- Để sửa lỗi này thì phải khai báo kiểu dữ liệu cho array:

let products: string[] = []

- string[]: là khai báo kiểu dữ liệu của array là tập hợp các string
- []: là giá trị khởi tạo cho array

- Có thể thay string là kiểu dữ liệu bất kỳ theo nhu cầu

+ Khai báo kiểu dữ liệu object array

- Kết hợp giữa object và array:

let people: {
  name: string
  age: number
}[] = []

- Ở ví dụ trên ta có people là một array
- Mỗi phần tử của array là một object có 2 thuộc tính là name và age. Ví dụ ta có:

people.push({
  name: 'John',
  age: 20
})

- Lúc này array people sẽ là :

people = [
  {
    name: 'John',
    age: 20
  }
]

+ Khai báo kiểu dữ liệu function

- Ở js ta có thể khai báo function như sau:

const sum = (num1, num2) => {
  return a + b
}

- Trong ts num1 và num2 sẽ mặc định là any
- Ta phải khai báo kiểu dữ liệu cho num1 và num2:

const sum = (num1: number, num2: number) => {
  return a + b
}

-Lúc này ts sẽ hiểu ta có function sum nhận vào 2 tham số là num1 và num2 là kiểu number và trả về kiểu number

-Để rõ ràng hơn ta cũng có thể khai báo kiểu dữ liệu mà function sum trả về:

const sum = (num1: number, num2: number): number => {
  return a + b
}

-Khi đã quy định kiểu dữ liệu trả về của function sum là number thì khi return phải trả về kiểu number, nếu không ts sẽ báo lỗi ví dụ:

const sum = (num1: number, num2: number): number => {
  return a + b + 'abc'
}

hoặc khi gọi hàm sum(1, '2') sẽ báo lỗi:

- Lỗi: Type 'string' is not assignable to type 'number'.

- Ngoài ra ta còn có thể khai báo kiểu dữ liệu cho function :

const sum: (num1: number, num2: number) => number = (num1, num2) => {
  return a + b
}

- Ở ví dụ này:

const sum: (num1: number, num2: number) => number là khai báo kiểu dữ liệu cho function sum

và phải có phần:
= (num1, num2) => {
  return a + b
} để khai báo giá trị khởi tạo cho function sum.

- Khi funtion không trả về giá trị nào thì ta có thể khai báo kiểu dữ liệu trả về là void:

- Ví dụ:
const handle = () => {
  console.log('abc')
}

- Khi hover vào handle sẽ thấy kiểu dữ liệu của nó là () => void

- Hoặc có thể khai báo rõ ràng hơn:

const handle = ():void => {
  console.log('abc')
}

+ Khi khai báo kiểu dữ liệu bất kỳ ví dụ age = 20
ts sẽ tự hiểu age là kiểu number
tương tự với các kiểu khác
```

## <mark>**Union**</mark>

```ts
+ Union nghĩa là kết hợp các kiểu dữ liệu lại với nhau
+ Ví dụ:

let price: number | string

price = 20
price = '20'

- Ở ví dụ trên price có thể là kiểu number hoặc string

+ Ví dụ khác:

let body: {
  name: string | number
} | {firstName: string, lastName: string} = {
  name: 'John'
}

- Ở ví dụ trên body có thể là object có thuộc tính name là kiểu string hoặc number
- hoặc là object có 2 thuộc tính firstName và lastName là kiểu string

```

## <mark>**Enum**</mark>

```ts

+ Enum là một tập hợp các hằng số
+ Ví dụ:

enum Sizes {
  S,
  M,
  L,
  XL
}

- Ở ví dụ trên ta có enum Sizes là một tập hợp các hằng số
- Mặc định các hằng số trong enum sẽ được đánh số từ 0
- Ví dụ ta có:

let size = Sizes.S

- lúc này size sẽ là 0

- Hoặc ta có thể đặt giá trị cho các hằng số trong enum:

enum Sizes {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL'
}

-Lúc này các hằng số trong enum sẽ là S, M, L, XL

```

## <mark>**Interface**</mark>

```ts
+ Interface là một tập hợp các thuộc tính và phương thức
+ Ví dụ:

interface Product {
  name: string
  price: number
  getName(): string
}

- Ở ví dụ trên ta có interface Product là một tập hợp các thuộc tính và phương thức
- Trong interface Product có 2 thuộc tính là name và price là kiểu string và number
- Và có một phương thức getName() trả về kiểu string

```

## <mark>**Type**</mark>

```ts
+ Type là một tập hợp các kiểu dữ liệu
+ Ví dụ:

type Product = {
  name: string
  price: number
  getName(): string
}

- Ở ví dụ trên ta có type Product là một tập hợp các kiểu dữ liệu
- Trong type Product có 2 thuộc tính là name và price là kiểu string và number
- Và có một phương thức getName() trả về kiểu string

```

## <mark>**So sánh Interface và type**</mark>

## **Interface**

```ts

+ Interface và type khá tương đồng nhau
+ Tuy nhiên có một số điểm khác nhau

+ Ví dụ đối với Interface ta có thể extends từ một interface khác :

interface Product {
  name: string
}

interface Product{
  price: number
  getName(): string
}

let product: Product = {
  name: 'John',
  price: 20
}

- Ở ví dụ trên ta có thể extends từ interface Product sang interface Product khác
- Và ta có thể khai báo biến product có kiểu dữ liệu là Product
- Nhưng khi khai báo kiểu dữ liệu product là Product thì phải truyền đủ các thuộc tính đã khai báo trước đó của interface Product, nếu không sẽ báo lỗi:
- Property 'getName' is missing in type '{ name: string; price: number; }' but required in type 'Product'.

- fix lỗi trên ta có thể thêm thuộc tính getName vào biến product:

let product: Product = {
  name: 'John',
  price: 20,
  getName() {
    return this.name
  }
}

- interface sẽ không thể merge các interface lại với nhau bằng toán tử & như type hoặc union

```

## **Type**

```ts
- Đối với type thì không thể extends từ một type khác:

type Product = {
name: string
}

type Product = {
price: number
getName(): string
}

- Ở ví dụ trên ta không thể extends từ type Product sang type Product khác
- Lỗi : Duplicate identifier 'Product'.

- Đối với type ta có thể sử dụng cách khác để merge các type lại với nhau:

type Product = {
name: string
}

type Product2 = {
price: number
getName(): string
}

type Product3 = Product & Product2

- Ở ví dụ trên ta có thể merge 2 type lại với nhau bằng cách sử dụng toán tử &

- hoặc Union với nhau

type Product3 = Product | Product2

- Ở ví dụ trên ta có thể merge 2 type lại với nhau bằng cách sử dụng toán tử |
- Product3 sẽ có kiểu dữ liệu là Product hoặc Product2

```

## <mark>**Class**</mark>

```ts
+ Class là một bản thiết kế để tạo ra các đối tượng
+ Ví dụ:

class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  getName() {
    return this.name
  }
}

- Ở ví dụ trên ta có class Person là một bản thiết kế để tạo ra các đối tượng
- Trong class Person có 2 thuộc tính là name và age là kiểu string và number
- Và có một phương thức getName() trả về kiểu string
- Trong class Person có một constructor nhận vào 2 tham số là name và age
- Trong constructor ta có this.name = name và this.age = age
- Điều này có nghĩa là khi ta khởi tạo một đối tượng từ class Person thì ta phải truyền vào 2 tham số là name và age

- Ví dụ:
const person = new Person('John', 20)

+ Tính Private và Public trong class:

+ Ví dụ:

class Person {
  private name: string
  public age: number
  readonly money: number = 100

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  getName() {
    return this.name
  }

  getMoney() {
  return salary = person.money
}
}

- Ở ví dụ trên ta có class Person là một bản thiết kế để tạo ra các đối tượng
- Trong class Person có 3 thuộc tính name là string, age và money là number
- Và có một phương thức getName() trả về kiểu string
- Và có một phương thức getMoney() trả về kiểu number
- thuộc  tính name có kiểu dữ liệu là private
- thuộc tính age có kiểu dữ liệu là public
- thuộc tính money có kiểu dữ liệu là readonly
- Điều này có nghĩa ta chỉ có thể truy cập thuộc tính name ở trong class Person mà không thể truy cập ở bên ngoài class Person

-vi dụ:

 getName() có thể truy cập thuộc tính name ở trong class Person

- Nhưng nếu ta truy cập thuộc tính name ở bên ngoài:

person.name

class Person thì sẽ báo lỗi:

- Property 'name' is private and only accessible within class 'Person'.

- Thuộc tính money có kiểu dữ liệu là readonly nghĩa là ta chỉ có thể đọc thuộc tính money mà không thể gán giá trị cho thuộc tính money

-ví dụ:

function getMoney() {
  return salary = person.money
}

- Ở ví dụ trên ta có thể đọc thuộc tính money gán salary = person.money
- Nhưng nếu ta gán giá trị cho thuộc tính money sẽ báo lỗi:

Cannot assign to 'money' because it is a read-only property.

+ Ngoài ra Class còn có shorthand syntax:

class Person {
  constructor(public name: string, private age: number) {}
}

- Tương tự với khi ta viết:

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

```ts
+ Generic type là một kiểu dữ liệu có thể thay đổi được
+ Nó có khả năng linh động trong việc khai báo kiểu dữ liệu cho các biến và hàm trong quá trình chạy nhưng tường minh hơn any
+ Ví dụ:
const handleClick = value => value
- Ở ví dụ trên ta có hàm handleClick có tham số value và trả về giá trị của value mặc định là any
- Nếu muốn quy định kiểu dữ liệu truyền vào value 1 cách linh động thì ta có thể sử dụng generic type:

const handleClick = <Type>(value: Type) => value

- Ở ví dụ trên ta có handleClick là một hàm có tham số value có kiểu dữ liệu là Type và trả về giá trị của value
- <Type> là generic type
- value: Type là quy định kiểu dữ liệu cho tham số value
- Nếu muốn truyền vào tham số value là kiểu dữ liệu gì thì ta chỉ cần truyền vào giá trị đó cho Type

- Ví dụ:

handleClick<string>('John')

- Lúc này Type sẽ là string và value sẽ là 'John'

- Nếu không truyền vào giá trị cho Type thì Type sẽ là any

```
