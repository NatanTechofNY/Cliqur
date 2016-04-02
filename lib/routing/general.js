Meteor.startup(function () {
    Router.configure({
        notFoundTemplate: 'notFound'
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