/**
 * Shared Neural Node Coordinate Bus
 * Allows PixelName and NeuralBackground to synchronize in real-time
 * with zero React re-render overhead.
 */

export interface SharedNeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const sharedNeuralNodes: SharedNeuralNode[] = [];
