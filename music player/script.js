document.addEventListener('DOMContentLoaded', () => {
    const wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'gray',
      progressColor: 'purple',
      barWidth: 2,
      barHeight: 1,
      responsive: true,
    });
  
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play-button');
    const pauseButton = document.getElementById('pause-button');
    const seekBar = document.getElementById('seek-bar');
    const currentTime = document.getElementById('current-time');
    const totalDuration = document.getElementById('total-duration');
    const volumeBar = document.getElementById('volume-bar');
    const playlist = document.getElementById('playlist');
    const addTrackButton = document.getElementById('add-track-button');
  
    // Load tracks from local storage
    const storedTracks = JSON.parse(localStorage.getItem('tracks')) || [];
    const defaultOption = document.createElement('option');
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Select a track';
    playlist.appendChild(defaultOption);
    storedTracks.forEach((track) => {
      const option = document.createElement('option');
      option.value = track.src;
      option.textContent = track.name;
      playlist.appendChild(option);
    });
  
    // Event listeners
    playButton.addEventListener('click', playTrack);
    pauseButton.addEventListener('click', pauseTrack);
    seekBar.addEventListener('input', seek);
    volumeBar.addEventListener('input', adjustVolume);
    audio.addEventListener('timeupdate', updateSeekBar);
    audio.addEventListener('ended', onTrackEnded);
    addTrackButton.addEventListener('click', addTrack);
  
    // Play a track
    function playTrack() {
      wavesurfer.play();
    }
  
    // Pause the current track
    function pauseTrack() {
      wavesurfer.pause();
    }
  
    // Seek the track to the selected position
    function seek() {
      const seekTime = audio.duration * (seekBar.value / 100);
      audio.currentTime = seekTime;
    }
  
    // Adjust the volume
    function adjustVolume() {
      audio.volume = volumeBar.value;
    }
  
    // Update the seek bar position and current time
    function updateSeekBar() {
      seekBar.value = (audio.currentTime / audio.duration) * 100;
      currentTime.textContent = formatTime(audio.currentTime);
    }
  
    // Handle track ended event
    function onTrackEnded() {
      pauseTrack();
      audio.currentTime = 0;
      seekBar.value = 0;
      currentTime.textContent = formatTime(audio.currentTime);
    }
  
    // Add a track to the playlist
    function addTrack() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.mp3, .wav';
  
      fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          const track = {
            name: file.name,
            src: reader.result,
          };
  
          // Save the track to localStorage
          storedTracks.push(track);
          localStorage.setItem('tracks', JSON.stringify(storedTracks));
  
          // Add the track to the playlist
          const option = document.createElement('option');
          option.value = track.src;
          option.textContent = track.name;
          playlist.appendChild(option);
  
          fileInput.remove();
        };
      });
  
      fileInput.click();
    }
  
    // Change the track when a different option is selected
    function changeTrack() {
      const selectedTrack = playlist.value;
      if (selectedTrack) {
        loadTrack(selectedTrack);
      }
    }
  
    // Load and play the selected track
    function loadTrack(src) {
      audio.src = src;
      wavesurfer.load(src);
      wavesurfer.on('ready', () => {
        playTrack();
      });
      audio.play();
    }
  
    // Format time in MM:SS format
    function formatTime(timeInSeconds) {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    }
  });
  