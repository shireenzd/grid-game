let N = 10;
      let startIndex = 2;
      let endIndex = 100;
      let waterBoxes = [2, 12, 13, 23, 24, 34, 44, 45, 46, 47, 57, 58, 68, 69, 70, 80, 79, 78, 88, 98, 99, 100];
      let boxesContainer = document.querySelector('.boxes-container');
      // 10 x 10
      // loop to generate 100 boxes
      generateInActiveGameBoard();

      function generateActiveGameBoard() {
        boxesContainer.innerHTML = '';
        for (i = 1; i <= N * N; i++) {
          // generate a box
          let boxHTML = generateBoxHTML(i);
          // append it to boxes container
          boxesContainer.innerHTML += boxHTML;
        }
        
        document.querySelectorAll('.box').forEach(function (boxElement) {
          boxElement.addEventListener('mouseover', function () {
            if (!waterBoxes.includes(parseInt(boxElement.dataset.index))) {
              userLost();
            }
          });
        });

        document.querySelector('.end-box').addEventListener('mouseover', function () {
          updateGameMessage('You won!');
        });

        document.querySelector('.boxes-container').addEventListener('mouseleave', userLost);
      }

      function userLost() {
        // show you lose message
        updateGameMessage('You lost! Try again.');
        // reset board
        generateInActiveGameBoard();
      }

      function generateInActiveGameBoard() {
        boxesContainer.innerHTML = '';
        for (i = 1; i <= N * N; i++) {
          // generate a box
          let boxHTML = generateInActiveBox(i);
          // append it to boxes container
          boxesContainer.innerHTML += boxHTML;
        }
        document.querySelector('.start-box').addEventListener('click', startGame);
      }

      function startGame() {
        updateGameMessage('Game started, avoid the gray boxes!');
        generateActiveGameBoard();
      }

      function updateGameMessage(message) {
        document.querySelector('.game-message').innerHTML = message;
      }

      function generateBoxHTML(i) {
        let isWater = waterBoxes.includes(i);
        return `
        <p data-index=${i} class="box ${i == startIndex ? 'start-box' : ''} ${i == endIndex ? 'end-box' : ''} ${isWater ? 'water-box' : ''}">${i}</p>
        `;
      }

      function generateInActiveBox(i) {
        return `
        <p class="box ${i == startIndex ? 'start-box' : ''}">${i}</p>
        `;
      }