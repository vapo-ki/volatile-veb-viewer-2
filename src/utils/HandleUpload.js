import JSZip from "jszip";

export default async function getUnzippedFiles(zipFile) {
  const zip = new JSZip();

  const files = await zip.loadAsync(zipFile)

  const fileObjects = {};
  for (let i = 0; i < Object.keys(files["files"]).length; i++) {
    const file = files["files"][Object.keys(files["files"])[i]];
    const fileData = await file.async("uint8array");
    
    if(!file.dir) {
      fileObjects[file.name] = URL.createObjectURL(new Blob([fileData]));
    }
  }

  return {
    local: false,
    model: fileObjects
  };
}
