var Schema = {};

Schema.User = new SimpleSchema({
        createdAt: {
            type: Date,
            optional: false
        },
        fullName: {
            type: String,
            optional: false
        },
        userId: {
            type: String,
            optional: false
        }
    })
    Users = new Meteor.Collection("users");
    
    
    Users.attachSchema(Schema.User);