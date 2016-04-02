if (Meteor.isClient) {
	(function(){

		var testing;

	    angular.module('indexApp', ['angular-meteor', 'ui.router']);
		
					
		angular.module("indexApp").controller("indexCtrl", ['$scope', function($scope){
				 angular.module('indexApp').controller('buttonCtrl', ['$scope', function($scope){
				 	$scope.helpers({
				 		swag: function () {
				 			return Session.get('testr');
				 		}
				 	});
				}]);
				angular.module('indexApp').controller('MyCtrl', ['$scope', function($scope){
					$scope.enterCode = function() {
						console.log($('#codeInput').val());
						$scope.code = $('#codeInput').val();
				}
				}]);
	
					
		}]);
	   
	   

		$("#menu-toggle").click(function(e) {
			e.preventDefault();
			$("#wrapper").toggleClass("toggled");
		});

		Session.set('testr', true);
	})();
};
   

