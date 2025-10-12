import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the correct asset path for the current deployment environment
 * Automatically handles GitHub Pages base path
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // For GitHub Pages deployment, add the repository name
  // In development, this will be just the path
  const isGitHubPages = window.location.hostname === 'lillianturner.github.io';
  const basePath = isGitHubPages ? '/turnerlillian/' : '/';

  return `${basePath}${cleanPath}`;
}