var chimp = {
    hasThumbs: true,
    swing: function () {
        console.log(this);
        return '나무 꼭대기에 대롱대롱 매달려 있네요';
    },
    toString: function () {
        return 'im chimp';
    }
};

console.log(chimp.toString());

var ape = {
    hasThumbs: true,
    hasTail: false,
    swing: function () {
        return '매달리기';
    }
};

var chimp = Object.create(ape);
var bonobo = Object.create(ape);
console.log(bonobo.habitat);
console.log(bonobo.hasTail);
console.log(chimp.swing());
ape.hasThumbs = false;
console.log(bonobo.hasTail);
console.log(chimp.hasTail);

var primate = {
    stereoscopicVision: true
};

var ape = Object.create(primate);
ape.hasThumbs = true;
ape.hasTail = false;
ape.swing = function () {
    return '매달리기';
};

// 너무 깊숙이 프로토타입 체인을 찾게 하면 성능상 좋을 게 없으니
//  될 수 있으면 너무 깊이 체인을 쓰지 않는 편이 좋다
var chimp = Object.create(ape);
console.log(chimp.hasTail);
console.log(chimp.stereoscopicVision);
