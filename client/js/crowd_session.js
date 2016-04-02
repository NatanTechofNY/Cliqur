if (Meteor.isClient) {

	
 
    angular.module('publicApp').controller('createCtrl', ['$scope', function($scope){
        Meteor.subscribe('adminQuestions', {parentSessionId: sessionId});
        //questions ng-repeat
        $scope.questionsFull = Questions.find().fetch(); //gets returned in an array of objects, formatted on brackets page
        console.log($scope.questionsFull);
        //sort questions based on their created at date
        //search up the user based on this id 
        
        //student attendance ng-repeat
        Meteor.subscribe('Users', {somethinglol: $scope.somethinglol});
        //need to search up user's name based on their student id 
        $scope.students = Users.find.fetch();
        console.log($scope.students);
        
   }]);
   
}

