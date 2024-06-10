import Image from "next/image";

export const WhatsappButton = () => {
  return (
    <div className="fixed bottom-24 right-0">
      <Image src={"/whatsapp.svg"} width={80} height={80} alt='whatsapp'  />
    </div>
  );
};
