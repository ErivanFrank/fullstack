/**
*  Module
*
* Description
*/
var app = angular.module('myApp', []);

app.controller('appCtrl', ['$scope', '$http', function($scope, $http){

	ng = $scope;

	var refresh = function() {
		$http.get('/contactlist').success(function(response) {
			ng.contact = response;
			ng.newcontact = "";
			ng.contactID = "";
		});
	}
	refresh();

	ng.addContact = function() {
		$http.post('/contactlist', ng.newcontact).success(function(response) {
			refresh();
		});
	};

	ng.removeContact = function(id) {

		$http.delete('/contactlist/'+id).success(function(response) {
			refresh();
		});		
	}
	ng.editContact = function(id) {
		ng.contactID = id;
		$http.get('/contactlist/'+id).success(function(response) {
			console.log(response, id)
			ng.newcontact = response[0];
		});
	}

	ng.updateContact = function() {

		$http.put('/contactlist/'+ng.contactID, ng.newcontact).success(function(response) {
			refresh();
		});
	}

	ng.cleanerContact = function() {
		refresh();
	};
}]);