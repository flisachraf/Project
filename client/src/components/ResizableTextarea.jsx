import React, { useEffect, useRef, useState } from 'react';

const ResizableTextarea = ({ value, onChange, ...props }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      {...props}
      className="w-full border border-gray-300 p-2 rounded resize-none"
    />
  );
};

export default ResizableTextarea;
