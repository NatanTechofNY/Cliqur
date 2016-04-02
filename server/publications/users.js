if (Meteor.isClient) {
	Meteor.publish('userDoc', function (userId) {
		return Users.find({"_id": userId});
	});
};