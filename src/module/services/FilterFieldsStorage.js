(function() {
    'use strict';

    angular
        .module('universal.editor')
        .service('FilterFieldsStorage', FilterFieldsStorage);

    FilterFieldsStorage.$inject = ['$rootScope', '$timeout', 'configData'];

    function FilterFieldsStorage($rootScope, $timeout, configData) {
        var storage = {},
            queryObject = {},
            srvc = this,
            filterSearchString;

        /** set functions for service */
        angular.extend(srvc, {
            addFilterController: addFilterController,
            deleteFilterController: deleteFilterController,
            clearFiltersValue: clearFiltersValue,
            calculate: calculate,
            getFilterQueryObject: getFilterQueryObject
        });

        function addFilterController(ctrl) {
            var id = ctrl.parentComponentId;
            if (id) {
                storage[id] = storage[id] || [];
                storage[id].push(ctrl);
                ctrl.$fieldHash = Math.random().toString(36).substr(2, 15);
            }
        }

        function deleteFilterController(ctrl) {
            var id = ctrl.parentComponentId;
            if (id) {
                var filterControllers = storage[id];
                if (filterControllers) {
                    angular.forEach(filterControllers, function(fc, ind) {
                        if (fc.$fieldHash === ctrl.$fieldHash) {
                            filterControllers.splice(ind, 1);
                        }
                    });
                }
            }
        }

        function clearFiltersValue(id, paramName) {
            if (storage[id]) {
                angular.forEach(storage[id], function(ctrl) {
                    ctrl.clear();
                });
                calculate(id, paramName);
            }
        }

        function calculate(id, paramName) {
            var ctrls = storage[id];
            var filters = {};
            //-- get list of filter fields
            angular.forEach(ctrls, function(ctrl) {
                //--get settings of the field
                var settings = ctrl.setting.component.settings;
                //--get operator from settings of the field
                var operator = ctrl.options.filterParameters.operator;
                //--get value of the field
                var fieldValue = ctrl.getFieldValue();

                //-- genarate filter objects with prepared filters
                var filterValue = settings.$toFilter(operator, ctrl.getFieldValue());
                angular.extend(filters, filterValue);
            });

            //** storage filter object
            if (!$.isEmptyObject(filters)) {
                queryObject[paramName] = angular.copy(filters);
            } else {
                delete queryObject[paramName];
                filters = false;
            }
            return filters;
        }

        function getFilterQueryObject(paramName) {
            return queryObject[paramName];
        }
    }
})();
