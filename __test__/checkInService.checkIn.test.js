var Conference = require('../checkInService');

describe('Conference.checkInService', () => {
    'use strict';
    var checkInService, checkInRecorder, attendee;

    beforeEach(() => {
        checkInRecorder = Conference.checkInRecorder();
        checkInService = Conference.checkInService(checkInRecorder);
        attendee = Conference.attendee('형철', '서');
    });

    describe('checkInService.checkIn(attendee)', () => {
        describe('checkInRecorder 성공시', () => {
            var checkInNumber = 1234;
            beforeEach(() => {
                jest.spyOn(checkInRecorder, 'recordCheckIn');
                return Promise.resolve(checkInNumber);
            });

            it('참가자를 체크인 처리한 것으로 표시한다', () => {
                checkInService.checkIn(attendee);
                expect(attendee.isCheckedIn()).toBe(true);
            });
            it('체크인을 등록한다', () => {
                checkInService.checkIn(attendee);
                expect(checkInRecorder.recordCheckIn).toHaveBeenCalledWith(attendee);
            });
            it('참가자의 checkInNumber를 지정한다', () => {
                checkInService.checkIn(attendee);
                expect(attendee.getCheckInNumber()).toBe(checkInNumber);
            });
            it('참가자의 체크인 번호를 세팅한다', done => {
                checkInService.checkIn(attendee).then(
                    function onPromiseResolved() {
                        expect(attendee.getCheckInNumber()).toBe(checkInNumber);
                        done();
                    },
                    function onPromiseRejected() {
                        expect('이 실패 분기 코드가 실행됐다').toBe(false);
                        done();
                    }
                );
            });
        });
    });
});
describe('‘Conference.checkInRecorder’', function() {
     
    var attendee, checkInRecorder;
     
    beforeEach(function() {
      attendee = Conference.attendee('‘Tom’','‘Jones’');
      checkInRecorder = Conference.checkInRecorder();
    });
     
    describe('‘recordCheckIn(attendee)’', function() {
     
      it('‘참가자가 체크인되면 checkInNumber로 귀결된 프라미스를 반환한다’', function(done) {
        attendee.checkIn();
        checkInRecorder.recordCheckIn(attendee).then(
          function promiseResolved(actualCheckInNumber) {
            expect(typeof actualCheckInNumber).toBe('‘number’');
            done();
          },
          function promiseRejected() {
            expect('‘프라미스는 버려졌다’').toBe(false);
            done();
          });
      });
     
      it('‘참가자가 체크인되지 않으면 에러와 버림 프라미스를 반환한다’', function(done) {
        checkInRecorder.recordCheckIn(attendee).then(
          function promiseResolved() {
            expect('‘프라미스는 귀결됐다’').toBe(false);
            done();
          },
          function promiseRejected(reason) {
            expect(reason instanceof Error).toBe(true);
            expect(reason.message)
              .toBe(checkInRecorder.getMessages().mustBeCheckedIn)
            done();
          });
      });
    });
    });