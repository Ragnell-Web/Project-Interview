let countdown;
const timerDisplay = document.querySelector(`.display__time-left`);
const endTimeDisplay = document.querySelector(`.display__end-time`);
const buttons = document.querySelectorAll(`[data-time]`)

function timer(seconds) {
  clearInterval(countdown)
  const now = new Date().getTime();
  // Date.now()
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondLeft = Math.round((then - Date.now()) / 1000);
    if (secondLeft <= 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(secondLeft);
  }, 1000);
};

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds - (minutes * 60);
  // sama denga seconds % 60
  // % = modulus yaitu sisa dari pembagian
  const display = `${minutes}:${remainderSeconds < 10 ? `0` : ``}${remainderSeconds}`;
  document.title = display
  timerDisplay.innerHTML = display
  console.log({ minutes, remainderSeconds });
}

function displayEndTime(timestamp) {
  const endTime = new Date(timestamp);
  const hours = endTime.getHours();
  const minutes = endTime.getMinutes();
  const adjustHours = hours > 24 ? hours - 24 : hours;
  const adjustMinutes = `${minutes < 10 ? `0`:``}${minutes}`
  endTimeDisplay.innerHTML = `Be back at ${adjustHours}:${adjustMinutes}`
};

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds)
  console.log(seconds);
}

buttons.forEach(button => button.addEventListener(`click`, startTimer));
document.customForm.addEventListener(`submit`, function (e) {
  // agar halaman tidak terestart
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  // untuk mengosongkan fieldnya kembali
  this.reset()
})