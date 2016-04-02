var Schema = {};

Schema.Sessions = new SimpleSchema({
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
        hasPin: {
            type: Boolean,
            optional: false,
            defaultValue: false
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
    
    
    Sessions = new Meteor.Collection("session");
    
    
    Sessions.attachSchema(Schema.Sessions);