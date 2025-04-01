/**
 * Sound effects manager for Pyramid Builders
 * Uses the Web Audio API with base64-encoded sounds to avoid external files
 */

interface SoundEffects {
  [key: string]: string; // Sound name -> base64 encoded audio data
}

class SoundManager {
  private context: AudioContext | null = null;
  private sounds: {[key: string]: AudioBuffer} = {};
  private enabled = true;
  private initialized = false;
  private audioBufferCache: {[key: string]: AudioBuffer} = {};
  
  // Base64-encoded short sound effects
  private soundEffects: SoundEffects = {
    success: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAFAAAJrQBVVVVVVVVVVVVVVVVVVVWqqqqqqqqqqqqqqqqqqqrV1dXV1dXV1dXV1dXV1dXV/////////////////////wAAADFMQVZDNTguMTMuMTAwAAAAAAAAAAR2AAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAAAAFdpbmcAAAAPAAAABQAACa0AVVVVVVVVqqqqqqqqqtXV1dXV1dX///////////8AAAA8TEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UMQAAAZUXVj0DAAAikurn4GAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UMQAAARcPWH8wwABCZGvf5iAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UMQAAARIPYPcxAAAtQe23mGGRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tQxAAABFRLS/xhgAqVCiq/h6ZBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==',
    error: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU5LjE2LjEwMAAAAAAAAAAAAAAA/+NAwAAAAAAAAAAAAFhpbmcAAAAPAAAAAwAAA4YAICAgICAgICAgICAgICAgQEBAQEBAQEBAQEBAQEBgYGBgYGBgYGBgYGBgYGD///////////////////////////////////////////8AAAAATGF2YzU5LjIyAAAAAAAAAAAAAAAAJAAAAAAAAAAABOD4j+SXAAAAAAAAAAAAAAAAAAAA/+RAwAAWMZYBGQAAtJYyFjMBAIJQlVCyEAQBCQu5y7u5dxdwQBAEOcXcQcEAQhd3Fw7uncu7u3du3bkPgAAhCEIQhAUDgcDgcBAQEAQEgIAgIAg',
    click: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU5LjI3LjEwMAAAAAAAAAAAAAAA/+NAwAAAAAAAAAAAAFhpbmcAAAAPAAAAAgAAAYsAUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQ/1BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBAIAUAQCAIThD/IAgCQBAcIdoACIQM6JABCEIQ4ACIKAAAAA0gEAsWFhYWFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/jQMAAAANoAJkEADAAA0gAqHQAAIxsT1jMNCYaygRETORsKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqPcIO6kCHh4eHh4iIiIiIiJaWlpaWlhEREREREf/jQMAASJaABMBAA0AA0gAyHAAAgJqampqampqampqampqampqampqampqampqampqampqampqamqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqaioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMioqKioqKioqKioqKioqKio=',
    achievement: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAElwC1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1//////////////////////////////////////////////////////////////////8AAAAeTEFNRTMuMTAwBK8AAAAAAAAAAAUgJAJAQQAAgAAABJdjcjfKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//tAxAAABLg9afhRAArhCS2PDwAgAAAAAMuIzUiIiIszfMzTfMiNmyIzMcRKZEZmOIi5EREcREQAAAAAAABAIBAIiJ98QQCIsRnfwQCA+IIzviIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgEAgEAgEAgEAgEAgEAgEBAQEBAQEBAQEBAQEBAQEAgEAgEAgEAgEAgEAgEAgEAgEAgIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIj/+1LEBgAFkDdT/mIAEMSHKf/MMAiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZiMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz/+1LEBAAFwD1N/mGAEMEHaT/MMAA=='
  };

  constructor() {
    // Create context on first user interaction
    const initOnUserAction = () => {
      if (!this.initialized) {
        this.initialize();
        // Remove listeners after initialization
        document.removeEventListener('click', initOnUserAction);
        document.removeEventListener('keydown', initOnUserAction);
      }
    };
    
    document.addEventListener('click', initOnUserAction);
    document.addEventListener('keydown', initOnUserAction);
  }

  private initialize(): void {
    try {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.initialized = true;
      
      // Preload sounds
      Object.keys(this.soundEffects).forEach(key => {
        this.loadSound(key, this.soundEffects[key]);
      });
    } catch (e) {
      console.warn('Web Audio API not supported, sounds will be disabled');
    }
  }

  private async loadSound(name: string, base64Data: string): Promise<void> {
    if (!this.context) return;
    
    try {
      // Parse base64 data
      const response = await fetch(base64Data);
      const arrayBuffer = await response.arrayBuffer();
      
      // Decode audio data
      this.context.decodeAudioData(arrayBuffer, (buffer) => {
        this.audioBufferCache[name] = buffer;
      }, (error) => {
        console.error(`Error decoding audio data for ${name}:`, error);
      });
    } catch (error) {
      console.error(`Failed to load sound ${name}:`, error);
    }
  }

  public play(name: string, volume = 0.5): void {
    if (!this.context || !this.enabled || !this.initialized) return;
    
    const buffer = this.audioBufferCache[name];
    if (!buffer) {
      return;
    }

    try {
      // Create source and gain nodes
      const source = this.context.createBufferSource();
      const gainNode = this.context.createGain();
      
      // Connect nodes
      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(this.context.destination);
      
      // Set volume and play
      gainNode.gain.value = volume;
      source.start(0);
    } catch (error) {
      console.error(`Error playing sound ${name}:`, error);
    }
  }

  public enable(): void {
    this.enabled = true;
  }

  public disable(): void {
    this.enabled = false;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }
}

// Create a singleton instance
export const soundManager = new SoundManager(); 