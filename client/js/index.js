if (Meteor.isClient) {
	(function(){
		function showContent(name) {
			if ($scope.contentName == name){
				return true;
			}
			else {
				return false;
			}
		};
	    angular.module('indexApp', []);
		
					
		angular.module("indexApp").controller("indexCtrl", ['$scope', function($scope){
				$scope.contentName = "index";
				 angular.module('indexApp').controller('buttonCtrl', ['$scope', function($scope){

				}]);
				angular.module('indexApp').controller('MyCtrl', ['$scope', function($scope){
					$scope.enterCode = function() {
						console.log($('#codeInput').val());
						$scope.code = $('#codeInput').val();
				}
				}]);
	
					
		}]);
		
			angular.module("indexApp").controller("crowdSessionCtrl", ['$scope', function($scope){
				$scope.contentName = "crowdSession";
	
					
		}]);
				angular.module("indexApp").controller("crowdRegisterCtrl", ['$scope', function($scope){
				$scope.contentName = "crowdRegister";
	
					
		}]);
	   
				angular.module("indexApp").controller("registerCtrl", ['$scope', function($scope){
				$scope.contentName = "register";
	
					
		}]);
				angular.module("indexApp").controller("sessionCtrl", ['$scope', function($scope){
					$scope.contentName = "session";
		
					
		}]);
		angular.module("indexApp").controller("publicCtrl", ['$scope', function($scope){
					$scope.contentName = "public";
		
					
		}]);
	   
	   
	   

		$("#menu-toggle").click(function(e) {
				e.preventDefault();
				$("#wrapper").toggleClass("toggled");
			});


		})();
};
   

