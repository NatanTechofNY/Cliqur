Meteor.methods({
	createSession: function(data) {
		
		if(Meteor.isServer){

			if(Sessions.find().count() !== 2176782336) {
				if(typeof data.sessionName !== "string" || data.sessionName.trim().length < 4)
					throw new Meteor.Error('Session name must be longer than 4 characters.');
				else if(typeof data.pin === "string" && (data.pin.length !== 4 || !/^\d+$/.test(data.pin)))
					throw new Meteor.Error('Pin must be four digits.');
				else if(!Users.findOne({"_id": data.sessionOwnerId}))
					throw new Meteor.Error('Session owner does not exist');


				var sessionId;
				while(!Sessions.findOne({"sessionId": sessionId})){
					sessionId = Random.hexString(6);
					if(!Sessions.findOne({"_id": sessionId}))
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
					}],
					clickerData: {
						updatedAt: new Date(),
						responses: []
					}
				};
				if (typeof data.pin === "string") {obj.pin = data.pin; obj.hasPin = true;};
				Sessions.insert(obj);


				return sessionId;

			}
			else throw new Meteor.Error('Out of session for the day. Please try again later.');
		}
	},
	removeUserFromSession: function(data) {
		if(typeof data.userId !== "string" || !data.userId.trim().length)
			throw new Meteor.Error('Invalid student identifier');
		else if(typeof data.sessionId !== "string" || !Sessions.findOne({"_id": data.sessionId}))
			throw new Meteor.Error('Invalid session identifier');

		var sessionItem =  Sessions.findOne({"_id": data.sessionId});
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
				Sessions.update({"_id": data.sessionId}, {$set: {"userList": sessionItem.userList}});
			};

		};

	}
});