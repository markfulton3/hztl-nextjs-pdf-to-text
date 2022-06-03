import React, { useState, useEffect } from "react";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;


const ConvertPdf = ({ src }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfText, setPdfText] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const getText = (pdfPath) => {
    return (
      <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    );
  };

  useEffect( () => {
      const loadPdf = () => {
        const txt = getText(src);
        setPdfText(txt);
      }
      loadPdf();
  }, [src])
  
  
  return (
    <>
        {pdfText}
    </>
  )
};

export default ConvertPdf;
