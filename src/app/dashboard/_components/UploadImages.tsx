import { Button } from "@/components";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from 'next/image';

interface Props {
  onUpload: (file: File | null) => void;
}

export const UploadImages = ({ onUpload }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          try {
            setImageSrc(reader.result as string);
            onUpload(file);
          } catch (error) {
            console.error("Error al procesar el archivo:", error);
          }
        };
        reader.onerror = () => {
          console.error("Error al leer el archivo.");
        };
        reader.readAsDataURL(file);
      }
    },
    [onUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="p-4 border-radius-md text-center cursor-pointer"
        style={{
          border: isDragActive ? "2px dashed #4caf50" : "2px dashed #ccc",
        }}
      >
        <input {...getInputProps()} aria-label="Upload image" />
        <Button
          variant={isDragActive ? "default" : "outline"}
          onClick={(e) => e.preventDefault()}
        >
          {isDragActive
            ? "Suelta la imagen aquí"
            : "Haz clic o arrastra una imagen aquí"}
        </Button>
      </div>
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="Uploaded preview"
          width={100}
          height={100}
          style={{ marginTop: "10px", maxHeight: "100px" }}
        />
      )}
    </div>
  );
};
