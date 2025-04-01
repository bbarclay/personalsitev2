interface SpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

type AnimationState = 'idle' | 'running' | 'jumping' | 'celebrating';

export class DinoAnimator {
  private ctx: CanvasRenderingContext2D;
  private sprite: HTMLImageElement | null = null;
  private currentFrame: number = 0;
  private frameCount: number = 0;
  private animationState: AnimationState = 'idle';
  private flipped: boolean = false;
  private celebrationTimer: number | null = null;

  private readonly SPRITE_FRAMES: Record<AnimationState, SpriteFrame[]> = {
    idle: [
      { x: 0, y: 0, width: 60, height: 60 },
      { x: 60, y: 0, width: 60, height: 60 }
    ],
    running: [
      { x: 0, y: 60, width: 60, height: 60 },
      { x: 60, y: 60, width: 60, height: 60 },
      { x: 120, y: 60, width: 60, height: 60 },
      { x: 180, y: 60, width: 60, height: 60 }
    ],
    jumping: [
      { x: 0, y: 120, width: 60, height: 60 }
    ],
    celebrating: [
      { x: 0, y: 180, width: 60, height: 60 },
      { x: 60, y: 180, width: 60, height: 60 },
      { x: 120, y: 180, width: 60, height: 60 }
    ]
  };

  private readonly FRAME_DELAY = 5;
  private readonly SCALE = 1.5;
  private loaded: boolean = false;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.initializeSprite();
  }

  private async initializeSprite() {
    try {
      this.sprite = await this.loadImage('/assets/sprites/dino.png');
      this.loaded = true;
    } catch (error) {
      console.error('Failed to load dino sprite:', error);
      this.sprite = null;
      this.loaded = false;
    }
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
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

  public draw(x: number, y: number, velocity: { x: number; y: number }): void {
    if (!this.loaded || !this.sprite) {
      drawFallbackDino(this.ctx, x, y, this.flipped);
      return;
    }

    // Update animation state
    this.updateAnimationState(velocity);

    // Update frame counter
    this.frameCount++;
    if (this.frameCount >= this.FRAME_DELAY) {
      this.frameCount = 0;
      this.currentFrame = (this.currentFrame + 1) % this.SPRITE_FRAMES[this.animationState].length;
    }

    // Get current frame
    const frame = this.SPRITE_FRAMES[this.animationState][this.currentFrame];

    // Save context state
    this.ctx.save();

    // Move to position and flip if needed
    this.ctx.translate(x, y);
    if (this.flipped) {
      this.ctx.scale(-1, 1);
    }

    // Draw sprite with shadow
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    this.ctx.shadowBlur = 5;
    this.ctx.shadowOffsetY = 2;

    this.ctx.drawImage(
      this.sprite,
      frame.x,
      frame.y,
      frame.width,
      frame.height,
      -frame.width * this.SCALE / 2,
      -frame.height * this.SCALE,
      frame.width * this.SCALE,
      frame.height * this.SCALE
    );

    // Reset shadow
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetY = 0;

    // Restore context state
    this.ctx.restore();

    // Check if celebration should end
    if (this.celebrationTimer !== null && Date.now() > this.celebrationTimer) {
      this.celebrationTimer = null;
      this.animationState = 'idle';
    }
  }

  private updateAnimationState(velocity: { x: number; y: number }): void {
    // Don't update state during celebration
    if (this.celebrationTimer !== null) return;

    // Update facing direction
    if (velocity.x !== 0) {
      this.flipped = velocity.x < 0;
    }

    // Update animation state
    if (velocity.y !== 0) {
      this.animationState = 'jumping';
    } else if (velocity.x !== 0) {
      this.animationState = 'running';
    } else {
      this.animationState = 'idle';
    }
  }

  public startCelebrating(): void {
    this.animationState = 'celebrating';
    this.currentFrame = 0;
    this.celebrationTimer = Date.now() + 2000; // Celebrate for 2 seconds
  }

  public isLoaded(): boolean {
    return this.loaded && this.sprite !== null;
  }

  public retry(): void {
    if (!this.loaded) {
      this.initializeSprite();
    }
  }
}

export function drawFallbackDino(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  flipped: boolean = false
): void {
  ctx.save();
  ctx.translate(x, y);
  if (flipped) {
    ctx.scale(-1, 1);
  }

  // Draw basic dino shape
  ctx.fillStyle = '#4CAF50';
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(20, 0);
  ctx.lineTo(20, -40);
  ctx.lineTo(0, -60);
  ctx.lineTo(-20, -40);
  ctx.closePath();
  ctx.fill();

  // Draw eye
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(flipped ? -10 : 10, -45, 3, 0, Math.PI * 2);
  ctx.fill();

  // Draw shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.ellipse(0, 5, 20, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
