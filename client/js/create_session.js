if (Meteor.isClient) {
	s2ab = function(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	};


    Template.create_session.events({
       	'click #menu-toggle': function(e) {
       		e.preventDefault();
       		$('#wrapper').toggleClass("toggled");
       	},
       	'click #endssn': function() {
       		Session.setPersistent('userSessItem', {});
       		window.location.href = "/";
       	},
       	'click #createAtten': function() {
       		if (Sessions.findOne({"sessionId": Router.current().params.sessionId}) && Sessions.findOne({"sessionId": Router.current().params.sessionId}).userList) {
       			var skipr = false;
       			var list = Sessions.findOne({"sessionId": Router.current().params.sessionId}).userList.map(function(g) {
       				if (skipr) return;
	    			if(Users.findOne({"_id": g.userId})){
	    				return Users.findOne({"_id": g.userId})
	    			}
	    			else{
	    				alert('Not all users have completely loaded');
	    				skipr = true;
	    			};
	    		});
	    		if (skipr) return;

	       		Meteor.call('createSpreadsheet', {listed: list}, function (e, res) {
	       			if (e)
	       				return alert(e.error);
	       			else if(res){
	       				saveAs(new Blob([s2ab(res)], {type: ""}), "attendance.xlsx");
	       			}
	       		});
       		};
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
      //clickerResponse: function() {
        //var userId = Router.current().params.sessionId;
        //return Sessions.findOne({"clickerData": clickerResponse})
      //}
    });
}
