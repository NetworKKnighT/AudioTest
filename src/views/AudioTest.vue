<template>
  <div class="flex gap-4">
    <Button @click="handleClickTestSound" label="Тест звука"
                class="w-[200px] h-[48px] md:h-[60px] lg:h-[72px] text-[14px] md:text-[16px] lg:text-[20px]"
                icon="pi check-circle-icon" iconPos="left" />

    <Button @click="handleClickTestSound2" label="Тест звука 2"
                class="w-[200px] h-[48px] md:h-[60px] lg:h-[72px] text-[14px] md:text-[16px] lg:text-[20px]"
                icon="pi check-circle-icon" iconPos="left" />
  </div>
</template>

<script setup>
import Button from '@/volt_mod/Button.vue'

const AudioPlayer = (function () {
    function AudioPlayer() {
    }

    AudioPlayer.prototype.playAudio = function (url, extAudio) {
        return new Promise(function (resolve, reject) { // return a promise
            const audio = extAudio ?? new Audio(); // create audio wo/ src
            audio.src = url;
            audio.preload = "auto"; // intend to play through
            audio.autoplay = true; // autoplay when loaded
            audio.onerror = reject; // on error, reject
            audio.onended = resolve; // when done, resolve
        });
    };

    AudioPlayer.prototype.playSoundsInSequence = function (urls) {
        const self = this;
        const audio = new Audio();

        var p = Promise.resolve();

        for (const soundUrl of urls) {
            p = p.then(() => self.playAudio(soundUrl, audio));
        };

        return p;
    }

    return AudioPlayer;
}());

const handleClickTestSound = async () => {
  console.log('Тест звука');

  const urls = [
    'assets/media/klient.ogg',
    'assets/media/а.ogg',
    'assets/media/100v.ogg',
    'assets/media/20v.ogg',
    'assets/media/3.ogg',
    'assets/media/priglashaetsya_k_oknu.ogg',
    'assets/media/2.ogg'
  ];

  const audioPlayer = new AudioPlayer();
  await audioPlayer.playSoundsInSequence(urls);
  console.log('done');
}

const handleClickTestSound2 = () => {
  console.log('Тест звука 2');

  const urls = [
    'assets/media/klient.ogg',
    'assets/media/а.ogg',
    'assets/media/100v.ogg',
    'assets/media/20v.ogg',
    'assets/media/2.ogg',
    'assets/media/priglashaetsya_k_oknu.ogg',
    'assets/media/3.ogg'
  ];

  _playSoundsInSequence3(urls);
  console.log('done');
}

const _playSoundsInSequence3 = function (urls) {
  let mySounds = urls;

  var AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();
  let time = 0;

  let promises = [];
  for(let i = 0; i < mySounds.length; ++i) {
      promises.push(fetch(mySounds[i]).then(response => response.arrayBuffer())
                                      .then(buffer => ctx.decodeAudioData(buffer)));
  }

  Promise.all(promises).then(buffer => {
      for(let i = 0; i < buffer.length; ++i) {
          let track = ctx.createBufferSource();
          track.buffer = buffer[i];
          track.connect(ctx.destination);
          track.start(ctx.currentTime + time);
          time += track.buffer.duration;
      }
  });
}

</script>

<style>
.check-circle-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.25" fill="none" stroke="white" stroke-width="1.5"/><path d="M8.4 12 L10.8 14.4 L15.6 9.6" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  width: 30px;
  height: 30px;
}
</style>
