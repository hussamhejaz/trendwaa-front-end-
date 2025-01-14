import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const MediaUpload = ({ setValue, errors }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const onDrop = (acceptedFiles) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    const updatedFiles = [...files, ...mappedFiles];
    setFiles(updatedFiles);
    setValue("media", updatedFiles, { shouldValidate: true });
    
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
      "video/*": [".mp4", ".mov"],
    },
    maxSize: 5242880, // 5MB
    multiple: true,
  });

  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
    setValue("media", newFiles, { shouldValidate: true });
  };

  const thumbs = useMemo(
    () =>
      files.map((file, index) => (
        <div
          key={index}
          className="relative w-full h-48 bg-gray-50 border border-gray-300 rounded-md overflow-hidden"
        >
          <button
            type="button"
            onClick={removeFile(file)}
            className="absolute top-1 right-1 bg-white bg-opacity-75 rounded-full p-1 hover:bg-opacity-100"
          >
            <XMarkIcon className="w-4 h-4 text-gray-600" />
          </button>
          {file.type.startsWith("image") ? (
            <img
              src={file.preview}
              alt={`Media Preview ${index + 1}`}
              className="object-contain h-full w-full"
            />
          ) : (
            <video src={file.preview} controls className="object-contain h-full w-full" />
          )}
        </div>
      )),
    [files]
  );

  useEffect(() => {
    // Revoke data URIs to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const uploadFiles = async () => {
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
  
      const response = await fetch('http://localhost:5001/api/media/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload media files.');
      }
  
      const data = await response.json();
      console.log('Received mediaURLs from backend:', data.mediaURLs);
  
      // Validate mediaURLs
      if (!data.mediaURLs || !Array.isArray(data.mediaURLs) || data.mediaURLs.length === 0) {
        throw new Error('No valid media URLs received from backend.');
      }
  
      // Ensure all mediaURLs are valid strings
      const validMediaURLs = data.mediaURLs.filter(url => typeof url === 'string' && url.length > 0);
      if (validMediaURLs.length === 0) {
        throw new Error('All received media URLs are invalid.');
      }
  
      setValue("mediaURLs", validMediaURLs, { shouldValidate: true });
      toast.success('Media uploaded successfully!');  // <-- Success toast
      
      // Optionally, clear the uploaded files
      setFiles([]);
      setValue("media", [], { shouldValidate: true }); // Clear media after upload
    } catch (error) {
      console.error('Error uploading media:', error);
      setUploadError(error.message);
      toast.error(error.message || 'Failed to upload media.');  // <-- Error toast
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Media Upload</h3>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the files here ...</p>
        ) : (
          <p className="text-gray-500">
            Drag & drop images or videos here, or click to select files
          </p>
        )}
      </div>
      {errors.media && (
        <p className="mt-1 text-red-500 text-sm flex items-center">
          <InformationCircleIcon className="w-4 h-4 mr-1" />
          {errors.media.message}
        </p>
      )}
      {/* Media Previews */}
      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {thumbs}
        </div>
      )}
      {/* File Rejections */}
      {fileRejections.length > 0 && (
        <div className="mt-4">
          {fileRejections.map(({ file, errors }, index) => (
            <div key={index} className="text-red-500 text-sm flex items-center">
              <InformationCircleIcon className="w-4 h-4 mr-1" />
              {file.name} - {errors[0].message}
            </div>
          ))}
        </div>
      )}
      {/* Upload Button */}
      {files.length > 0 && (
        <button
          type="button"
          onClick={uploadFiles}
          disabled={uploading}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload Media'}
        </button>
      )}
      {/* Upload Error */}
      {uploadError && (
        <p className="mt-2 text-red-500 text-sm flex items-center">
          <InformationCircleIcon className="w-4 h-4 mr-1" />
          {uploadError}
        </p>
      )}
    </div>
  );
};

export default MediaUpload;
