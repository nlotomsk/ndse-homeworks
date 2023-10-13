# Домашнее задание к занятию «2.6. База данных и хранение данных»

**Правила выполнения домашней работы:** 
* выполняйте домашнее задание в отдельной ветке проекта на GitHub,
* в поле для сдачи работы прикрепите ссылку на ваш проект в Git,
* присылать на проверку можно каждую задачу по отдельности или все задачи вместе, 
* во время проверки по частям ваша домашняя работа будет обозначаться статусом «На доработке»,
* любые вопросы по решению задач задавайте в канале вашей группы.


#### Задание 1
Чтобы в будущем вам было легче работать с **MongoDB**, изучите раздел 
документации об использовании [**CRUD Operations**](https://docs.mongodb.com/manual/crud/).

#### Задание 2
В файле **README.md** написать следующие запросы для **MongoDB**:
 - запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**,

```sql
db.books.insertMany([
{title: "book_1", description: "str_book", authors: "S.Book"},
{title: "book_2",description: "str_book_book", authors: "B.B. Book"},
{title: "book_1", description: "str_book", authors: "S.Book"},
{title: "book_2",description: "str_book_book", authors: "B.B. Book"}
])

```
   
 - запрос для *поиска* полей документов коллекции **books** по полю *title*,

```sql
db.books.find({title: ""})
```

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/e445e19f-1af9-4887-a681-e6aa77b9ffaf)
 
 - запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи.

```sql
db.books.updateOne({ "_id":ObjectId("65296d20e3908e86b11037c5")},{$set:{description:"str_book_new", authors:"S.P.Book"}})
```

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/6f581091-c9c7-4b3b-8459-8cfba7adfd5b)

 
*Каждый документ коллекции **books** должен содержать следующую структуру данных: 
```javascript
{
  title: "string",
  description: "string",
  authors: "string"
}
``` 
