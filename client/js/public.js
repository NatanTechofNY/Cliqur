if(Meteor.isClient) {
	Template.publicview.helpers({
		className: function() {
			return Sessions.findOne().sessionName;
		},
		lecturerName: function() {
			var sessionOwnerId = Sessions.findOne().sessionOwnerId;
			return Users.findOne({"_id": sessionOwnerId}).fullName;
		}, 
		pushedQuestion: function() {
			var parentSessionId = Sessions.findOne().sessionId;
			return Question.findOne({"parentSessionId": parentSessionId});
		},
		questionAuthor: function() {
			var authorId = Question.findOne({"parentSessionId": parentSessionId}).authorId;
			return Users.findOne({"_id": authorId}).fullName;
		}
	})
}