Meteor.methods({
	resetClickerData: function(data) {
		if(typeof data.sessionId !== "string" || !Session.findOne({"_id": data.sessionId}))
			throw new Meteor.Error('Invalid session identifier');

		Session.update({"_id": data.sessionId}, {$set: {clickerData: {updatedAt: new Date(), responses: []}}});

	},
	addResponses: function(data){
		if(typeof data.sessionId !== "string" || !Session.findOne({"_id": data.sessionId}))
			throw new Meteor.Error('Invalid session identifier');
		else if(typeof data.respIndx !== "number" || data.respIndx < 0 || data.respIndx > 3)
			throw new Meteor.Error('Invalid response index');

		var usr = Users.findOne({"_id": data.userId});
		if (!usr)
			throw new Meteor.Error('Invalid user identifier');

		var sess = Session.findOne({"_id": data.sessionId});

		var resps = sess.clickerData.responses;

		resps.forEach(function(g, i) {
			if (g.userId === data.userId)
				resps.splice(i, 1);
		});

		resps.push({
			responseIndex: data.respIndx,
			userName: usr.fullName,
			userId: data.userId
		});

		Session.update({"_id": data.sessionId}, {$set: {clickerData: {updatedAt: new Date(), responses: resps}}});
	},
	
});