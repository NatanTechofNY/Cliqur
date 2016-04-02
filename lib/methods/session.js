Meteor.methods({
	createSession: function(data) {
		
	

		if(Session.find().count() !== 2176782336) {
			if(typeof data.sessionName !== "string" && data.sessionName.trim().length < 4)
				throw new Meteor.Error('Session name must be longer than 4 characters.');
			else if(typeof data.pin !== "string" && data.pin.length != 4 && /^\d+$/.test(data.pin))
				throw new Meteor.Error('Pin must be four digits.');
			else if(!Users.findOne({"_id": data.sessionOwnerId}))
				throw new Meteor.Error('Session owner does not exist');
			

			var sessionId;
			while(!Sessions.findOne({"sessionId": sessionId})){
				sessionId = Random.hexString(6).toUpperCase();
				if(!Sessions.findOne({"_id": sessionId})){
					break;
				}
			}
			Sessions.insert({
				createdAt: new Date(),
				sessionId: sessionId,
				sessionName: 
			})

		}
		else throw new Meteor.Error('Out of sessions for the day. Please try again later.');
	}
});