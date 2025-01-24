export const loadAudio = (audioElement, onData) => {
    const context = new AudioContext();
    // Create a MediaElementSource from the audio element
    const source = context.createMediaElementSource(audioElement);
    const analyser = context.createAnalyser();
    analyser.fftSize = 64; // Frequency bins
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);
    analyser.connect(context.destination);
    const update = () => {
        analyser.getByteFrequencyData(dataArray);
        onData(Array.from(dataArray));
        requestAnimationFrame(update);
    };
    // Ensure the context is started only after a user gesture
    const startAudioContext = () => {
        context.resume().then(() => {
            console.log('AudioContext resumed');
            update(); // Start updating once resumed
        });
    };
    // Attach the startAudioContext function to the play event
    audioElement.addEventListener('play', startAudioContext);
    // Optional: Handle other events (e.g., pause)
    audioElement.addEventListener('pause', () => {
        console.log('Audio paused');
    });
};
