### Источник данных (DataSource)

Источник данных – центральная базовая структура, используемая Универсальным редактором при составлении конфигураций. DataSource имеет единый формат для описания работы с локальными и удаленными данными.

В возможности Источника данных входит:
1. Определение стандарта взаимодействия с API (standard);
2. Описание CRUD-операций (transport);
3. Описание схемы данных (schema) – перечень составляющих компонентов, предобработка данных, определение поля с id, задание полей для описания родительских записей, количества дочерних записей и т. д. 
4. Наполнение компонента локальными значениями;
5. Задавать многоуровневую сортировку (поле, направление сортировки);
6. Разрешать / запрещать серверную пагинацию.

Общий вид dataSource:

```javascript

{
    standard: 'YiiSoft',
    data: [
        {id: 1, title: 'Record1', type: 'type1', total: 20},
        {id: 2, title: 'Record2', type: 'type1', total: 30},
        {id: 3, title: 'Record2', type: 'type2', total: 50}
    ],
    sortBy: [ 'total', '-type'],
    transport: {
        serverPagination: true,
        create: {
            contentType: 'application/x-www-form-urlencoded',
            data: function(item) {
                return item
            },
            params: function(item) {
                return {};
            }
            method: 'POST',
            url: '/domain/entities/new',
            handlers: {
                before: function (config, e) {
                    e.preventDefault(); // this is canceled request
                },
                error: function (response, e) {},
                success: function (response, e) {},
                complete: function (e) {}
            }
        },
        update: {
            contentType: 'application/x-www-form-urlencoded',
            data: function(item) {
                return item
            },
            method: 'PUT',
            url: '/domain/entities/:id',
            handlers: {
                before: function (config, e) {
                    e.preventDefault(); // this is canceled request
                },
                error: function (response, e) {},
                success: function (response, e) {},
                complete: function (e) {}
            }
        },
        destroy: {
            contentType: 'application/x-www-form-urlencoded',
            data: function(item) {
                return item
            },
            method: 'DELETE',
            url: function(item) { 
                return '/domain/entities/' + item.id; 
            }
        },
        read: {
            contentType: 'application/x-www-form-urlencoded',
            data: function(item) {
                return item
            },
            headers:  function(item) {
                return item
            },
            params: function(item) {
                return {};
            }
            method: 'GET',
            url: '/domain/entities'
        }
    },     
    scheme: {
        dataKey: 'items', // может быть сложный путь типа 'field.items'
        parse: function(response) {
            return response.data;
        },
        model: {
            id: 'id', 
            label: 'title',
            tree: {
                parentKey: 'parentId',
                childrenCountKey: 'children_count',
                selfKey: 'self'
            },
            fields: [
                {
                    name: 'id',
                    component: {
                        name: 'ue-string',
                        settings: {
                            label: 'ID',
                            validators: [{type: 'number'}],
                            disabled: true
                        }
                    }
                },
                {
                    name: 'title',
                    component: {
                        name: 'ue-string',
                        settings: {
                            label: 'Title'
                        }
                    }
                },
                {
                    name: 'type',
                    component: {
                        name: 'ue-dropdown',
                        settings: {
                            label: 'Title',
                            dataSource: {
                                data: [
                                    {id: 'type1', title: 'Тип1'},
                                    {id: 'type2', title: 'Тип2'}
                                ]
                            }
                        }
                    }
                },
                {
                    name: 'total',
                    component: {
                        name: 'ue-string',
                        settings: {
                            label: 'total',
                            validators: [{ type: 'number' }],
                            disabled: true
                        }
                    }
                },
            ]
        }
    }
}

```

| Параметр | Тип | Описание | Обязательный параметр? | Значение по-умолчанию |
| --- | --- | --- | --- | --- |
| standard | string | Cтиль построения архитектуры.  | + | - |
| data | array | Массив локальных значений.  | - | - |
| sortBy | array | Описание многоуровневой сортировки, заданная по-умолчанию. Представляет собой массив значений, элементы которого по-умолчанию передаются через запятую в READ-запросах в качестве query-параметра сортировки.  | - | - |
| transport | object | Описание CRUD-операций.  | - | - |
| transport.url | string | URL-запроса. Используется по-умолчанию в запросах, если в секциях `read`, `create`, `update`, `destroy` не указан URL.  | - | Устанавливается сервисом, определяющим стиль построения архитектуры. |
| transport.read | object | Описание READ-запроса.  | - | - |
| transport.create | object | Описание CREATE-запроса.  | - | - |
| transport.update | object | Описание UPDATE-запроса.  | - | - |
| transport.destroy | object | Описание DELETE-запроса.  | - | - |
| transport.{`read`,`create`,`update`,`destroy`}.contentType | string | Тип контента используемый при отправке данных на сервер.  | - | Устанавливается сервисом, определяющим стиль построения архитектуры. |
| transport.{`read`,`create`,`update`,`destroy`}.method | string | Тип запроса (PUT, POST, UPDATE...).  | - | Устанавливается сервисом, определяющим стиль построения архитектуры. |
| transport.{`read`,`create`,`update`,`destroy`}.headers | function или object | Коллбек возвращающий заголовки запроса или непосредственно json-объект с заголовками. Коллбек принимает в качестве аргумента объект с данными, определяемые компонентом. | - | Устанавливается сервисом, определяющим стиль построения архитектуры. |
| transport.{`read`,`create`,`update`,`destroy`}.data | function | Коллбек возвращающий тело запроса в виде json-объекта. Коллбек принимает в качестве аргумента объект с данными, определяемые компонентом.  | - | - |
| transport.{`read`,`create`,`update`,`destroy`}.params | function | Коллбек возвращающий query-параметры запроса или непосредственно json-объект. Query-параметры отправлются как часть адреса в запросе. Коллбек принимает в качестве аргумента объект с данными, определяемые компонентом.    | - | - |
| transport.{`read`,`create`,`update`,`destroy`}.url | string или function | URL-запроса или коллбек возвращающий URL. Коллбек принимает в качестве аргумента объект с данными, определяемые компонентом.  | - | Наследуется из `transport.url` |
| transport.{`read`,`create`,`update`,`destroy`}.handlers | object | Пред- и пост-обработчики запроса.  | - | - |
| transport.{`read`,`create`,`update`,`destroy`}.handlers.before | function | Обработчик, вызываемый перед отправкой запроса. Имеется возможность при необходимости отменить запрос. | - | - |
| transport.{`read`,`create`,`update`,`destroy`}.handlers.error | function | Обработчик, вызываемый в случае ошибочного запроса. Полезен для дополнительной обработки ошибок.  | - | - |
| transport.{`read`,`create`,`update`,`destroy`}.handlers.success | function | Обработчик, вызываемый в случае удачного запроса.   | - | - |
| transport.{`read`,`create`,`update`,`destroy`}.handlers.complete | function | Обработчик, вызываемый после окончании запроса.  | - | - |
| transport.serverPagination | boolean | Флаг наличия серверной пагинации.  | + | true |
| scheme | object | Описание схемы работы с данными. | - | - |
| scheme.dataKey | string | Имя поля с данными отправляемые сервером. | - | Устанавливается сервисом, определяющим стиль построения архитектуры. |
| scheme.parse | function | Коллбек для переработки значений, приходящих с сервера. Данные не всегда могут отдаваться в нужном формате. Коллбек должен возвращать данные, с которыми умеет работать компонент. В качестве аргумента принимает ответ от сервера. | - | - |
| scheme.model | object | Описание модели данных | + | - |
| scheme.model.id | string | Имя поля с первичным ключом, по которому редактор идентифицирует записи.  | + | - |
| scheme.model.label | string | Значение, которое будет отображаться в компоненте. | - | такое же как `scheme.model.id` |
| scheme.model.tree | object | Секция по работе с деревом.  | - | - |
| scheme.model.tree.parentKey | string | Имя поля c идентификатором родительского узла.  | - | - |
| scheme.model.tree.childrenKey | string | Имя поля c перечнем дочерних узлов.  | - | - |
| scheme.model.tree.childrenCountKey | string | Имя поля, которое хранит количество дочерних узлов.  | - | - |
| scheme.model.tree.selfKey | string | Если элементом дерева является не сама выводимая сущность, а узел, хранящий в себе сущность, то данная настройка указывает на поле, где хранится сущность. Пример узла, {id: 1, self: { сущность дерева }, children: [  массив подобных узлов ]}  | - | - |
| scheme.model.fields | array | Массив конфигураций компонентов, описывающий состав полей. Массив имен этих компонентов будет запрашиваться при обращении к АПИ, для ускорения доставки данных, в случае, если ответ сервера только этими полями неограничен. (Перечень компонентов)  | + | - |

## Многоуровневая сортировка (sortBy)

Настройка `sortBy` позволяет задать сортировку по-умолчанию. Представляет собой массив значений, элементы которого по-умолчанию передаются через запятую в READ-запросах в качестве query-параметра сортировки. 
Порядок задания оказывает влияние на конечный результат, согласно алгоритму сортировок такого вида.
Например, при условии работы с сервисом `YiiSoft` это означает, что значение сортировок по-умолчанию

```javascript
sortBy: ['total', '-type']
```
 и

 ```javascript
sortBy: ['-type', 'total']
```

даст разный результат. В первом случае все значения сначала отсортируются по возрастанию по полю `total`, а затем каждая группа записей с одинаковым значением в поле `total` отсортируется по убыванию по полю `type` независимо от других групп. Во втором случае все произойдет по той же схеме но в обратном порядке полей.

По-умолчанию многоуровневая сортировка в запросах передается через запятую в виде `http://domain?sort=field,-field2,field3`. Чтобы поменять формат сортировки, нужно реализовать свой сервис по работе с API (см. подробнее [здесь](../server/README.md)).

## Описание CRUD-операций (transport)

Конфигурация предназначена для описания запросов на создание, обновление, чтение и удаления данных. Секции create (создание), read (чтение), update (обновление) и delete (удаление) устроены однотипно и наполняют соответствующие запросы параметрами contentType, method, headers, params, data (подробнее описание этих параметров можно найти https://docs.angularjs.org/api/ng/service/$http#usage).
Секция `handlers` передает обработчики событий запроса.

Настройка `handlers.before` дает возможность поймать момент до отправки запроса. Аргумент `config` - это объект с настройками, который используется для генерации HTTP-запроса (подробнее [здесь](https://docs.angularjs.org/api/ng/service/$http#usage). Второй аргумент включает вспомогательный метод `preventDefault` для отмены поведения по-умолчанию. В данном случае его вызов отменит выполнение запроса.

```javascript
handlers: {
  before: function (config, e) {
      e.preventDefault(); // отмена запроса
  }
}
```

Функция `handlers.success` вызывается, если запрос получил успешный ответ от сервера (включает статусы ответов 200 – 299), который обработчик данного события получает в качестве аргумента.
Функция `handlers.error` вызывается, если запрос получил ошибочный ответ от сервера (любые статусы >299 и <200), который обработчик данного события получает в качестве аргумента.
Функция `handlers.complete` вызывается по окончанию запроса (не имеет значение ошибочный он или успешный).

## Описание схемы (scheme)

В секции `scheme` описывается структура данных в виде перечня включаемых компонентов (`fields`) и способ их обработки. Сервер может вернуть любой json-объект. И чтобы сообщить компоненту, откуда брать данные можно воспользоваться двумя способами в зависимости от ситуации:
1. Если сервер вернул данные в нужном формате, но они сокрыты где-то внутри объекта, то используется `dataKey` и можно прописать путь к данным (например, `items` или `key.items.data`).
2. Если сервер вернул данные в другом виде непригодные для обработки, то можно передать коллбек в конфигурацию `parse`, который преобразует и вернет данные в нужном формате, то есть редактор, получив данные от сервера, направляет их на обработку через коллбек и отправляет компоненту.

Если заданы оба параметра `dataKey` и `parse`, то редактор обратится к свойству в `dataKey`, а после передаст в `parse`.

Вся информация о режиме работы дерева хранится в секции `scheme.tree`.
