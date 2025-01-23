// 関数型定義
function Player(value) {
    this.id = value.id;
    this.name = value.name;
    this.imagePath = value.imagePath;
    this.furigana = value.furigana;
    this.age = value.age;
    this.gender = value.gender;
    this.ability = value.ability;
    this.likes = value.likes;
    this.description = value.description;

    this.greet = function() {
        addMessage(`${this.name}（${this.furigana}）、${this.age}歳。`, this.name);
        addMessage(`好きなことは、${this.likes}。`, this.name);
        addMessage(`得意なことは、${this.ability}です。`, this.name);
        showMessages();
    };
}