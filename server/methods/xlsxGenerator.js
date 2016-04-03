if(Meteor.isServer) {
	


	Meteor.methods({
		createSpreadsheet: function (data) {
			var userList = data.listed;
			if (userList) {
				userList = userList.map(function(g) {
					return [g._id, g.fullName];
				});

				var buildr = [{id: 1, name: ("List for " + moment().format('LL')), data: userList}];
				// var wbbuf = XLSX.write(buildr, {
				// 	type: 'base64'
				// });

				var bfr = nxlsx.build(buildr);
				// var toret = new Buffer(wbbuf, 'base64');
				// var rnadr = Random.id();
				// fs.writeFile(/*Meteor.absolutePath*/ + '~/desktop/AnswerMe/public/' + rnadr + '.xlsx', bfr, function(err) {
				// 	if (err)
				// 		console.log(err);
				// 	else
				// 		console.log('File has been saved!');
				// });

				return bfr//'/public/'+rnadr+'.xlsx';
			};
		}
	});
};