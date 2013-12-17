var cjItin13 = angular.module('cjItin13', []);

var itinIDIndex = 0;

var getItinID = function() {
	var currentID = itinIDIndex;
	itinIDIndex += 1;
	return currentID;
};

function itinItem(_startY, _startM, _startD, _startH, _startMin, _description) {
	//pass function date and description, get back an object containing a unique id, a startTime and description field
	this.startTime = new Date(_startY, _startM, _startD, _startH, _startMin, 0, 0);
	this.description = _description;
	this.id = getItinID();
};

cjItin13.controller('itineraryCtrl', function($scope, $location, $anchorScroll) {
	$scope.oneDay = 43200000;
	$scope.isElapsed = function(nTime) {
		var now = new Date();

		if ( nTime.getTime() < (now.getTime() - $scope.oneDay) ) {
			return true;
		} else {
			return false;
		}
	};
	$scope.isCurrent = function(nTime) {
		var now = new Date();

		if ( !$scope.isElapsed(nTime) && ( nTime.getTime() < (now.getTime() + $scope.oneDay) ) ) {
			return true;
		} else {
			return false;
		}
	};
	$scope.scrollToCurrent = function() {

		var itinStartComparator = function(a, b) {
			if ( a.startTime.getTime() < b.startTime.getTime() )
				return -1;
			if ( a.startTime.getTime() > b.startTime.getTime() )
				return 1;
			return 0;
		};

		var sortedItin = $scope.itinerary.slice(0).sort(itinStartComparator);
		// window.console.log(sortedItin);
		var idOfCurrent;

		for (var i = 0; i < sortedItin.length; i += 1) {
			if ( !$scope.isElapsed( sortedItin[i].startTime ) ) {
				idOfCurrent = sortedItin[i].id;
				break;
			}
		}
		$location.hash( idOfCurrent );
		$anchorScroll();
	};
	// $scope.$on('$viewContentLoaded', function() {
	// 	window.console.log('$viewContentLoaded eventhandler has been called');
	// 	$scope.scrollToCurrent();
	// });
	// $scope.currentTime = new Date();
	// var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);

	// var itinItemGen = function(_startY, _startM, _startD, _startH, _startM, _description)
	$scope.itinerary = [];

	$scope.itinerary.push( new itinItem( 2013, 11, 14, 5, 0, 'eat indian food!' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 15, 12, 0, 'Chris email Susan to confirm dates' ) );

	// $scope.itinerary.push( new itinItem( 2013, 11, 17, 17, 0, 'Chris and Jenny call to schedule a cab from Susan\'s to PDX on the 18th at 4am with portlandtaxi.net' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 18, 3, 0, 'Chris and Jenny wake-up and pack cats' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 18, 3, 45, 'Drop cats off at Susan\'s' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 18, 6, 0, 'Departing PDX on UA1573 (res PYVG6W)' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 18, 13, 33, 'Departing O\'Hare on UA656 (res PYVG6W)' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 18, 16, 25, 'Arriving in Albany' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 19, 15, 0, 'Engagement pictures in Saratoga' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 19, 17, 0, 'Jenny wedding dress appointment' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 20, 11, 0, 'Jenny wedding dress appointment' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 22, 11, 0, 'visit Bachelor Mansion' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 25, 6, 0, 'Drive from Ballston Spa to Worcester' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 30, 17, 0, 'Drive from Worcester to Ballston Spa' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 31, 14, 29, 'Departing Albany on UA3901 (res PYVG6W)' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 31, 17, 25, 'Departing Dulles on UA1037 (res PYVG6W)' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 31, 20, 25, 'Arriving in PDX' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 31, 21, 0, 'Susan picks up Chris and Jenny at PDX' ) );

	// $scope.itinerary = [
	// 	{
	// 		startTime: new Date(2013, 11, 1, 0, 0, 0, 0),
	// 		description: 'test description test',
	// 		id: '1'
	// 	},
	// 	{
	// 		startTime: new Date(2013, 10, 5, 8, 0, 0, 0),
	// 		description: 'description for the second itinerary item',
	// 		id: '2'
	// 	},
	// 	{
	// 		startTime: new Date(2013, 11, 6, 14, 0, 0, 0),
	// 		description: 'this is the 3rd desc in the js code',
	// 		id: '3'
	// 	},
	// 	{
	// 		startTime: new Date(2014, 2, 6, 14, 0, 0, 0),
	// 		description: 'this is the 4th date, in the futcha',
	// 		id: '4'
	// 	},
	// 	{
	// 		startTime: new Date(2013, 11, 14, 14, 0, 0, 0),
	// 		description: 'this is the 5th date, in the now',
	// 		id: '5'
	// 	},
	// 	{
	// 		startTime: new Date(2013, 11, 21, 14, 0, 0, 0),
	// 		description: 'this is the 5th date, in the now',
	// 		id: '6'
	// 	},
	// 	{
	// 		startTime: new Date(2013, 11, 21, 14, 0, 0, 0),
	// 		description: 'this is the 5th date, in the now',
	// 		id: '7'
	// 	},
	// 	{
	// 		startTime: new Date(2013, 11, 21, 14, 0, 0, 0),
	// 		description: 'this is the 5th date, in the now',
	// 		id: '8'
	// 	},
	// 	{
	// 		startTime: new Date(2013, 11, 21, 14, 0, 0, 0),
	// 		description: 'this is the 5th date, in the now',
	// 		id: '9'
	// 	},
	// 	{
	// 		startTime: new Date(2013, 10, 5, 8, 0, 0, 0),
	// 		description: 'description for the second itinerary item',
	// 		id: '10'
	// 	},
	// 	{
	// 		startTime: new Date(2013, 11, 6, 14, 0, 0, 0),
	// 		description: 'this is the 3rd desc in the js code',
	// 		id: '11'
	// 	},
	// 	{
	// 		startTime: new Date(2014, 2, 6, 14, 0, 0, 0),
	// 		description: 'this is the 4th date, in the futcha',
	// 		id: '12'
	// 	},
	// 	{
	// 		startTime: new Date(2013, 11, 14, 14, 0, 0, 0),
	// 		description: 'this is the 5th date, in the now',
	// 		id: '13'
	// 	},
	// 	{
	// 		startTime: new Date(2013, 11, 21, 14, 0, 0, 0),
	// 		description: 'this is the 5th date, in the now',
	// 		id: '14'
	// 	},
	// 	{
	// 		startTime: new Date(2013, 11, 21, 14, 0, 0, 0),
	// 		description: 'this is the 5th date, in the now',
	// 		id: '15'
	// 	},
	// 	{
	// 		startTime: new Date(2013, 11, 21, 14, 0, 0, 0),
	// 		description: 'this is the 5th date, in the now',
	// 		id: '16'
	// 	},
	// 	{
	// 		startTime: new Date(2013, 11, 21, 14, 0, 0, 0),
	// 		description: 'this is the 5th date, in the now',
	// 		id: '17'
	// 	}

	// ];

	$scope.scrollToCurrent();
});