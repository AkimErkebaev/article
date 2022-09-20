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


function onloadFunc() {
    let commentlikes = document.getElementsByClassName("commentlikes");
    for (let i = 0; i < commentlikes.length; i++) {
        commentlikes[i].addEventListener("click", sendCommentLike)
    }

    let likes = document.getElementsByClassName("commentlikes");
    for (let i = 0; i < likes.length; i++) {
        likes[i].addEventListener("click", sendLike);
    }
}

window.addEventListener("load", onloadFunc)