import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from './ui/button';

// Configure PDF.js worker - try multiple sources for better reliability
const workerSources = [
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`,
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`,
  `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
];

let workerLoaded = false;
for (const source of workerSources) {
  try {
    pdfjs.GlobalWorkerOptions.workerSrc = source;
    console.log('PDF.js worker configured:', source);
    workerLoaded = true;
    break;
  } catch (error) {
    console.warn('Failed to load PDF.js worker from:', source, error);
  }
}

if (!workerLoaded) {
  console.error('Failed to load PDF.js worker from any source');
}

interface PDFViewerProps {
  pdfUrl: string;
  title?: string;
  className?: string;
  useIframe?: boolean;
  hideOverlayButton?: boolean;
}

export function PDFViewer({ pdfUrl, title, className = "", useIframe = false, hideOverlayButton = false }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(!useIframe); // Don't show loading for iframe initially
  const [error, setError] = useState<string | null>(null);

  // Debug logging
  React.useEffect(() => {
    console.log('PDFViewer mounted for:', pdfUrl);
    // Test if the PDF URL is accessible
    fetch(pdfUrl, { method: 'HEAD' })
      .then(response => {
        console.log(`PDF URL ${pdfUrl} status:`, response.status);
        if (!response.ok) {
          console.error(`PDF URL ${pdfUrl} is not accessible:`, response.statusText);
        }
      })
      .catch(error => {
        console.error(`Failed to fetch PDF URL ${pdfUrl}:`, error);
      });
  }, [pdfUrl]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log(`PDF loaded successfully: ${pdfUrl} - ${numPages} pages`);
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error('PDF Load Error for:', pdfUrl);
    console.error('Error details:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    setError(`Failed to load PDF: ${error.message}`);
    setLoading(false);
  }

  const nextPage = () => {
    if (pageNumber < (numPages || 1)) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className={`pdf-viewer ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(pdfUrl, '_blank')}
            className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground"
            title="Open PDF in full screen"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 14l-9-9-9 9" />
            </svg>
            Full Screen
          </Button>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden bg-white relative group">
        {/* Full screen button overlay for PDFs without titles */}
        {!title && !hideOverlayButton && (
          <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.open(pdfUrl, '_blank')}
              className="bg-white/90 hover:bg-white shadow-lg flex items-center gap-2"
              title="Open PDF in full screen"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 14l-9-9-9 9" />
              </svg>
              Full Screen
            </Button>
          </div>
        )}
        {loading && !useIframe && (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-sm font-medium text-gray-700 mb-2">Loading PDF...</p>
              <p className="text-xs text-gray-500">This may take a few moments</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-96 bg-red-50 rounded-lg border border-red-200">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Load PDF</h3>
              <p className="text-sm text-red-600 mb-4">{error}</p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Retry
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(pdfUrl, '_blank')}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Open in Browser
                </Button>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {useIframe ? (
              // Fallback to iframe - show immediately, let browser handle loading
              <div className="relative bg-gray-50 rounded-lg overflow-hidden">
                {loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-95 z-10 rounded-lg">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Loading PDF...</p>
                      <p className="text-xs text-gray-500">Opening document in viewer</p>
                    </div>
                  </div>
                )}
                {/* Scroll indicator hint */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none animate-bounce">
                  <div className="bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-medium">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    Scroll to view more
                  </div>
                </div>
                <iframe
                  src={pdfUrl}
                  className="w-full border-0 rounded-lg"
                  title={title || "PDF Document"}
                  style={{ minHeight: '600px' }}
                  onLoad={() => {
                    console.log(`PDF iframe loaded for: ${pdfUrl}`);
                    setLoading(false);
                  }}
                  onError={() => {
                    console.error(`PDF iframe failed to load: ${pdfUrl}`);
                    setError("Failed to load PDF in iframe");
                    setLoading(false);
                  }}
                />
              </div>
            ) : (
              // React-PDF implementation
              <>
                {console.log(`Rendering Document component for: ${pdfUrl}`)}
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading=""
                  className="flex justify-center"
                >
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="shadow-sm"
                  />
                </Document>

                {numPages && numPages > 1 && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevPage}
                      disabled={pageNumber <= 1}
                    >
                      Previous
                    </Button>

                    <span className="text-sm text-muted-foreground">
                      Page {pageNumber} of {numPages}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextPage}
                      disabled={pageNumber >= numPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}