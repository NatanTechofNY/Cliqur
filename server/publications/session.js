if (Meteor.isServer) {
	

	Meteor.publish('sessionData', function (sessionId) {
		return Sessions.find({"sessionId": sessionId}, {fields: {pin: 0}});
	});

};