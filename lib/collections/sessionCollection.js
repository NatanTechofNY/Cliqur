

Schema.Session = new SimpleSchema({
        createdAt: {
            type: Date,
            optional: false
        },
        classId: {
            type: String,
            optional: false
        },
        sessionName: {
            type: String,
            optional: true
        },
        pin: {
            type: Number,
            optional: true
        }
    })
    
    
    Session = new Meteor.Collection("session");
    
    
    Session.attachSchema(Schema.Session);