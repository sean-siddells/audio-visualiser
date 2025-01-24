import * as THREE from 'three';

export const createVisualizer = (scene: THREE.Scene) => {
  const bars: THREE.Mesh[] = [];
  const numBars = 32;

  // Create bars for the visualizer
  for (let i = 0; i < numBars; i++) {
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({
      color: Math.random() * 0xffffff,
    });
    const bar = new THREE.Mesh(geometry, material);
    bar.position.x = (i - numBars / 2) * 0.2;
    scene.add(bar);
    bars.push(bar);
  }

  return {
    update: (data: number[]) => {
      for (let i = 0; i < bars.length; i++) {
        const scale = data[i] || 0;
        bars[i].scale.y = scale * 5;
      }
    },
  };
};
