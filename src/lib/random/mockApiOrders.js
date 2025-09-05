export const orders = [
  {
    id: 1,
    customer_id: 25,
    delivery_address: "Calle 123 #45-67, Bogotá",
    total_amount: 8598000.00,
    status: "En Proceso", // 'En Proceso', 'Entregado', 'Cancelado', 'Devuelto'
    created_at: "2024-09-04T15:30:45.123Z",
    updated_at: "2024-09-04T15:30:45.123Z",
    
    // Datos del cliente
    nuip: "1234567890",
    names: "Juan Carlos",
    lastnames: "Pérez González",
    email: "juan.perez@gmail.com",
    phone_number: "+57 300 123 4567",
    
    // Items del pedido
    order_items: [
      {
        id: 1,
        order_id: 1,
        product_id: 15,
        product_name: "iPhone 14 Pro",
        product_reference: "IPH14PRO256",
        quantity: 1,
        unit_price: 4599000.00,
        subtotal: 4599000.00,
        status: "Enviado" // 'Enviado', 'Entregado', 'Cancelado', 'Devuelto', 'Garantía'
      },
      {
        id: 2,
        order_id: 1,
        product_id: 23,
        product_name: "AirPods Pro 2",
        product_reference: "AIRPRO2023",
        quantity: 2,
        unit_price: 1999500.00,
        subtotal: 3999000.00,
        status: "Entregado"
      }
    ]
  },
  {
    id: 2,
    customer_id: 12,
    delivery_address: "Carrera 15 #32-18, Medellín",
    total_amount: 6398000.00,
    status: "Entregado",
    created_at: "2024-09-03T10:15:30.456Z",
    updated_at: "2024-09-04T14:20:15.789Z",
    
    // Datos del cliente
    nuip: "9876543210",
    names: "María Elena",
    lastnames: "Rodríguez Silva",
    email: "maria.rodriguez@hotmail.com",
    phone_number: "+57 314 987 6543",
    
    // Items del pedido
    order_items: [
      {
        id: 3,
        order_id: 2,
        product_id: 8,
        product_name: "MacBook Air M2",
        product_reference: "MBA13M2256",
        quantity: 1,
        unit_price: 6398000.00,
        subtotal: 6398000.00,
        status: "Entregado"
      }
    ]
  },
  {
    id: 3,
    customer_id: 45,
    delivery_address: "Avenida 19 #124-56, Cali",
    total_amount: 2899000.00,
    status: "Cancelado",
    created_at: "2024-09-02T08:45:12.234Z",
    updated_at: "2024-09-02T16:30:45.567Z",
    
    // Datos del cliente
    nuip: "5555444433",
    names: "Carlos Andrés",
    lastnames: "López Martínez",
    email: "carlos.lopez@gmail.com",
    phone_number: "+57 321 555 4444",
    
    // Items del pedido
    order_items: [
      {
        id: 4,
        order_id: 3,
        product_id: 19,
        product_name: "iPad Pro 11",
        product_reference: "IPADPRO11256",
        quantity: 1,
        unit_price: 2899000.00,
        subtotal: 2899000.00,
        status: "Cancelado"
      }
    ]
  },
  {
    id: 4,
    customer_id: 33,
    delivery_address: "Calle 85 #11-45, Barranquilla",
    total_amount: 3248500.00,
    status: "En Proceso",
    created_at: "2024-09-01T14:22:18.890Z",
    updated_at: "2024-09-01T14:22:18.890Z",
    
    // Datos del cliente
    nuip: "1122334455",
    names: "Ana Sofía",
    lastnames: "Herrera Castro",
    email: "ana.herrera@yahoo.com",
    phone_number: "+57 300 112 2334",
    
    // Items del pedido
    order_items: [
      {
        id: 5,
        order_id: 4,
        product_id: 7,
        product_name: "Apple Watch Series 9",
        product_reference: "AWS9GPS45",
        quantity: 1,
        unit_price: 1249500.00,
        subtotal: 1249500.00,
        status: "Enviado"
      },
      {
        id: 6,
        order_id: 4,
        product_id: 23,
        product_name: "AirPods Pro 2",
        product_reference: "AIRPRO2023",
        quantity: 1,
        unit_price: 1999000.00,
        subtotal: 1999000.00,
        status: "Garantía"
      }
    ]
  },
  {
    id: 5,
    customer_id: 67,
    delivery_address: "Transversal 45 #67-89, Bucaramanga",
    total_amount: 1599500.00,
    status: "Devuelto",
    created_at: "2024-08-30T11:30:25.123Z",
    updated_at: "2024-09-03T09:15:40.456Z",
    
    // Datos del cliente
    nuip: "7788996655",
    names: "Luis Fernando",
    lastnames: "Gómez Restrepo",
    email: "luis.gomez@outlook.com",
    phone_number: "+57 317 778 8996",
    
    // Items del pedido
    order_items: [
      {
        id: 7,
        order_id: 5,
        product_id: 31,
        product_name: "Magic Keyboard",
        product_reference: "MAGKB2024",
        quantity: 1,
        unit_price: 899500.00,
        subtotal: 899500.00,
        status: "Devuelto"
      },
      {
        id: 8,
        order_id: 5,
        product_id: 29,
        product_name: "Magic Mouse",
        product_reference: "MAGMOUSE24",
        quantity: 1,
        unit_price: 700000.00,
        subtotal: 700000.00,
        status: "Devuelto"
      }
    ]
  }
];

export default orders;

// Toda esta data viene de estos JOINs
/*
SELECT 
    o.id,
    o.customer_id,
    o.delivery_address,
    o.total_amount,
    o.status,
    o.created_at,
    o.updated_at,
    
    -- Datos del cliente
    c.nuip,
    c.names,
    c.lastnames,
    c.email,
    c.phone_number,
    
    -- Items del pedido
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'id', oi.id,
            'order_id', oi.order_id,
            'product_id', oi.product_id,
            'product_name', p.product_name,
            'product_reference', p.reference_code,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'subtotal', oi.subtotal,
            'status', oi.status
        ) ORDER BY oi.id
    ) as order_items

FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
GROUP BY o.id, c.id
ORDER BY o.created_at DESC;
*/