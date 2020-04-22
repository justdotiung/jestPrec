var Conference = Conference || {};
Conference.attendee = function (firstName, lastName) {
    var checkedIn = false,
        first = firstName || 'None',
        last = lastName || 'None';
    return {
        getFullName: function () {
            return `${(first, last)}`;
        },
        isCheckedIn: function () {
            return checkedIn;
        },
        checkIn: function () {
            checkedIn = true;
        }
    };
};

// 컬렉션(집단)을 처리하는 방식이 바뀔지 모르니
//attendee 객체 컬렉션을 캡슐화한 attendeeCollection 객체를 두는 것이 타당해 보인다.

var Conference = Conference || {};
Conference.attendeeCollection = function () {
    var attendees = [];

    return {
        contains: function (attendee) {
            return attendees.includes(attendee);
        },
        add: function (attendee) {
            attendees.push(attendee);
        },
        remove: function (attendee) {
            attendees.filter(v => v !== attendee);
        },
        getCount: function () {
            return attendees.length;
        },
        iterate: function (callback) {
            // attendees 의 각 attendee에 대해 콜백을 실행한다.
            attendees.forEach(callback);
        }
    };
};

Conference.checkInService = function (checkInRecorder) {
    //주입한 checkInRecorder의 참조값을 보관한다.
    console.log(this)
    var recorder = checkInRecorder;
    return {
        checkIn:(attendee) => {
            attendee.checkIn();
            recorder.recordCheckIn(attendee);
        }
    }
}
Conference.checkInRecorder = function() {
    "use strict";
  
    return {
        recordCheckIn: function(attendee) {
        // 외부 서비스를 통해 체크인 등록한다
      }
    };

  };
 
var checkInService = Conference.checkInService(Conference.checkInRecorder());
var addtendees = Conference.attendeeCollection();

//익명함수는 디버깅 하기 힘들기때문에 콜백함수에 이름을 주어 디버깅하기 편하게 만들어줄 수 있다
addtendees.iterate(checkInService.checkIn);

console.log(Conference);


module.exports = Conference;
