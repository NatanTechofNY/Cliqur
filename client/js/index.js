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
			e.preventDefault();
			var classCode = Session.get('toJoinSession');
			var fname = $('#firstNameInput').val();
			var lname = $('#lastNameInput').val();
			var stdntId = $('#studentId').val();
			var regCheckName = /^\d+$/;
			if(regCheckName.test(fname) || regCheckName.test(lname) || fname.length < 2 || lname.length < 2)
				Meteor.Error('Please enter a valid name.');
			else if (studentId.length < 2)
				Meteor.Error('Please enter a valid student ID');


			Meteor.call("addUser", {
				fullName: fname + " " + lname,
				studentId: stdntId,
				sessionToAddToId: classCode
			}, function(err, data) {
				if(err)
					alert(err.error);
				else
					Router.go("/d" + classCode)
			});
		},
		'submit #createSessionForm': function(e) {
			e.preventDefault();
			var fname = $('#firstNameInput2').val();
			var lname = $('#lastNameInput2').val();
			var className = $('#classNameInput2').val();
			var pin = $('#inputPassword').val();
			var regCheck = /^\d+$/;
			if(regCheck.test(fname) || regCheck.test(lname) || fname.length < 2 || lname.length < 2)
				Meteor.Error('Please enter a valid name.');
			else if (className.length < 2)
				Meteor.Error('Class name must be longer then two characters');
			else if(pin.length) {
				if(!regCheck.test(pin) && pin.length != 4)
					Meter.Error('Pin can only be 4 numbers.');
			}

			Meteor.call("addUser", {
				fullName: fname + " " + lname,
				studentId: stdntId,
			}, function(err, data) {
				if(err)
					alert(err.error);
				else {
					Meteor.call('createSession', {sessionOwnerId: data, sessionName: className, pin: pin, studentId: stdntId}, 
					function(err, data) {
				if(err)
					alert(err.error);
				else
					Router.go("/d" + classCode)
					});
				}
			});

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