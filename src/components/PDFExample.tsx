import { PDFViewer } from './PDFViewer';

export function PDFExample() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">PDF Viewer Example</h1>

      {/* Example 1: Basic PDF Viewer */}
      <div className="mb-8">
        <PDFViewer
          pdfUrl="/path/to/your/document.pdf"
          title="Sample PDF Document"
        />
      </div>

      {/* Example 2: PDF in a modal or card */}
      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Embedded PDF</h2>
        <PDFViewer
          pdfUrl="/path/to/your/portfolio.pdf"
          className="max-w-4xl mx-auto"
        />
      </div>
    </div>
  );
}