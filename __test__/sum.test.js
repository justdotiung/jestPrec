const sum = require('../sum');
describe('‘createReservation(passenger, flight)’', function() {
  
  //  beforeEach 에서할당 받는 변수 선언.
  var testPassenger = null,
    testFlight = null,
    testReservation = null,
    saver = null;

  beforeEach(function() {
    testPassenger = {
      firstName: '‘윤지’',
      lastName: '‘김’'
    };

    testFlight = {
      number: '‘3443’',
      carrier: '‘대한항공’',
      destination: '‘울산’'
    };

    saver = new sum.ReservationSaver(); // 전역으로 잡는다.
    jest.spyOn(saver, 'saveReservation');

    testReservation = sum.createReservation(testPassenger, testFlight, saver);
  });

  it('‘passenger를 passengerInformation 프로퍼티에 할당한다’', function() {
    expect(testReservation.passengerInformation).toBe(testPassenger);
  });

  it('‘flight를 flightInformation 프로퍼티에 할당한다’', function() {
    expect(testReservation.flightInformation).toBe(testFlight);
  });

  it('‘예약 정보를 저장한다’', function() {
    expect(saver.saveReservation).toHaveBeenCalled();
  });
});
