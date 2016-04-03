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
    		return Sessions.findOne({"sessionId": Router.current().params.sessionId});
    	},
    	usersList: function() {
    		if (Sessions.findOne({"sessionId": Router.current().params.sessionId})) {
    			var subscribtn = Meteor.subscribe('listOfUsers', {list: Sessions.findOne({"sessionId": Router.current().params.sessionId}).userList.map(function(g) {
    				return g.userId;
	    		})});
	    		if (subscribtn.ready()) {
		    		var list = Sessions.findOne({"sessionId": Router.current().params.sessionId}).userList.map(function(g) {
		    			return Users.findOne({"_id": g.userId});
		    		});

		    		return list;
	    		}
	    		else return [{"fullName": "Loading..."}];
    		}
    		else return [{"fullName": "Loading..."}];
    	}
    });
}
