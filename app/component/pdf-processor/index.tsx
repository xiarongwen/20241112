import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Button from '../button';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './index.scss'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFProcessor: React.FC<{}> = () => {
    const [file, setFile] = useState(null as any);
    const [numPages, setNumPages] = useState(0);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [wrapLevel, setWrapLevel] = useState(200);
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

    const onDownload = () => {
       
      };
    

    const handleZoomIn = () => {
        if (zoomLevel < 1.6) {
            setZoomLevel(prevZoom => prevZoom + 0.1);
            setWrapLevel(prevWrap => prevWrap + 50);

        }

    };

    const handleZoomOut = () => {
        if (zoomLevel > 0.22) {
            setZoomLevel(prevZoom => prevZoom - 0.1 > 0 ? prevZoom - 0.1 : prevZoom);
            setWrapLevel(prevWrap => prevWrap - 50);
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
                    margin: '0 auto',
                    background: "#fff"
                }}
                    onClick={handleClickUpload}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}>
                    <input id='fileInput' accept='.pdf' type="file" onChange={onFileChange} style={{ display: 'none' }} />
                    <p>Click to upload or drag and drop</p>
                </div>
            </>
        )
    }
    // 
    const ViewWarp = () => {
        return (
            <>
                <div className='flex justify-center items-center space-x-3 selecto-ignore'>
                    <Button onClick={onRotateAll} label='Rotate all' />
                    <Button onClick={onRemove} type='remove' label='Remove PDF' />
                    <Button onClick={handleZoomIn} type='circle' label='+' />
                    <Button onClick={handleZoomOut} type='circle' label='-' />
                </div>
                <div className='flex flex-wrap justify-center'>
                    <Document rotate={rotationAngle} file={file} onLoadSuccess={onDocumentLoadSuccess}>
                        <div className='flex flex-wrap justify-center'>
                            {Array.from({ length: numPages }, (_, index) => (
                                <div className='m-3' style={{maxWidth: `${wrapLevel}px`, flex:` 0 0 ${wrapLevel}px`}} onClick={() => handlePageClick(index + 1)}>
                                    <div className='relative cursor-pointer'>
                                        <div className='overflow-hidden transition-transform'>
                                            <div className='relative h-full w-full flex flex-col justify-between items-center shadow-md p-3 bg-white hover:bg-gray-50'>
                                            <div className='pointer-events-none w-full shrink'>
                                                <div>
                                                <Page 
                                                    renderMode="canvas"
                                                    width={180}
                                                    scale={zoomLevel}
                                                    rotate={
                                                        pageRotations[index] || rotationAngle
                                                    }
                                                    renderTextLayer={false} pageNumber={index + 1} />
                                                </div>
                                                
                                            </div>

                                            <div className='w-[90%] text-center shrink-0 text-xs italic overflow-hidden text-ellipsis whitespace-nowrap'>{index + 1}</div>
                                            </div>
                                            
                                        </div>

                                    </div>

                                </div>
                            ))}
                        </div>
                    </Document>
                </div>
                <div>
                <Button onClick={onDownload} label='download' />

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
