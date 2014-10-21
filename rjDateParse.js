/* global angular,moment *//* https://github.com/robjames/rjDateParse */
	angular.module('rjDateParse', [])
	.filter('DateParse', function() {
		return function(date) {
			var parsedDate;
			try {
				parsedDate = Date.parse(date);
			} catch (err){
				parsedDate = date;
			}
			return (!isNaN(parsedDate)) ? parsedDate : date;
		};
	})
	.filter('momentFromNow', function() {
		return function(date) {
			if (isNaN(date)) return date;
			var mo = moment(date);
			mo.lang(window.navigator.language);
			return mo.fromNow();
		};
	})
	.filter('moment', function() {
		return function(date, format) {
			if (isNaN(date)) return date;
			var mo = moment(date);
			mo.lang(window.navigator.language);
			return mo.format(format || 'LLLL');
		};
	})
	.filter('momentCalendar', function() {
		return function(date) {
			if (isNaN(date)) return date;
			var mo = moment(date);
			mo.lang(window.navigator.language);
			return mo.calendar();
		};
	})
	.directive('dateToggle', ['$filter', '$rootScope', function($filter, $rootScope) {
		return {
			restrict:'A',
			link: function(scope, element, attrs){
				var vals = [attrs.dateToggle];
				var date = $filter('DateParse')(vals[0]);
				if (isNaN(date) || date === '' ) {
					element.removeAttr('date-toggle');
					return;
				}
				vals.push($filter('momentFromNow')(date));
				vals.push($filter('moment')(date, 'LLLL'));
				vals.push($filter('moment')(date, 'DD/MM/YYYY HH:mm:ss'));
				vals.push($filter('momentCalendar')(date));

				var index = (!!$rootScope.rjDateParse) ? $rootScope.rjDateParse : 1;
				index = index*1;
				element.on('click', function(){
					scope.$apply(function(){
						$rootScope.rjDateParse = index = (index >= vals.length-1) ? 0 : index+1;
					});
				});

				$rootScope.$watch('rjDateParse', function(newVal){
					element.html(vals[newVal]);
				});
			}
		};
	}]);