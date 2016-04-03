if (Meteor.isClient) {
    Template.create_session.events({
       	'click #menu-toggle': function(e) {
       		e.preventDefault();
       		$('#wrapper').toggleClass("toggled");
       	},
       	'click #endssn': function() {
       		Session.setPersistent('userSessItem', {});
       		window.location.href = "/";
       	}
    });
    Template.create_session.helpers({
    	sessionId: function () {
    		return Router.current().params.sessionId;
    	},
    	SessionItem: function() {
    		return Sessions.findOne({"sessionId": Router.current().params});
    	},
    	usersList: function() {
    		var subscribtn = Meteor.subscribe('usersListData', {list: Sessions.findOne({"sessionId": Router.current().params}).userList});
    		var list = [];

    		return list;
    	}
    });
}
