/**
 * 用于生成创世区块中的第一笔转账交易
 */

var crypto = require('crypto');
var ed = require('ed25519');
var ByteBuffer = require("bytebuffer");
var bignum = require('./lib/bignum.js');


var senderPassword = '滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。';
var senderKeyPair = getKeyPaire(senderPassword);
var recipientPassword = '寻寻觅觅，冷冷清清，凄凄惨惨戚戚。乍暖还寒时候，最难将息。三杯两盏淡酒，怎敌他、晚来风急！雁过也，正伤心，却是旧时相识。';
var recipentKeyPair = getKeyPaire(recipientPassword);


var trs = {
    type: 0,
    amount: 10000000000000000,
    timestamp: 0,
    recipientId: '648007467691796767L',
    senderPublicKey: 'd4715e1d53d5c66e2ca758f1fad472483f5aeafefeda90623d878788fd832c34',
};


/**
 * signature
 *  trs => getHash
 *      getByte
 *      sha256运算
 *  ed 用公私钥签名 转hex编码
 */
var trsBytes = getBytes(trs);
var trsHash = crypto.createHash('sha256').update(trsBytes).digest();
trs.signature = ed.Sign(trsHash, senderKeyPair).toString('hex');


//id:研究一下怎么生成,
trsBytes = getBytes(trs);
trsHash = crypto.createHash('sha256').update(trsBytes).digest();
var temp = new Buffer(8);
for (var i = 0; i < 8; i++) {
    temp[i] = trsHash[7 - i];
}

trs.id = bignum.fromBuffer(temp).toString();


trs.fee = 0;
console.log(JSON.stringify(trs, null, 2));


function getBytes(trs, skipSignature, skipSecondSignature) {
    var assetBytes = null;
    var assetSize = 0;
    var bb = new ByteBuffer(1 + 4 + 32 + 32 + 8 + 8 + 64 + 64 + assetSize, true);
    bb.writeByte(trs.type);
    bb.writeInt(trs.timestamp);

    var senderPublicKeyBuffer = new Buffer(trs.senderPublicKey, 'hex');
    for (var i = 0; i < senderPublicKeyBuffer.length; i++) {
        bb.writeByte(senderPublicKeyBuffer[i]);
    }

    if (trs.requesterPublicKey) {
        var requesterPublicKey = new Buffer(trs.requesterPublicKey, 'hex');
        for (var i = 0; i < requesterPublicKey.length; i++) {
            bb.writeByte(requesterPublicKey[i]);
        }
    }

    if (trs.recipientId) {
        var recipient = trs.recipientId.slice(0, -1);
        recipient = bignum(recipient).toBuffer({size: 8});

        for (var i = 0; i < 8; i++) {
            bb.writeByte(recipient[i] || 0);
        }
    } else {
        for (var i = 0; i < 8; i++) {
            bb.writeByte(0);
        }
    }

    bb.writeLong(trs.amount);

    if (assetSize > 0) {
        for (var i = 0; i < assetSize; i++) {
            bb.writeByte(assetBytes[i]);
        }
    }

    if (!skipSignature && trs.signature) {
        var signatureBuffer = new Buffer(trs.signature, 'hex');
        for (var i = 0; i < signatureBuffer.length; i++) {
            bb.writeByte(signatureBuffer[i]);
        }
    }

    if (!skipSecondSignature && trs.signSignature) {
        var signSignatureBuffer = new Buffer(trs.signSignature, 'hex');
        for (var i = 0; i < signSignatureBuffer.length; i++) {
            bb.writeByte(signSignatureBuffer[i]);
        }
    }

    bb.flip();
    return bb.toBuffer();
}

function getKeyPaire(secret) {
    var hash = crypto.createHash('sha256').update(secret, 'utf8').digest();
    return ed.MakeKeypair(hash);
}

