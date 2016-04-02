if (Meteor.isClient) {

	Template.crowd_session.events({
		'keyup input[name="pinpw"]': function(e) {
			var $this = $(e.currentTarget);
			if($this.val().length >= 1) {
		      var input_flds = $this.closest('form').find(':input[name="pinpw"]');
		      input_flds.eq(input_flds.index(e.currentTarget) + 1).focus();
		    }
		},
       	'click #endssn': function() {
       		Session.setPersistent('userSessItem', {});
       		window.location.href = "/";
       	}
	});
}

