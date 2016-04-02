if (Meteor.isClient) {
	Template.indexItem.rendered = function () {

	};


	Template.indexItem.events({
		'click #joinSessionBtn': function () {
			var classCode = $('#codeInput').val();
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
			
		},
		'submit #createSessionForm': function(e) {
			e.preventdefault();
			var classCode = Session.get('toJoinSession');
			var fname = $('#firstNameInput2').val();
			var lname = $('#lastNameInput2').val();
			var className = $('#classNameInput2').val();
			var pin = $('#inputPassword').val();
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