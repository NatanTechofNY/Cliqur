if (Meteor.isClient) {

	Template.crowd_session.events({
       	'click #endssn': function() {
       		Session.setPersistent('userSessItem', {});
       		window.location.href = "/";
       	}
	});
}

