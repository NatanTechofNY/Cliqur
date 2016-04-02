var Schema = {};

Schema.Session = new SimpleSchema({
        createdAt: {
            type: Date,
            optional: false
        },
        sessionId: {
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
        },
        sessionOwnerId: {
            type: String,
            optional: false,
            regEx: SimpleSchema.RegEx.Id
        },
        userList: {
            type: [Object],
            optional: false,
            blackbox: true
        },
        clickerData: {
            type: Schema.ClickerItem,
            optional: true
        }
    })
    
    
    Session = new Meteor.Collection("session");
    
    
    Session.attachSchema(Schema.Session);