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