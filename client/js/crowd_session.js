if (Meteor.isClient) {

	Template.crowd_session.events({
       	'click #endssn': function() {
       		Session.setPersistent('userSessItem', {});
       		window.location.href = "/";
       	},
       	'click #mc': function() {
       		document.getElementById('status').innerHTML='Your response has been sent'
       		setTimeout(function() {
       			document.getElementById('status').innerHTML=''
			}, 2000);
		}
  });

  Template.crowd_session.helpers({
    userName: function () {
      var sr = Users.findOne({"_id": Session.get('userSessItem').userId});
      return sr && sr.fullName;
    }
  });
};
