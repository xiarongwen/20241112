import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Button from '../button';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './index.scss'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFProcessor: React.FC<{}> = () => {
    const [file, setFile] = useState(null as any);
    const [numPages, setNumPages] = useState(0);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(0.4);
    const [pageRotations, setPageRotations] = useState<number[]>([]);

    const onFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const onDocumentLoadSuccess = ({ numPages: totalPages }) => {
        setNumPages(totalPages);
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

    const handleZoomIn = () => {
        if (zoomLevel < 1) {
            setZoomLevel(prevZoom => prevZoom + 0.1);
        }

    };

    const handleZoomOut = () => {
        if (zoomLevel > 0.22) {
            setZoomLevel(prevZoom => prevZoom - 0.1 > 0 ? prevZoom - 0.1 : prevZoom);
        }

    };

    const handlePageClick = (pageNumber: number) => {
        const newRotations = [...pageRotations];
        const currentRotation = newRotations[pageNumber - 1] || 0;
        newRotations[pageNumber - 1] = currentRotation + 90;
        setPageRotations(newRotations);
    };

    const onRotateAll = () => {
        setRotationAngle((prevAngle) => prevAngle + 90);
        const updatedPageRotations = pageRotations.map(
            (pageRotation, index) => pageRotation + rotationAngle
        );
        setPageRotations(updatedPageRotations);
    };


    const UploadWarp = () => {
        return (
            <>
                <div style={{
                    width: '275px',
                    height: '350px',
                    border: '2px dashed #ccc',
                    padding: '20px',
                    textAlign: 'center',
                    minHeight: '200px',
                    cursor: 'pointer',
                    margin:'0 auto',
                    background:"#fff"
                }}
                    onClick={handleClickUpload}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}>
                    <input id='fileInput' type="file" onChange={onFileChange} style={{ display: 'none' }} />
                    <p>Click to upload or drag and drop</p>
                </div>
            </>
        )
    }

    const ViewWarp = () => {
        return (
            <>
                <div className='top-button'>
                    <Button onClick={onRotateAll} label='Rotate all' />
                    <Button onClick={onRemove} type='remove' label='Remove PDF' />
                    <Button onClick={handleZoomIn} type='circle' label='+' />
                    <Button onClick={handleZoomOut} type='circle' label='-' />
                </div>

                <div className='document-wrap'>
                    <Document onItemClick={({ pageNumber }) => alert('Clicked an item from page ' + pageNumber + '!')} rotate={rotationAngle} className='view-warp' file={file} onLoadSuccess={onDocumentLoadSuccess}>
                        {Array.from({ length: numPages }, (_, index) => (
                            <div className='page-warp'>
                                <Page  className={'pagestyle'} scale={zoomLevel} onClick={() => handlePageClick(index + 1)}
                                    rotate={
                                        pageRotations[index] || rotationAngle
                                    }
                                    renderAnnotationLayer={false} renderTextLayer={false} pageNumber={index + 1} />
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
