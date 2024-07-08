import { Button } from "@/components";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onUpload: (file: File | null) => void;
}

export const UploadImages = ({ onUpload }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        onUpload(file);
      };
      reader.readAsDataURL(file);
    }
    // create.mutate(formData);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button variant={isDragActive ? "default" : "outline"}>
          {isDragActive
            ? "Suelta la imagen aquí"
            : "Haz clic o arrastra una imagen aquí"}
        </Button>
      </div>
      {imageSrc && <img src={imageSrc} alt="Uploaded preview" style={{ marginTop: '10px', maxHeight: '100px' }} />}
    </div>
  );
};