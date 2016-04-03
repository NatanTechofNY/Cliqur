var Schema = {};

Schema.ClickerResponse = new SimpleSchema({
    userId: {
        type: String,
        optional: false
    },
    userName: {
        type: String,
        optional: false
    },
    responseIndex: {
        type: Number,
        optional: false
    }
});

Schema.ClickerItem = new SimpleSchema({
    updatedAt: {
        type: Date,
        optional: true
    },
    responses: {
        type: [Schema.ClickerResponse],
        optional: true
    }
});

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
            type: String,
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