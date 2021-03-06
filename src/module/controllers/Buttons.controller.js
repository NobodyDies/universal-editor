(function() {
    'use strict';

    angular
        .module('universal-editor')
        .controller('ButtonsController', ButtonsController);

    function ButtonsController($scope, $controller, $element, EditEntityStorage) {
        /* jshint validthis: true */
        'ngInject';
        var vm = this;
        var baseController = $controller('BaseController', { $scope: $scope, $element: $element });
        angular.extend(vm, baseController);
        var self = $scope.vm;
        var componentSettings = self.setting.component.settings;

        self.template = self.setting.component.settings.template;
        self.label = componentSettings.label;
        self.type = self.setting.type;
        self.entityId = self.setting.entityId;
        self.readonly = componentSettings.readonly;

        /** if template is set as a html-file */
        var htmlPattern = /[^\s]+(?=\.html$)/;

        if (angular.isString(self.template) || angular.isFunction(self.template)) {
            var template = self.template;
            if (angular.isFunction(self.template)) {
                self.template = self.template($scope);
            }
            if (self.template && htmlPattern.test(self.template)) {
                self.template = $templateCache.get(template);
                if (self.template === undefined) {
                    $translate('ERROR.FIELD.TEMPLATE').then(function(translation) {
                        console.warn(translation.replace('%template', template));
                    });
                }
            }
        }

        EditEntityStorage.addButtonController(self);

        $scope.$on("$destroy", onDestroyHandler);
        function onDestroyHandler() {
            EditEntityStorage.deleteButtonController(self);
        }
    }
})();
