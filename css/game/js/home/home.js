function start(){
    document.getElementById("default_theme").addEventListener("click", chooseTheme, false);
    document.getElementById("pokemon_theme").addEventListener("click", chooseTheme, false);
    document.getElementById("digimon_theme").addEventListener("click", chooseTheme, false);
}

function chooseTheme(e){
    var themeTitle = document.getElementById("theme_title");
    var themeImgTitle = document.getElementById("themeImg_title");
    var scoreHref = document.getElementById("scoreHref");
    var timeHref = document.getElementById("timeHref");
    
    switch(e.target.id){
        case 'default_theme':
            themeImgTitle.setAttribute("src", "img/home/default.png");
            themeTitle.innerHTML = "default";
            scoreHref.setAttribute("href", "game_default_score.html");
            timeHref.setAttribute("href", "game_default_time.html");
            break;
        case 'pokemon_theme':
            themeImgTitle.setAttribute("src", "img/home/pokemon.png");
            themeTitle.innerHTML = "pokemon";
            scoreHref.setAttribute("href", "game_pokemon_score.html");
            timeHref.setAttribute("href", "game_pokemon_time.html");
            break;
        case 'digimon_theme':
            themeImgTitle.setAttribute("src", "img/home/digimon.png");
            themeTitle.innerHTML = "digimon";
            scoreHref.setAttribute("href", "game_digimon_score.html");
            timeHref.setAttribute("href", "game_digimon_time.html");
            break;
    }
}

window.addEventListener("load", start, false);