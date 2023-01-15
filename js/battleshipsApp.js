function createBoardElements() {
  for (let i = 0; i < 10; i++) {
    for(let j=0,newElement;j<10;j++){
      newElement = document.createElement('div');
      newElement.classList.add("cell");
      newElement.setAttribute("id",String.fromCharCode(65+i)+j);
      newElement.setAttribute("data-cell-value","0");
      newElement.innerHTML=`<span></span>`;
      document.querySelector("#battleships-board").append(newElement);
    }
  }
}
function createOpponentElements() {
for (let i = 0; i < 10; i++) {
  for(let j=0,newElement;j<10;j++){
    newElement = document.createElement('div');
    newElement.classList.add("cell");
    newElement.setAttribute("onclick","attack(this)");
    newElement.innerHTML=`<span></span>`;
    document.querySelector("#opponent-board").append(newElement);
  }
}
}
function moveAt(pageX, pageY) {
boat.style.left = pageX - offsetX + 'px';
boat.style.top = pageY - offsetY + 'px';
}
function boatLength(){
  return Math.max(parseInt(boat.style.width),parseInt(boat.style.height))/2;
}
function boatDirection(){
  let direction="top-down";
  if(parseInt(boat.style.width)>parseInt(boat.style.height))direction="left-right";
  return direction;
}
function onMouseMove(event) {
if(dragging){
  boat.style.zIndex = "-1";
  let element = document.elementFromPoint(event.clientX-offset,event.clientY);
  let position;
  if(element !== null){
    position = element.getBoundingClientRect();
  }
  if(element !== null && element.className=="cell" && canPlace(boatLength(), boatDirection(), element)){
    boat.style.top = (position.top - (boat.getBoundingClientRect().top - (parseFloat(boat.style.top)))) + 'px';
    boat.style.left = (position.left - (boat.getBoundingClientRect().left - (parseFloat(boat.style.left)))) + 'px';
    boat.classList.add("dragged");
    isLegal=true;
  }
  else {
    moveAt(event.pageX, event.pageY);
    boat.classList.remove("dragged");
    isLegal=false;
  }
  boat.style.zIndex = "1000";
}
}
function canPlace(n, direction, element){
for(let i=0;i<n;i++){
  if(direction==="top-down"){
    let newElement = document.querySelector("#"+String.fromCharCode(element.id[0].charCodeAt(0)+i)+element.id[1]);
    if(newElement==null)return false;
    if(newElement.dataset.cellValue !=="0")return false;
  }
  else{
    let newElement = document.querySelector("#"+element.id[0]+String(parseInt(element.id[1])+i));
    if(newElement==null)return false;
    if(newElement.dataset.cellValue !=="0")return false;
  }
}
return true;
}
function place(n,direction, element){
if(direction==="top-down"){
  for(let i=0;i<n;i++){   //length
    for(let j=-1;j<2;j++){
      if(parseInt(element.id[1])+j>=0 && parseInt(element.id[1])+j<=9){
        let newElement = document.querySelector("#"+String.fromCharCode(element.id[0].charCodeAt(0)+i)+String(parseInt(element.id[1])+j));
        if(j==0)newElement.dataset.cellValue = 1;
        else newElement.dataset.cellValue -= 1;
      }
    }
  }
  if(element.id[0].charCodeAt(0)-1>=65){    //top edges
    for(let j=-1;j<2;j++){
      if(parseInt(element.id[1])+j>=0 && parseInt(element.id[1])+j<=9){
        let newElement = document.querySelector("#"+String.fromCharCode(element.id[0].charCodeAt(0)-1)+String(parseInt(element.id[1])+j));
        newElement.dataset.cellValue -= 1;
      }
    }
  }
  if(element.id[0].charCodeAt(0)+n<=74){    //bottom edges
    for(let j=-1;j<2;j++){
      if(parseInt(element.id[1])+j>=0 && parseInt(element.id[1])+j<=9){
        let newElement = document.querySelector("#"+String.fromCharCode(element.id[0].charCodeAt(0)+n)+String(parseInt(element.id[1])+j));
        newElement.dataset.cellValue -= 1;
      }
    }
  }
}
else{
  for(let i=0;i<n;i++){   //length
    for(let j=-1;j<2;j++){
      if(element.id[0].charCodeAt(0)+j>=65 && element.id[0].charCodeAt(0)+j<=74){
        let newElement = document.querySelector("#"+String.fromCharCode(element.id[0].charCodeAt(0)+j)+String(parseInt(element.id[1])+i));
        if(j==0)newElement.dataset.cellValue = 1;
        else newElement.dataset.cellValue -= 1;
      }
    }
  }
  if(parseInt(element.id[1])-1>=0){    //left edges
    for(let j=-1;j<2;j++){
      if(element.id[0].charCodeAt(0)+j>=65 && element.id[0].charCodeAt(0)+j<=74){
        let newElement = document.querySelector("#"+String.fromCharCode(element.id[0].charCodeAt(0)+j)+String(parseInt(element.id[1])-1));
        newElement.dataset.cellValue -= 1;
      }
    }
  }
  if(parseInt(element.id[1])+n<=9){    //right edges
    for(let j=-1;j<2;j++){
      if(element.id[0].charCodeAt(0)+j>=65 && element.id[0].charCodeAt(0)+j<=74){
        let newElement = document.querySelector("#"+String.fromCharCode(element.id[0].charCodeAt(0)+j)+String(parseInt(element.id[1])+n));
        newElement.dataset.cellValue -= 1;
      }
    }
  }
}
}
function liftUp(element){
let n = Math.max(parseInt(boat.style.width),parseInt(boat.style.height))/2;
let direction="top-down";
if(parseInt(boat.style.width)>parseInt(boat.style.height))direction="left-right";
if(direction==="top-down"){
  for(let i=0;i<n;i++){   //length
    for(let j=-1;j<2;j++){
      if(parseInt(element.id[1])+j>=0 && parseInt(element.id[1])+j<=9){
        let newElement = document.querySelector("#"+String.fromCharCode(element.id[0].charCodeAt(0)+i)+String(parseInt(element.id[1])+j));
        if(j==0)newElement.dataset.cellValue = 0;
        else newElement.dataset.cellValue = parseInt(newElement.dataset.cellValue)+1;
      }
    }
  }
  if(element.id[0].charCodeAt(0)-1>=65){    //top edges
    for(let j=-1;j<2;j++){
      if(parseInt(element.id[1])+j>=0 && parseInt(element.id[1])+j<=9){
        let newElement = document.querySelector("#"+String.fromCharCode(element.id[0].charCodeAt(0)-1)+String(parseInt(element.id[1])+j));
        newElement.dataset.cellValue = parseInt(newElement.dataset.cellValue)+1;
      }
    }
  }
  if(element.id[0].charCodeAt(0)+n<=74){    //bottom edges
    for(let j=-1;j<2;j++){
      if(parseInt(element.id[1])+j>=0 && parseInt(element.id[1])+j<=9){
        let newElement = document.querySelector("#"+String.fromCharCode(element.id[0].charCodeAt(0)+n)+String(parseInt(element.id[1])+j));
        newElement.dataset.cellValue = parseInt(newElement.dataset.cellValue)+1;
      }
    }
  }
}
else{
  for(let i=0;i<n;i++){   //length
    for(let j=-1;j<2;j++){
      if(element.id[0].charCodeAt(0)+j>=65 && element.id[0].charCodeAt(0)+j<=74){
        let newElement = document.querySelector("#"+String.fromCharCode(element.id[0].charCodeAt(0)+j)+String(parseInt(element.id[1])+i));
        if(j==0)newElement.dataset.cellValue = 0;
        else newElement.dataset.cellValue = parseInt(newElement.dataset.cellValue)+1;
      }
    }
  }
  if(parseInt(element.id[1])-1>=0){    //left edges
    for(let j=-1;j<2;j++){
      if(element.id[0].charCodeAt(0)+j>=65 && element.id[0].charCodeAt(0)+j<=74){
        let newElement = document.querySelector("#"+String.fromCharCode(element.id[0].charCodeAt(0)+j)+String(parseInt(element.id[1])-1));
        newElement.dataset.cellValue = parseInt(newElement.dataset.cellValue)+1;
      }
    }
  }
  if(parseInt(element.id[1])+n<=9){    //right edges
    for(let j=-1;j<2;j++){
      if(element.id[0].charCodeAt(0)+j>=65 && element.id[0].charCodeAt(0)+j<=74){
        let newElement = document.querySelector("#"+String.fromCharCode(element.id[0].charCodeAt(0)+j)+String(parseInt(element.id[1])+n));
        newElement.dataset.cellValue = parseInt(newElement.dataset.cellValue)+1;
      }
    }
  }
}
}
function rotate(event){
if(Math.floor(mouseX) === Math.floor(event.clientX) && Math.floor(mouseY)===Math.floor(event.clientY)){
  boat.style.zIndex = "-1";
  boat.style.zIndex = "10";
  switchWidthHeight(boat);
  if(canPlace(boatLength(),boatDirection(),previousCell))place(boatLength(),boatDirection(),previousCell);
  else{
    switchWidthHeight(boat);
    place(boatLength(),boatDirection(),previousCell);
  }
}
}
function switchWidthHeight(element){
let tWidth = element.style.width;
  element.style.width = element.style.height;
  element.style.height = tWidth;
}
function init(){
  createBoardElements();
  createOpponentElements();
  addAllGames();
}
init();
let boat = document.querySelector(".boat");
let dragging = false;
let offsetX;
let offsetY;
let mouseX;
let mouseY;
let snapTop;
let snapLeft;
let isLegal=false;
let previousCell=document.querySelector("body");
let offset;
let em1;
function startDragging(el,event) {
if(!dragging && !el.classList.contains("disableElement")){
  boat=el;
  em1 = document.querySelector("#A1").clientWidth/2;
  if(boat.style.left.includes("em"))boat.style.left=(parseFloat(boat.style.left)*em1)+"px";
  if(boat.style.top.includes("em"))boat.style.top=(parseFloat(boat.style.top)*em1)+"px";
  dragging=true;
  snapTop = boat.style.top;
  snapLeft = boat.style.left;
  mouseX=event.clientX;
  mouseY=event.clientY;
  offsetX = mouseX - parseFloat(boat.style.left);
  offsetY = mouseY - parseFloat(boat.style.top);
  offset = mouseX - boat.getBoundingClientRect().left;
  boat.style.zIndex="-1";
  previousCell=document.elementFromPoint(boat.getBoundingClientRect().left+em1,boat.getBoundingClientRect().top+em1);
  boat.style.zIndex = "1000";
  if(previousCell.className=="cell")liftUp(previousCell);
}
}
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', e=>{
  if(dragging){
    boat.style.zIndex="-1";
    boat.classList.remove("dragged");
    if(!isLegal){
      boat.style.top = snapTop;
      boat.style.left = snapLeft;
      if(previousCell.className==="cell")place(boatLength(),boatDirection(), previousCell);
    }
    else if(!(Math.floor(mouseX) === Math.floor(e.clientX) && Math.floor(mouseY)===Math.floor(e.clientY))){
      let element = document.elementFromPoint(boat.getBoundingClientRect().left+em1,boat.getBoundingClientRect().top+em1);
      place(boatLength(),boatDirection(),element);
    }
    dragging=false;
    boat.style.zIndex = "10";
  }
});

let gameName="";
let created = false;
let player = 0;
let turn = 0;
let personalSunkShips = 0;
let opponentSunkShips = 0;
let opponentGrid = "";
/*
0-undiscoverd empty
1-undiscovered occupied
2-discovered empty
3-miss
4-discovered occupied
5-discovered full
number after the space: latest attack
*/


String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
};
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};
Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

function indexOfElement(element){
  let i=0;
  while((element=element.previousElementSibling) != null)i++;
  return i;
}
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}
function disableBoats(){
  let elements = document.querySelectorAll(".boat");
  for(let i = 0; i<elements.length;i++){
    elements[i].classList.add("disableElement");
  }
}
function enableBoats(){
  let elements = document.querySelectorAll(".boat");
  for(let i = 0; i<elements.length;i++){
    elements[i].classList.remove("disableElement");
  }
}
function canCreateAndJoinWrapper(){
  let hideButton = false;
  let myCover = document.querySelector("#my-cover");
  if(myCover.classList.contains("hide-personal-board")){myCover.classList.toggle("hide-personal-board");  hideButton=true;}
  let returnValue = canCreateAndJoin();
  if(hideButton)myCover.classList.toggle("hide-personal-board");
  return returnValue
}
function canCreateAndJoin(){
  em1 = document.querySelector("#A1").clientWidth/2;
  let elements = document.querySelectorAll(".boat");
  for(let i = 0; i<elements.length;i++){
    elements[i].style.zIndex="-1";
    let elementUnder=document.elementFromPoint(elements[i].getBoundingClientRect().left + em1,elements[i].getBoundingClientRect().top + em1);
    elements[i].style.zIndex="10";
    if(!elementUnder.classList.contains("cell"))return false
  }
  return true;
}
function findElement(index){
  let cells = document.querySelectorAll("#opponent-board .cell");
  return cells[index];
}
function discoverCells(index){
  let i = parseInt(index/10);
  let j = parseInt(index - i*10);
  if(i > 0 && j > 0){
    let newI = i-1;
    let newJ = j-1;
    let newIndex = newJ + newI*10;
    let cell = findElement(newIndex);
    if(!cell.classList.contains("miss")){cell.classList.add("discover"); opponentGrid = opponentGrid.replaceAt(newIndex,"2");}
  }
  if(i > 0 && j < 9){
    let newI = i-1;
    let newJ = j+1;
    let newIndex = newJ + newI*10;
    let cell = findElement(newIndex);
    if(!cell.classList.contains("miss")){cell.classList.add("discover"); opponentGrid = opponentGrid.replaceAt(newIndex,"2");}
  }
  if(i < 9 && j > 0){
    let newI = i+1;
    let newJ = j-1;
    let newIndex = newJ + newI*10;
    let cell = findElement(newIndex);
    if(!cell.classList.contains("miss")){cell.classList.add("discover"); opponentGrid = opponentGrid.replaceAt(newIndex,"2");}
  }
  if(i < 9 && j < 9){
    let newI = i+1;
    let newJ = j+1;
    let newIndex = newJ + newI*10;
    let cell = findElement(newIndex);
    if(!cell.classList.contains("miss")){cell.classList.add("discover"); opponentGrid = opponentGrid.replaceAt(newIndex,"2");}
  }
}
function setMyGrid(grid){
  let newlySunk = 0;
  let cells = document.querySelectorAll("#battleships-board .cell");
  for(let i=0;i<cells.length;i++){
  let cell = cells[i];
  if(grid[i] === "2")cell.classList.add("discover");
  else if(grid[i] === "3")cell.classList.add("miss");
  else if(grid[i] === "4")cell.classList.add("hit");
  else if(grid[i] === "5"){ cell.classList.add("hit"); cell.classList.add("sunk"); newlySunk++;}
  cell.classList.remove("latest");
  }
  switch(newlySunk - personalSunkShips){
    case 4:
      document.querySelector(".small-boat.b4.personal:not(.sunk)").classList.add("sunk");
      break;
    case 3:
      document.querySelector(".small-boat.b3.personal:not(.sunk)").classList.add("sunk");
      break;
    case 2:
      document.querySelector(".small-boat.b2.personal:not(.sunk)").classList.add("sunk");
      break;
    case 1:
      document.querySelector(".small-boat.b1.personal:not(.sunk)").classList.add("sunk");
      break;
  }
  personalSunkShips = newlySunk;
  if(grid.length > 100){
    let index = grid.slice(101);
    cells[parseInt(index)].classList.add("latest");
  }
}
function visitShip(index, visited){
  visited.push(index);
  let i = parseInt(index/10);
  let j = parseInt(index - i*10);
  if(i>0){
    let newI = i-1;
    let newJ = j;
    let newIndex = newJ + newI*10;
    if(opponentGrid[newIndex] === "1")return false;
    if(opponentGrid[newIndex] === "4" && !visited.includes(newIndex))if(!visitShip(newIndex, visited)) return false;
  }
  if(i<9){
    let newI = i+1;
    let newJ = j;
    let newIndex = newJ + newI*10;
    if(opponentGrid[newIndex] === "1")return false;
    if(opponentGrid[newIndex] === "4" && !visited.includes(newIndex))if(!visitShip(newIndex, visited)) return false;
  }
  if(j>0){
    let newI = i;
    let newJ = j-1;
    let newIndex = newJ + newI*10;
    if(opponentGrid[newIndex] === "1")return false;
    if(opponentGrid[newIndex] === "4" && !visited.includes(newIndex))if(!visitShip(newIndex, visited)) return false;
  }
  if(j<9){
    let newI = i;
    let newJ = j+1;
    let newIndex = newJ + newI*10;
    if(opponentGrid[newIndex] === "1")return false;
    if(opponentGrid[newIndex] === "4" && !visited.includes(newIndex))if(!visitShip(newIndex, visited)) return false;
  }
  return true;
}
function sinkShip(index){
      let visited = [];
      if(visitShip(index, visited)){
        for(let i=0;i<visited.length;i++){
          let cell = findElement(visited[i]);
          cell.classList.add("sunk");
          opponentGrid = opponentGrid.replaceAt(visited[i], "5");
        }
        for(let discoverNew = 0; discoverNew<2;discoverNew++){
          let i = 0;
          let j = 0;
          if(discoverNew === 0){
            i = parseInt(visited.min()/10);
            j = parseInt(visited.min() - i*10);
          }
          else{
            i=parseInt(visited.max()/10);
            j=parseInt(visited.max()-i*10);
          }
          if(i > 0){
            let newI = i-1;
            let newJ = j;
            let newIndex = newJ + newI*10;
            let cell = findElement(newIndex);
            if(!cell.classList.contains("miss")  && !visited.includes(newIndex)){cell.classList.add("discover"); opponentGrid = opponentGrid.replaceAt(newIndex,"2");}
          }
          if(i < 9){
            let newI = i+1;
            let newJ = j;
            let newIndex = newJ + newI*10;
            let cell = findElement(newIndex);
            if(!cell.classList.contains("miss") && !visited.includes(newIndex)){cell.classList.add("discover"); opponentGrid = opponentGrid.replaceAt(newIndex,"2");}
          }
          if(j > 0){
            let newI = i;
            let newJ = j-1;
            let newIndex = newJ + newI*10;
            let cell = findElement(newIndex);
            if(!cell.classList.contains("miss") && !visited.includes(newIndex)){cell.classList.add("discover"); opponentGrid = opponentGrid.replaceAt(newIndex,"2");}
          }
          if(j < 9){
            let newI = i;
            let newJ = j+1;
            let newIndex = newJ + newI*10;
            let cell = findElement(newIndex);
            if(!cell.classList.contains("miss") && !visited.includes(newIndex)){cell.classList.add("discover"); opponentGrid = opponentGrid.replaceAt(newIndex,"2");}
          }
        }
      }
}
async function attack(element){
  if(element.className === "cell" && !document.querySelector("#opponent-board").classList.contains("disableElement") && turn === player){
  let cells = document.querySelectorAll("#opponent-board .cell");
  for(let i=0;i<cells.length;i++)cells[i].classList.remove("latest");
  let index = indexOfElement(element);
  if(opponentGrid[index] === "1"){
    element.classList.add("hit");
    opponentGrid = opponentGrid.replaceAt(index,"4");
    discoverCells(index);
    sinkShip(index);
  }
  else {
    element.classList.add("miss");
    opponentGrid = opponentGrid.replaceAt(index,"3");
  }
  element.classList.add("latest");
  opponentGrid = opponentGrid.slice(0,100);
  opponentGrid += " " + index;
  let turn = player;
  if(element.classList.contains("miss")){
    if(player === 2)turn = 1;
    else turn = 2;
  }
  if(player === 1){
    const { data, error } = await client
    .from('ships_games')
    .update({player2: opponentGrid, turn: turn})
    .eq('name', gameName)
  }
  else{
    const { data, error } = await client
    .from('ships_games')
    .update({player1: opponentGrid, turn: turn})
    .eq('name', gameName)
  }
}
}

async function removeGame(){
const { data, error } = await client
  .from('ships_games')
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
  const { data: ships_games, error } = await client
  .from('ships_games')
  .select("*")
  .eq('name',myGames[i].innerHTML)
  if(ships_games.length == 0 || ships_games[0].player2 !== "")myGames[i].remove();
  }
  }
async function addAllGames(){
document.querySelector('#game-name').value = "";
setTimeout(async function() {
const { data: ships_games, error } = await client
.from('ships_games')
.select('*')
.eq('player2', '')
ships_games.forEach(addGameToPage);
}, 500);
}
function getPosition(){
let grid="";
let cells = document.querySelectorAll("#battleships-board .cell");
for(let i=0;i<cells.length;i++){
let element = cells[i];
if(element.dataset.cellValue === "1")grid+="1";
else grid+="0";
}
return grid;
}
function firstTurn(){
return parseInt(Math.round(Math.random()) + 1);
}
document.querySelector('#create-game').onclick = async function(){
  gameName=document.querySelector('#game-name').value;
  if(gameName.length > 0 && gameName.length< 11 && !containsSpecialChars(gameName) && canCreateAndJoinWrapper()){
    const { data: ships_games, err } = await client
    .from('ships_games')
    .select('name')
    .eq('name', gameName)
    if(ships_games.length == 0){
      const { data, error } = await client
      .from('ships_games')
      .insert([
      {name: gameName, turn: firstTurn(), player1: getPosition() },
      ])
      created= true;
      player=1;
      document.querySelector('#create-game').disabled=true;
      document.querySelector('#random-placement').style.display = "none";
      document.querySelector('#random-placement').disabled = true;
      disableBoats();
      document.querySelector("#my-cover").style.zIndex = "100";
    }
  }
}
async function joinGame(element){
  if(canCreateAndJoinWrapper()){
    let name = element.innerHTML;
    const { data, error } = await client 
    .from('ships_games')
    .update({ player2: getPosition() })
    .eq('name', name)
    if(created)removeGame();
    gameName = name;
    created=false;
    player = 2;
  }
}
function gameOver(){
  let smallBoats1 = document.querySelectorAll(".small-boat.personal.sunk");
  if(smallBoats1.length === 10)return true;
  let smallBoats2 = document.querySelectorAll(".small-boat.opponent.sunk");
  if(smallBoats2.length === 10)return true;
  return false;
}
function setOpponentSmallShips(){
  let newlySunk = 0;
  for(let i=0;i<100;i++)if(opponentGrid[i] === "5")newlySunk++;
  switch(newlySunk - opponentSunkShips){
    case 4:
      document.querySelector(".small-boat.b4.opponent:not(.sunk)").classList.add("sunk");
      break;
    case 3:
      document.querySelector(".small-boat.b3.opponent:not(.sunk)").classList.add("sunk");
      break;
    case 2:
      document.querySelector(".small-boat.b2.opponent:not(.sunk)").classList.add("sunk");
      break;
    case 1:
      document.querySelector(".small-boat.b1.opponent:not(.sunk)").classList.add("sunk");
      break;
  }
  opponentSunkShips = newlySunk;
}
function setTopDown(element){
  let newWidth = Math.min(parseInt(element.style.width),parseInt(element.style.height));
  let newHeight = Math.max(parseInt(element.style.width),parseInt(element.style.height));
  element.style.width = newWidth + "em";
  element.style.height = newHeight + "em";
}
function setLeftRight(element){
  let newWidth = Math.max(parseInt(element.style.width),parseInt(element.style.height));
  let newHeight = Math.min(parseInt(element.style.width),parseInt(element.style.height));
  element.style.width = newWidth + "em";
  element.style.height = newHeight + "em";
}
function randomPlacement(){
  let boats = document.querySelectorAll(".boat");
  let cells = document.querySelectorAll("#battleships-board .cell");
  for(let i=0;i<cells.length;i++)cells[i].dataset.cellValue = "0";
  for(let i=0;i<boats.length;i++){
    let direction="left-right";
    if(firstTurn() === 2){setTopDown(boats[i]); direction="top-down";}
    else setLeftRight(boats[i]);
    let index = 0;
    let n = Math.max(parseInt(boats[i].style.width),parseInt(boats[i].style.height))/2;
    while(true){
      index = Math.floor(Math.random()*100);
      if(canPlace(n, direction, cells[index])) break;
    }
    place(n, direction, cells[index]);
    em1 = document.querySelector("#A1").clientWidth/2;
    let boatsTop = parseFloat(boats[i].style.top);
    if(boats[i].style.top.includes("em"))boatsTop *= em1;
    let boatsLeft = parseFloat(boats[i].style.left);
    if(boats[i].style.left.includes("em"))boatsLeft *= em1;
    boats[i].style.top = (cells[index].getBoundingClientRect().top - (boats[i].getBoundingClientRect().top - boatsTop)) + 'px';
    boats[i].style.left = (cells[index].getBoundingClientRect().left  - (boats[i].getBoundingClientRect().left - boatsLeft)) + 'px';
  }
}
function hidePersonalBoard(){
  document.querySelector("#my-cover").classList.toggle("hide-personal-board");
}
function goBack(){
  removeGame();
  removeGameFromPage();
  gameName="";
  created = false;
  player = 0;
  turn = 0;
  personalSunkShips = 0;
  opponentSunkShips = 0;
  opponentGrid = "";
  enableBoats();
  let smallBoats = document.querySelectorAll(".small-boat")
  for(let i =0;i<smallBoats.length;i++){
    smallBoats[i].classList.remove("sunk");
  }
  let smallBoatDivs = document.querySelectorAll("small-boat-div");
  for(let i =0;i<smallBoatDivs.length;i++){
    smallBoatDivs[i].style.display = "none";
  }
  let cells = document.querySelectorAll(".cell")
  for(let i =0;i<cells.length;i++){
    cells[i].className = "cell";
  }
  document.querySelector("#game-over-screen").style.zIndex = "-10";
  document.querySelector("#my-cover").style.zIndex = "-10";
  document.querySelector("#opponent-cover").style.zIndex = "-10";
  document.querySelector("#battleships-menu").style.zIndex = "100";
  document.querySelector('#create-game').disabled=false;
  document.querySelector('#game-name').value = '';
  document.querySelector('#random-placement').style.display = "inline";
  document.querySelector('#random-placement').disabled = false;
}
onbeforeunload = async (event) => {
  goBack();
};
client
.channel('public:ships_games')
.on(
  'postgres_changes',
  { event: 'UPDATE', schema: 'public', table: 'ships_games' },
  (payload) => {
    if(payload.new.name == gameName){
    document.querySelector("#my-cover").style.zIndex = "100";
    document.querySelector("#battleships-menu").style.zIndex = "-10";
    let smallBoatDivs = document.querySelectorAll(".small-boat-div");
    for(let i=0;i<smallBoatDivs.length;i++)smallBoatDivs[i].style.display = "block";
    document.querySelector('#random-placement').style.display = "none";
    document.querySelector('#random-placement').disabled = true;  
    disableBoats();
    if(player === 1){
      opponentGrid=payload.new.player2;
      setMyGrid(payload.new.player1);
    }
    else{
      opponentGrid=payload.new.player1;
      setMyGrid(payload.new.player2);
    }
    setOpponentSmallShips();
    turn = payload.new.turn;
if(turn === player){
  document.querySelector("#opponent-cover").style.marginLeft = "15.25em";
  document.querySelector("#opponent-board").classList.remove("disableElement");
}
else{
document.querySelector("#opponent-cover").style.marginLeft = "40em";
document.querySelector("#opponent-board").classList.add("disableElement");
}
  if(gameOver()){
    document.querySelector("#game-over-screen").style.zIndex = 10;
    document.querySelector("#opponent-cover").style.marginLeft = "15.25em";
  }
}
removeGameFromPage();
}
)
.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'ships_games' }, payload => {
  if(payload.new.name != gameName)addGameToPage(payload.new);
})
.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'ships_games' }, async payload => {
  removeGameFromPage();
})
.subscribe()