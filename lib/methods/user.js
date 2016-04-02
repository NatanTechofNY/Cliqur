Meteor.methods({
	addUser: function(data) {
		
		if (typeof data.fullName !== "string" && data.fullName.trim().length) {
			throw new Meteor.Error('Please provide valid full name.')
		} else if(typeof data.userId !== "string" && data.userId.trim().length) {
			throw new Meteor.Error('Please provide valid ID')
		}

		Users.insert({
			createdAt: new Date(),
			fullName: data.fullName,
			userId: data.userId
		})
	}
});