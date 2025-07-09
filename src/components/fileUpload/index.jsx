import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

export default function FileUpload({ onFileChange }) {
  const [fileName, setFileName] = useState("Hech qanday fayl tanlanmagan");
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  // Ruxsat etilgan MIME turlari
  const ALLOWED_TYPES = [
    "text/x-python",         // .py
    "text/javascript",       // .js
    "text/html",             // .html
    "text/css",              // .css
    "application/json",      // .json
    "text/markdown",         // .md
    "text/x-c++src",         // .cpp
    "text/x-csrc",           // .c
    "application/x-typescript", // .ts
    "text/plain"             // .txt
  ];

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // MIME type tekshirish
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Faqat dasturlashga oid fayllar yuklanadi (.py, .js, .html, .cpp, va h.k.)");
      setFileName("Hech qanday fayl tanlanmagan");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Fayl hajmi 5MB dan oshmasligi kerak.");
      setFileName("Hech qanday fayl tanlanmagan");
      return;
    }

    setError("");
    setFileName(file.name);
    if (onFileChange) {
      onFileChange(file);
    }
  };

  return (
    <div className="block">
      <button className="px-4 bg-blue-600 text-white rounded hover:bg-blue-700 mr-3">
        <label
          htmlFor="file-upload"
          className="flex justify-center gap-2 px-4 py-2 cursor-pointer"
        >
          <UploadOutlined className="text-gray-100 text-xl" />
          <span className="text-gray-100 font-medium">Kod faylini yuklang</span>
          <input
            id="file-upload"
            type="file"
            accept=".py,.js,.html,.css,.json,.ts,.cpp,.c,.md,.txt"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </button>
        <p className="inline-block mt-2 text-sm text-gray-600 text-center">Fayl: <span className="text-blue-500">{fileName}</span></p>

      {error && (
        <p className="mt-1 text-red-600 text-sm text-center font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
