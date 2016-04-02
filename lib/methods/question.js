Meteor.methods({
	sendQuestion: function(data) {

		var body = data.body.replace(/&/g, '&amp;').replace(/</g, '&#60;').replace(/>/g, '&#62;').replace(/\n\s*\n/g, '\n\n').replace(/\n/g, '<br>');
		
		if (typeof body !== "string" || body.length < 1)
			throw new Meteor.Error('Question must be more than one character long.');
		else if(!Session.findOne({"_id": data.sessionId}))
			throw new Meteor.Error('Session does not exist');



		return Questions.insert({
			createdAt: new Date(),
			parentSesssionId: data.sessionId,
			body: body,
			authorId: data.userId,
			isPublic: false
		})
	},
	togglePublicQuestion: function(data) {
		
		if (typeof target !== "boolean")
			throw new Meteor.Error('Question must be more than one character long.');
		else if(!Questions.findOne({"_id": data.questionId}))
			throw new Meteor.Error('Question does not exist');



		return Questions.update({"_id": data.questionId}, {$set: {isPublic: target}});
	}
});