$(document).on("click", "scrape-button", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function (data) {
        console.log(data);
    })
})

$(document).on("click", "save-button", function () {
    let articleId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/save/" + articleId
    }).then(function (data) {
        window.location = "/"
    })
});

$(document).on("click", "delete-button", function () {
    let articleId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/delete/" + articleId
    }).then(function (data) {
        window.location = "/saved"
    })
});

 //need to create onclick event to add note and delete note
