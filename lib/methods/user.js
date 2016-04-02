Meteor.methods({
	addUser: function(data) {

		if (typeof data.fullName !== "string" || !data.fullName.trim().length) {
			throw new Meteor.Error('Please provide valid full name.')
		} else if(typeof data.studentId !== "string" || !data.studentId.trim().length) {
			throw new Meteor.Error('Please provide valid ID')
		}


		var userId = Users.insert({
			createdAt: new Date(),
			fullName: data.fullName,
			studentId: data.studentId
		});


		if (Session.findOne({"sessionId": data.sessionToAddToId})) {
			var list = Session.findOne({"sessionId": data.sessionToAddToId}).userList;
			var containsIndex = -1;
			if (list.some(function(g, idx) {
				if (g.studentId === data.studentId) {
					containsIndex = idx;
					return true;
				};
			})) {
				list.slice(containsIndex, 1);
			};

			list.push({
				userId: userId,
				studentId: data.studentId
			});

			Session.update({"sessionId": data.sessionToAddToId}, {$set: {"userList": list}});


		};
	}
});