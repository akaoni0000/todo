const input = document.getElementById("input");
const botton = document.getElementById("botton");
const ul = document.getElementById("ul");

// const todos = localStorage.getItem("todos"); こちらだと配列として取り出せなかった
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
       add(todo);
    });
}


// ボタンを押した時に発動する
botton.addEventListener("click", function(event) {
    event.preventDefault();
    add();
});

function add(todo) {
    let text = input.value;


    if (todo) {
        text = todo.comment;
    }

    if (text) {
        // <li>タグを作成する
        const li = document.createElement("li");
        li.innerText = text;
        li.classList.add("list-group-item", "w-50", "center", "d-flex", "justify-content-between", "align-items-center");

        // <span>タグを作成する
        const span = document.createElement("span");
        span.setAttribute('id', 'delete');
        span.classList.add("badge", "rounded-pill", "bg-dark", "cursor")

        // <i>タグを作成する
        const i = document.createElement("i");
        i.classList.add("bi", "bi-x-lg");

        ul.appendChild(li);
        li.appendChild(span);
        span.appendChild(i);

        input.classList.remove("is-invalid");
        input.value = "";
        saveData();

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        li.addEventListener("click", function () {
            // toggleはそのクラスがあれば削除してなければ追加する
            li.classList.toggle("text-decoration-line-through");
            saveData();
        });

        span.addEventListener("click", function (event) {
            // 親要素にまでクリックアクションがいくのを防ぐ
            event.stopPropagation();
            li.remove();
            saveData();
        });

    } else {
        input.classList.add("is-invalid");
    }

    
}

function saveData() {
    const lists = document.querySelectorAll("li");
    const texts = [];

    // lists.forEach((li) => {
    //    texts.push(li.innerText);
    // });

    lists.forEach((list) => {
        texts.push({
            comment: list.innerText,
            completed: list.classList.contains("text-decoration-line-through"),
        });
    });


    // localStorage.setItem("todos", texts); これだと配列形式で保存できない
    localStorage.setItem("todos", JSON.stringify(texts)); // jsonを使うことで配列形式で保存できる

}