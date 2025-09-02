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
    <div className="w-5/6 mx-auto p-6 mt-5 bg-white shadow-md rounded-lg">
      <div>
        <Title className="pb-4 text-xl font-bold text-gray-800">Pedidos</Title>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none mt-6 text-gray-700">
          <li className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg shadow-xs">
            <span className="font-medium">🚚</span>
            <span>Hacemos envíos a todo Córdoba.</span>
          </li>
          <li className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg shadow-xs">
            <span className="font-medium">📦</span>
            <span>Elegí el producto y la cantidad deseada.</span>
          </li>
          <li className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg shadow-xs">
            <span className="font-medium">📍</span>
            <span>Selecciona dirección y forma de pago.</span>
          </li>
          <li className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg shadow-xs">
            <span className="font-medium">⏰</span>
            <span>Solo queda esperar que lleguemos a tu casa.</span>
          </li>
        </ul>
      </div>
      <div className="mt-10">
        <Title className="pb-4 text-xl font-bold text-gray-800">
          Sucursales
        </Title>

        <div className="space-y-8">
          {branchs.map(({ title, url }: any) => (
            <div key={title} className="border-t border-gray-300 pt-6">
              <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
              <iframe
                src={url}
                className="rounded-md w-full h-64 mt-4 shadow-lg border border-gray-200"
                loading="lazy"
                title={title}
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
