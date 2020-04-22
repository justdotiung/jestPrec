var Conference = Conference || {};
Conference.attendee = function (firstName, lastName) {
    'use strict';

    var attendeeId,
        checkedIn = false,
        first = firstName || 'None',
        last = lastName || 'None',
        checkInNumber;

    return {
        setId: function (id) {
            attendeeId = id;
        },
        getId: function () {
            return attendeeId;
        },

        getFullName: function () {
            return first + ' ' + last;
        },

        isCheckedIn: function () {
            return checkedIn;
        },

        checkIn: function () {
            checkedIn = true;
        },

        undoCheckIn: function () {
            checkedIn = false;
            checkInNumber = undefined;
        },

        setCheckInNumber: function (number) {
            checkInNumber = number;
        },

        getCheckInNumber: function () {
            return checkInNumber;
        }
    };
};

Conference.checkedInAttendeeCounter = function () {
    var checkedInAttendees = 0;

    self = {
        increment: function () {
            checkedInAttendees += 1;
        },
        getCount: function () {
            return checkedInAttendees;
        },
        countIfCheckedIn: function (attendee) {
            if (attendee.isCheckedIn()) {
                self.increment();
            }
        }
    };
    return self;
};

Conference.checkInService = function (checkInRecorder) {
    'use strict';
    //주입한 checkInRecorder의 참조값을 보관한다.
    var recorder = checkInRecorder;
    return {
        checkIn: function (attendee) {
            return new Promise(function checkInPromise(resolve, reject) {
                attendee.checkIn();
                recorder.recordCheckIn(attendee).then(
                    function onRecordCheckInSucceeded(checkInNumber) {
                        attendee.setCheckInNumber(checkInNumber);
                        resolve(checkInNumber);
                    },
                    function onRecordCheckInFailed(reason) {
                        attendee.undoCheckIn();
                        reject(reason);
                    }
                );
            });
        }
    };
};

Conference.checkInRecorder = function () {
    'use strict';

    var messages = {
        mustBeCheckedIn: '참가자는 체크인된 것으로 표시되어야 한다.'
    };

    return {
        getMessages: function () {
            return messages;
        },

        recordCheckIn: function (attendee) {
            return new Promise(function (resolve, reject) {
                if (attendee.isCheckedIn()) {
                    resolve(1234); // 일단, 아무 숫자나 넣는다.
                } else {
                    reject(new Error(messages.mustBeCheckedIn));
                }
            });
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

module.exports = Conference;
