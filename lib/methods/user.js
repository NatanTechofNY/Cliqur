Meteor.methods({
	addUser: function(data) {
		



<<<<<<< HEAD
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

=======
>>>>>>> 8cdafceae658488971a7119c0774a8f473e57b4e
	}
});