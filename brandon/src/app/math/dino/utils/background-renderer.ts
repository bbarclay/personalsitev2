import { EraId } from './era-utils';

interface ParallaxLayer {
  image: HTMLImageElement;
  speed: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LayerConfig {
  src: string;
  speed: number;
}

export class BackgroundRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private era: EraId;
  private layers: ParallaxLayer[] = [];
  private loaded: boolean = false;
  private loading: boolean = false;
  private timestamp: number = 0;
  private errorCount: number = 0;
  private readonly maxRetries: number = 3;

  constructor(canvas: HTMLCanvasElement, era: EraId) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.era = era;
    this.initializeLayers().catch(error => {
      console.error('Failed to initialize background layers:', error);
      this.drawFallbackBackground();
    });
  }

  private async initializeLayers() {
    if (this.loading) return;
    this.loading = true;

    try {
      // Configure layers based on era
      const layerConfigs = this.getEraLayers(this.era);
      
      // Load all images with retry logic
      const loadPromises = layerConfigs.map(config => 
        this.loadImageWithRetry(config.src)
      );
      
      const images = await Promise.all(loadPromises);

      // Create layers with loaded images
      this.layers = layerConfigs.map((config, index) => ({
        image: images[index],
        speed: config.speed,
        x: 0,
        y: 0,
        width: this.canvas.width,
        height: this.canvas.height
      }));

      this.loaded = true;
      this.errorCount = 0;
    } catch (error) {
      console.error('Failed to load background layers:', error);
      this.errorCount++;
      
      if (this.errorCount < this.maxRetries) {
        console.log(`Retrying background initialization (attempt ${this.errorCount + 1}/${this.maxRetries})...`);
        setTimeout(() => {
          this.initializeLayers();
        }, 1000 * this.errorCount); // Exponential backoff
      }
    } finally {
      this.loading = false;
    }
  }

  private getEraLayers(era: EraId): LayerConfig[] {
    const baseUrl = '/assets/backgrounds';
    
    switch (era) {
      case 'triassic':
        return [
          { src: `${baseUrl}/triassic/sky.png`, speed: 0 },
          { src: `${baseUrl}/triassic/clouds.png`, speed: 0.2 },
          { src: `${baseUrl}/triassic/mountains.png`, speed: 0.4 },
          { src: `${baseUrl}/triassic/ground.png`, speed: 1 }
        ];
      case 'jurassic':
        return [
          { src: `${baseUrl}/jurassic/sky.png`, speed: 0 },
          { src: `${baseUrl}/jurassic/clouds.png`, speed: 0.2 },
          { src: `${baseUrl}/jurassic/forest.png`, speed: 0.4 },
          { src: `${baseUrl}/jurassic/ground.png`, speed: 1 }
        ];
      case 'cretaceous':
        return [
          { src: `${baseUrl}/cretaceous/sky.png`, speed: 0 },
          { src: `${baseUrl}/cretaceous/clouds.png`, speed: 0.2 },
          { src: `${baseUrl}/cretaceous/landscape.png`, speed: 0.4 },
          { src: `${baseUrl}/cretaceous/ground.png`, speed: 1 }
        ];
      default:
        return [];
    }
  }

  private async loadImageWithRetry(src: string, retries: number = 3): Promise<HTMLImageElement> {
    let lastError;

    for (let i = 0; i < retries; i++) {
      try {
        return await this.loadImage(src);
      } catch (error) {
        lastError = error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }

    throw lastError;
  }

  private async loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const timer = setTimeout(() => {
        reject(new Error(`Image load timeout: ${src}`));
      }, 5000); // 5-second timeout

      img.onload = () => {
        clearTimeout(timer);
        resolve(img);
      };

      img.onerror = () => {
        clearTimeout(timer);
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
    });
  }

  public draw(timestamp: number = performance.now()): void {
    if (!this.loaded) {
      this.drawFallbackBackground();
      return;
    }

    const deltaTime = timestamp - this.timestamp;
    this.timestamp = timestamp;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw each layer with parallax effect
    this.layers.forEach(layer => {
      // Update layer position
      layer.x -= layer.speed * deltaTime * 0.1;
      if (layer.x <= -layer.width) {
        layer.x = 0;
      }

      // Draw layer twice to create seamless scrolling
      this.ctx.drawImage(
        layer.image,
        layer.x,
        layer.y,
        layer.width,
        layer.height
      );
      this.ctx.drawImage(
        layer.image,
        layer.x + layer.width,
        layer.y,
        layer.width,
        layer.height
      );
    });
  }

  private drawFallbackBackground(): void {
    const colors = {
      triassic: { 
        sky: ['#ff9966', '#ff5e62'],
        ground: '#663300'
      },
      jurassic: { 
        sky: ['#99ccff', '#336699'],
        ground: '#006600'
      },
      cretaceous: { 
        sky: ['#ffcc66', '#ff9933'],
        ground: '#996633'
      }
    };

    const { sky, ground } = colors[this.era];

    // Draw sky gradient
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, sky[0]);
    gradient.addColorStop(1, sky[1]);
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw ground with texture
    this.ctx.fillStyle = ground;
    const groundHeight = 100;
    const groundY = this.canvas.height - groundHeight;
    
    this.ctx.fillRect(0, groundY, this.canvas.width, groundHeight);

    // Add ground texture
    this.ctx.fillStyle = this.adjustColor(ground, -20);
    for (let x = 0; x < this.canvas.width; x += 30) {
      this.ctx.fillRect(
        x,
        groundY + Math.sin(x * 0.05) * 5,
        20,
        groundHeight
      );
    }
  }

  private adjustColor(color: string, amount: number): string {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  public setEra(era: EraId): void {
    if (this.era === era) return;
    this.era = era;
    this.loaded = false;
    this.initializeLayers().catch(error => {
      console.error('Failed to initialize new era background:', error);
      this.drawFallbackBackground();
    });
  }

  public isLoaded(): boolean {
    return this.loaded;
  }

  public resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    
    // Update layer dimensions
    this.layers.forEach(layer => {
      layer.width = width;
      layer.height = height;
    });
  }
}
