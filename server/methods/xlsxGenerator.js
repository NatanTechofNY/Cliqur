if(Meteor.isServer) {
	


	Meteor.methods({
		createSpreadsheet: function (data) {
			var userList = data.listed;
			if (userList) {
				userList = userList.map(function(g) {
					return [g._id, g.fullName];
				});

				var buildr = [{id: 1, name: ("List for " + moment().format('LL')), data: userList}];
				var bfr = nxlsx.build(buildr);
				return bfr;
			};
		}
	});
};