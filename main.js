document.addEventListener('DOMContentLoaded', () => {
  const minutesDisplay = document.getElementById('minutes');
  const secondsDisplay = document.getElementById('seconds');
  const controlButtons = document.querySelectorAll('#controls button');
  const soundButtons = document.querySelectorAll('.sounds button');

  let timer;
  let isRunning = false;
  let time = 1500; // 25 minutes in seconds

  function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
  }

  function startTimer() {
    timer = setInterval(() => {
      if (time > 0) {
        time--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false; // Stop timer when time is up
      }
    }, 1000);
  }

  function toggleRunning() {
    if (isRunning) {
      clearInterval(timer);
    } else {
      startTimer();
    }
    isRunning = !isRunning;
  }

  function increaseTime() {
    time += 60; // Increase by 60 seconds (1 minute)
    updateDisplay();
  }

  function decreaseTime() {
    if (time > 60) {
      time -= 60; // Decrease by 60 seconds (1 minute)
    }
    updateDisplay();
  }

  function toggleSound(button) {
    const soundId = button.getAttribute('data-sound');
    const audioElement = document.getElementById(soundId);
    if (audioElement.paused) {
      // Pause all audios
      document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      // Pause all others buttons
      document.querySelectorAll('.sounds button').forEach(btn => {
        btn.classList.remove('playing');
      });
      // Play audio selected
      audioElement.play();
      button.classList.add('playing');
    } else {
      // Pause audio if it was playing
      audioElement.pause();
      button.classList.remove('playing');
    }
  }
  // Event listeners for control buttons
  controlButtons.forEach(button => {
    button.addEventListener('click', () => {
    const action = button.getAttribute('data-action');
      switch (action) {
        case 'toggleRunning':
          toggleRunning();
          break;
        case 'increaseTime':
          increaseTime();
          break;
        case 'decreaseTime':
          decreaseTime();
          break;    
      }
    });
  });

  // Event listeners for sound buttons
  soundButtons.forEach(button => {
    button.addEventListener('click', () => {
      toggleSound(button);
    });
  });

  updateDisplay();

})