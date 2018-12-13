import { uiModules } from 'ui/modules';
const module = uiModules.get('kibana/ob-kb-percent', ['kibana']);

import { tabifyAggResponse } from 'ui/agg_response/tabify/tabify';

//var module = require('ui/modules').get('ob-kb-percent');
var numeral = require('numeral');
//import numeral from 'numeral';


module.controller('PercentController', function($scope, Private) {


    $scope.getValueFromAggs = function (resp, tableGroups, type, params) {
    	if (type === 'total') {
    		return resp.hits.total;
    	}
    	if (type === 'namedBucket') {
    		for (var i = 0; i < tableGroups.tables.length; i++) {
    			const table = tableGroups.tables[i];
    			for (var j = 0; j < table.rows.length; j++) {
    				const row = table.rows[j];		
	        		const bucketName = row[0];
	    	    	const bucketValue = row[1];
		        	if (bucketName.toString() === params.namedBucket) {
	        			return bucketValue;
		        	}
    			}
    		}
	      return 0.0;
    	}
    	if (type === 'nthBucket') {
    		const table = tableGroups.tables[0];
    		const bucket = table.rows[params.nthBucket - 1]; // one based.
    		return bucket[1];
    	}
    	return 0;
    };

    $scope.$watch('esResponse', function (resp) {
      if (resp) {
        //var tabified = tabifyAggResponse($scope.vis, resp);
        //console.log("tabified: " + tabified);
        console.log("resp.tables[0].rows.length: " + resp.tables[0].rows.length);

         let tableGroups = tabifyAggResponse($scope.vis.getAggConfig(), resp)

		var numeratorType = $scope.vis.params.numeratorType;
		var numeratorParams = $scope.vis.params.numerator;
		var numerator = $scope.getValueFromAggs(resp, tableGroups, numeratorType, numeratorParams);

		var denominatorType = $scope.vis.params.denominatorType;
		var denominatorParams = $scope.vis.params.denominator;
		var denominator = $scope.getValueFromAggs(resp, tableGroups, denominatorType, denominatorParams);

		var ratio = numerator / denominator;
		if ($scope.vis.params.displayIncrement == true) { ratio = Math.abs(ratio - 1) };
	    console.log("numerator = ", numerator);
		console.log("denominator = ", denominator);
    	ratio = numeral(ratio).format($scope.vis.params.format);
        $scope.ratio = ratio;
      }
    });

  });
