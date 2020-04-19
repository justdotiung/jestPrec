//고전적 상송 흉내

// Marsupial 생성자 함수에 인자가 하나도 없다.
// Kangaroo의 프로토타입을 지정하는 시점은 물론이고 Kangaroo 인스턴스가 만들어지기 전까지 어떤 인자가 올지 알 길이 없다.
// 프로토타입 지정 시 인자를 알 수 없으므로 Marsupial 함수의 프로퍼티 할당 작업은 Kangaroo 함수에서도 되풀이된다.
function Marsupial(name, noctural) {
    if (!(this instanceof Marsupial)) {
        throw new Error('이 객체는 new를 사용하여 생성해야 합니다.');
    }
    this.name = name;
    this.isNoctirnal = noctural;
}

Marsupial.prototype.isAwake = function (isNight) {
    return isNight === this.isNoctirnal;
};

function Kangaroo(name) {
    if (!(this instanceof Kangaroo)) throw new Error('이 객체는 new를 사용하여 생성해야 합니다.');

    this.name = name;
    this.isNoctirnal = false;
}

Kangaroo.prototype = new Marsupial();
Kangaroo.prototype.hop = () => {
    return `${this.name} 가 껑충 뛰었어요!`;
};

// var jester = new Kangaroo('제스터');
// console.log(jester.name);

// var isNight = false;
// console.log(jester.isAwake(isNight));
// console.log(jester.hop());

// console.log(jester instanceof Kangaroo);
// console.log(jester instanceof Marsupial);

//고전적 상속을 흉내 내면 코드 반복과 메모리 점유는 피하기 어렵다

function Marsupial(name, noctural) {
    if (!(this instanceof Marsupial)) {
        throw new Error('이객체는 new를 생성해야 합니다.');
    }
    this.name = name;
    this.noctural = noctural;
}

function Kangaroo(name) {
    if (!(this instanceof Kangaroo)) {
        throw new Error('이객체는 new를 생성해000야 합니다');
    }
    this.name = name;
    this.isNoctirnal = false;
}
/**
 * 함수형 상속(functional inheritance)을 하면 데이터를 숨긴 채 접근을 다스릴 수 있다.
 * 고전적 상속 흉내 내기의 생성자 반복 문제를 함수형 상속에서는 어떻게 해결하는지,
 * 외부 객체 사용부와 상속자로부터 데이터를 감추는 방법을 알아보자.
 * 이렇게 할 수만 있다면 퍼블릭/프라이빗 데이터 모두 실수와 오용에 노출될 빈도가 줄어들어 믿음성이 커진다.
 */

//함수형 상속 (모듈패턴 상속) 으로인한 생성자 반복 문제 개선

var AnimalKingdom = AnimalKingdom || {};

AnimalKingdom.Marsupial = function (name, nocturnal) {
    var instanceName = name;
    instanceIsNocturnal = nocturnal;

    return {
        getName: function () {
            return instanceName;
        },
        getIsNocturnal: function () {
            return instanceIsNocturnal;
        }
    };
};

AnimalKingdom.Kangaroo = function (name) {
    var baseMarsupial = AnimalKingdom.Marsupial(name, false);

    baseMarsupial.hop = function () {
        return `${baseMarsupial.getName()} 가 껑충  뛰었어요!`;
    };
    return baseMarsupial;
};

var jester = AnimalKingdom.Kangaroo('제스터');
console.log(jester.getName());
console.log(jester.getIsNocturnal());
console.log(jester.hop());

//멍키 패칭

var human = {
    useSignLanguage: function () {
        return '손을 움직여 수화할고 있어 무슨말인지 알겠니?';
    }
};

var koko = {};
koko.useSignLanguage = human.useSignLanguage;
console.log(koko.useSignLanguage());

//객체에 없는 함수를 불러 쓸 때 문제가 된다.
//완전하고 견고하게 변경

var MyApp = MyApp || {};
MyApp.Hand = function () {
    this.dataAboutHand = {};
};
MyApp.Hand.prototype.arrangeAndMove = function (sign) {
    this.dataAboutHand = '새로운 수화 동작';
};

MyApp.Human = function (handFactory) {
    this.hands = [handFactory(), handFactory()];
};
MyApp.Human.prototype.useSignLanguage = function (message) {
    var sign = {};
    //메세지를 sign에 인코딩
    this.hands.forEach(hand => hand.arrangeAndMove(sign));
    return '손을 움직여 수화하고 있어. 무슨 말인지 알겠니?';
};
MyApp.Human.prototype.endowSigning = function (receivingObject) {
    if (typeof receivingObject.getHandCount === 'function' && receivingObject.getHandCount() >= 2) {
        receivingObject.useSignLanguage = this.useSignLanguage;
        return;
    }
    throw new Error('미안하지만 너에게 수화를 가르쳐줄 수 없겠어');
};

MyApp.Gorilla = function (handFactory) {
    this.hands = [handFactory(), handFactory()];
};

MyApp.Gorilla.prototype.getHandCount = function () {
    return this.hands.length;
};

MyApp.TeachSignLanguageToKoko = (function () {
    var handFactory = function () {
        return new MyApp.Hand();
    };

    var trainer = new MyApp.Human(handFactory);
    var koko = new MyApp.Gorilla(handFactory);

    koko.useSignLanguage = trainer.useSignLanguage;
    trainer.endowSigning(koko);
    console.log(koko.useSignLanguage('안녕하세요'));
})();
