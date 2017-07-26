## ue-autocomplete

Поле аналогично полям [ue-checkbox](ue-checkbox.md) и [ue-dropdown](ue-dropdown). Существенным различием в работе данного поля является то, что данные выбираются не
из списка, а предоставляются пользователю как результат поиска по введенном слову / части слова.

```javascript
{
    name: 'ue-autocomplete',
    settings: {
        label: 'Autocomplete label',        
        dataSource: {
            standart: 'YiiSoft',
            data: [
                { id: 1, title: 'Value1'},
                { id: 2, title: 'Value2'},
                { id: 3, title: 'Value3'}
            ],
            scheme: {                
                model: {
                    id: 'id',
                    label: 'title',
                    fields: [
                        { name: 'id'},
                        { name: 'title'}
                    ]
                }
            }
        },
        hint: 'Это поле автозаполнения',
        multiple: true,
        multiname: 'new_value',
        draggable: true,
        width: 6,
        templates: {
            preview: '<span> {{value}} </span>',
            edit: function(scope) {
                scope.clickHandler = function(e) { /* логика */ };
                return '<input type="text" data-ng-disabled="readonly" name="{{name}}" data-ng-click="clickHandler($event)" data-ng-model="value" class="form-control input-sm"/>'
            },
            filter: 'module/components/templates/filterTemplate.html'
        },
        defaultValue: 'bla-bla-bla'
    }
}
```

| Параметр | Тип | Описание | Обязательный параметр? | Значение по-умолчанию |
| --- | --- | --- | --- | --- |
| name | string | Название компонента. | + | - |
| settings | object | Объект настройки компонента | + | - |
| settings[label] | string | Название поля (выводится в интерфейсе редактора) | + | - |
| settings[hint] | string | Текстовая информационная подсказка, выводимая слева от заголовка поля. | - | - |
<<<<<<< HEAD
| settings[draggable] | boolean | Разрешает перенос значений компонента в множественном режиме. Имеет силу только при уставленном параметре `multiple: true` | - | `false` |
| settings[required] | bool | Выделяет заголовок поля жирным, говоря об обязательности заполнения. | - | false |
| settings[serverPagination] | boolean | Флаг серверной пагинации. Если принимает значение `true`, то компонент будет делать запросы за всеми страницами с данными. | - | `false` |
| settings[multiple] | bool | Параметр отвечает за указание возможности поля принимать множественные значения. | - | false |
| settings[readonly] | bool | Параметр отвечает за указание активности компонента с точки зрения взаимодействия с пользователем. | - | false |
| settings[template] | object | Объект для настройки шаблонов. | - | - |
| settings[templates][preview] | string или function | Строка с HTML-кодом шаблона, функция, возвращающая шаблон, или путь до шаблона в режиме просмотра (например отображение в таблице). | + | - |
| settings[templates][edit] | string или function  | Строка с HTML-кодом шаблона, функция, возвращающая шаблон, или путь до шаблона в режиме редактирования (например отображение на форме редактирования). | + | - |
| settings[templates][filter] | string или function  | Строка с HTML-кодом шаблона, функция, возвращающая шаблон, или путь до шаблона в режиме фильтра (например, отображение в фильтре). | + | - |
| settings[multiname] | string | Ключ, который будет использован для создания массива в запросе к бекенду в том случае, если поле работает в множественном режиме. Если ключ не установлен, то на бекенд отправится массив вида `['value1', 'value2', 'value3']`. Если ключ установлен, например: `multiname:"value"`, то на бекенд отправится массив вида `[["value"=>"value1"], ["value"=>"value2"], ["value"=>"value3"]]` | - | - |
| settings[width] | int | Ширина поля в единицах bootstrap-сетки, принимаемое значении от 1 до 6. | - | 6 |
| settings[defaultValue] | string | Значение поля по-умолчанию. | - | - |
| settings[dataSource] | object | Источник данных | + | - |

Одновременно может быть указан только один из форматов получения данных для поля ( values или valuesRemote ).