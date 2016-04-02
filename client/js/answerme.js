if (Meteor.isClient) {
  angular.module('myApp', ['angular-meteor']);
 
  angular.module('myApp').controller('buttonCtrl', ['$scope', function ($scope) {
     $scope.fN = "Peter";
     $scope.lN = "Zheng";
     $scope.a = "5";
  }]);
}
