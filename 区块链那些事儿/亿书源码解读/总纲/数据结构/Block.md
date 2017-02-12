## Table of Block（区块）

| colName    | type    |  description  |
| --------   | -----:   | :----: |
version | int | 全节点的版本号
totalAmount | int | 代币总量       
totalFee | int | 这个区块的费用（可能是这个区块的包含的交易的手续费的数量）
reward | int | 这个区块的奖励（应该是铸币奖励）
payloadHash | int | 这个区块所有交易的hash(估计是默克尔树的树根)
timestamp | int | 时间戳
numberOfTransactions | int |  包含交易的数量
payloadLength | int | 区块包含的交易数据的存储空间（单位为Byte,这个问题还需要验证）
previousBlock | int | 上一个区块的id
generatorPublicKey | int | 铸造节点的公钥
height | int | 区块高度
blockSignature | int | 签名
id | int | 区块的hash