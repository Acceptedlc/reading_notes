### 变量

##### 让变量名说明，这个变量存储的内容是什么

![GitHub](../../pic/JavaScript_clean_code_best Practices_p1.png)

* 把逻辑说明白
* 指出变量命名的问题
* 最后，说一下为了，让变量名可读，尽量不要使用缩写单词

##### 不要增加没有用的名词

```
// DON'T
let nameString  
let theUsers

// DO
let name  
let users 

```

* 在上面的例子中，提到尽量不要用缩写单词，这会产生一个副作用，就是，变量名过长
* 为了不让变量名长到丧心病狂的地步，在命名变量的时候不要出现任何无效的单词
	* 冠词
	* 数据类型
	* 。。。

### 函数

##### 函数名称应该是一个动词或者动宾短语，通过函数名称和参数名称以及顺序表达出这个函数的目的

```
// DON'T
/**
 * Invite a new user with its email address
 * @param {String} user email address
 */
function inv (user) { /* implementation */ }

// DO
function inviteUser (emailAddress) { /* implementation */ }  

```

* 上面两段代码表达的意思差不多，但是明显后者更优美一些，也更加试用一些
* 因为，后者通过方法名和参数列表说明函数的意义，可以在调用的逻辑中直接看出函数的作用，不用再跟进到函数声明的地方，搞清楚函数的作用，然后在回到逻辑中


##### 不要使用长的参数列表，使用es6的解构来声明函数参数

```

// DON'T
function getRegisteredUsers (fields, include, fromDate, toDate) { /* implementation */ }  


// DO
function getRegisteredUsers ({ fields = [], include = [], fromDate = '2017-12-1', toDate = '2017-12-1' }) {
 	/* implementation */ 
 }  

``` 

* ES6的解构语法名用于函数列表的优点有两个
	* 未来调整参数的顺序，不会对污染调用方
	* 避免在函数开始出，写一大堆恶心的默认值赋值

##### 减少函数的副作用

```

// DON'T
function addItemToCart (cart, item, quantity = 1) {  
  const alreadyInCart = cart.get(item.id) || 0
  cart.set(item.id, alreadyInCart + quantity)
  return cart
}

// DO
// not modifying the original cart
function addItemToCart (cart, item, quantity = 1) {  
  const cartCopy = new Map(cart)
  const alreadyInCart = cartCopy.get(item.id) || 0
  cartCopy.set(item.id, alreadyInCart + quantity)
  return cartCopy
}

```

* 上述函数，将参数修改了，调用的小伙伴就会很困惑
* 函数内部，不应该影响对上层调用者的行为做任何假设

##### 让函数在文件中排列的顺序合理一些，需要先读的放在前面

* 在排列函数的时候，应该注意函数的顺序
* 比如：react的组件，起码应该生命周期的顺序排练函数