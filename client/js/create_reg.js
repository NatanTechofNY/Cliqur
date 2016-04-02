  
if (Meteor.isClient) {

	  angular.module('createRegApp', []);
 
    angular.module('createRegApp').controller('createCtrl', ['$scope', function($scope){
     
        $scope.createSession = function() {
                $scope.user = {};
                $scope.user['firstName'] = $('#firstName').val();
                $scope.user['lastName'] = $('#lastName').val();
                $scope.user['className'] = $('#className').val();
                $scope.user['password']= $('#inputPassword').val();
                console.log($scope.user);
        }
       
   }]);
};
  
   

