var DiContainer = require('../DiContainer');

describe('Dicontainer', () => {
    var container;
    beforeEach(() => {
        container = new DiContainer();
    });
    describe('register(name, dependencies, func)', () => {
        it('인자가 하나라도 빠졌거나 ㅏ입이 잘못되면 예외를 던진다.', () => {
            var badArgs = [
                //인자가 없는경우
                [],
                //이름만 있는경우
                ['Name'],
                //이름과 Di만 있는경우
                ['Name', ['Dependency1', 'Dependency2']],
                //Di가 빠진경우
                ['Name', function() {}],
                //타입이 잘못된 예들
                [1, ['a', 'b'], function() {}],
                ['Name', [1, 2], function() {}],
                ['Name', ['a', 'b'], 'should be a function']
            ];
            badArgs.forEach(arg => {
                expect(() => {
                    container.register.apply(container, arg);
                }).toThrowError(container.messages.registerRequiresArgs);
            });
        });
    });
    describe('get(name)', () => {
        it('성명이 등록되어 있지 않으면 undefined를 반환 한다', () =>
            expect(container.get('notDefined')).toBeUndefined());
        it('등록된 함수를 실행한 결과를 반환한다', () => {
            var name = 'MyName',
                returnFromRegisteredFunction = 'something';
            container.register(name, [], () => {
                return returnFromRegisteredFunction;
            });
            expect(container.get(name)).toBe(returnFromRegisteredFunction);
        });
        it('등록된 함수에 의존성을 제공한다', () => {
            let main = 'main',
                mainFunc,
                dep1 = 'dep1',
                dep2 = 'dep2';

            container.register(main, [dep1, dep2], (dep1Func, dep2Func) => {
                return function() {
                    return dep1Func() + dep2Func();
                };
            });

            container.register(dep1, [], () => {
                return function() {
                    return 1;
                };
            });

            container.register(dep2, [], () => {
                return function() {
                    return 2;
                };
            });

            mainFunc = container.get(main);
            expect(mainFunc()).toBe(3);
        });
    });
});
