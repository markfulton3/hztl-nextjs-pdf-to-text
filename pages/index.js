import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;


export default function Home() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({numPages}) => {
    setNumPages(numPages);
  }
  

  const getText = (pdfPath) => {
  

    return (
      <Document 
        file={pdfPath}
        onLoadSuccess={onDocumentLoadSuccess}
        >
          { Array.from(
            new Array(numPages),
            (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
              />
            )
          )}
      </Document>
    )
  }

  const pdfUrl = '/pdfs/medicare-supplement-app.pdf';
  const pdfText = getText(pdfUrl);

  return (
    <div className={styles.container}>
      <Head>
        <title>NextJs Pdf to Text POC</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Next Pdf to Text
        </h1>

        <p className={styles.description}>
          This is the text of {pdfUrl}.
        </p>
        {pdfText}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Horizontal Digital &copy;2022
        </a>
      </footer>
    </div>
  )
}
