var player, huplayer, aiplayer;
var origboard = [0,1,2,3,4,5,6,7,8];
var ct = 1;

$(document).ready(function(){
  $("#X").on("click", function(){
    huplayer = "X";
    aiplayer = "O";
    $(".game-choice").fadeOut(1000);
    setTimeout(function(){$(".row").fadeIn(500);}, 1000);
    if(ct%2 === 0){
      player = aiplayer;
      var bestspot = minimax(origboard, player);
      if(bestspot.index != null){
        origboard[parseInt(bestspot.index)] = player;
        $(`#block-${bestspot.index}`).children("span").text(player);
        switchplayer();
       }
    }
      else
        player = huplayer;
  });

  $("#O").on("click", function(){
    huplayer = "O";
    aiplayer = "X";
    $(".game-choice").fadeOut(1000);
    setTimeout(function(){$(".row").fadeIn(500);}, 1000);
    if(ct%2 === 0){
      player = aiplayer;
      var bestspot = minimax(origboard, player);
      if(bestspot.index != null){
        origboard[parseInt(bestspot.index)] = player;
        $(`#block-${bestspot.index}`).children("span").text(player);
        switchplayer();
       }
     }
    else
      player = huplayer;
  });

  $("#play-again").on("click", function(){
    origboard = [0,1,2,3,4,5,6,7,8];
    $(".col-xs-4").children("span").text("");
    $(".game-over").fadeOut(1000);
    setTimeout(function(){$(".game-choice").fadeIn(1000);}, 1000);
  });

  $(".col-xs-4").on("click", function(){
  if($(this).children("span").text() == ""){
    $(this).children("span").text(player);
    var idnum = parseInt($(this).attr('id').slice(6));
    origboard[idnum] = player;
    switchplayer();
    var bestspot = minimax(origboard, player);
    if(bestspot.index != null){
      origboard[parseInt(bestspot.index)] = player;
      $(`#block-${bestspot.index}`).children("span").text(player);
      switchplayer();
      }
  }
  var availspots = emptyspots(origboard);
  var message = $(".game-over").children(".message");
  if (winning(origboard, huplayer)){
    message.text("You won!");
    $(".row").fadeOut(1000);
    setTimeout(function(){$(".game-over").fadeIn(1000);}, 1000);
    var newscore = (parseInt($(".player-score").text().slice(8))+1).toString();
    $(".player-score").text(`Player: ${newscore}`);
    ct = 1;
  }
	else if (winning(origboard, aiplayer)){
    message.text("Computer won!");
    $(".row").fadeOut(1000);
    setTimeout(function(){$(".game-over").fadeIn(1000);}, 1000);
    var newscore = (parseInt($(".computer-score").text().slice(10)) + 1).toString();
    $(".computer-score").text(`Computer: ${newscore}`);
    ct = 2;
	}
  else if (availspots.length === 0){
  	message.text("It's a tie!");
    $(".row").fadeOut(1000);
    setTimeout(function(){$(".game-over").fadeIn(1000);}, 1000);
    ct ++;
  }
});
});



function minimax(newboard, player){
  var availspots = emptyspots(newboard);
  if (winning(newboard, huplayer)){
     return {index:null, score:-10};
  }
	else if (winning(newboard, aiplayer)){
    return {index: null, score:10};
	}
  else if (availspots.length === 0){
  	return {index: null, score:0};
  }

  var moves = [];

  for (var i = 0; i < availspots.length; i++){

    var move = {};
  	move.index = newboard[availspots[i]];

    newboard[availspots[i]] = player;

    if (player == aiplayer){
      var result = minimax(newboard, huplayer);
      move.score = result.score;
    }
    else{
      var result = minimax(newboard, aiplayer);
      move.score = result.score;
    }

    newboard[availspots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if(player === aiplayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}


function emptyspots(board){
  return board.filter(val => val != 'X' && val != 'O');
}

function winning(board, player){
 if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else {
        return false;
    }
}

function switchplayer(){
  if(player == huplayer)
    player = aiplayer;
  else
    player = huplayer;
}
