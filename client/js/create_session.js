if (Meteor.isClient) {


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
	       		// 		var byteCharacters = atob(res);
	       		// 		var byteNumbers = new Array(byteCharacters.length);
    						// for (var i = 0; i < byteCharacters.length; i++) {
    						// 	byteNumbers[i] = byteCharacters.charCodeAt(i);
    						// };
    						// var byteArray = new Uint8Array(byteNumbers);

    						// var blob = new Blob([byteArray], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}); `

                var blob = new Blob([res], {type: ""});//application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
	       				saveAs(blob, "attendance.xlsx");
                // window.open(res, "_blank");
	       			}
	       		});
       		};
       	},
       	'click #changeToThisPublic': function(e) {
			     Meteor.call('toggleQuestion', {target: true, questionId: $('input[name="optionsRadios"]:checked').val(), sessionId: Router.current().params.sessionId, userId: Session.get('userSessItem').userId}, function (err, res) {
       			if (err) {
       				alert(err.error);
       			} else
            alert("Question has been publicly shared.");
       		});
       	},
       	'click #deleteThisQuestion': function() {
       		if (confirm('Are you sure you want to delete this question?')) {
       			Meteor.call('removeQuestion', {questionId: $('input[name="optionsRadios"]:checked').val(), sessionId: Router.current().params.sessionId, userId: Session.get('userSessItem').userId}, function (err, res) {
	       			if (err) {
	       				alert(err.error);
	       			};
	       		});
       		};
       	},
        'click #resetPollBtn': function() {
          if (confirm('Are you sure you want to reset the polls?')) {
            Meteor.call('resetClickerData', {sessionId: Router.current().params.sessionId, userId: Session.get('userSessItem').userId}, function (e, res) {
              if (e)
                alert(e.error);
              else{
                alert('Polls reset!');
              };
            });
          };
        },
        'focus #autoSelectrLoc': function(e) {
          setTimeout(function() {$('#autoSelectrLoc').select();}, 12);
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
    	},
    	questionItem: function() {
    		return Questions.find();
    	},
    	thisAuthorName: function() {
    		if (Questions.findOne()) {
		        var sr = Users.findOne({"_id": this.authorId});
		        return sr && sr.fullName;
		      }
		      else return "Unknown";
    	}
      //clickerResponse: function() {
        //var userId = Router.current().params.sessionId;
        //return Sessions.findOne({"clickerData": clickerResponse})
      //}
    });
}
