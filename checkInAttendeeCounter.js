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

Conference.checkedInAttendeeCounter = function () {
    var checkedInAttendees = 0;
    
    self = {
        increment: function() {
            checkedInAttendees +=1;
        },
        getCount: function() {
            return checkedInAttendees;
        },
        countIfCheckedIn: function(attendee) {
            if(attendee.isCheckedIn()){
                self.increment();
            }
        }
    }
    console.log(self)
    return self;
};

Conference.checkInService = function (checkInRecorder) {
    //주입한 checkInRecorder의 참조값을 보관한다.
    console.log(this);
    var recorder = checkInRecorder;
    return {
        checkIn: attendee => {
            attendee.checkIn();
            recorder.recordCheckIn(attendee);
        }
    };
};

Conference.checkInRecorder = function () {
    'use strict';

    return {
        recordCheckIn: function (attendee) {
            // 외부 서비스를 통해 체크인 등록한다
        }
    };
};

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

var checkInService = Conference.checkInService(Conference.checkInRecorder());
var attendees = Conference.attendeeCollection();
var counter = Conference.checkedInAttendeeCounter();

attendees.add(Conference.attendee('dnsw;','rla'));
attendees.add(Conference.attendee('dnsw;2','rla2'));

attendees.iterate(checkInService.checkIn);

attendees.iterate(counter.countIfCheckedIn);

console.log(counter.getCount());


module.exports = Conference;
