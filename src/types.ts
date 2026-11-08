export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  dateTag?: string;
  location?: string;
  aspectRatio?: 'portrait' | 'square' | 'landscape';
}

export type SceneState = 'opening' | 'apology' | 'celebration';
