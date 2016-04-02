if (Meteor.isClient) {
	Template.indexItem.rendered = function () {

	};


	Template.indexItem.events({
		'click #joinSessionBtn': function () {
			var classCode = $('#codeInput').val();
			var regCheck = /^[a-z0-9]+$/i;
			if(typeof classCode !== 'string' && classCode.length !== 6)
				Meteor.Error('Session ID must be 6 characters.');
			else if (!classCode.math(regCheck))
				Meteor.Error('Invalid session ID.');
			else
			Session.set('toJoinSession', classCode);

		},
		'click #createSessionBtn': function() {
			Session.set('toCreateSession', true);	
		},
		'submit #toJoinForm': function(e) {
			e.preventEdfault();
			var classCode = Session.get('toJoinSession');
			var fname = $('#firstNameInput').val();
			var lname = $('#lastNameInput').val();
			var stdntId = $('#studentId').val();
			var regCheckName = /^\d+$/;
			if(regCheckName.test(fname) || regCheckName.test(lname) || fname.length < 2 || lname.length < 2)
				Meteor.Error('Please enter a valid name.');
			else if (studentId.length < 2)
				Meteor.Error('Please enter a valid student ID');
		},
		'submit #createSessionForm': function(e) {
			e.preventdefault();
			var fname = $('#firstNameInput2').val();
			var lname = $('#lastNameInput2').val();
			var className = $('#classNameInput2').val();
			var pin = $('#inputPassword').val();
			var regCheck = /^\d+$/;
			if(regCheck.test(fname) || regCheck.test(lname) || fname.length < 2 || lname.length < 2)
				Meteor.Error('Please enter a valid name.');
			else if (className.length < 2)
				Meteor.Error('Class name must be longer then two characters');
			else if(!regCheck.test(pin))
				Meter.Error('Pin must only be numbers.')
		}
	});

	Template.indexItem.helpers({
		toJoinSession: function() {
			return Session.get('toJoinSession');
		},
		toCreateSession: function() {
			return Session.get('toCreateSession');
		}
	});
};