import { setupScene } from './scene';
import { createVisualizer } from './visualiser';
import { loadAudio } from './audio';

const { scene, camera, renderer } = setupScene();
const visualizer = createVisualizer(scene);

// Create and configure the audio element
const audioElement = document.createElement('audio');
audioElement.src = './DD_Sambas.wav'; // Path to your audio file
audioElement.controls = true; // Add controls for testing
audioElement.style.position = 'absolute';
audioElement.style.bottom = '10px';
audioElement.style.zIndex = '2';
document.body.appendChild(audioElement);

// Button to start the visualizer
const playButton = document.createElement('button');
playButton.textContent = 'Start Audio Visualizer';
playButton.style.position = 'absolute';
playButton.style.zIndex = '2';
playButton.style.top = '10px';
playButton.style.left = '10px';
playButton.style.padding = '10px 20px';
document.body.appendChild(playButton);

playButton.addEventListener('click', () => {
  audioElement.play(); // Start audio playback
  loadAudio(audioElement, (data) => {
    visualizer.update(data); // Pass frequency data to visualizer
  });
  playButton.style.display = 'none'; // Hide button after starting
});

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
