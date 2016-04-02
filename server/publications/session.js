if (Meteor.isServer) {
	

	Meteor.publish('sessionData', function (data) {
		var sCheck = Sessions.findOne({"sessionId": data.sessionId}, {fields: {pin: 0}});
		if (sCheck) {

			if(sCheck.userList.some(function(sr){
				return sr.userId === data.userId;
			})) {
				return Sessions.find({"sessionId": data.sessionId}, {fields: {pin: 0}});
			}
			else{
				this.ready()
			};
		}
		else
			this.ready();
	});

};