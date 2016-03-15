var feApp = angular.module('feApp', ['ng-bootstrap-datepicker']);

feApp.controller('myController',['$scope', '$http', function($scope, $http){
    
    $http.get('windows.json')
       .then(function(myResources){
            $scope.myWindows = myResources.data.myWindows;  
            
            // Init Datepicker
            $.fn.datepicker.defaults.format = 'dd-mm-yyyy';
            $scope.datepickerOptions = {
                customClass: 'form-control',
                format: 'dd-mm-yyyy',
                language: 'en',
                autoClose: true,
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };
            
            // Display Windows JSON data
            $scope.getData = function(){
                console.log(angular.toJson($scope.myWindows, true));
            };
            
            // Delete window
            $scope.deleteWindow = function(myWindow){
                var tempIndex = $scope.myWindows.indexOf(myWindow);
                $scope.myWindows.splice(tempIndex, 1); 
            };
        
            // Add new Window
            $scope.addWindow = function(){
                var today = new Date(),
                  tDay = today.getDate(),
                  tMonth = today.getMonth()+1,
                  tYear = today.getFullYear(),
                  todayDate = tDay.addZero()+'-'+tMonth.addZero()+'-'+tYear;
                var myNewWindow = {
                  "name": "New window",
                  "start_date": todayDate,
                  "end_date": todayDate
                };
                $scope.myWindows.push(myNewWindow);
            };
        
            // Get Percentage Passed Days
            $scope.getPercentage = function(myWindow){
                
              if(myWindow.start_date > myWindow.end_date) {
                  var tempStart = myWindow.start_date;
                  myWindow.start_date = myWindow.end_date;
                  myWindow.end_date = tempStart;
              }
                
              var sDay = myWindow.start_date.split('-')[0],
                  sMonth = myWindow.start_date.split('-')[1],
                  sYear = myWindow.start_date.split('-')[2],
                  eDay = myWindow.end_date.split('-')[0],
                  eMonth = myWindow.end_date.split('-')[1],
                  eYear = myWindow.end_date.split('-')[2],
                  today = new Date(),
                  tDay = today.getDate(),
                  tMonth = today.getMonth()+1,
                  tYear = today.getFullYear(),
                  maxDays = new Date(sMonth+'/'+sDay+'/'+sYear).days(new Date(eMonth+'/'+eDay+'/'+eYear)),
                  passedDays = new Date(sMonth+'/'+sDay+'/'+sYear).days(new Date(tMonth.addZero()+'/'+tDay.addZero()+'/'+tYear)), 
                  percentage = passedDays*100/maxDays;
                
                  if (percentage > 100
                     || myWindow.start_date > myWindow.end_date) {
                      percentage = 0;
                  }

                  if(passedDays === 0) {
                      percentage = 100;
                  }
                
                  if(passedDays > maxDays) {
                      percentage = 100;
                  }

                  return Math.ceil(percentage);

            };
        
            // Get Progress Bar Type
            $scope.getProgressBar = function(myWindow){
                var myPercent = $scope.getPercentage(myWindow);
                if(myPercent < 30) {
                    return 'progress-bar-warning';
                } else if(myPercent < 55) {
                    return 'progress-bar-info';
                } else {
                    return 'progress-bar-success';
                }
            };
        });
}]);

feApp.directive("windowResult", function(){
    return {
        templateUrl: 'window.html',
        replace: true
    }
});

feApp.directive("progressBar", function(){
    return {
        templateUrl: 'progress.html',
        replace: true
    }
});