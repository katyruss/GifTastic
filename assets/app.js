const getGifs = (p) => {
    $("#display-gifs").empty()
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=7wPfv1Bp6B7ZGlXrQkuPrggQwpPXoS6w&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(results)
        for (var i = 0; i < results.length; i++) {
            $("#display-gifs").append(`<img class="gif" data-frozen=false src=${results[i].images.downsized.url}>`)
        }
    });
}

const makeButtons = (array_for_eval, id_for_appending) => {
    $(id_for_appending).empty();
    array_for_eval.forEach(e => {
        $(id_for_appending).append(`<button class="char" data-person="${e}">${e}</button>`)
    })
}

$(document).ready(function () {
    var topics = ["Michael Scott", "Dwight Schrute", "Jim Halpert"];
    makeButtons(topics, "#searches")

    $(".char").on("click", function (e) {
        e.preventDefault();
        var person = $(this).attr("data-person");
        getGifs(person)
    });

    $(".display-gifs").on("click", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    })

    $("#submit").on("click", function (e) {
        e.preventDefault();
        let search = $("#user-input").val();
        topics.push(search)
        $("#user-input").empty();
        getGifs(search);
        makeButtons(topics, "#searches")
    });

});