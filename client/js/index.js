
   (function(){

   angular.module('indexApp', []);
   
   angular.module('indexApp').controller('buttonCtrl', ['$scope', function($scope){
       
   }]);
    angular.module('indexApp').controller('MyCtrl', ['$scope', function($scope){
        $scope.enterCode = function() {
            console.log($('#codeInput').val());
            $scope.code = $('#codeInput').val();
    }
   }]);
   
   
$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

       
})();

