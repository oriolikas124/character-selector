const statusContainer = document.getElementById("status-container");
const selectButton = document.getElementById('select-button');
const messageElement = document.getElementById("message");
const selectCharacterElement = document.getElementById("select-character");
const characterNameElement = document.getElementById("characterName");
const playerImageElement = document.getElementById("playerImage");
const thumbnailContainer = document.getElementById("thumbnail-container");
const continueMark = document.getElementById("continue-mark");

// 選択キャラクター // Выбранный персонаж
var selectedPlayer = {};
// 複数メッセージ // Несколько сообщений
var messages = [];
// 複数メッセージインデックス // Индекс текущего сообщения
var currentMessageIndex = 0;
// タイピングアニメーションの状態 // Состояние анимации печати
var typingTimeout;

/**
 * サムネイル画像を生成 // Генерация миниатюр изображений
 */
function createThumbnails() {
    // TODO: players を for of で繰り返し // Перебор players с помощью for of
    // --- 繰り返し（ここから） --- // --- Начало цикла ---
        for (const player of players) {
            console.log(player);
            const thumb = document.createElement("img");
    
            // id & path
            thumb.id = `player-${player.id}`;
            thumb.src = player.imagePath;
    
            
            thumb.className = "thumbnail-image w-24 h-24 object-cover rounded-full border-2 cursor-pointer";
            thumb.onclick = () => selectPlayer(player);
    
            // Добавим миниатюру в контейнер
            thumbnailContainer.appendChild(thumb);
        }

    const thumb = document.createElement("img");
    // TODO: player.id を設定 // Установка player.id
    thumb.id;
    // TODO: player.imagePath を設定 // Установка player.imagePath
    thumb.src;
    // TODO: 画像クリックイベント: selectPlayer() に player をいれる // Обработчик клика по изображению: передача player в selectPlayer()
    thumb.onclick;
    thumb.className = "thumbnail-image w-24 h-24 object-cover rounded-full border-2 cursor-pointer";
    thumbnailContainer.appendChild(thumb);
    // --- 繰り返し（ここまで） --- // --- Конец цикла ---
}

/**
 * キャラクターの詳細をステータスエリアに表示 // Отображение информации о персонаже в области статуса
 */
function displayStatus(player) {
    // キャラクター画像表示 // Отображение изображения персонажа
    showImage(player.imagePath);

    document.getElementById("player-name").textContent = player.name;
    document.getElementById("player-furigana").textContent = `(${player.furigana})`;
    document.getElementById("player-description").textContent = player.description;
}

/**
 * 画像を選択 // Выбор изображения
 */
function selectPlayer(player) {
    if (!player) return;

    // キャラクター選択 // Выбор персонажа
    selectedPlayer = player;

    // ステータスを表示 // Отображение статуса
    displayStatus(player);

    // メッセージ // Сообщение
    const text = `「${player.name}」でゲームをはじめますか？\nよろしければ【決定】ボタンをおしてください。`;
    showMessage(text);

    // 決定ボタン表示 // Отображение кнопки подтверждения
    selectButton.classList.remove('hidden');
    selectButton.classList.add("blink");

    // サムネイルハイライト // Подсветка миниатюры
    document.querySelectorAll(".thumbnail-image").forEach(img => {
        img.classList.remove("border-blue-500");
    });
    document.getElementById(`player-${selectedPlayer.id}`).classList.add("border-blue-500");
}


/**
 * showImage()
 * キャラクターイメージ表示 // Отображение изображения персонажа
 **/
function showImage(imagePath) {
    // 既存の画像をクリア // Очистка существующего изображения
    playerImageElement.innerHTML = "";
    if (imagePath) {
        const image = new Image();
        image.src = imagePath;
        image.className = "w-[300px] rounded-xl slide-in";
        playerImageElement.appendChild(image);
    }
}

/**
 * addMessage()
 * メッセージ配列に追加 // Добавление в массив сообщений
 **/
function addMessage(text, name = "") {
    // 複数メッセージ // Множественные сообщения
    messages.push({ text: text, name: name });
}

/**
 * showMessages()
 * メッセージの配列を順に表示 // Последовательное отображение массива сообщений
 **/
function showMessages() {
    currentMessageIndex = 0;
    var message = messages[currentMessageIndex];
    showMessage(message.text, message.name);
}

/**
 * showMessage()
 * 単一メッセージ表示（タイプライター風） // Отображение одного сообщения (в стиле пишущей машинки)
 **/
function showMessage(message, name = "") {
    // タイピング中のアニメーションをクリアし、メッセージをリセット // Очистка анимации набора текста и сброс сообщения
    clearTimeout(typingTimeout);

    // メッセージ空欄 // Очищение поля сообщения
    messageElement.textContent = "";

    // キャラクター名更新 // Обновление имени персонажа
    if (name) characterNameElement.textContent = name;

    // Enterキー非表示 // Скрытие Enter-указателя
    continueMark.classList.add("hidden");

    // タイピングアニメーション // Анимация набора текста
    var messageIndex = 0;
    function typeMessage() {
        if (messageIndex < message.length) {
            // メッセージを1文字ずつ表示 // Отображение сообщения по одному символу
            var char = message[messageIndex];

            // 改行コードの場合、<br> に置き換え // Замена символа новой строки на <br>
            if (char == "\n") char = "<br>";

            // メッセージボックスに文字追加 // Добавление символа в поле сообщения
            messageElement.innerHTML += char;

            // 次の文字のインデックス // Индекс следующего символа
            messageIndex++;

            // TODO: setTimeout() で、 typeMessage() を実行 // Выполнение typeMessage() с помощью setTimeout()
            typingTimeout = setTimeout(() => {
            }, 50);
        } else if (currentMessageIndex < messages.length - 1) {
            continueMark.classList.remove("hidden");
            continueMark.classList.add("blink");
        }
    }

    // タイピングアニメーション開始 // Запуск анимации набора текста
    typeMessage();
}

/**
 * nextMessage()
 * 次のメッセージを表示 // Отображение следующего сообщения
 **/
function nextMessage() {
    if (currentMessageIndex < messages.length - 1) {
        currentMessageIndex++;
        var message = messages[currentMessageIndex];
        showMessage(message.text, message.name);
    }
}

/**
 * hideInputArea()
 * 入力エリアを隠す // Скрытие области ввода
 **/
function hideInputArea() {
    selectCharacterElement.classList.add('hidden');
    selectButton.classList.add('hidden');
}

/**
 * ゲームスタート // Начало игры
 */
function start() {
    if (selectedPlayer.id) {
        // TODO: Playerインスタンス生成 // Создание экземпляра Player
        const player = new Player(selectedPlayer)
        // TODO: greet() 実行 // Выполнение greet()
        player.greet()

        hideInputArea();
    } else {
        showMessage("キャラクターを選択してください。");
    }
}

/**
 * Keydownイベント // Событие Keydown
 * Enterキーで次のメッセージへ進む // Переход к следующему сообщению по клавише Enter
 */
document.onkeydown = function (event) {
    // TODO: キーボードキー「Enter」で次のメッセージ // Переход к следующему сообщению по нажатию клавиши Enter
    // nextMessage()
    if (event.key == "Enter") {
        nextMessage()
    }
}

/**
 * init()
 * 初期化 // Инициализация
 */
function init() {
    createThumbnails();
    showMessage("キャラクターを選択してください。"); // Выберите персонажа.
}

// 初期化&開始 // Инициализация и запуск
init();