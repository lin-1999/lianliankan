var buttonSound;

function start(){
    buttonSound = document.getElementById("button_sound");
    document.getElementById("default_theme").addEventListener("click", chooseTheme, false);
    document.getElementById("pokemon_theme").addEventListener("click", chooseTheme, false);
    document.getElementById("digimon_theme").addEventListener("click", chooseTheme, false);
    document.getElementById("scoreHref").addEventListener("click", play, false);
    document.getElementById("timeHref").addEventListener("click", play, false);
    document.getElementById("play").addEventListener("click", playButtonSound, false);
    document.getElementById("choose_theme").addEventListener("click", playButtonSound, false);
    document.getElementById("ins_button").addEventListener("click", playButtonSound, false);
    document.getElementById("dev_button").addEventListener("click", playButtonSound, false);
    document.getElementById("theme__button").addEventListener("click", playButtonSound, false);
    document.getElementById("theme_title").innerHTML = "default";
}

function chooseTheme(e){
    buttonSound.play();
    
    var themeTitle = document.getElementById("theme_title");
    var themeImgTitle = document.getElementById("themeImg_title");
    
    switch(e.target.id){
        case 'default_theme':
            themeImgTitle.setAttribute("src", "img/home/default.png");
            themeTitle.innerHTML = "default";
            break;
        case 'pokemon_theme':
            themeImgTitle.setAttribute("src", "img/home/pokemon.png");
            themeTitle.innerHTML = "pokemon";
            break;
        case 'digimon_theme':
            themeImgTitle.setAttribute("src", "img/home/digimon.png");
            themeTitle.innerHTML = "digimon";
            break;
    }
}

function play(e){
    buttonSound.play();
    
    switch(e.target.id){
        case 'scoreHref':
            var themeTitle = document.getElementById("theme_title");
            if(themeTitle.innerHTML == "default")
                setTimeout(function(){ location.href = 'game_default_score.html'; }, 200);
            else if(themeTitle.innerHTML == "pokemon")
                setTimeout(function(){ location.href = 'game_pokemon_score.html'; }, 200);
            else if(themeTitle.innerHTML == "digimon")
                setTimeout(function(){ location.href = 'game_digimon_score.html'; }, 200);
            break;
        case 'timeHref':
            var themeTitle = document.getElementById("theme_title");
            if(themeTitle.innerHTML == "default")
                setTimeout(function(){ location.href = 'game_default_time.html'; }, 200);
            else if(themeTitle.innerHTML == "pokemon")
                setTimeout(function(){ location.href = 'game_pokemon_time.html'; }, 200);
            else if(themeTitle.innerHTML == "digimon")
                setTimeout(function(){ location.href = 'game_digimon_time.html'; }, 200);
            break;
    }
}

function playButtonSound(){ buttonSound.play(); }

window.addEventListener("load", start, false);
