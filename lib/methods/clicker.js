Meteor.methods({
	resetClickerData: function(data) {
		if(typeof data.parentSessionId !== "string" || !data.parentSessionId.length)
			throw new Meteor.Error('Session ident.');
		else if(typeof data.pin === "string" || data.pin.length !== 4 || !/^\d+$/.test(data.pin))
			throw new Meteor.Error('Pin must be four digits.');
		else if(!Users.findOne({"_id": data.sessionOwnerId}))
			throw new Meteor.Error('Session owner does not exist');





	}
});