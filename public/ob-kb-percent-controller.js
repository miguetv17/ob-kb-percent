// Create an Angular module for this plugin
import { uiModules } from 'ui/modules'
import { tabifyAggResponse } from 'ui/agg_response/tabify/tabify'

const module = uiModules.get('kibana/ob-kb-percent', ['kibana'])

const numeral = require('numeral')

module.controller('PercentController', function ($scope, Private) {

  $scope.getValueFromAggs = function (resp, tableGroups, type, params) {
    if (type === 'total') {
      return resp.hits.total
    }
    if (type === 'namedBucket') {
      for (let i = 0; i < tableGroups.tables.length; i++) {
        const table = tableGroups.tables[i]
        for (let j = 0; j < table.rows.length; j++) {
          const row = table.rows[j]
          const bucketName = row[0]
          const bucketValue = row[1]
          if (bucketName.toString() === params.namedBucket) {
            return bucketValue
          }
        }
      }
      return 0.0
    }
    if (type === 'nthBucket') {
      const table = tableGroups.tables[0]
      const bucket = table.rows[params.nthBucket - 1] // one based.
      return bucket[1]
    }
    return 0
  }

  $scope.$watch('esResponse', function (resp) {
    if (resp) {

      const numeratorType = $scope.vis.params.numeratorType
      const numeratorParams = $scope.vis.params.numerator
      let tableGroups = tabifyAggResponse($scope.vis.getAggConfig(), resp)
      const numerator = $scope.getValueFromAggs(resp,
        tableGroups, numeratorType,
        numeratorParams)

      const denominatorType = $scope.vis.params.denominatorType
      const denominatorParams = $scope.vis.params.denominator
      const denominator = $scope.getValueFromAggs(resp,
        tableGroups, denominatorType,
        denominatorParams)

      let ratio = numerator / denominator
      if ($scope.vis.params.displayIncrement === true) { 
        ratio = Math.abs(ratio - 1)
      }

      $scope.ratio = numeral(ratio).format($scope.vis.params.format)
    }
  })
})
