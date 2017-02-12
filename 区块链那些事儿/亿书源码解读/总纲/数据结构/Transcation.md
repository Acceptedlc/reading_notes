## Table of Transcation（区块）

| colName    | type    |  description  |
| --------   | -----:   | :----: |
type | int | 交易类型
amount | int | 交易代币数量
fee | int | 手续费
timestamp | int | 交易的时间戳
recipientId | int | 接受者地址hash地址
senderId | int | 发送者的hash地址
senderPublicKey | int | 发送者的公钥
signature | int | 发送者的数字签名
id | int | 整个数据的hash值
asset | object | 详细见下文，不同交易类型结构不同

### 交易类型列表

* 0： 转账交易
* 1： 
* 2： 注册为受托人
* 3： 投票交易


### asset详解