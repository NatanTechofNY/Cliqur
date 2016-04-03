Meteor.methods({
	resetClickerData: function(data) {
		if(typeof data.sessionId !== "string" || !Sessions.findOne({"sessionId": data.sessionId}))
			throw new Meteor.Error('Invalid session identifier');
		else if(Sessions.findOne({"sessionId": data.sessionId}).sessionOwnerId !== data.userId)
			throw new Meteor.Error('Unauthorized access.');

		Sessions.update({"sessionId": data.sessionId}, {$set: {clickerData: {updatedAt: new Date(), responses: []}}});

	},
	addResponses: function(data){
		if(typeof data.sessionId !== "string" || !Sessions.findOne({"sessionId": data.sessionId}))
			throw new Meteor.Error('Invalid session identifier');
		else if(typeof data.respIndx !== "number" || data.respIndx < 0 || data.respIndx > 3)
			throw new Meteor.Error('Invalid response index');

		var usr = Users.findOne({"_id": data.userId});
		if (!usr)
			throw new Meteor.Error('Invalid user identifier');

		var sess = Sessions.findOne({"sessionId": data.sessionId});

		var resps = sess.clickerData.responses;

		if (!resps) {
			resps = [];
		};
		
		resps.forEach(function(g, i) {
			if (g.userId === data.userId)
				resps.splice(i, 1);
		});

		resps.push({
			responseIndex: data.respIndx,
			userName: usr.fullName,
			userId: data.userId
		});

		Sessions.update({"sessionId": data.sessionId}, {$set: {clickerData: {updatedAt: new Date(), responses: resps}}});
	}
	
});