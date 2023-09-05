import React from "react";
const useDownload = () => {
  const download = (blob, fileName) => {
    let file = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = file;
    a.download = fileName;
    a.click();
  };
  return {download}
};

export default useDownload;
