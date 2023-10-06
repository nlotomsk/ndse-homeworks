# Домашнее задание к занятию «2.4 Docker, установка и настройка»

**Правила выполнения домашней работы:** 
* Выполняйте домашнее задание в отдельной ветке проекта на гитхабе.
* В поле для сдачи работы прикрепите ссылку на ваш проект в Git.
* Присылать на проверку можно каждую задачу по отдельности или все задачи вместе. 
* Во время проверки по частям ваша домашняя работа будет со статусом «На доработке».
* Любые вопросы по решению задач задавайте в Slack.

## Задание 1 - Docker CLI
1. Загрузите образ `busybox` последней версии

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/85d401c1-050f-44a0-8b69-dc2e8201e85d)

   
2. Запустите новый контейнер `busybox` с командой `ping` сайта `netology.ru`, и количеством пингов 7, поименуйте контейнер `pinger`

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/ed479706-c830-4e68-804a-8675334d1e6d)

3. Выведите на список всех контейнеров - запущенных и остановленных

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/d6cff9be-8c42-43cf-be01-74cff3ac72b5)
   
4. Выведите на экран логи контейнера с именем `pinger`

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/04d57dc6-3ab5-4a59-842f-d8d440ad1390)
   
5. Запустите второй раз контейнера с именем `pinger`

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/9083a312-c567-4e63-8b53-152283d1fdf7)
   
6. Выведите на список всех контейнеров - запущенных и остановленных

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/ab9e18d9-4c38-4745-b9b0-c9b295a753d4)

7. Выведите на экран логи контейнера с именем `pinger`

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/6ba098fb-e3a8-447e-b11b-8cfba29fdb3d)

8. Определите по логам общее количество запусков команды `ping` и какое общее количество отправленых запросов

Запусков команды 2. Общее количество отправленных запросов 14.

9. Удалите контейнер с именем `pinger`

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/96cd2e02-e881-4c65-858c-e45b38e80ba6)

10. Удалите образ `busybox`

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/c4a93eff-05b9-4883-9097-4a67522a93b2)
   

### Критерии выполнения

[Текстовые файлы с текстом команд](009-01.md) и результатом их выполнения помещены в git репозиторий.

## Задание 2 - Environment Variables

Используя Docker CLI выполните следующие действия:
1. Загрузите образ node версии 20.8

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/ee96dcf5-5c56-42c1-91be-691eb73fd372)
   
2. Запустите контейнер node в интерактивном режиме подключения терминала, поименуйте его `mynode`, передайте две переменные среды `NAME=<ваше имя>` и `SURNAME=<ваша фамилия>`

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/07aff16d-4944-45f1-af44-c73637059db2)

3. В интерактивной среде выполнения node выполните скрипт, который выведет на экран приветсвтие: `Привет, <ваше имя> <ваша фамилия>!`, эти данные должны быть получены из переменных среды

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/24522af7-b640-43e1-b0cd-993818844c9a)

4. Остановите контейнер

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/02b7e3d0-e2ad-4f37-b288-d5d97e0f324c)

5. Удалите образ node версии 20.8

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/f4c3a4fe-18c0-42fc-b15f-d0b1044336f2)


### Критерии выполнения

[Текстовые файлы с текстом команд](009-02.md) и результатом их выполнения помещены в git репозиторий.

## Задание 3 - Volumes

Используя Docker CLI выполните следующие действия:
1. Загрузите образ node версии 20.8

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/87fcfd7a-d501-46ac-b03f-8b414a4942dd)

2. Запустите контейнер с именем `first_node` из образа node версии 15.14 в фоновом режиме, подключив папку `data` из текущей директории в `/var/first/data` контейнера

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/b6f814f3-8db2-4af7-a318-3746cc3e3fb6)

3. Запустите контейнер с именем `second_node` из образа node версии 15.14 в фоновом режиме, подключив папку `data` из текущей директории в `/var/second/data` контейнера

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/8657e100-cf09-42a2-95d9-c3f9630455f9)

4. Подключитесь к контейнеру `first_node` с помощью exec и создайте текстовый файл любого содержания в `/var/first/data`

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/116af487-6aa0-4955-8081-76920fe5d568)

5. Добавьте еще один файл в папку `data` на хостовой машине

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/95d02a2b-85ab-4abd-a1e2-0d40f79f549b)

6. Подключитесь к контейнеру `second_node` с помощью `exec` и получите список файлов в директории `/var/second/data`, выведете на экран содержимое файлов

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/f55c7fe5-dcf8-44bc-9e09-a7d61f92f28b)

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/f253799f-a1c6-4a97-978a-6955c2396948)

7. Остановите оба контейнера

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/455e3903-fe86-4c81-9672-f0abec503a2b)

8. Удалите оба контейнера

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/8921ac5e-03e7-43eb-bd3c-fc57f44840b5)

9. Удалите образ node версии 20.8

![image](https://github.com/nlotomsk/ndse-homeworks/assets/93542374/fbb4d5d1-587a-464e-bcbe-6359f9ba4e30)


### Критерии выполнения

[Текстовые файлы с текстом команд](009-03.md) и результатом их выполнения помещены в git репозиторий.
