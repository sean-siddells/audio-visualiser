import { setupScene } from './scene';
import { createVisualizer } from './visualiser';
import { loadAudio } from './audio';
const { scene, camera, renderer } = setupScene();
const visualizer = createVisualizer(scene);
// Create and configure the audio element
const audioElement = document.createElement('audio');
audioElement.src = './DD_Sambas.wav'; // Path to your audio file
audioElement.controls = true;
document.body.appendChild(audioElement);
// Button to start playback (required for user gesture)
const playButton = document.createElement('button');
playButton.textContent = 'Start Audio Visualizer';
document.body.appendChild(playButton);
playButton.addEventListener('click', () => {
    audioElement.play(); // Start audio playback
    loadAudio(audioElement, (data) => {
        visualizer.update(data);
    });
    playButton.style.display = 'none'; // Hide the button after use
});
// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
animate();
