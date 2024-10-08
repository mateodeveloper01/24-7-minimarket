import { Title } from "../ui/Title";
  const branchs = [
    {
      title: "Lima 1109 - General paz - Cordoba Capital",
      url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212.81426336807772!2d-64.16875977069141!3d-31.41334873235707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a30523b9892d%3A0x5e778ca35725c535!2s24%2F7%20Minimarket!5e0!3m2!1ses!2sar!4v1715959160521!5m2!1ses!2sar",
    },
    {
      title: "Av.Revolución de Mayo 1510 - Crisol Sur - Cordoba Capital",
      url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1702.086500330655!2d-64.16788920050581!3d-31.43690390613197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a37ff1e7a3f7%3A0xea3f0f6d139ae971!2sAlmac%C3%A9n%20Mayorista%2024%2F7!5e0!3m2!1ses!2sar!4v1715959040821!5m2!1ses!2sar",
    },
  ]; 

export const AboutMe = () => {
  return (
    <div className="w-4/5">
      <div className="pt-12">
        <Title className="pb-2">Pedidos</Title>
        <ul className="list-disc pl-5">
          <li>Hacemos envíos a todo Cordoba.</li>
          <li>Elegí el producto y la cantidad deseada.</li>
          <li>Selecciona dirección y forma de pago.</li>
          <li>Solo queda esperar que lleguemos a tu casa.</li>
        </ul>
      </div>
     <div>
      <Title>Sucursales</Title>

      <div>
        {branchs.map(({ title, url }: any) => (
          <div key={title} className="py-1">
            <h3 className="py-2">{title}</h3>
            <iframe src={url} className="rounded-md" loading="lazy"></iframe>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};
