import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Button from '../button';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './index.scss'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFProcessor = () => {
  const [file, setFile] = useState(null as any);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);

  const onFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const onDocumentLoadSuccess = ({ numPages: totalPages }) => {
    setNumPages(totalPages);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleClickUpload = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  };

  const onRemove = () => {
    setFile(null)
  }

  const onRotateAll = async () => {
   setRotationAngle((prevAngle) => prevAngle + 90);
  };

  const UploadWarp = () => {
    return (
        <>
    <div style={{
        width:'275px',
        height:'350px',
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        minHeight: '200px',
        cursor: 'pointer',
      }}
        onClick={handleClickUpload}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      <input id='fileInput' type="file" onChange={onFileChange} style={{ display: 'none' }}  />
      <p>Click to upload or drag and drop</p>
    </div>
        </>
    )
  }

  const ViewWarp = () => {
    return (
        <>
        <div>
            <Button onClick={onRotateAll} label='Rotate all' />
            <Button onClick={onRemove} type='remove' label='Remove PDF' />
        </div>
        
        <div className='document-wrap'>
          <Document  rotate={rotationAngle} className='view-warp' file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, index) => (
            <div className='page-warp'>
                <Page renderAnnotationLayer={false} renderTextLayer={false} pageNumber={index + 1} />
                <p>{index + 1}</p>
            </div>
            ))}
            
          </Document>
        </div>
        </>
    )
  }

  return (
       <>
        {!!file ? ViewWarp() : UploadWarp()}
       </>
  );
};

export default PDFProcessor;
