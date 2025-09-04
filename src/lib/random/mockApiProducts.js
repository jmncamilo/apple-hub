// Simulando el SELECT * FROM products desde la API
const products = [
  {
    id: 1,
    product_name: "iPhone 14 Pro",
    reference_code: "IPH14PRO256",
    category: "iPhone",
    price: 4599000,
    description:
      "El iPhone 14 Pro con pantalla Super Retina XDR de 6.1 pulgadas, chip A16 Bionic, sistema de cámaras Pro de 48MP y Dynamic Island. Incluye todas las funciones premium de Apple en un diseño elegante y resistente.",
    stock_quantity: 15,
    created_at: "2025-08-15T14:30:25.123Z",
    updated_at: "2025-08-20T09:15:42.456Z",
  },
  {
    id: 2,
    product_name: "MacBook Air M2",
    reference_code: "MBA13M2512",
    category: "Mac",
    price: 5299000,
    description:
      "MacBook Air de 13 pulgadas con chip M2, 512GB de almacenamiento SSD y 8GB de memoria unificada. Diseño ultradelgado y ligero con hasta 18 horas de duración de la batería.",
    stock_quantity: 8,
    created_at: "2025-08-18T10:45:12.789Z",
    updated_at: "2025-08-18T10:45:12.789Z",
  },
  {
    id: 3,
    product_name: "AirPods Pro 2da Gen",
    reference_code: "APPRO2GEN",
    category: "AirPods",
    price: 899000,
    description:
      "AirPods Pro de segunda generación con cancelación activa de ruido, modo de transparencia adaptativa, audio espacial personalizado y estuche de carga MagSafe con hasta 30 horas de reproducción.",
    stock_quantity: 0,
    created_at: "2025-08-25T16:22:33.012Z",
    updated_at: "2025-09-01T11:30:15.345Z",
  },
  {
    id: 4,
    product_name: "iPad Pro 11''",
    reference_code: "IPADPRO11M2",
    category: "iPad",
    price: 3899000,
    description:
      "iPad Pro de 11 pulgadas con chip M2, pantalla Liquid Retina XDR, 256GB de almacenamiento y compatibilidad con Apple Pencil de 2da generación y Magic Keyboard.",
    stock_quantity: 12,
    created_at: "2025-08-20T08:15:30.456Z",
    updated_at: "2025-08-20T08:15:30.456Z",
  },
  {
    id: 5,
    product_name: "Apple Watch Series 9",
    reference_code: "AWS9GPS45",
    category: "Watch",
    price: 1799000,
    description:
      "Apple Watch Series 9 GPS de 45mm con caja de aluminio, pantalla Always-On Retina más brillante, chip S9 y función de doble toque. Incluye correa deportiva y resistencia al agua hasta 50 metros.",
    stock_quantity: 25,
    created_at: "2025-08-22T13:45:18.789Z",
    updated_at: "2025-08-22T13:45:18.789Z",
  },
  {
    id: 6,
    product_name: "Magic Mouse",
    reference_code: "MAGICMOUSE3",
    category: "Accesorios",
    price: 349000,
    description:
      "Magic Mouse con superficie Multi-Touch que permite gestos simples como deslizar entre páginas web y desplazarse por documentos. Conectividad inalámbrica vía Bluetooth y batería recargable integrada.",
    stock_quantity: 30,
    created_at: "2025-08-23T16:20:45.012Z",
    updated_at: "2025-08-23T16:20:45.012Z",
  },
  {
    id: 7,
    product_name: "HomePod mini",
    reference_code: "HPODMINI",
    category: "Smart Home",
    price: 449000,
    description:
      "HomePod mini con sonido 360 grados, Siri integrado, control de hogar inteligente y audio computacional. Compatible con todos los dispositivos Apple y servicios de streaming de música.",
    stock_quantity: 5,
    created_at: "2025-08-24T11:30:22.345Z",
    updated_at: "2025-08-24T11:30:22.345Z",
  },
  {
    id: 8,
    product_name: "Studio Display",
    reference_code: "STUDIODIS27",
    category: "Apple Home",
    price: 6599000,
    description:
      "Studio Display de 27 pulgadas con resolución 5K Retina, cámara Center Stage de 12MP, sistema de audio de seis altavoces y tres micrófonos con calidad de estudio. Conectividad Thunderbolt 3.",
    stock_quantity: 3,
    created_at: "2025-08-25T09:45:33.678Z",
    updated_at: "2025-08-25T09:45:33.678Z",
  },
];

export default products;