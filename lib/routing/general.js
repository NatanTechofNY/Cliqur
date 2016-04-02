Meteor.startup(function () {
    Router.configure({
        notFoundTemplate: 'notFound',
        loadingTemplate: 'loader'
    });

    Router.map(function() {
        this.route("splashPage", {
            path: "/",
            onBeforeAction: function() {
            	this.next();
            },
            template: 'indexItem',
            onAfterAction: function() {
                if (!Meteor.isClient) {
                    return false;
                };
                SEO.set({
                    "title": "AnswerMe",
                    "meta" : {
                        'description': '',
                        'keywords': ''
                    },
                    "og" : {
                        'title': 'Welcome to AnswerMe',
                        'image': ''
                    }
                });
                document.title = 'AnswerMe';
            },
            data: function(){
                
            },
        }),
        this.route("dashboard", {
            path: "/d/:sessionId",
            waitOn: function() {
                var ses = Sessions.findOne({"sessionId": Router.current().params.sessionId});
                if (ses && ses.sessionOwnerId === Session.get('userSessItem').userId) {
                    return Meteor.subscribe('adminQuestions', Router.current().params.sessionId);
                }
                else if(Session.get('userSessItem').userId){
                    return [Meteor.subscribe('userQuestions', {sessid: Router.current().params.sessionId, authorId: Session.get('userSessItem').userId}), Meteor.subscribe('publicQuestions', Router.current().params.sessionId)];
                }
                else this.ready();
            },
            onBeforeAction: function() {
                this.next();
            },
            template: function() {
                var ses = Sessions.findOne({"sessionId": Router.current().params.sessionId});
                if (ses && ses.sessionOwnerId === Session.get('userSessItem').userId)
                    return 'create_session';
                else
                    return 'crowd_session';
            },
            onAfterAction: function() {
                if (!Meteor.isClient) {
                    return false;
                };
                var ses = Sessions.findOne({"sessionId": this.params.sessionId});
                var prestr = ses? ses.sessionName: "Session";
                SEO.set({
                    "title": prestr + " | AnswerMe",
                    "meta" : {
                        'description': '',
                        'keywords': ''
                    },
                    "og" : {
                        'title': 'Welcome to AnswerMe',
                        'image': ''
                    }
                });
                document.title = prestr + ' | AnswerMe';
            },
            data: function(){
                
            },
        }),
        this.route("publicView", {
            path: "/d/:sessionId/p",
            onBeforeAction: function() {
                this.next();
            },
            template: 'publicview',
            onAfterAction: function() {
                if (!Meteor.isClient) {
                    return false;
                };
                var ses = Sessions.findOne({"sessionId": this.params.sessionId});
                var prestr = ses? ses.sessionName: "Session";
                SEO.set({
                    "title": prestr + " - Public view| AnswerMe",
                    "meta" : {
                        'description': '',
                        'keywords': ''
                    },
                    "og" : {
                        'title': 'Welcome to AnswerMe',
                        'image': ''
                    }
                });
                document.title = prestr + ' - Public view | AnswerMe';
            },
            data: function(){
                
            },
        })
        
    });


    if (Meteor.isClient) {
        return SEO.config({
            "title": "AnswerMe",
            "meta" : {
                'description': '',
                'keywords': ''
            },
            "og" : {
                'title': 'AnswerMe',
                'image': ''
            }
        });
    };
});