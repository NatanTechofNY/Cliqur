if(Meteor.isServer) {
	


	Meteor.methods({
		createSpreadsheet: function (data) {
			var userList = data.listed;
			if (userList) {
				userList = userList.map(function(g) {
					return [g._id, g.fullName];
				});

				var buildr = [{name: "List for " + moment().format('LL'), data: userList}];

				var toblob = XLSX.write(buildr, {bookType:'xlsx', bookSST:false, type:'binary'});
			
				return toblob;
			};
		}
	});
};