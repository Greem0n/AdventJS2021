//variables
var allKeys, allWhiteKeys, allBlackKeys;

//methods
window.addEventListener("load", () => {
  allKeys = document.getElementsByTagName("a");
  loadAudios();
});

var loadAudios = () => {
  for (let i = 0; i < allKeys.length; i++) {
      let key = allKeys[i]
      let keyIndex = i+1
      key.setAttribute('onclick',`playKeyAudio(${keyIndex})`)
  }
};

var playKeyAudio=(keyIndex)=>{
    let keyAudio = new Audio(`./audio/key-${keyIndex}.mp3`)
    keyAudio.play()
}