<!-- Кнопки переключения языков в самом верху файла -->

<p align="right">

&#x20; <a href="#ru-version">🇷🇺 Русский</a> |

&#x20; <a href="#en-version">🇺🇸 English</a>

</p>



<div id="ru-version"></div>



# 🐾 Это Лапки Сюзанны! Стартовый шаблон для современной веб-вёрстки на базе менеджера задач `Gulp 4` и `5`.

🐈‍⬛ Вариант `gulpfile.js` с синтаксисом `CommonJS` и стабильными версиями плагинов, совместимыми с `Gulp 4` и `5` на `Node v22.12.0`.



## ✨ Возможности сборки



**- Управление структурой HTML**

Позволяет разделять код страниц на независимые компоненты и подключать их в один файл. Автоматически оптимизирует разметку, оборачивая изображения в тег `picture` для поддержки формата `WebP`.



**- Обработка стилей SCSS и CSS**

Компилирует файлы `SCSS` в `CSS`, группирует медиа-запросы в конец документа и автоматически расставляет вендорные префиксы для поддержки последних пяти версий браузеров. На выходе создает обычную и сжатую (`.min.css`) версии стилей.



**- Транспиляция и сжатие JavaScript**

Склеивает отдельные JS-файлы в один, пропускает код через `Babel` для совместимости со старыми браузерами и оптимизирует размер финального скрипта с помощью минификации (`.min.js`).



**- Оптимизация и автоматизация графики**

Сжимает изображения без потери качества и параллельно создает их копии в современном формате `WebP`. Автоматически следит за удалением картинок: если удалить файл в исходниках, он сотрется и в финальной папке `dist`. Дополнительно умеет собирать `SVG`-иконки в единый спрайт.



**- Конвертация и подключение шрифтов**

Преобразует шрифты формата `OTF` в `TTF`, затем конвертирует их в веб-форматы `WOFF` и `WOFF2`, после чего автоматически прописывает правила `@font-face` в файл стилей.



**- Локальный сервер и защита от ошибок**

Запускает локальный сервер, который автоматически обновляет страницу в браузере при сохранении любых изменений в коде. Специальный плагин `plumber` перехватывает синтаксические ошибки, выводит их в виде системных уведомлений и исключает остановку процесса сборки из-за ошибок в `HTML`, `SCSS` или `JS` файлах.





## 🚀 Быстрый старт



**Системные требования:** `Node.js v16.0` или выше, `Gulp v4.0` / `v5.0`.



Чтобы запустить свой проект на сборке Gulp "Лапки Сюзанны" нужно из этого стартового шаблона в папку своего проекта скопировать папку `#src`, файл `gulpfile.js`, файл `package-lock.json` и файл `package.json`.

Затем в папке проекта нужно открыть терминал и запустить команду `npm i`, чтобы автоматически скачать и установить все плагины и библиотеки (зависимости), которые необходимы для работы сборки.



Обратите внимание, что в стартовом шаблоне в папке `#src` есть папки `fonts` и `img`, которые по умолчанию уже содержат файлы со шрифтами в форматах `OTF` и `TTF`, и картинки в форматах `JPG` и `SVG`. Это сделано для того, чтобы вы могли проверить работу сборки на вашей версии `Gulp`. Рекомендую на этой стадии не удалять шрифты и картинки по умолчанию.



**После запуска команды `npm i` необходимо запустить конвертацию шрифтов:**



- Запустите команду `npm run otf` для конвертации шрифта в формате `OTF` в формат `TTF`.

- Затем запустите команду `npm run fonts` для конвертации шрифта в формате `TTF` в форматы `WOFF` и `WOFF2`.

- Запустите команду `npm run sprite` для одноразового создания спрайта файлов в формате `svg`.



Каждый раз при добавлении в проект шрифта в формате `OTF` выполняйте его конвертацию двумя последовательными командами: `npm run otf`, `npm run fonts`. При добавлении шрифта в формате `TTF` — одной командой `npm run fonts`.



**После конвертации шрифтов необходимо запустить сборку `Gulp`:**



- Запустите команду `gulp`.



После запуска шрифтов и сборки `Gulp` в папке `dist` вы должны увидеть появление шрифтов в форматах `WOFF` и `WOFF2`, и картинок в форматах `WebP` и `SVG`. Причём в папке `dist` в файле `index.html` картинки в формате `WebP` должны обернуться в тег `picture`, а с картинками в формате `SVG` этого не должно произойти.



Если конвертация шрифтов и картинок прошла успешно, и в папке `dist` появились папки `css` и `js` с файлами `style.min.css` и `script.min.js` соответственно, то теперь вы можете провести необходимые изменения в папке `#src` (удалить шрифты, картинки и содержание файла `fonts.scss`, провести необходимые изменения в файлах `html`). Директиву `@mixin` и директиву `@import` в файле `style.scss` следует оставить без изменений!





## 📁 Структура папок (КРАТКО)



`#src/` — папка с исходным кодом (ваша рабочая область).

`dist/` — папка с чистовым оптимизированным кодом (создается автоматически при сборке).





## 🛠️ Команды управления (РЕЗЮМЕ):



Из стартового шаблона "Лапки Сюзанны" в папку своего проекта нужно скопировать папку `#src`, файл `gulpfile.js`, файл `package-lock.json` и файл `package.json`. Затем в терминале запускать последовательно следующие команды:



* `npm i` — для установки зависимостей;

&#x20; В корне проекта появится папка `node_modules` с установленными пакетами.



* `npm run otf` — для одноразовой конвертации исходных `OTF` шрифтов в формат `TTF`;

&#x20; В папке `fonts`, которая находится внутри папки `#src`, в результате конвертации файлов в формате `OTF` рядом появятся файлы в формате `TTF`;



* `npm run fonts` — для одноразовой конвертации исходных `TTF` шрифтов в форматы `WOFF` и `WOFF2`, и автоматической записи `@include` в файл `fonts.scss`;

&#x20; Появится папка `dist` с вложенной папкой `fonts`. В папке `fonts` появятся файлы в форматах `WOFF` и `WOFF2`.



* `npm run sprite` — для одноразового создания спрайта файлов в формате `svg` на случай, если в вашем проекте нет папки `dist` или  папка `dist` пуста и не содержит файл `icons.svg`;

&#x20; В папке `icons`, которая находится внутри папки `img`, появится файл `icons.svg`.



* `npm start` (или просто `gulp`) — запуск проекта в режиме разработки: включает локальный сервер, отслеживает изменения в коде и автоматически собирает проект в реальном времени с живой перезагрузкой страницы.

&#x20; Если страница открылась в браузере с надписью `Cannot GET /`, то просто перезагрузите страницу.





## 💡 Полезное примечание:



🐾 Если вы верстаете для русскоязычного сегмента, просто поменяйте в папке `#src` в файле `index.html` в теге `html` значение атрибута `lang` с `en` на `ru`.





## 📬 Контакт



[![Telegram](https://shields.io)](https://t.me/Coder7_dev)

[![GitHub](https://shields.io)](https://github.com/Coder7-dev)





**





<!-- Переключатель для английской версии -->

<p align="right">

&#x20; <a href="#ru-version">🇷🇺 Ru</a> |

&#x20; <a href="#en-version">🇺🇸 En</a>

</p>



<div id="en-version"></div>



# 🐾 Meet Suzanna Paws! A modern web development starter template powered by `Gulp 4` and `5`.

🐈‍⬛ A `gulpfile.js` configuration using `CommonJS` syntax and stable plugin versions compatible with `Gulp 4` and `5` on `Node v22.12.0`.





## ✨ Features



**- HTML Structure Management**

Allows splitting page code into independent components and combining them into a single file. Automatically optimizes markup by wrapping images in the `picture` tag for `WebP` format support.



**- SCSS and CSS Processing**

Compiles `SCSS` files to `CSS`, groups media queries at the end of the document, and automatically adds vendor prefixes to support the last five browser versions. Outputs both standard and minified (`.min.css`) style versions.



**- JavaScript Transpilation and Minification**

Bundles separate JS files into one, passes code through `Babel` for older browser compatibility, and optimizes final script sizes using minification (`.min.js`).



**- Image Optimization and Automation**

Compresses images without quality loss and simultaneously creates copies in the modern `WebP` format. Automatically tracks deleted images: removing a file from the source folder deletes it from the final `dist` folder. Additionally, it compiles `SVG` icons into a single sprite.



**- Font Conversion and Inclusion**

Converts `OTF` fonts to `TTF`, transforms them into `WOFF` and `WOFF2` web formats, and then automatically writes `@font-face` rules into the style file.



**- Local Server and Error Prevention**

Launches a local server that automatically reloads the browser page whenever any code changes are saved. The `plumber` plugin intercepts syntax errors, displays them as system notifications, and prevents the build process from crashing due to errors in `HTML`, `SCSS`, or `JS` files.





## 🚀 Quick Start



**System Requirements:** `Node.js v16.0` or higher, `Gulp v4.0` / `v5.0`.



To launch your project using the Suzanna Paws Gulp builder, you need to copy the `#src` folder, the `gulpfile.js` file, the `package-lock.json` file, and the `package.json` file from this starter template into your project folder.

Next, open a terminal in your project folder and run the `npm i` command to automatically download and install all the plugins and libraries (dependencies) required for the builder to work.



Please note that inside the `#src` folder of the starter template, there are `fonts` and `img` folders which already contain default font files in `OTF` and `TTF` formats, as well as images in `JPG` and `SVG` formats. This is included so you can test how the builder works on your version of `Gulp`. It is recommended not to delete these default fonts and images at this stage.



**After running the `npm i` command, you need to start the font conversion:**



- Run the `npm run otf` command to convert fonts from `OTF` format to `TTF` format.

- Then, run the `npm run fonts` command to convert fonts from `TTF` format to `WOFF` and `WOFF2` formats.

- Run the `npm run sprite` command for a one-time generation of the SVG sprite.



Every time you add a new font in `OTF` format to your project, perform its conversion using two consecutive commands: `npm run otf` and then `npm run fonts`. When adding a font in `TTF` format, use just one command: `npm run fonts`.



**After converting the fonts, you need to launch the Gulp builder:**



- Run the `gulp` command.



After generating the fonts and launching the `Gulp` builder, you should see fonts in `WOFF` and `WOFF2` formats, as well as images in `WebP` and `SVG` formats appear inside the `dist` folder. Moreover, in the `dist` folder within the `index.html` file, `WebP` images must be wrapped in the `picture` tag, while `SVG` images should not be affected.



If the font and image conversion was successful, and the `css` and `js` folders containing `style.min.css` and `script.min.js` files respectively appeared inside the `dist` folder, you can now make the necessary changes inside the `#src` folder (delete the default fonts, images, and the content of the `fonts.scss` file, as well as update the `html` files). The `@mixin` directive and the `@import` directive in the `style.scss` file should be left unchanged!





## 📁 Project Structure (SHORT)



`#src/` — folder containing source code (your active workspace).

`dist/` — folder containing the clean, optimized code (generated automatically during the build process).





## 🛠️ Management Commands (SUMMARY):



From the Suzanna Paws starter template, copy the `#src` folder, the `gulpfile.js` file, `package-lock.json`, and the `package.json` file into your project folder. Then, run the following commands sequentially in your terminal:



* `npm i` — Installs dependencies;

Creates the `node_modules` folder with all installed packages in the project root.



* `npm run otf` — Converts source `OTF` fonts to `TTF` format;

As a result of converting `OTF` files inside the `fonts` folder (located within the `#src` folder), `TTF` files will appear right next to them;



* `npm run fonts` — Converts source `TTF` fonts to `WOFF` and `WOFF2` formats and automatically writes `@include` rules into the `fonts.scss` file;

Creates the `dist` folder with a nested `fonts` folder. The `WOFF` and `WOFF2` files will appear inside this `fonts` folder.



* `npm run sprite` — For a one-time generation of an SVG sprite in case the `dist` folder does not exist or is empty and does not contain the `icons.svg` file;

The `icons.svg` file will appear in the `icons` folder, which is located inside the `img` folder.



* `npm start` (or simply `gulp`) — Launches the project in development mode. Starts a local server, tracks code changes, and builds the project in real-time with live page reloading.

If the browser opens with a `Cannot GET /` message, simply refresh the page.





## 💡 Useful Note:



🐾 If you are coding for the Russian-speaking segment, simply change the `lang` attribute value from `en` to `ru` in the `html` tag inside the `index.html` file located in the `#src` folder.





## 📬 Contacts



[![Telegram](https://shields.io)](https://t.me/Coder7_dev)

[![GitHub](https://shields.io)](https://github.com/Coder7-dev)