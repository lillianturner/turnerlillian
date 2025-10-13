import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the correct asset path for the current deployment environment
 * Uses Vite's BASE_URL for consistent paths
 */
export function getAssetPath(path: string): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${(import.meta as any).env.BASE_URL}${cleanPath}`;
}