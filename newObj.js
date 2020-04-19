// Marsupial 유대동물 (코알라 등등 유대류 동물) nocturnal 야행성

function Marsupial(name, noctural) {
    this.name = name;
    this.isNoctirnal = noctural;
}

var maverick = new Marsupial('매버릭', true);
var slider = new Marsupial('슬라이더', false);

console.log(maverick.isNoctirnal);
console.log(maverick.name);

//new를 사용하도록 강제하는 방법

/*
this instanceof Marsupial 결과가 false인지 확인한다. 
자바스크립트에서 instanceof 연산자는 우변 피연산자의 프로토타입이 좌변 피연산자의 프로토타입 체인에 있는지 찾아본다.
만약 있으면 좌변 피연산자는 우변 피연산자의 인스턴스라고 결론 내린다.

new 키워드를 앞에 붙여 생성자 함수를 실행하면 일단 빈 객체를 하나 만들어 새 객체의 프로토타입을 생성자 함수의 프로토타입 프로퍼티에 연결한다.
그런 다음 생성자 함수를 this로 실행하여 새 객체를 찍어낸다.

new가 없다면 이런 일은 일어나지 않는다.
실행 후 생성자 함수와 새 객체는 아무 연관이 없고 예제 3-4와 3-5는 전역 객체에 묶인다. 
또한, 프로토타입 할당도 없으므로 instanceof 연산 결과는 false다.
*/

function Marsupial(name, noctural) {
    if (!(this instanceof Marsupial)) {
        throw new Error('이 객체는 new를 사용하여 생성해야 합니다.');
    }
    this.name = name;
    this.isNoctirnal = noctural;
}

// var slider = Marsupial('슬라이더', true);

// new 가없을시 자동으로 new를 붙여 인스턴스 생성 비추

function Marsupial(name, noctural) {
    if (!(this instanceof Marsupial)) {
        return new Marsupial(name, noctural);
    }
    this.name = name;
    this.isNoctirnal = noctural;
}

// var slider = Marsupial('슬라이더', true);
// console.log(slider);

// new 객체 함수직접추가

function Marsupial(name, noctural) {
    if (!(this instanceof Marsupial)) {
        throw new Error('이 객체는 new를 사용하여 생성해야 합니다.');
    }
    this.name = name;
    this.isNoctirnal = noctural;

    this.isAwake = function (isNight) {
        return isNight === this.isNoctirnal;
    };
}

var marverick = new Marsupial('메버릭', true);
var slider = new Marsupial('슬라이더', false);
var isNightTime = true;

// console.log(maverick.isAwake(isNightTime));
// console.log(maverick.isAwake(isNightTime));
// console.log(maverick.isAwake === slider.isAwake);

// 함수의 프로토타입에 함수를 정의하면 객체 인스턴스를 대량 생성할 때 함수 사본 개수를 한 개로 제한하여 메모리 점유율을 낮추고 성능까지 높이는 추가 이점이 있다.

//생성자 함수 프로토타입에 함수를 추가

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

var isNightTime = true;

var marverick = new Marsupial('메버릭', true);
var slider = new Marsupial('슬라이더', false);

console.log(maverick.isAwake(isNightTime));
console.log(maverick.isAwake(isNightTime));
console.log(maverick.isAwake === slider.isAwake);