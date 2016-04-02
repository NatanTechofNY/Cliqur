if (Meteor.isClient) {
	(function(){

		var testing;

	    angular.module('indexApp', ['angular-meteor', 'ui.router']);
		

	    angular.module('indexApp').config(['$stateProvider', '$urlRouterProvider',
		    function ($stateProvider, $urlRouterProvider) {
		        $urlRouterProvider.otherwise("/");


		        $stateProvider
		            .state('home', {
		                url: "/",
		                template: '<index.html></index.html>'
		            })
		            .state('crowd_session', {
		                url: "/crowd_session",
		                template: UiRouter.template('crowd_session.html')
		            })
		            .state('state1.list', {
		                url: "/list",
		                template: UiRouter.template('state1.list1.html')
		            })
		            .state('state2', {
		                url: "/state2",
		                template: UiRouter.template('state2.html')
		            });
	    }])


		angular.module("indexApp").controller("indexCtrl", ['$scope', function($scope){
				 angular.module('indexApp').controller('buttonCtrl', ['$scope', function($scope){
				 	
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

	})();
};