import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, Loader2, File, FileSpreadsheet, FileDigit } from 'lucide-react';
import { cn } from '@/lib/utils';

const FileUpload = ({ onFileDrop, isParsing }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0 && !isParsing) {
      onFileDrop(acceptedFiles[0]);
    }
  }, [onFileDrop, isParsing]);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
    maxFiles: 1,
    disabled: isParsing
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex flex-col items-center justify-center w-full p-8 text-center border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300",
        "border-white/30 bg-white/5 hover:bg-white/10 hover:border-white/50",
        isDragActive && "border-blue-400",
        isDragAccept && "border-green-500 bg-green-500/10",
        isDragReject && "border-red-500 bg-red-500/10",
        isParsing && "cursor-not-allowed opacity-70"
      )}
    >
      <input {...getInputProps()} />
      <motion.div
        animate={{ y: isDragActive ? -10 : 0 }}
        className="flex flex-col items-center"
      >
        <UploadCloud className="w-16 h-16 text-blue-400 mb-4" />
        {isParsing ? (
          <>
            <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
            <p className="text-xl font-semibold text-white">جاري تحليل الملف...</p>
            <p className="text-gray-300">الرجاء الانتظار قليلاً.</p>
          </>
        ) : (
          <>
            <p className="text-xl font-semibold text-white">
              {isDragActive ? "أفلت الملف هنا!" : "اسحب وأفلت ملف سيرتك الذاتية هنا"}
            </p>
            <p className="text-gray-400 mt-2">أو انقر لتحديد ملف</p>
            <p className="text-xs text-gray-500 mt-4">
              الصيغ المدعومة: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default FileUpload;