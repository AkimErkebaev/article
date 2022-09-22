function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');


async function sendLike(event) {
    event.preventDefault();
    let target = event.target;
    let url = target.href;
    let response = await fetch(url);
    let response_json = await response.json();
    let count = response_json.count;
    console.log(count);
    let articleId = target.dataset.articleId;
    let span = document.getElementById(articleId);
    span.innerText = `Лайки: ${count}`;
    if (target.innerText === "Дизлайк") {
        target.innerText = "Лайк";
    } else {
        target.innerText = "Дизлайк";
    }
}

async function sendCommentLike(event) {
    event.preventDefault();
    let target = event.target;
    let url = target.href;
    let response = await fetch(url);
    let response_json = await response.json();
    let count = response_json.count;
    console.log(count);
    let commentId = target.dataset.commentId;
    let span = document.getElementById(commentId);
    span.innerText = `Лайки: ${count}`;
    if (target.innerText === "Дизлайк") {
        target.innerText = "Лайк";
    } else {
        target.innerText = "Дизлайк";
    }
}


async function result(event) {
    event.preventDefault();
    let target = event.target;
    let url = target.href;
    let inputone = document.getElementById("first")
    let inputtwo = document.getElementById("second")
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({"A": Number(inputone.value), "B": Number(inputtwo.value)}),
        headers: {'X-CSRFToken': csrftoken}
    });
    let response_json = await response.json();
    let result = document.getElementById("result")
    result.innerText = response_json["answer"]
    let container = document.getElementById("container");
}


function onloadFunc() {
    let commentlikes = document.getElementsByClassName("commentlikes");
    for (let i = 0; i < commentlikes.length; i++) {
        commentlikes[i].addEventListener("click", sendCommentLike)
    }

    let likes = document.getElementsByClassName("likes");
    for (let i = 0; i < likes.length; i++) {
        likes[i].addEventListener("click", sendLike);
    }

    let addition = document.getElementById("container");
    addition.addEventListener("click", result);

}

window.addEventListener("load", onloadFunc)