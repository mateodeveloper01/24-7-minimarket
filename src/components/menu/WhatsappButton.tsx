"use client";
import Image from "next/image";

export const WhatsappButton = () => {
  return (
    <div className="fixed bottom-24 right-0">
      <button
        onClick={() =>
          window.open(
            `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WPP_NUMBER}`,
            "_blank",
          )
        }
      >
        <Image src={"/whatsapp.svg"} width={80} height={80} alt="whatsapp" />
      </button>
    </div>
  );
};
