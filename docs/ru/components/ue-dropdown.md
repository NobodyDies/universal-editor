## ue-dropdown

Поле с выпадающим списком. Данные для списка могут быть получены двумя способами:

* из описания конфигурации поля,
* из другого API.

```javascript
{
    name: 'ue-dropdown',
    settings: {
        label: 'Dropdown label',
        hint: 'Это поле выпадающего списка',
        multiple: true,
        multiname: 'new_value',
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
        width: 6,
        search: true,
        templates: {
            preview: '<span> {{value}} </span>',
            edit: function(scope) {
                scope.clickHandler = function(e) { /* логика */ };
                return '<input type="text" data-ng-disabled="readonly" name="{{name}}" data-ng-click="clickHandler($event)" data-ng-model="value" class="form-control input-sm"/>'
            },
            filter: 'module/components/templates/filterTemplate.html'
        },
        defaultValue: 'bla-bla-bla',
        tree: {
            selectBranches: false
        }
    }
}
```

| Параметр | Тип | Описание | Обязательный параметр? | Значение по-умолчанию |
| --- | --- | --- | --- | --- |
| name | string | Название компонента. | + | - |
| settings | object | Объект настройки компонента | + | - |
| settings[label] | string | Название поля (выводится в интерфейсе редактора) | + | - |
| settings[hint] | string | Текстовая информационная подсказка, выводимая слева от заголовка поля. | - | - |
| settings[multiple] | bool | Параметр отвечает за указание возможности поля принимать множественные значения. | - | false |
| settings[required] | bool | Выделяет заголовок поля жирным, говоря об обязательности заполнения. | - | false |
| settings[readonly] | bool | Параметр отвечает за указание активности компонента с точки зрения взаимодействия с пользователем. | - | false |
| settings[templates] | object | Объект для настройки шаблонов. | - | - |
| settings[templates][preview] | string или function | Строка с HTML-кодом шаблона, функция, возвращающая шаблон, или путь до шаблона в режиме просмотра (например отображение в таблице). | + | - |
| settings[templates][edit] | string или function  | Строка с HTML-кодом шаблона, функция, возвращающая шаблон, или путь до шаблона в режиме редактирования (например отображение на форме редактирования). | + | - |
| settings[templates][filter] | string или function  | Строка с HTML-кодом шаблона, функция, возвращающая шаблон, или путь до шаблона в режиме фильтра (например, отображение в фильтре). | + | - |
| settings[multiname] | string | Ключ, который будет использован для создания массива в запросе к бекенду в том случае, если поле работает в множественном режиме. Если ключ не установлен, то на бекенд отправится массив вида `['value1', 'value2', 'value3']`. Если ключ установлен, например: `multiname:"value"`, то на бекенд отправится массив вида `[["value"=>"value1"], ["value"=>"value2"], ["value"=>"value3"]]` | - | - |
| settings[width] | int | Ширина поля в единицах bootstrap-сетки, принимаемое значении от 1 до 6. | - | 6 |
| settings[search] | bool | Вывод поля для поиска по доступным вариантам. | - | false |
| settings[defaultValue] | string | Значение поля по-умолчанию. | - | - |
| settings[dataSource] | object | Источник данных | + | - |
| settings[tree] | object | Объект для настройки режима дерева. | - | - |
| settings[tree][selectBranches] | bool | Включает возможность выбора ветвей — групп, объединяющих элементы выпадающего списка.  | + | - |

Одновременно может быть указан только один из форматов получения данных для поля ( values или valuesRemote ).