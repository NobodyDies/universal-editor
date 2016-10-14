(function () {
    'use strict';

    angular
        .module('universal.editor')
        .controller('UePaginationController', UePaginationController);

    UePaginationController.$inject = ['$scope', 'RestApiService', '$httpParamSerializer', '$sce'];

    function UePaginationController($scope, RestApiService, $httpParamSerializer, $sce) {
        var vm = this;
        vm.metaKey  = true;
        vm.scopeIdParent = vm.setting.scopeIdParent;
        var watchData = $scope.$watch(function () {
            return vm.setting.paginationData;
        }, function (data) {

            var metaKey = '_meta';
            var itemsKey = 'items';
            var pageItems = vm.setting.component.settings.maxSize || 7;

            var url = vm.setting.component.settings.dataSource.url;
            var startIndex;
            var endIndex;
            var qParams = RestApiService.getQueryParams();
            vm.pageItemsArray = [];
            vm.items = vm.setting.paginationData[itemsKey];
            var label = {
                last: '>>',
                next: '>',
                first: '<<',
                previous: '<',
                lastIs: true,
                nextIs: true,
                firstIs: true,
                previousIs: true
            };

            if (!!vm.setting.component.settings.label) {
                angular.forEach(['last', 'next', 'first', 'previous'], function(val){
                    if(angular.isDefined(vm.setting.component.settings.label[val])) {
                        if(vm.setting.component.settings.label[val]) {
                            label[val] = vm.setting.component.settings.label[val];
                        } else {
                            label[val + 'Is'] = false;
                        }
                    }
                });
            }

            if (angular.isDefined(vm.setting.component.settings.dataSource.keys)) {
                metaKey = vm.setting.component.settings.dataSource.keys.meta || metaKey;
                itemsKey = vm.setting.component.settings.dataSource.keys.items || itemsKey;
                vm.metaKey = (vm.setting.component.settings.dataSource.keys.meta != false);
            }

            if (!!vm.items && vm.items.length === 0) {
                vm.metaKey = false;
            }

            if (!!data[metaKey]) {
                vm.metaData = data[metaKey];
                vm.metaData.fromItem = ((data[metaKey].currentPage - 1) * data[metaKey].perPage ) + 1;
                vm.metaData.toItem = ((data[metaKey].currentPage - 1) * data[metaKey].perPage ) + data[itemsKey].length;

                if (data[metaKey].currentPage > 1) {

                    if (label.firstIs) {
                        qParams.page = 1;
                        vm.pageItemsArray.push({
                            label: label.first,
                            href: url + "?" + $httpParamSerializer(qParams)
                        });
                    }

                    if (label.previousIs) {
                        qParams.page = data[metaKey].currentPage - 1;
                        vm.pageItemsArray.push({
                            label: label.previous,
                            href: url + "?" + $httpParamSerializer(qParams)
                        });
                    }
                }

                if (data[metaKey].currentPage <= parseInt(pageItems/2)) {
                    startIndex = 1;
                } else if(data[metaKey].currentPage > (data[metaKey].pageCount - pageItems + 1)){
                    startIndex = data[metaKey].pageCount - pageItems + 1;
                }
                else {
                    startIndex = data[metaKey].currentPage - parseInt(pageItems/2);
                }

                endIndex = Math.min(startIndex + pageItems - 1, data[metaKey].pageCount);

                if (startIndex > 1) {
                    qParams.page = startIndex - 1;
                    vm.pageItemsArray.push({
                        label: "...",
                        href: url + "?" + $httpParamSerializer(qParams)
                    });
                }

                for(var i = startIndex; i <= endIndex; i++) {
                    if (i !== data[metaKey].currentPage) {
                        qParams.page = i;
                        vm.pageItemsArray.push({
                            label: i,
                            href: url + "?" + $httpParamSerializer(qParams)
                        });
                    }else {
                        vm.pageItemsArray.push({
                            label: data[metaKey].currentPage,
                            self: true
                        });
                    }
                }

                if (endIndex < data[metaKey].pageCount) {
                    qParams.page = endIndex + 1;
                    vm.pageItemsArray.push({
                        label: "...",
                        href: url + "?" + $httpParamSerializer(qParams)
                    });
                }

                if (data[metaKey].currentPage < data[metaKey].pageCount) {

                    if (label.nextIs) {
                        qParams.page = data[metaKey].currentPage + 1;
                        vm.pageItemsArray.push({
                            label: label.next,
                            href: url + "?" + $httpParamSerializer(qParams)
                        });
                    }

                    if (label.lastIs) {
                        qParams.page = data[metaKey].pageCount;
                        vm.pageItemsArray.push({
                            label: label.last,
                            href: url + "?" + $httpParamSerializer(qParams)
                        });
                    }
                }
            }
        });

        vm.changePage = function (event, linkHref) {
            event.preventDefault();
            vm.listLoaded = false;
            var params = linkHref.split("?")[1];
            RestApiService.getItemsListWithParams(params, vm.scopeIdParent);
        };

        vm.$onDestroy = function () {
            watchData();
        }
    }
})();