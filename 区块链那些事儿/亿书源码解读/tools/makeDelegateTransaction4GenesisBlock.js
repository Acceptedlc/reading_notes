/**
 * 用于生成创世区块中的第一笔转账交易
 */

var crypto = require('crypto');
var ed = require('ed25519');
var ByteBuffer = require("bytebuffer");
var bignum = require('./lib/bignum.js');

var senderPassword = '寻寻觅觅，冷冷清清，凄凄惨惨戚戚。乍暖还寒时候，最难将息。三杯两盏淡酒，怎敌他、晚来风急！雁过也，正伤心，却是旧时相识。';
var senderKeyPair = getKeyPaire(senderPassword);

var trs = {
    asset: {
        "delegate": {
            "username": "wddlc"
        }
    },
    type: 2,
    timestamp: 0,
    senderPublicKey: '40af2d2962835edfaaca07ec8f3a8098906d0a3a4f1923dab438a08e83dca050',
    amount: 0
};

var trsBytes = getBytes(trs);
var trsHash = crypto.createHash('sha256').update(trsBytes).digest();
trs.signature = ed.Sign(trsHash, senderKeyPair).toString('hex');
console.log('signature', trs.signature);

trsBytes = getBytes(trs);
trsHash = crypto.createHash('sha256').update(trsBytes).digest();
var temp = new Buffer(8);
for (var i = 0; i < 8; i++) {
    temp[i] = trsHash[7 - i];
}

trs.id = bignum.fromBuffer(temp).toString();
console.log('id', trs.id);


function getBytes(trs, skipSignature, skipSecondSignature) {
    var assetBytes = new Buffer(trs.asset.delegate.username, 'utf8');
    var assetSize = assetBytes ? assetBytes.length : 0;

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

