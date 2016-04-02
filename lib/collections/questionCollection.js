var Schema = {};

Schema.Questions = new SimpleSchema({
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
        isPublic: {
            type: Boolean,
            optional: false,
            defaultValue: false
        }
    })
    Questions = new Meteor.Collection("questions");
    Questions.attachSchema(Schema.Questions);



