Meteor.methods({
	sendQuestion: function(data) {

		var body = data.body.replace(/&/g, '&amp;').replace(/</g, '&#60;').replace(/>/g, '&#62;').replace(/\n\s*\n/g, '\n\n').replace(/\n/g, '<br>');

		if (typeof body !== "string" || body.length < 1)
			throw new Meteor.Error('Question must be more than one character long.');
		else if(!Sessions.findOne({"sessionId": data.sessionId}))
			throw new Meteor.Error('Session does not exist');



		return Questions.insert({
			createdAt: new Date(),
			parentSessionId: data.sessionId,
			body: body,
			authorId: data.userId,
			isPublic: false
		})
	},
	toggleQuestion: function(data) {
		
		if (typeof data.target !== "boolean")
			throw new Meteor.Error('Target must be boolean.');
		else if(!Questions.findOne({"_id": data.questionId}))
			throw new Meteor.Error('Question does not exist');
		else if(!Sessions.findOne({"sessionId": data.sessionId}) || Sessions.findOne({"sessionId": data.sessionId}).sessionOwnerId !== data.userId)
			throw new Meteor.Error('Not sufficient privileges');

		Questions.update({"parentSessionId": data.sessionId, "_id": {$ne: data.questionId}}, {$set: {isPublic: false}});
		Questions.update({"_id": data.questionId}, {$set: {isPublic: data.target}});
	},
	removeQuestion: function(data) {
		
		if(!Questions.findOne({"_id": data.questionId}))
			throw new Meteor.Error('Question does not exist');
		else if(!Sessions.findOne({"sessionId": data.sessionId}) || Sessions.findOne({"sessionId": data.sessionId}).sessionOwnerId !== data.userId)
			throw new Meteor.Error('Not sufficient privileges');


		return Questions.remove({"_id": data.questionId}, {justOne: true});
	}
});
