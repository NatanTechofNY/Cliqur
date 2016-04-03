Meteor.startup(function () {
    Router.configure({
        notFoundTemplate: 'notFound',
        loadingTemplate: 'loader'
    });

    Router.map(function() {
        this.route("splashPage", {
            path: "/",
            onBeforeAction: function() {
                if (Session.get('userSessItem') && Session.get('userSessItem').sessionId) {
                    Router.go('/d/'+Session.get('userSessItem').sessionId, {replaceState: true});
                }
                else
            	   this.next();
            },
            template: 'indexItem',
            onAfterAction: function() {
                if (!Meteor.isClient) {
                    return false;
                };
                SEO.set({
                    "title": "Cliqur",
                    "meta" : {
                        'description': '',
                        'keywords': ''
                    },
                    "og" : {
                        'title': 'Welcome to Cliqur',
                        'image': ''
                    }
                });
                document.title = 'Cliqur';
            },
            data: function(){
                
            },
        }),
        this.route("dashboard", {
            path: "/d/:sessionId",
            waitOn: function() {
                var ses = Sessions.findOne({"sessionId": Router.current().params.sessionId});
                if (ses && Session.get('userSessItem') && ses.sessionOwnerId === Session.get('userSessItem').userId) {
                    return Meteor.subscribe('adminQuestions', Router.current().params.sessionId);
                }
                else if(Session.get('userSessItem') && Session.get('userSessItem').userId){
                    return [Meteor.subscribe('userQuestions', {sessid: Router.current().params.sessionId, authorId: Session.get('userSessItem').userId}), Meteor.subscribe('publicQuestions', Router.current().params.sessionId)];
                }
                else this.ready();
            },
            onBeforeAction: function() {
                if (!Sessions.findOne({"sessionId": Router.current().params.sessionId}) || !Session.get('userSessItem') || !Session.get('userSessItem').userId) {
                    if (Session.get('userSessItem') && Session.get('userSessItem').sessionId === Router.current().params.sessionId)
                        Session.setPersistent('userSessItem', {});
                    Router.go('/doesntexist', {replaceState: true});
                }
                else this.next();
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
                    "title": prestr + " | Cliqur",
                    "meta" : {
                        'description': '',
                        'keywords': ''
                    },
                    "og" : {
                        'title': 'Welcome to Cliqur',
                        'image': ''
                    }
                });
                document.title = prestr + ' | Cliqur';
            },
            data: function(){
                
            },
        }),
        this.route("publicView", {
            path: "/d/:sessionId/p",
            waitOn: function() {
                return [Meteor.subscribe('publicQuestions', Router.current().params.sessionId), Meteor.subscribe('sessionDataLimited', Router.current().params.sessionId)];
            },
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
                    "title": prestr + " - Public view| Cliqur",
                    "meta" : {
                        'description': '',
                        'keywords': ''
                    },
                    "og" : {
                        'title': 'Welcome to Cliqur',
                        'image': ''
                    }
                });
                document.title = prestr + ' - Public view | Cliqur';
            },
            data: function(){
                
            },
        })
        
    });


    if (Meteor.isClient) {
        return SEO.config({
            "title": "Cliqur",
            "meta" : {
                'description': '',
                'keywords': ''
            },
            "og" : {
                'title': 'Cliqur',
                'image': ''
            }
        });
    };
});