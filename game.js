// ゲームエリアの設定
const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');

// プレイヤーの動き
let isJumping = false;
let gravity = 3;
let jumpStrength = 100;
let playerPosition = 0; // 高さの初期位置
let obstaclePosition = gameArea.offsetWidth; // 障害物の初期位置

// ジャンプの処理
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !isJumping) {
    isJumping = true;
    let jumpHeight = jumpStrength;
    let jumpInterval = setInterval(() => {
      if (jumpHeight <= 0) {
        clearInterval(jumpInterval);
        let fallInterval = setInterval(() => {
          if (playerPosition <= 0) {
            clearInterval(fallInterval);
            isJumping = false;
          } else {
            playerPosition -= gravity;
            player.style.bottom = `${playerPosition}px`;
          }
        }, 20);
      } else {
        playerPosition += gravity;
        jumpHeight -= gravity;
        player.style.bottom = `${playerPosition}px`;
      }
    }, 20);
  }
});

// 障害物の動き
function moveObstacle() {
  obstaclePosition -= 5;
  if (obstaclePosition < -50) {
    obstaclePosition = gameArea.offsetWidth;
  }
  obstacle.style.left = `${obstaclePosition}px`;

  // 衝突判定
  if (obstaclePosition < 150 && obstaclePosition > 100 && playerPosition <= 50) {
    alert('Game Over!');
    resetGame();
  }

  requestAnimationFrame(moveObstacle);
}

// ゲームのリセット
function resetGame() {
  playerPosition = 0;
  obstaclePosition = gameArea.offsetWidth;
  player.style.bottom = `${playerPosition}px`;
}

// ゲームのスタート
moveObstacle();
