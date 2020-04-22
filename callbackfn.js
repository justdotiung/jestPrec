// var CallbackArrow = CallbackArrow || {};

// CallbackArrow.rootFunction = function () {
//     CallbackArrow.firstFunction(function (arg) {
//         CallbackArrow.secondFunction(function (arg) {
//             CallbackArrow.thirdFunction(function (arg) {
//                 CallbackArrow.fourthFunction(function (arg) {});
//             });
//         });
//     });
// };

// CallbackArrow.firstFunction = function (callback1) {
//     callback1(arg);
// };
// CallbackArrow.secondFunction = function (callback2) {
//     callback2(arg);
// };
// CallbackArrow.thirdFunction = function (callback3) {
//     callback3(arg);
// };
// CallbackArrow.fourthFunction = function (callback4){
//     callback4(arg);
// }

//리팩토링

var CallbackArrow = CallbackArrow || {};
CallbackArrow.rootFunction = function () {
    CallbackArrow.firstFunction(CallbackArrow.firstCallback);
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
CallbackArrow.fourthFunction = function (callback4) {
    callback4(arg);
};
CallbackArrow.firstCallback = function () {
    //첫 번째 콜백 로직
    CallbackArrow.secondFunction(CallbackArrow.secondCallback);
};
CallbackArrow.secondCallback = function(){
    //두 번째 콜백 로직
    CallbackArrow.thirdFunction(CallbackArrow.thirdCallback);
};
CallbackArrow.thirdCallback = function(){
    //t세 번재 콜백 로직
    CallbackArrow.fourthFunction(CallbackArrow.forthCallback);
};
CallbackArrow.fourthFunction = function(){
    //네번째 콜백 로직
} 

