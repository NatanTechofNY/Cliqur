if (Meteor.isServer) {
	XLSX = Meteor.npmRequire('xlsx');
	nxlsx = Meteor.npmRequire('node-xlsx');
	fs = Meteor.npmRequire('fs');
};