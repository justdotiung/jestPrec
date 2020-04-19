var Conference = require('../callbackPattern');

describe('Conference.attendeeCollection', () => {
    describe('contains(attendee)', () => {});
    describe('add(attendee)', () => {});
    describe('remove(attendee)', () => {});
    describe('iterate(callback)', () => {
        var collection, callbackSpy;

        //도우미 함수
        function addAttendeesToCollection(attendeeArray) {
            attendeeArray.forEach(attendee => collection.add(attendee));
        }

        function verifyCallbackWasExecutedForEachAttendee(attendeeArray) {
            //각 원소마다 한번씩 스파이가 호출되어잇는지 확인한다.
            expect(callbackSpy.mock.calls.length).toBe(attendeeArray.length);
            //각 호출마다 spy에 전달한 첫 번째 인자가 해당 attendee인지 확인한다
            var allCalls = callbackSpy.mock.calls;
            for (var i = 0; i < allCalls.length; i++) {
                expect(allCalls[i][0]).toBe(attendeeArray[i]);
            }
        }
        beforeEach(() => {
            collection = Conference.attendeeCollection();
            callbackSpy = jest.fn(); //fn()은 mock 객체
        });

        it('빈 컬렉션에서는 콜백을 실행하지 않는다', () => {
            collection.iterate(callbackSpy);
            expect(callbackSpy).not.toHaveBeenCalled();
        });
        it('원소가 하나뿐인 컬레견은 콜백을 한 번만 실행한다', () => {
            var attendees = [Conference.attendee('윤지', '김')];
            addAttendeesToCollection(attendees);

            collection.iterate(callbackSpy);

            verifyCallbackWasExecutedForEachAttendee(attendees);
        });
        it('컬렉션 원소마다 한 번씩 콜백을 실행한다', () => {
            var attendees = [
                Conference.attendee('Tom', 'Kazansky'),
                Conference.attendee('Tom2', 'Kazansky2'),
                Conference.attendee('Tom3', 'Kazansky3')
            ];

            addAttendeesToCollection(attendees);

            collection.iterate(callbackSpy);

            verifyCallbackWasExecutedForEachAttendee(attendees);
        });
    });
});

describe('Conference.checkInService', () => {
    var checkInService, checkInRecorder, attendee;

    beforeEach(() => {
        checkInRecorder = Conference.checkInRecorder();
        jest.spyOn(checkInRecorder, 'recordCheckIn');

        //checkInRecorder를 주입하면서
        //이 함수의 recordCheckIn함수에 스파이를 심는다
        checkInService = Conference.checkInService(checkInRecorder);

        attendee = Conference.attendee('형철', '서');
    });

    describe('checkInService.checkIn(attendee', () => {
        it('참가자를 체크인 처리한 것으로 표시한다', () => {
            checkInService.checkIn(attendee);
            expect(attendee.isCheckedIn()).toBe(true);
        });
        it('체크인을 등록한다', () => {
            checkInService.checkIn(attendee);
            expect(checkInRecorder.recordCheckIn).toHaveBeenCalledWith(attendee);
        });
    });
});
