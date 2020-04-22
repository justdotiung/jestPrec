var CallbackArrow = CallbackArrow || {};

CallbackArrow.rootFunction = function () {
    CallbackArrow.firstFunction(function (arg) {
        CallbackArrow.secondFunction(function (arg) {
            CallbackArrow.thirdFunction(function (arg) {
                CallbackArrow.fourthFunction(function (arg) {});
            });
        });
    });
};

CallbackArrow.firstFunction = function (callback1) {
    callback1(arg);
};
CallbackArrow.secondFunction = function (callback2) {
    callback2(arg);
};
CallbackArrow.thirdFunction = function (callback3) {
    callback3(arg);
};
CallbackArrow.fourthFunction = function (callback4){
    callback4(arg);
}