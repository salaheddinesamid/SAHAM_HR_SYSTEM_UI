import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// Optional: Import styles for text selection and links
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import "../styles/PdfViewer.css";

// This prevents the "Worker version mismatch" error
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PDFViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pdf-container">
        
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        scale={1.3}
        loading={<p>Chargement du PDF...</p>}
      >
        <Page 
          pageNumber={pageNumber} 
          renderTextLayer={true}
          renderAnnotationLayer={true}
          width={600} // You can make this responsive
        />
      </Document>
      
      <div className="controls">
        <button className='control-btn' disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)}>
          Précédent
        </button>
        <span>Page {pageNumber} sur {numPages}</span>
        <button className='control-btn' disabled={pageNumber >= numPages} onClick={() => setPageNumber(pageNumber + 1)}>
          Suivant
        </button>
      </div>
    </div>
  );
};