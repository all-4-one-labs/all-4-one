//these two functions are used for validation checks on survivor and gm (1 gm, 4 survivors)
function gmValidationCheck() {
  axios('/gmjoinrequest')
    .then(response => {
      if (response.data) alert('Sorry, there\'s already a game master in this game.');
      else window.location = '/game.html';
    })
}

function survivorValidationCheck() {
  axios('/survivorjoinrequest')
    .then(response => {
      if (response.data) alert('Sorry, this game is at maximum survivors');
      else window.location = '/game.html';
    })
}

$(document).ready(function(){
    $("#gamemaster").hide();
    $("#survivor").hide();
    $("#subtitle").hide();

    setTimeout(()=>{
        $('#loading').hide();
        $('#subtitle').show();
        $('#gamemaster').show();
        $('#survivor').show();
    }, 10000)

    $('#gamemaster').click(() => {
        $('body').animate({opacity: '0.0'}, "slow", () => {
            sessionStorage.setItem('mode', 'gamemaster')
            window.location.href='/instructions.html'
        });
    })

    $('#survivor').click(() => {
        $('body').animate({opacity: '0.0'}, "slow", () => {
            sessionStorage.setItem('mode', 'survivor')
            window.location.href='/instructions.html'
        });
    })

    $("#developers, #modalClose").click(() => {
        if ( $('#modal').css('visibility') === 'hidden' ){
            $("#modal").css('visibility','visible').animate({opacity: 1},'slow');
        } else {
            $("#modal").css('visibility','hidden').animate({opacity: 0},'slow');
        }
    })

    if (sessionStorage.getItem('mode') === 'survivor') $("#gamemasterInstructions").hide();
    else if (sessionStorage.getItem('mode') === 'gamemaster') $("#survivorInstructions").hide();

    $('#gunner').click( () => {
        $('body').animate({opacity: '0.0'}, "slow", () => {
            sessionStorage.setItem('playerType', 'gunner');
            survivorValidationCheck();
        });
    });

    $('#mage').click( () => {
        $('body').animate({opacity: '0.0'}, "slow", () => {
            sessionStorage.setItem('playerType', 'mage');
            survivorValidationCheck();
        });
    });

    $('#shotgunner').click( () => {
        $('body').animate({opacity: '0.0'}, "slow", () => {
            sessionStorage.setItem('playerType', 'shotgunner');
            survivorValidationCheck();
        });
    });

    $('#continue').click( () => {
        $('body').animate({opacity: '0.0'}, "slow", () => {
            gmValidationCheck();
        });
    });

    $('#pvp').click( () => {
        sessionStorage.setItem('type', 'pvp')
        sessionStorage.setItem('mode', 'survivor')
    });

});