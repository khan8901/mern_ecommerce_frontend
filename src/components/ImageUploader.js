import React, { useState } from 'react';
import { Image, Transformation, CloudinaryContext, openUploadWidget } from 'cloudinary-react';

const ImageUploader = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageUpload = () => {
    const uploadOptions = {
      cloudName: 'your_cloud_name',
      uploadPreset: 'your_upload_preset',
      multiple: true,
      resourceType: 'image',
      maxFiles: 5,
      cropping: false,
      croppingAspectRatio: 1,
      croppingDefaultSelectionRatio: 0.75,
      showSkipCropButton: false,
      styles: {
        palette: {
          window: '#ffffff',
          windowBorder: '#90a0b3',
          tabIcon: '#0078ff',
          menuIcons: '#5a616a',
          textDark: '#000000',
          textLight: '#ffffff',
          link: '#0078ff',
          action: '#ff620c',
          inactiveTabIcon: '#0e2f5a',
          error: '#f44235',
          inProgress: '#0078ff',
          complete: '#20b832',
          sourceBg: '#f4f4f8',
        },
        fonts: {
          default: null,
          monospace: 'Courier New, monospace',
        },
      },
    };

    openUploadWidget(uploadOptions, (error, result) => {
      if (!error && result && result.event === 'success') {
        const uploadedImage = result.info.secure_url;
        setUploadedImages([...uploadedImages, uploadedImage]);
      }
    });
  };

  return (
    <div>
      <button onClick={handleImageUpload}>Upload Images</button>
      <CloudinaryContext cloudName="your_cloud_name">
        {uploadedImages.map((image, index) => (
          <div key={index}>
            <Image publicId={image}>
              <Transformation width="200" height="200" crop="fill" />
            </Image>
          </div>
        ))}
      </CloudinaryContext>
    </div>
  );
};

export default ImageUploader;