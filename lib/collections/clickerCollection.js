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
    userResponseIndex: {
        type: Number,
        optional: false
    }
});

Schema.ClickerItem = new SimpleSchema({
        createdAt: {
            type: Date,
            optional: false
        },
        parentSessionId: {
            type: String,
            optional: false
        },
        body: {
            type: String,
            optional: false
        },
        options: {
            type: [String],
            optional: false
        },
        responses: {
            type: [Schema.ClickerResponse],
            optional: false
        }
    })
    ClickerItem = new Meteor.Collection("clickeritem");
    
    
    Users.attachSchema(Schema.ClickerItem);