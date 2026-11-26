const imageDimensions: Record<string, { height: number; width: number }> = {
  "/images/cleaning.jpg": { width: 1400, height: 933 },
  "/images/garden.jpg": { width: 1400, height: 933 },
  "/images/home-repair.jpg": { width: 1400, height: 831 },
  "/images/photography.jpg": { width: 1400, height: 927 },
  "/images/tech-support.jpg": { width: 1400, height: 933 },
  "/images/web-design.jpg": { width: 1400, height: 1104 },
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85": { width: 4592, height: 3448 },
  "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=85": { width: 4500, height: 8000 },
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85": { width: 4000, height: 3000 },
  "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1400&q=85": { width: 4256, height: 2832 },
  "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=85": { width: 5930, height: 3554 },
  "https://images.unsplash.com/photo-1558521958-0a228e77e984?auto=format&fit=crop&w=1400&q=85": { width: 2970, height: 3782 },
};

export function getImageDimensions(src: string) {
  const dimensions = imageDimensions[src];
  if (!dimensions) throw new Error(`Missing intrinsic image dimensions for ${src}`);
  return dimensions;
}
