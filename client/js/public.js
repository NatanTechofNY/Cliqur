if(Meteor.isClient) {
	Template.publicview.helpers({
		className: function() {
			return Sessions.findOne({"sessionId": Router.current().params.sessionId}).sessionName;
		},
		lecturerName: function() {
			var sessionOwnerId = Sessions.findOne({"sessionId": Router.current().params.sessionId});
			if (sessionOwnerId) sessionOwnerId = sessionOwnerId.sessionOwnerId;
			var subn = Meteor.subscribe('userDoc', sessionOwnerId);
			if(subn.ready()) {
				return Users.findOne({"_id": sessionOwnerId}).fullName;
			};
		}, 
		pushedQuestion: function() {
			return Questions.findOne({"parentSessionId": Router.current().params.sessionId});
		},
		questionAuthor: function() {
			var authorId = Questions.findOne({"parentSessionId": Router.current().params.sessionId}).authorId;
			var subn = Meteor.subscribe('userDoc', authorId);
			if(subn.ready()) {
				return Users.findOne({"_id": authorId}).fullName;
			};
		},
		voteDistribution: function() {
			if (Sessions.findOne({"sessionId": Router.current().params.sessionId})) {
				var sess = Sessions.findOne({"sessionId": Router.current().params.sessionId});
				if (sess.clickerData) {
					var $D = sess.clickerData;
					if ($D && $D.responses && $D.responses.length) {
						var $R = $D.responses;
						var totalResp = $R.length;
						var rsA,rsB,rsC,rsD;
						rsA = rsB = rsC = rsD = 0;
						$R.forEach(function (g) {
							if (g.responseIndex === 0)
								rsA++;
							else if(g.responseIndex === 1)
								rsB++;
							else if(g.responseIndex === 2)
								rsC++;
							else if(g.responseIndex === 3)
								rsD++;
						});
						setTimeout(function() {
							$('[data-factor]').each(function() {
								$(this).css('width', Math.abs(parseFloat($(this).attr('data-factor'))*100 - 58).toFixed(1)  + '%');
							});
						}, 500);
				///--------------------*****-----------------------//
						return {
							responseCount: {
								total: totalResp,
								a: rsA,
								b: rsB,
								c: rsC,
								d: rsD,
							},
							wholes: {
								a: rsA/totalResp,
								b: rsB/totalResp,
								c: rsC/totalResp,
								d: rsD/totalResp
							}
						};
				///--------------------*****-----------------------//

					};
				};
			};
		}
	});

}