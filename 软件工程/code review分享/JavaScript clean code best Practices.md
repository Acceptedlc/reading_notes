### 变量

##### 让变量名说明，这个变量存储的内容是什么，尽量不要用缩写

![GitHub](../../pic/JavaScript_clean_code_best Practices_p1.png)



##### 不要增加没有用的名词

```
// DON'T
let nameString  
let theUsers

// DO
let name  
let users 

```

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

##### 不要使用长的参数列表，使用es6的结构来声明函数参数

```

// DON'T
function getRegisteredUsers (fields, include, fromDate, toDate) { /* implementation */ }  
getRegisteredUsers(['firstName', 'lastName', 'email'], ['invitedUsers'], '2016-09-26', '2016-12-13')

// DO
function getRegisteredUsers ({ fields, include, fromDate, toDate }) { /* implementation */ }  
getRegisteredUsers({  
  fields: ['firstName', 'lastName', 'email'],
  include: ['invitedUsers'],
  fromDate: '2016-09-26',
  toDate: '2016-12-13'
})

``` 