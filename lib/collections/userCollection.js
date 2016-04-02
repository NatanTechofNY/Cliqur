var Schema = {};

Schema.Users = new SimpleSchema({
        createdAt: {
            type: Date,
            optional: false
        },
        fullName: {
            type: String,
            optional: false
        },
        studentId: {
            type: String,
            optional: false
        }
    })
    Users = new Meteor.Collection("users");
    
    
    Users.attachSchema(Schema.Users);