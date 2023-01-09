let created = false;
let gameName = "";
let color = "";

var board = null
var $board = $('#myBoard')
var game = new Chess()
var whiteSquareGrey = '#a9a9a9'
var blackSquareGrey = '#696969'
var squareClass = 'square-55d63'
var squareToHighlight = null

function removeGreySquares () {
  $('#myBoard .square-55d63').css('background', '')
}

function greySquare (square) {
  var $square = $('#myBoard .square-' + square)

  var background = whiteSquareGrey
  if ($square.hasClass('black-3c85d')) {
    background = blackSquareGrey
  }

  $square.css('background', background)
}

function onDragStart (source, piece) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // or if it's not that side's turn
  if ((game.turn() === 'w' && (piece.search(/^b/) !== -1 || board.orientation() !== 'white')) ||
      (game.turn() === 'b' && (piece.search(/^w/) !== -1 || board.orientation() !== 'black'))) {
    return false
  }
}
async function onDrop (source, target) {
  removeGreySquares()

  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
promotion: 'q'
  })

  // illegal move
  if (move === null) return 'snapback'


    $board.find('.' + squareClass).removeClass('highlight-position')
    $board.find('.square-' + move.from).addClass('highlight-position')
    squareToHighlight = move.to
  $board.find('.square-' + squareToHighlight)
    .addClass('highlight-position')
const { data, error } = await client
  .from('games')
  .update({from: move.from, to: move.to})
  .eq('name', gameName)
}
function onMouseoverSquare (square, piece) {
  if ((game.turn() === 'w' && (piece.search(/^b/) !== -1 || board.orientation() !== 'white')) ||
      (game.turn() === 'b' && (piece.search(/^w/) !== -1 || board.orientation() !== 'black'))) {
    return
  }
  // get list of possible moves for this square
  var moves = game.moves({
    square: square,
    verbose: true
  })

  // exit if there are no moves available for this square
  if (moves.length === 0) return

  // highlight the square they moused over
  greySquare(square)

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to)
  }
}

function onMouseoutSquare (square, piece) {
  removeGreySquares()
}

function onSnapEnd () {
  board.position(game.fen())
}

function onMoveEnd () {
  $board.find('.square-' + squareToHighlight)
    .addClass('highlight-position')
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd,
  onMoveEnd: onMoveEnd
  
}
board = Chessboard('myBoard', config)

async function removeGame(){
const { data, error } = await client
  .from('games')
  .delete()
  .eq('name', gameName)
}
function addGameToPage(game) {
    const element = document.createElement('div');
    element.innerHTML = `<button onclick="joinGame(this)" class="game-request">${game.name}</button>`;
    document.querySelector('#available-games').append(element);
}
async function removeGameFromPage(){
  let myGames = document.querySelectorAll('.game-request');
  for(let i=0;i<myGames.length;i++){
    const { data: games, error } = await client
    .from('games')
    .select("*")
    .eq('name',myGames[i].innerHTML)
  if(games.length == 0 || games[0].players == 2)myGames[i].remove();
  }
  }
async function init(){
document.querySelector('#game-name').value = "";
chooseRandom();
if(Math.floor(Math.round(Math.random())) == 0)color="wr";
else color="br";
setTimeout(async function() {
const { data: games, error } = await client
  .from('games')
  .select('*')
  .eq('players', 1)
games.forEach(addGameToPage);
}, 500);
}
init();
let alreadyExists = false;
function exists(payload){
  alreadyExists=true;
}
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}
document.querySelector('#create-game').onclick = async function(){
gameName=document.querySelector('#game-name').value;
if(gameName.length > 0 && gameName.length< 11 && !containsSpecialChars(gameName)){
  const { data: games, err } = await client
  .from('games')
  .select('name')
  .eq('name', gameName)
  alreadyExists=false;
  games.forEach(exists);
  if(!alreadyExists){
  const { data, error } = await client
    .from('games')
    .insert([
      {name: gameName, color: color },
    ])
  created= true;
document.querySelector('#create-game').disabled=true;
  }
}
  }
async function joinGame(element){
let name = element.innerHTML;
const { data, error } = await client
  .from('games')
  .update({ players: 2 })
  .eq('name', name)
  if(created)removeGame();
  gameName = name;
created=false;
}

 onbeforeunload = async (event) => {
if(created){
removeGame();
created=false;
gameName="";
document.querySelector('#create-game').disabled=false;
document.querySelector('#game-name').value = '';

}
      };
  client
  .channel('public:games')
  .on(
    'postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'games' },
    (payload) => {
      if(payload.new.name == gameName){
document.querySelector("#container").style.zIndex = -10;
if(payload.new.color[0] == "w" && !created)board.orientation('black');
if(payload.new.color[0] == "b" && created)board.orientation('black');
if(payload.new.from != ""){
if(payload.new.from[0] == '0'){
game.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
board.position("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
if(created)color = payload.new.color;
else{
if(payload.new.color[0] == 'w')color='b';
else color='w';
}
board.orientation('white');
if(payload.new.color[0] == "w" && !created)board.orientation('black');
if(payload.new.color[0] == "b" && created)board.orientation('black');
document.querySelector("#game-over-screen").style.zIndex = -10;
}
else{
var move = game.move({
    from: payload.new.from,
    to: payload.new.to,
promotion: 'q'
  })
board.position(game.fen());
$board.find('.' + squareClass).removeClass('highlight-position')
$board.find('.square-' + payload.new.from).addClass('highlight-position')
squareToHighlight = payload.new.to;
$board.find('.square-' + squareToHighlight)
.addClass('highlight-position')
if(game.game_over()){
document.querySelector("#game-over-screen").style.zIndex = 10;
}
}
}
    }
    else removeGameFromPage();
}
  )
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'games' }, payload => {
if(payload.new.name != gameName)addGameToPage(payload.new);
  })
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'games' }, async payload => {
    
  removeGameFromPage();
      })
  .subscribe()
function chooseWhite(){
document.querySelector("#play-white").disabled = true;
document.querySelector("#play-random").disabled = false;
document.querySelector("#play-black").disabled = false;
color="w";
}
function chooseRandom(){
document.querySelector("#play-white").disabled = false;
document.querySelector("#play-random").disabled = true;
document.querySelector("#play-black").disabled = false;
if(Math.floor(Math.round(Math.random())) == 0)color="wr";
else color="br";
}
function chooseBlack(){
document.querySelector("#play-white").disabled = false;
document.querySelector("#play-random").disabled = false;
document.querySelector("#play-black").disabled = true;
color="b";
}
document.querySelector('#rematch').onclick = async function(){
if(created){
if(color[0]=='w')color='b';
else color='w';
}
const { error } = await client
  .from('games')
  .update({ name: gameName, color: color, from: '0'})
  .eq('name', gameName)
}
document.querySelector('#go-back').onclick = async function(){
removeGame();
document.querySelector("#game-over-screen").style.zIndex = -10;
document.querySelector("#container").style.zIndex = 1;
board.orientation('white');
game.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
board.position(game.fen());
color='w';
gameName="";
created=false;
document.querySelector('#create-game').disabled=false;
document.querySelector('#game-name').value = '';
}
