if (Meteor.isServer) {
	Meteor.publish('userDoc', function (userId) {
		return Users.find({"_id": userId});
	});
	Meteor.publish('listOfUsers', function (userIds) {
		return Users.find({"_id": $in: userIds});
	});

	

	
};