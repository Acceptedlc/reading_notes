
/**
 * 这个脚本用于生成账号，输入一段文字作为密码
 *
 *
 * 第一笔交易的接受者
 * 寻寻觅觅，冷冷清清，凄凄惨惨戚戚。乍暖还寒时候，最难将息。三杯两盏淡酒，怎敌他、晚来风急！雁过也，正伤心，却是旧时相识。
 *
 * 第一笔交易的发送者
 * 滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。
 */





var crypto = require('crypto');
var ed = require('ed25519');
var	bignum = require('./lib/bignum.js');

var secret = process.argv[2];
var hash = crypto.createHash('sha256').update(secret, 'utf8').digest();
var keypair = ed.MakeKeypair(hash);
var publicKey = keypair.publicKey.toString('hex');
var privateKey = keypair.privateKey.toString('hex');
var publicKeyHash = crypto.createHash('sha256').update(publicKey, 'hex').digest();
var temp = new Buffer(8);
for (var i = 0; i < 8; i++) {
    temp[i] = publicKeyHash[7 - i];
}
var address = bignum.fromBuffer(temp).toString() + 'L';

console.log(`publicKey : ${publicKey}`);
console.log(`privateKey : ${privateKey}`);
console.log(`hashAdd : ${address}`);
