window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
console.log(recognition);

let p = document.createElement(`p`);
const words = document.querySelector(`.words`);

words.appendChild(p);

recognition.addEventListener(`result`, e => {
  const transkrip = [...e.results]
    .map(result => result[0])
    .map(result => result.transcript)
    .join();
  
  p.innerHTML = transkrip;
  if (e.results[0].isFinal) {
    p = document.createElement(`p`);
    words.appendChild(p)
  }
  console.log(e.results);
  console.log(transkrip);
});

// saat suara berakhir perekam suara akan dimulai lagi
recognition.addEventListener(`end`, recognition.start)
recognition.start();