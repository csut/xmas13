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
	
	$scope.itinerary = [];

	$scope.itinerary.push( new itinItem( 2013, 11, 14, 5, 0, 'eat indian food!' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 15, 12, 0, 'Chris email Susan to confirm dates' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 18, 3, 0, 'Chris and Jenny wake-up and pack cats' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 18, 3, 45, 'Drop cats off at Susan\'s' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 18, 6, 0, 'Departing PDX on UA1573 (res PYVG6W)' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 18, 13, 33, 'Departing O\'Hare on UA656 (res PYVG6W)' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 18, 16, 25, 'Arriving in Albany' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 19, 15, 0, 'Engagement pictures in Saratoga' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 19, 17, 0, 'Jenny wedding dress appointment' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 20, 11, 0, 'Jenny wedding dress appointment' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 22, 11, 0, 'visit Bachelor Mansion' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 23, 6, 0, 'Drive from Ballston Spa to Worcester' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 28, 5, 0, 'Drive from Worcester to Ballston Spa' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 31, 14, 29, 'Departing Albany on UA3901 (res PYVG6W)' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 31, 17, 25, 'Departing Dulles on UA1037 (res PYVG6W)' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 31, 20, 25, 'Arriving in PDX' ) );

	$scope.itinerary.push( new itinItem( 2013, 11, 31, 21, 0, 'Susan picks up Chris and Jenny at PDX' ) );


	$scope.scrollToCurrent();
});