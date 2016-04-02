Meteor.methods({
	createSession: function(data) {
		
	

		if(Session.find().count() !== 2176782336) {
			if(typeof data.sessionName !== "string" || data.sessionName.trim().length < 4)
				throw new Meteor.Error('Session name must be longer than 4 characters.');
			else if(typeof data.pin === "string" || data.pin.length !== 4 || !/^\d+$/.test(data.pin))
				throw new Meteor.Error('Pin must be four digits.');
			else if(!Users.findOne({"_id": data.sessionOwnerId}))
				throw new Meteor.Error('Session owner does not exist');


			var sessionId;
			while(!Session.findOne({"sessionId": sessionId})){
				sessionId = Random.hexString(6).toUpperCase();
				if(!Session.findOne({"_id": sessionId}))
					break;
			}


			var obj = {
				createdAt: new Date(),
				sessionId: sessionId,
				sessionName: data.sessionName,
				sessionOwnerId: data.sessionOwnerId,
				userList: [{
					studentId: data.studentId,
					userId: data.sessionOwnerId
				}]
			};
			if (typeof data.pin === "string") obj.pin = data.pin;
			Session.insert(obj);

		}
		else throw new Meteor.Error('Out of session for the day. Please try again later.');
	},
	removeUserFromSession: function(data) {
		if(typeof data.userId !== "string" || !data.userId.trim().length)
			throw new Meteor.Error('Invalid student identifier');
		else if(typeof data.sessionId !== "string" || !Session.findOne({"_id": data.sessionId}))
			throw new Meteor.Error('Invalid session identifier');

		var sessionItem =  Session.findOne({"_id": data.sessionId});
		if (sessionItem.sessionOwnerId === data.userId)
			throw new Meteor.Error('Cannot remove session owner from session');
		else{
			var idx = -1;
			sessionItem.userList.forEach(function(g, ix) {
				if (g.userId === data.userId){
					idx = ix;
					return true;
				};
			});

			if (idx !== -1) {
				sessionItem.userList.splice(idx, 1);

				Session.update({"_id": data.sessionId}, {$set: {"userList": sessionItem.userList}});
			};

		};

	}
});