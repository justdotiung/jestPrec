
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

var jester = new Kangaroo('제스터');
console.log(jester.name);

var isNight = false;
console.log(jester.isAwake(isNight));
console.log(jester.hop());

console.log(jester instanceof Kangaroo);
console.log(jester instanceof Marsupial);

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
    this.isNoctirnal = false
}
/**
 * 함수형 상속(functional inheritance)을 하면 데이터를 숨긴 채 접근을 다스릴 수 있다. 
 * 고전적 상속 흉내 내기의 생성자 반복 문제를 함수형 상속에서는 어떻게 해결하는지,
 * 외부 객체 사용부와 상속자로부터 데이터를 감추는 방법을 알아보자. 
 * 이렇게 할 수만 있다면 퍼블릭/프라이빗 데이터 모두 실수와 오용에 노출될 빈도가 줄어들어 믿음성이 커진다.
 */

 //함수형 상속 으로인한 생성자 반복 문제 개선