import React, { useState, useEffect } from 'react';

import './image.css'

const DragImage = ({photoImage, setPhotoImage}) => {
  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState(null);
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
      setPhotoImage(e.target.result)
    };
    reader.readAsDataURL(file);
    
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
      setPhotoImage(e.target.result)
    };

    reader.readAsDataURL(file);
  };

  useEffect(()=>{
    setImage(null)
  }, [])

  return (
    <div className={`dropzone ${dragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileInputChange} 
      />
      {/* {image ? (
        <img src={image} alt="Dropped Image" className='w-full h-full'/>
      ) : (
        <p>画像をここにドラッグ＆ドロップします。</p>
      )} */}
      {image ?
        <img src={image} alt="Dropped" className='w-full h-full'/>:
        (
          <p className='mb-0'>Drag and Drop Image Here.</p>
        )
      }
    </div>
  );
};

export default DragImage;
