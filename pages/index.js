import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ConvertPdf from './_convertPdf';
import fetchit from '../lib/fetchit';
import sanityClient from '../lib/client';

const postDoc = (txt) => {

  const text = "This is a sample document"

  if (txt != "") {

    const doc = {
      _type: "post",
      title: "Converted pdf",
      body: text
    };
  
    console.log("Posting to sanity");
  
    const address = "http://localhost:3000/api/post";
    
    const result = fetchit(address, doc);
    console.log(result);
  }
}





export default function Home() {
  const [file, setFile] = useState();
  const [convertedText, setConvertedText] = useState();
  
  const pdfUrl = "/pdfs/medicare-supplement-app.pdf";

  const checkPdf = (e) => {
    const file = e.target.files[0];
    console.log(file.type);
    setFile(file);
  }

  const postPdf = async (e) => {
    const text = "This is a sample document"

    if (!file) {
      return null;
    }

    const el = document.getElementsByClassName("react-pdf__Document")[0];
    const txt = el.innerHTML.replace(/<[^>]+>/g, '');
  
    if (txt != "") {
  
      const doc = {
        _type: "post",
        title: "Converted pdf",
        body: text
      };
    
      console.log("Posting to sanity");
    
      const res = await sanityClient.create(doc);

      console.log(res);
    }
  }

  // const convertToText = (e) => {
  //   if (file && typeof window !== 'undefined') {
  //     console.log("Converting to text");
  
  //     const el = document.getElementsByClassName("react-pdf__Document")[0];
    
  //     const txt = el.innerHTML.replace(/<[^>]+>/g, '');
  
  //     const container = document.getElementsByClassName("pdfConvertedText")[0];
  
  //     container.val = txt;
  //     setConvertedText(txt);
  //   }
  // }

  return (
    <div className={styles.container}>
      <Head>
        <title>NextJs Pdf to Text POC</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          NextJs Pdf to Text
        </h1>
        
        <p className={styles.description}>
          We often need to show the text of a pdf inline within a web page.  This example utilizes the npm package react-pdf and converts a searchable pdf to html.
          This <a className={styles.link} href={pdfUrl} target="_blank" rel="noreferrer">searchable pdf</a> is rendered below.
        </p>

        <h2>Try your own file:</h2>
        <p>
              <label>
                File:
                <input type="file" id="pdfFile" onChange={checkPdf}></input>
              </label>
              <button onClick={postPdf}>Create Post</button>
        </p>

        <h2>Resources</h2>
        <ul>
            <li><a className={styles.link} href="https://www.npmjs.com/package/react-pdf" target="_blank" rel="noreferrer">react-pdf package</a></li>
            <li><a className={styles.link} href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noreferrer">pdfjs</a></li>
            <li><a className={styles.link} href="https://github.com/markfulton3/hztl-nextjs-pdf-to-text" target="_blank" rel="noreferrer">Github</a></li>
        </ul>
        
        <ConvertPdf src={file} />

        <h2>Removing html into raw text:</h2>
        <div className="pdfConvertedText">{convertedText}</div>
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
