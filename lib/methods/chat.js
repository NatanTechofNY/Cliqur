Meteor.methods({
	sendMessage: function(data) {

		var body = data.body.replace(/&/g, '&amp;').replace(/</g, '&#60;').replace(/>/g, '&#62;').replace(/\n\s*\n/g, '\n\n').replace(/\n/g, '<br>');
		
		if (typeof body !== "string" && body.length < 1)
			throw new Meteor.Error('Message must be more than one character long.');
		else if(!Sessions.findOne({"_id": data.sessionId}))
			throw new Meteor.Error('Session does not exist');



		return Messages.insert({
			createdAt: new Date(),
			parentSesssionId: data.sessionId,
			body: body,
			userId: data.userId
		})
	}
});