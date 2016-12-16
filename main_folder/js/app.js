(function() {
    var app = angular.module('mainApp', ['ngRoute']);

    //routing section
    app.config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
            when('/', {
                templateUrl: 'views/menu.html'
            }).
            when('/task', {
                templateUrl: 'views/task.html'
            }).
            otherwise('/');
        }
    ]);

    app.controller('mainController', ['$scope', '$http', function($scope, $http) {

        //load json file depend which button is clicked
        $scope.loadAnimalsData = function() {
            $http.get('json_files/zwierzeta.json').then(function(data) {
                $scope.words = data;
                console.log($scope.words);
            });
        }
        $scope.loadWeatherData = function() {
            $http.get('json_files/pogoda.json').then(function(data) {
                $scope.words = data;
                console.log($scope.words);
            });
        }
        $scope.loadSportData = function() {
            $http.get('json_files/sport.json').then(function(data) {
                $scope.words = data;
                console.log($scope.words);
            });
        }
        $scope.loadFoodData = function() {
            $http.get('json_files/jedzenie.json').then(function(data) {
                $scope.words = data;
                console.log($scope.words);
            });
        }

        //values of variables on the start of application
        $scope.isInputDisabled = true;
        $scope.disableStartButton = false;
        $scope.restartButton = true;
        $scope.nextButton = true;
        $scope.isAlreadyDrawn = [];
        $scope.wordGuessed = true;
        $scope.numberOfWords = 0;
        $scope.numberOfCorrectAnswers = 0;
        $scope.rules = true;

        //activities for "START" and "NEXT" button
        $scope.startGame = function() {
            $scope.rules = false;
            $scope.whenGuessWord = false;
            $scope.wrapper = true;
            $scope.wordsCounter = true;
            $scope.restartAlert = false;
            $scope.nextButton = false;
            $scope.restartButton = true;
            $scope.isInputDisabled = false;
            $scope.disableStartButton = true;
            $scope.empty = [];
            $scope.msgError = "";
            $scope.guess = "";
            $scope.guessNum = 0;
            $scope.wordGuessed = false;
            $scope.loseAlert = false;
            $scope.alertDanger = false;
            $scope.chosenWord = $scope.words[Math.floor(Math.random() * $scope.words.length)];
            console.log($scope.words);
            $scope.isWordDrawn();
            $scope.numberOfWords = $scope.numberOfWords + 1;
        }

        //activities for reset button
        $scope.restartGame = function() {
            $scope.finalAlertCorrect = false;
            $scope.finalAlertWrong = false;
            $scope.restartButton = true;
            $scope.disableStartButton = false;
            $scope.isInputDisabled = true;
            $scope.empty = [];
            $scope.msgError = "";
            $scope.guess = "";
            $scope.guessNum = 0;
            $scope.wordGuessed = true;
            $scope.alertDanger = false;
            $scope.chosenWord = "";
            $scope.nextButton = true;
            $scope.loseAlert = false;
            $scope.isAlreadyDrawn = [];
            $scope.restartAlert = true;
            $scope.numberOfWords = 0;
            $scope.whenGuessWord = false;
            $scope.numberOfCorrectAnswers = 0;
        }

        // function checking if word is already used, if it is, don't draw it again
        $scope.isWordDrawn = function() {
            if ($scope.isAlreadyDrawn.length == 9) {
                $scope.nextButton = true;
            }
            if ($scope.isAlreadyDrawn.indexOf($scope.chosenWord.description) == -1) {
                $scope.isAlreadyDrawn.push($scope.chosenWord.description);
                console.log($scope.isAlreadyDrawn);
            } else {
                do {
                    console.log($scope.chosenWord.description);
                    for (i = 0; i <= $scope.isAlreadyDrawn.length; i++) {
                        $scope.chosenWord = $scope.words[Math.floor(Math.random() * $scope.words.length)];
                        if ($scope.isAlreadyDrawn[i] === $scope.chosenWord.description) {
                            console.log($scope.chosenWord.description);
                        }
                    }
                } while ($scope.isAlreadyDrawn.indexOf($scope.chosenWord.description) != -1);
                $scope.isAlreadyDrawn.push($scope.chosenWord.description);
                console.log($scope.isAlreadyDrawn);
            }
        }

        //activities for "CHECK" button
        $scope.checkWord = function() {
            $scope.guessNum++;

            if (($scope.guess).toUpperCase() === $scope.chosenWord.word) {
                $scope.isInputDisabled = true;
                $scope.whenGuessWord = true;
                $scope.wordGuessed = true;
                $scope.numberOfCorrectAnswers = $scope.numberOfCorrectAnswers + 1;
                if ($scope.numberOfWords == 10) {
                    $scope.whenGuessWord = false;
                    $scope.finalAlertCorrect = true;
                    $scope.restartButton = false;
                }
            }

            if ($scope.guessNum == 3) {
                $scope.wordGuessed = true;
                $scope.isInputDisabled = true;
                $scope.loseAlert = true;

                if ($scope.numberOfWords == 10) {
                    $scope.finalAlertWrong = true;
                    if ($scope.finalAlertWrong == true) {
                        $scope.loseAlert = false;
                        $scope.alertDanger = false;
                        $scope.restartButton = false;
                    }
                    return;
                }

                if ($scope.whenGuessWord == true) {
                    $scope.loseAlert = false;
                }
            }

            $scope.msgError = "";

            if (!$scope.guess) {
                $scope.msgError = 'You did not input any data';
                $scope.alertDanger = true;

                if ($scope.loseAlert == true) {
                    $scope.alertDanger = false;
                }
                return;
            }

            if ($scope.empty.indexOf($scope.guess) == -1) {
                $scope.empty.push($scope.guess);
            } else {
                $scope.msgError = 'Meh! You tried this answer already :(';
                $scope.alertDanger = true;

                if ($scope.loseAlert == true) {
                    $scope.alertDanger = false;
                }
                return;
            }

            $scope.guess = "";
            $scope.alertDanger = false;
        }

    }]);
})();
