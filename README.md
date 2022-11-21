# GTA: Genetic Tank Algoritm

Искуственный интелект для танков 2d c генетическим методом обучения

## Первый запуск

В консоле в папке проеката
1. Установка пакетов

        npm install -D

2. Запуск сервера

        node .\server\index.mjs

3. Запуск приложения

        npm run dev

## Запуск
В консоле в папке проеката
1. Запуск сервера

        node .\server\index.mjs

2. Запуск приложения

        npm run dev
        
## Строение сети
![image](https://user-images.githubusercontent.com/71215188/203163277-2d80816a-b4e3-4b75-99a5-93842c6a8d10.png)
Танк видит несколько лучей. На вход можно подать то, какие лучи пересечены и на каком расстоянии. 
В файле AISettings.ts можно управлять лучами:
1. Количество лучей
2. Длинна лучей
3. Угол обзора

Выходом является угловая скорость, линейная скорость, выстрел

Возможные мутации (вероятность того, что они произойдут задаётся в AISettings.ts): 
1. Изменение веса
2. Удаление связи
3. Создание связи

Так же в AISettings есть другие параметры игрока, управляемого нейросетью. \
Параметры карты (размер, количество целей) находятся в файле game.ts