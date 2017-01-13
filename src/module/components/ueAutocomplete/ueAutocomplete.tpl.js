(function(module) {
try {
  module = angular.module('universal.editor.templates');
} catch (e) {
  module = angular.module('universal.editor.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('module/components/ueAutocomplete/ueAutocomplete.html',
    '\n' +
    '<div ng-class="{\'field-wrapper row\':!vm.options.filter, \'filter-wrapper-field\': vm.options.filter}">\n' +
    '    <div on-render-template="on-render-template" ng-class="{\'component-filter\': vm.templates.filter &amp;&amp; vm.regim === \'filter\',                   \'component-edit\': vm.templates.edit  &amp;&amp; vm.regim === \'edit\',                   \'component-preview\': vm.templates.preview &amp;&amp; vm.regim === \'preview\'}" class="component-template"></div>\n' +
    '    <div ng-if="(!vm.templates.edit &amp;&amp; vm.regim === \'edit\') || (!vm.templates.filter &amp;&amp; vm.regim === \'filter\')" ng-class="{\'component-filter\': vm.regim === \'filter\'}" class="component-edit">\n' +
    '        <label ng-if="!vm.options.filter &amp;&amp; !!vm.label" class="field-name-label">\n' +
    '            <div data-ng-if="!!vm.hint" class="field-hint">\n' +
    '                <div ng-bind="::vm.hint" class="hint-text"></div>\n' +
    '            </div><span data-ng-class="{\'editor-required\': vm.required}" ng-bind="::vm.label"></span>\n' +
    '        </label>\n' +
    '        <div ng-class="{\'filter-inner-wrapper\': vm.options.filter, \'field-element\': !vm.options.filter}" ng-style="{\'overflow:auto\':vm.multiple}" ng-if="!vm.disabled">\n' +
    '            <div ng-class="vm.classComponent">\n' +
    '                <div data-ng-class="{&quot;active&quot; : vm.isActivePossible, &quot;disabled-input&quot;: vm.readonly}" data-ng-click="inputFocus()" class="autocomplete-input-wrapper form-control">\n' +
    '                    <div data-ng-repeat="acItem in vm.selectedValues" data-ng-show="acItem[vm.field_search]" data-ng-if="vm.multiple" class="autocomplete-item">{{acItem[vm.field_search]}}<span data-ng-click="vm.removeFromSelected($event, acItem)" data-ng-if="!vm.readonly" class="remove-from-selected">×</span></div>\n' +
    '                    <input ng-show="vm.preloadedData" type="text" ng-disabled="vm.readonly" data-ng-model="vm.inputValue" data-ng-focus="vm.focusPossible(true)" data-ng-blur="vm.focusPossible(false)" size="{{vm.sizeInput}}" data-ng-style="vm.classInput" data-ng-keydown="vm.deleteToAutocomplete($event)" placeholder="{{vm.placeholder}}" data-ng-class="!vm.isActivePossible ? &quot;color-placeholder&quot; : &quot;&quot;" class="autocomplete-field-search"/><span data-ng-if="!vm.multiple &amp;&amp; !!vm.selectedValues.length &amp;&amp; !vm.readonly" data-ng-click="vm.removeFromSelected($event, vm.selectedValues[0])" class="selecte-delete selecte-delete-autocomplete">×</span>\n' +
    '                    <div data-ng-show="vm.searching || !vm.preloadedData" class="loader-search-wrapper">\n' +
    '                        <div class="loader-search">{{\'LOADING\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                    <div data-ng-if="!vm.readonly &amp;&amp; (vm.possibleValues.length &gt; 0) &amp;&amp; vm.showPossible" class="possible-values possible-autocomplete active possible-bottom">\n' +
    '                        <div class="possible-scroll">\n' +
    '                            <div data-ng-repeat="possible in vm.possibleValues" data-ng-mouseover="vm.activeElement = $index" data-ng-mousedown="vm.addToSelected($event, possible)" data-ng-class="vm.activeElement == $index ? \'active\' : \'\'" class="possible-value-item">{{::possible[vm.field_search]}}</div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div ng-if="vm.disabled" class="disabled_field">\n' +
    '            <div><span ng-bind="::vm.previewValue" data-ng-show="!vm.loadingData" ng-if="!vm.multiple"></span>\n' +
    '                <div ng-repeat="value in vm.previewValue track by $index" data-ng-show="!vm.loadingData" ng-if="vm.multiple"><span ng-bind="value"></span></div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div ng-if="!vm.templates.preview &amp;&amp; vm.regim === \'preview\'" class="component-preview"> \n' +
    '        <div data-ng-show="vm.loadingData" class="loader-search-wrapper">\n' +
    '            <div class="loader-search">{{\'LOADING\' | translate}}</div>\n' +
    '        </div><span ng-bind="::vm.previewValue" data-ng-show="!vm.loadingData" ng-if="!vm.multiple"></span>\n' +
    '        <div ng-repeat="value in vm.previewValue track by $index" data-ng-show="!vm.loadingData" ng-if="vm.multiple"><span ng-bind="value"></span></div>\n' +
    '    </div>\n' +
    '    <div ng-if="!vm.options.filter" class="field-error-wrapper">\n' +
    '        <div data-ng-repeat="err in vm.error track by $index" class="error-item alert alert-danger">{{err}}</div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();
