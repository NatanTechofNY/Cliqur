if (Meteor.isClient) {
	Template.indexItem.rendered = function () {

	};


	Template.indexItem.events({
		'click #joinSessionBtn': function () {
			var classCode = $('#codeInput').val();
			var regCheck = /^[a-z0-9]+$/i;
			if(typeof classCode !== 'string' && classCode.length !== 6)
				return $('#errorMSG-ONE')[0].innerHTML = "Session ID must be 6 characters long.", $("#errorMSG-ONE").show(), $('#errorMSG-ONE').fadeOut(2400);
			else if (!regCheck.test(classCode))
				return $('#errorMSG-ONE')[0].innerHTML = "Invalid session ID.", $("#errorMSG-ONE").show(), $('#errorMSG-ONE').fadeOut(2400);
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
				return $('#errorMSG-joinForm')[0].innerHTML = "Please enter a valid name.", $("#errorMSG-joinForm").show(), $('#errorMSG-joinForm').fadeOut(2400);
			else if (stdntId.length < 2)
				return $('#errorMSG-joinForm')[0].innerHTML = "Please enter a valid student ID.", $("#errorMSG-joinForm").show(), $('#errorMSG-joinForm').fadeOut(2400);


			function tempEndCall(datter) {
				Meteor.call("addUser", {
					fullName: fname + " " + lname,
					studentId: stdntId,
					sessionToAddToId: classCode,
					pinr: datter
				}, function(err, data) {
					if(err){
						$('input[name="pinpw"]').each(function() {
							$(this).val('');
						});
						$('input[name="pinpw"]').focus();
						return alert(err.error);
					}
					else {
						updateSess(data, 'userId');
						updateSess(classCode, 'sessionId');
						Router.go("/d/" + classCode);
					};
				});
			};

			Meteor.call('sesHasPin', classCode, function (e, rs) {
				if (e) {
					return alert('Error finding session');
				}
				else{
					if(rs) {
						$('#joinSession, .modal-backdrop').hide();
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
				return $('#errorMSG-createSession')[0].innerHTML = "Please enter a valid name.", $("#errorMSG-createSession").show(), $('#errorMSG-createSession').fadeOut(2400);
			else if (className.length < 2)
				return $('#errorMSG-createSession')[0].innerHTML = "Class name must be longer than two characters.", $("#errorMSG-createSession").show(), $('#errorMSG-createSession').fadeOut(2400);
			else if(pin.length) {
				if(!regCheck.test(pin) && pin.length != 4)
				return $('#errorMSG-createSession')[0].innerHTML = "Pin can only be 4 digits.", $("#errorMSG-createSession").show(), $('#errorMSG-createSession').fadeOut(2400);
			}

			Meteor.call("addUser", {
				fullName: fname + " " + lname,
				studentId: "SessionOwner",
			}, function(err, data) {
				if(err)
					return alert(err.error);
				else {
					Meteor.call('createSession', {sessionOwnerId: data, sessionName: className, pin: !pin.length? undefined: pin, studentId: "SessionOwner"}, 
					function(err, d2) {
						if(err)
							return alert(err.error);
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
	Template.indexItem.destroyed = function() {
		$('.modal-backdrop').hide();
		$('#pinDiv').fadeOut(900);
	};
	Template.indexItem.helpers({
		toJoinSession: function() {
			return Session.get('toJoinSession');
		},
		toCreateSession: function() {
			return Session.get('toCreateSession');
		}
	});
};