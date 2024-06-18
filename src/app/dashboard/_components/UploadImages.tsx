import { Button } from "@/components";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
interface Props {
  onUpload: (file: File | null) => void;
}
export const UploadImages = ({ onUpload }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
    // create.mutate(formData);
  }, [onUpload]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button variant={isDragActive ? "default" : "outline"}>
        {isDragActive
          ? "Suelta la imagen aquí"
          : "Haz clic o arrastra una imagen aquí"}
      </Button>
    </div>
  );
};
