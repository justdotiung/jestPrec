var Conference = require('../checkInAttendeeCounter');

describe('Conference.checkedInAttendeeCounter', () => {
    var counter;

    beforeEach(function () {
        counter = Conference.checkedInAttendeeCounter();
    });
    
    describe('increment()', () =>{});
    describe('getCount()', () => {});
    describe('countIfCheckedIn(attendee)', ()=>{
        var attendee;
        beforeEach(()=> {
            attendee = Conference.attendee('태영','김');
        });
        it('참가자 체크인 하지 않으며 인원수를 세지 않는다', ()=>{
            counter.countIfCheckedIn(attendee);
            expect(counter.getCount()).toBe(0);
        });
        it('참가자가 체크인하면 인원수를 센다', ()=> {
            attendee.checkIn();
            counter.countIfCheckedIn(attendee);
            expect(counter.getCount()).toBe(1);
        });
        it('this가 꼭 checkedInAttendeeCounter 인스턴스를 가리키는 것은 아니다', () => {
            attendee.checkIn();
            //this에 빈 객체를 넣고
            //counter.countIfCheckedIn을 실행한다.
            counter.countIfCheckedIn.call({}, attendee);
            expect(counter.getCount()).toBe(1);
        })
    })
    
});
