const appendAnime = (anime) => {
    var $newanime= $("<div class='anime' id='" + anime.id + "'></div>");
    $newanime.append("<h3>" + anime.autor + "</h3>");
    $newanime.append("<h5>" + anime.name + "</h5>");
    $newanime.append("<a  class='btn btn-primary' href='./index.html?id=" + anime.id + "' >Edit</a> ");
    $newanime.append("<button class='btn btn-primary' onclick='deleteAnime(" + anime.id + ")'>Delete</button>");

    $("#animes").append($newanime);
}

const deleteAnime = (id) => {
    var xhr = new XMLHttpRequest();

    xhr.open('DELETE', 'http://localhost:3000/' + id, true);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;


        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
            $('#' + id).remove();
        }
    }
}

const fetchAnimes = () => {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:3000/', true);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;


        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {

            const data = JSON.parse(xhr.responseText);

            for(let anime of data) {
                appendAnime(anime);
            }
        }
    }
}

const fetchAnime = (id) => {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:3000/' + id, true);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;


        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {

            const data = JSON.parse(xhr.responseText);
            $("#autor").val(data.autor);
            $("#name").val(data.name);
        }
    }
}

const checkId = () => {
    return window.location.href.indexOf("?id") != -1;
}

const getId = () => {
    var url = window.location.href;
    var params = url.split('?')[1].split('=');

    return params[1];
}

if(checkId()) {
    fetchAnime(getId());
}

const sendAnime = () => {
    let method = "";
    let url = 'http://localhost:3000/';

    if(checkId()) {
        method = "PUT";
        url += getId();
    } else {
        method = "POST";
    }

    let autor = $("#autor").val();
    let name = $("#name").val();

    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify({ autor: autor, name: name }));

    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            $(location).attr('href', './index.html')
        }
    }
}
