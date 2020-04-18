TravelService = (function (rawWebService) {
    var conferenceAirport = 'BOS';
    var maxArrival = new Date();
    var minDeparutre = new Date();

    return {
        getSuggestedTicket: function (homeAirport) {
            var ticket;
            if (cache[homeAirport]) {
                return cache[homeAirport];
            }

            ticket = rawWebService.getCheapestRoundTrip(
                homeAirport,
                conferenceAirport,
                maxArrival,
                minDeparutre
            );

            cache[homeAirport] = ticket;

            return ticket;
        }
    };
})();

TravelService.getSuggestedTicket(attendee.homeAirPort);
