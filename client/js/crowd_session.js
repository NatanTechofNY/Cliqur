if (Meteor.isClient) {

	Template.crowd_session.events({
       	'click #endssn': function() {
       		Session.setPersistent('userSessItem', {});
       		window.location.href = "/";
       	},
       	'click .mc': function(e) {
       		document.getElementById('status').innerHTML='Sending your response';
          var $THIS = $(e.currentTarget);
          $THIS.children('span').css('opacity', '1');
          $THIS.blur();
       		

          var selectedResponse = parseInt(e.currentTarget.getAttribute('data-idx'));

          Meteor.call('addResponses', {sessionId: Router.current().params.sessionId, userId: Session.get('userSessItem').userId, respIndx: selectedResponse}, function (e, res) {
            if (e)
              alert(e.error);
            else{
              document.getElementById('status').innerHTML='Response sent.';
              setTimeout(function() {
                    $THIS.children('span').css('opacity', '0');
                    document.getElementById('status').innerHTML='';
              }, 1800);
            };
          });

    		},
        'click #sendQuestionBtn': function() {
          var questionBody = document.querySelector('textarea[name="questionInput"]').value.replace(/&/g, '&amp;').replace(/</g, '&#60;').replace(/>/g, '&#62;').replace(/\n\s*\n/g, '\n\n').replace(/\n/g, '<br>');
          if (questionBody.length) {
            var parentSessionId = Session.get('userSessItem').sessionId;
            var authId = Session.get('userSessItem').userId;
            var obj = {
              "sessionId": parentSessionId,
              "userId": authId,
              "body": questionBody
            };
            Meteor.call('sendQuestion', obj, function(e) {
              document.querySelector('textarea[name="questionInput"]').disabled = false;
              if (e) {
                alert(e.error);
              }
              else {
                document.querySelector('textarea[name="questionInput"]').value = "";
                alert("Question sent.");
              }
            });
          }
          else $('textarea[name="questionInput"]').select();
        },
        'click #clearQuestionBtn': function() {
          $('textarea[name="questionInput"]').val('').focus();
        }
  });

  Template.crowd_session.helpers({
    userName: function () {
      var sr = Users.findOne({"_id": Session.get('userSessItem').userId});
      return sr && sr.fullName;
    },
    latestQuestion: function() {
      return Questions.findOne({isPublic: true});
    },
    authorName: function() {
      if (Questions.findOne({isPublic: true})) {
        var sr = Users.findOne({"_id": Questions.findOne({isPublic: true}).authorId});
        return sr && sr.fullName;
      }
      else return "No public questions to display";
    }
  });
};
