var Schema = {};

Schema.Chat = new SimpleSchema({
        createdAt: {
            type: Date,
            optional: false
        },
        message: {
            type: String,
            optional: false
        },
        userID: {
            type: String,
            optional: false
        }
    })
    Chat = new Meteor.Collection("chat");
    
    
    Chat.attachSchema(Schema.Chat);