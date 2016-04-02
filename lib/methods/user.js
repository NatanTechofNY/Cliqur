Meteor.methods({
	addUser: function(data) {
		if(Meteor.isServer){
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


		if (Sessions.findOne({"sessionId": data.sessionToAddToId})) {
			var list = Sessions.findOne({"sessionId": data.sessionToAddToId});
			if (list.hasPin && list.pin !== data.pinr)
				throw new Meteor.Error('Incorrect PIN. Try again.');

			list = list.userList;
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

			Sessions.update({"sessionId": data.sessionToAddToId}, {$set: {"userList": list}});

		};
		return userId;
		}
	}
});