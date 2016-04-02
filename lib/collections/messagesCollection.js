var Schema = {};

Schema.Messages = new SimpleSchema({
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
        userID: {
            type: String,
            optional: false
        },
    })
    Messages = new Meteor.Collection("messages");
    Messages.attachSchema(Schema.Messages);



