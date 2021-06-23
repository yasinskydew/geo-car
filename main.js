const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');
const car = document.createElement('div');

car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
}

const setting = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 3,
}

const enemyImages = [
  "./image/enemy.png",
  "./image/player.png",
  "./image/enemy2.png"
];

function getQuantityElementElements(heightElement) {
  return document.documentElement.clientHeight / heightElement + 1;
}

function moveEnemy() {
  let enemy = document.querySelectorAll('.enemy');
  enemy.forEach(function(item){
    item.y += setting.speed / 2;
    item.style.top = item.y + 'px';

    if(item.y >= document.documentElement.clientHeight) {
      item.y = -100 * setting.traffic;
      item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    }
  });
}

function moveRoad() {
  let lines = document.querySelectorAll('.line');
  lines.forEach(function (line){
    line.y += setting.speed;
    line.style.top = line.y + 'px';

    if(line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }
  });
}

function getRandom(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function playGame() {
  moveRoad();
  moveEnemy();
  if(setting.start === true) {
    if(keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed;
    }
    if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth) - 20) {
      setting.x += setting.speed;
    }
    if(keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }
    if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight) - 1) {
      setting.y += setting.speed;
    }
    car.style.left = setting.x + 'px';
    car.style.top = setting.y + 'px';

    requestAnimationFrame(playGame)
  }
}

function startGame() {
  start.classList.add('hide');
  gameArea.classList.remove('hide');

  for (let i = 0; i < getQuantityElementElements(100); i += 1) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 100) + 'px';
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElementElements(100 * setting.traffic); i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 70)) + 'px';
    enemy.style.top = enemy.y + 'px';
    console.log(getRandom(1,3), 'getRandom(0,3)')
    enemy.style.background = `transparent url("./image/enemy${getRandom(1,3) - 1}.png") center / cover no-repeat`;
    enemy.y = 100 * setting.traffic * i + 1;
    gameArea.appendChild(enemy);
  }

  setting.start = true;
  gameArea.appendChild(car);
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame)
}

function startRun(event) {
  event.preventDefault();
  keys[event.key] = true;
}

function stopRun(event) {
  event.preventDefault();
  keys[event.key] = false;
}