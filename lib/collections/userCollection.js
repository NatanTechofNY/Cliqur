var Schema = {};

Schema.User = new SimpleSchema({
        createdAt: {
            type: Date,
            optional: false
        },
        realName: {
            type: String,
            optional: false
        },
        userID: {
            type: String,
            optional: false
        },
        pin: {
            type: Number,
            optional: true
        }
    })
    Users = new Meteor.Collection("users");
    
    
    Users.attachSchema(Schema.User);