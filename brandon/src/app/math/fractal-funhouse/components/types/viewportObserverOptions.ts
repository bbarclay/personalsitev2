export interface ViewportObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect?: (entry: globalThis.IntersectionObserverEntry) => void;
}
