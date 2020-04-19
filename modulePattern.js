var MyApp = MyApp || {};
MyApp.wildifePreserveSomulator = function (animalMaker) {
    //프라이빗 변수
    var animals = [];

    return {
        addAnimal(species, sex) {
            animals.push(animalMaker.make(species, sex));
        },
        getAnimalCount() {
            return animals.length;
        }
    };
};

MyApp.singleWildlifePrserveSimulator = (function () {
    var animals = [];

    return {
        addAnimal(animalMaker, specise, sex) {
            animals.push(animalMaker.make(specise, sex));
        },
        getAnimalCount() {
            return animals.length;
        }
    };
})();

var preserve = MyApp.wildifePreserveSomulator(realAnimalMaker);
preserve.addAnimal(gorilla, female);

MyApp.singleWildlifePrserveSimulator(realAnimalMaker, gorilla, female);
