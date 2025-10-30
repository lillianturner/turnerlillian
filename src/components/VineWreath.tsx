interface VineWreathProps {
  width?: number;
  height?: number;
  className?: string;
}

export function VineWreath({ width = 800, height = 250, className = '' }: VineWreathProps) {
  return (
    <div 
      className={`vine-wreath-container ${className}`}
      style={{ width, height }}
    >
      <iframe
        src="/processing-wreath/index.html"
        className="w-full h-full border-0 pointer-events-none"
        title="Vine Wreath Decoration"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}