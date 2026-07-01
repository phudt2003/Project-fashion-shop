import { useState, useRef } from 'react';
import { axiosClient } from '../../lib/axiosClient';

/**
 * Component upload ảnh sản phẩm lên Cloudinary
 *
 * Props:
 *  - onUploadSuccess(imageData) — callback khi upload thành công, trả về { url, public_id }
 *  - maxFiles — số ảnh tối đa (default: 8)
 */
export default function ProductImageUpload({ onUploadSuccess, maxFiles = 8 }) {
  const [previews, setPreviews] = useState([]); // [{ url, public_id, file?, uploading?, error? }]
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = async (files) => {
    const fileArray = Array.from(files).slice(0, maxFiles - previews.length);

    for (const file of fileArray) {
      // Validate
      if (!file.type.startsWith('image/')) continue;
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" vượt quá 5MB`);
        continue;
      }

      // Tạo preview local trước
      const localUrl = URL.createObjectURL(file);
      const tempId = Date.now() + '-' + Math.random().toString(36).slice(2);

      setPreviews((prev) => [
        ...prev,
        { url: localUrl, public_id: null, tempId, uploading: true, error: null },
      ]);

      // Upload lên Cloudinary qua backend
      try {
        const formData = new FormData();
        formData.append('image', file);

        const res = await axiosClient.post('/products/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const imageData = {
          url: res.data?.url || res.url,
          public_id: res.data?.public_id || res.public_id,
        };

        setPreviews((prev) =>
          prev.map((p) =>
            p.tempId === tempId
              ? { ...p, url: imageData.url, public_id: imageData.public_id, uploading: false }
              : p,
          ),
        );

        // Callback để parent component lưu vào state
        onUploadSuccess?.(imageData);
      } catch (err) {
        console.error('Upload error:', err);
        setPreviews((prev) =>
          prev.map((p) =>
            p.tempId === tempId
              ? { ...p, uploading: false, error: err?.message || 'Upload thất bại' }
              : p,
          ),
        );
      }
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files?.length) {
      handleFiles(e.target.files);
    }
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const removePreview = (tempId) => {
    setPreviews((prev) => {
      const item = prev.find((p) => p.tempId === tempId);
      if (item?.url?.startsWith('blob:')) URL.revokeObjectURL(item.url);
      return prev.filter((p) => p.tempId !== tempId);
    });
  };

  const isMaxReached = previews.length >= maxFiles;

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      {!isMaxReached && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative flex flex-col items-center justify-center gap-3 
            rounded-xl border-2 border-dashed p-8 cursor-pointer
            transition-all duration-200 ease-in-out
            ${
              dragActive
                ? 'border-blue-500 bg-blue-50 scale-[1.01]'
                : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/50'
            }
          `}
        >
          {/* Upload Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700">
              Kéo thả ảnh vào đây hoặc{' '}
              <span className="text-blue-600 underline">chọn từ máy</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              JPG, PNG, WEBP — Tối đa 5MB / ảnh — Còn {maxFiles - previews.length} slot
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {/* Previews Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {previews.map((preview) => (
            <div
              key={preview.tempId}
              className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              <img
                src={preview.url}
                alt="Preview"
                className={`h-full w-full object-cover transition-opacity ${
                  preview.uploading ? 'opacity-50' : 'opacity-100'
                }`}
              />

              {/* Uploading overlay */}
              {preview.uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
                </div>
              )}

              {/* Error overlay */}
              {preview.error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 p-2">
                  <span className="text-center text-xs font-medium text-red-700">
                    {preview.error}
                  </span>
                </div>
              )}

              {/* Success badge */}
              {!preview.uploading && !preview.error && preview.public_id && (
                <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              {/* Remove button */}
              {!preview.uploading && (
                <button
                  onClick={() => removePreview(preview.tempId)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 hover:bg-red-600"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
