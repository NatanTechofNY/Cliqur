if (Meteor.isClient) {
	Template.indexItem.rendered = function () {

	};


	Template.indexItem.events({
		'click #joinSessionBtn': function () {
			var classCode = $('#condeInput').val();
			var regCheck = /^[a-z0-9]+$/i;
			if(typeof classCode !== 'string' || classCode.length !== 6)
				alert('Session ID must be 6 characters.');
			else if (!regCheck.test(classCode))
				alert('Invalid session ID.');
			else
				Session.set('toJoinSession', classCode);

		},
		'click #createSessionBtn': function() {	
			
			Session.set('toCreateSession', true);	
				
		},
		'keyup input.inputPasswordTs': function(e) {
			var $this = $(e.currentTarget);
			if($this.val().length >= 1) {
		      var input_flds = $this.closest('form').find(':input.inputPasswordTs');
		      input_flds.eq(input_flds.index(e.currentTarget) + 1).select();
		    }
		},
		'submit #toJoinForm': function(e) {
			e.preventDefault();
			var classCode = Session.get('toJoinSession');
			var fname = $('#firstNameInput').val();
			var lname = $('#lastNameInput').val();
			var stdntId = $('#studentId').val();
			var regCheckName = /^\d+$/;
			if(regCheckName.test(fname) || regCheckName.test(lname) || fname.length < 2 || lname.length < 2)
				alert('Please enter a valid name.');
			else if (stdntId.length < 2)
				alert('Please enter a valid student ID');


			function tempEndCall(datter) {
				Meteor.call("addUser", {
					fullName: fname + " " + lname,
					studentId: stdntId,
					sessionToAddToId: classCode,
					pinr: datter
				}, function(err, data) {
					if(err)
						alert(err.error);
					else {
						updateSess(data, 'userId');
						updateSess(classCode, 'sessionId');
						Router.go("/d/" + classCode);
					};
				});
			};

			Meteor.call('sesHasPin', classCode, function (e, rs) {
				if (e) {
					alert('Error finding session');
				}
				else{
					if(rs) {
						$('body').before('<div id="pinDiv"><center><form id="pinForm"><h3 id="pinTitle">Session is pin protected. Enter four-digit pin # to continue</h3><input type="password" name="pinpw"  maxlength="1" /><input type="password" name="pinpw"  maxlength="1" /><input type="password" name="pinpw" maxlength="1" /><input type="password" name="pinpw"  maxlength="1" /><br><br><button class="btn btn-default">Submit</button></form></center></div>');
						$('input[name="pinpw"]').keyup(function() {
							if($(this).val().length >= 1) {
						      var input_flds = $(this).closest('form').find(':input[name="pinpw"]');
						      input_flds.eq(input_flds.index(this) + 1).select();
						    }
						});
						$('#pinForm').on('submit', function(e) {
							e.preventDefault();
							var pinstr = "";
							$('input[name="pinpw"]').each(function() {
								pinstr += $(this).val();
							});
							tempEndCall(pinstr);
						});
					}
					else tempEndCall(undefined);
				};
			});

			
		},
		'submit #createSessionForm': function(e) {
			e.preventDefault();
			var fname = $('#firstNameInput2').val();
			var lname = $('#lastNameInput2').val();
			var className = $('#classNameInput2').val();
			var pin = "";
			$('.inputPasswordTs').each(function() {
				pin += $(this).val();
			});


			var regCheck = /^\d+$/;
			if(regCheck.test(fname) || regCheck.test(lname) || fname.length < 2 || lname.length < 2)
				alert('Please enter a valid name.');
			else if (className.length < 2)
				alert('Class name must be longer then two characters');
			else if(pin.length) {
				if(!regCheck.test(pin) && pin.length != 4)
					Meter.Error('Pin can only be 4 digits.');
			}

			Meteor.call("addUser", {
				fullName: fname + " " + lname,
				studentId: "SessionOwner",
			}, function(err, data) {
				if(err)
					alert(err.error);
				else {
					Meteor.call('createSession', {sessionOwnerId: data, sessionName: className, pin: !pin.length? undefined: pin, studentId: "SessionOwner"}, 
					function(err, d2) {
						if(err)
							alert(err.error);
						else{
							updateSess(data, 'userId');
							updateSess(d2, 'sessionId');
							Router.go("/d/" + d2);
						};
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