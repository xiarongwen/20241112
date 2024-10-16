import React, { useState } from 'react';
import { Document, Page, pdfjs  } from 'react-pdf';
import { PDFDocumentProxy } from 'pdfjs-dist';
import Tooltip from '../Tooltip'
import Button from '../button';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './index.scss'
import { degrees, PDFDocument } from 'pdf-lib';

const zoomInIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"></path></svg>
const zoomOutIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"></path></svg>

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
interface IProps {
    message?: string;
  }

const PDFProcessor: React.FC<IProps> = () => {
    const [file, setFile] = useState(null as any);
    const [numPages, setNumPages] = useState(0);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [wrapLevel, setWrapLevel] = useState(200);
    const [pageRotations, setPageRotations] = useState<number[]>([]);
    const [maxIn, setMaxIn] = useState(false);
    const [maxOut, setMaxOut] = useState(false);

    const onFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
        const totalPages = pdf.numPages;
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

    const onDownload = async () => {
        if (!file) return;

        const fileReader = new FileReader();
        
        fileReader.onload = async () => {
            const arrayBuffer = fileReader.result as ArrayBuffer;
            
            // 加载 PDF
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pages = pdfDoc.getPages();

            // 应用旋转，确保角度有效
            pages.forEach((page, index) => {
                let rotation = pageRotations[index] || rotationAngle;

                // 确保旋转角度为 0, 90, 180 或 270
                rotation = (rotation % 360 + 360) % 360; // 保持在 0-359 的范围
                console.log(rotation)
                page.setRotation(degrees(rotation || 0) );
            });

            // 保存新的 PDF
            const pdfBytes = await pdfDoc.save();
            
            // 创建下载链接
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'modified_pdf.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        
        fileReader.readAsArrayBuffer(file);
    };


    const handleZoomIn = () => {
        if (zoomLevel < 2) {
            setZoomLevel(prevZoom => prevZoom + 0.3);
            setWrapLevel(prevWrap => prevWrap + 50);
            setMaxOut(false)

        } else {
            setMaxIn(true)
        }

    };

    const handleZoomOut = () => {
        if (zoomLevel > 0.8) {
            setZoomLevel(prevZoom => prevZoom - 0.3 > 0 ? prevZoom - 0.3 : prevZoom);
            setWrapLevel(prevWrap => prevWrap - 50);
            setMaxIn(false)

        } else {
            setMaxOut(true)
            
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
            (pageRotation) => pageRotation + rotationAngle
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
                    <Tooltip position='top' text='Remove this PDF and select a new one' children={
                        <Button onClick={onRemove} type='remove' label='Remove PDF' />
                    } />
                     <Tooltip position='top' text='Zoom In' children={
                       <Button disabled={maxIn} onClick={handleZoomIn} type='circle' label={zoomInIcon} />
                    } />
                     <Tooltip position='top' text='Zoom Out' children={
                        <Button disabled={maxOut} onClick={handleZoomOut} type='circle' label={zoomOutIcon} />
                    } />
                   
                </div>
                <div className='flex flex-wrap justify-center'>
                    <Document rotate={rotationAngle} file={file} onLoadSuccess={onDocumentLoadSuccess}>
                        <div className='flex flex-wrap justify-center'>
                            {Array.from({ length: numPages }, (_, index) => (
                                <div key={index} className='m-3' style={{maxWidth: `${wrapLevel}px`, flex:` 0 0 ${wrapLevel}px`}} onClick={() => handlePageClick(index + 1)}>
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
                <div className='flex justify-center items-center space-x-3 selecto-ignore'>
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
