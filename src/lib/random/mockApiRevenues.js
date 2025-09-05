// Simulando el SELECT * FROM order_items WHERE status IN ('Enviado', 'Entregado', 'Garantía')
const revenues = [
  {
    id: 1,
    order_id: 123,
    product_id: 1,
    quantity: 2,
    unit_price: 4599000,
    subtotal: 9198000,
    status: "Enviado",
    created_at: "2025-09-05T14:30:00Z",
  },
  {
    id: 2,
    order_id: 124,
    product_id: 3,
    quantity: 1,
    unit_price: 899000,
    subtotal: 899000,
    status: "Entregado",
    created_at: "2025-09-05T12:15:00Z",
  },
  {
    id: 3,
    order_id: 125,
    product_id: 6,
    quantity: 3,
    unit_price: 349000,
    subtotal: 1047000,
    status: "Garantía",
    created_at: "2025-09-05T09:45:00Z",
  },
  {
    id: 4,
    order_id: 120,
    product_id: 2,
    quantity: 1,
    unit_price: 5299000,
    subtotal: 5299000,
    status: "Entregado",
    created_at: "2025-09-04T16:20:00Z",
  },
  {
    id: 5,
    order_id: 119,
    product_id: 5,
    quantity: 2,
    unit_price: 1799000,
    subtotal: 3598000,
    status: "Enviado",
    created_at: "2025-09-04T11:30:00Z",
  },
  {
    id: 6,
    order_id: 118,
    product_id: 4,
    quantity: 1,
    unit_price: 3899000,
    subtotal: 3899000,
    status: "Entregado",
    created_at: "2025-09-03T14:45:00Z",
  },
  {
    id: 7,
    order_id: 117,
    product_id: 7,
    quantity: 4,
    unit_price: 449000,
    subtotal: 1796000,
    status: "Garantía",
    created_at: "2025-09-03T10:15:00Z",
  },
  {
    id: 8,
    order_id: 116,
    product_id: 8,
    quantity: 1,
    unit_price: 6599000,
    subtotal: 6599000,
    status: "Entregado",
    created_at: "2025-09-02T13:20:00Z",
  },
  {
    id: 9,
    order_id: 115,
    product_id: 1,
    quantity: 1,
    unit_price: 4599000,
    subtotal: 4599000,
    status: "Enviado",
    created_at: "2025-09-01T15:30:00Z",
  },
  {
    id: 10,
    order_id: 114,
    product_id: 3,
    quantity: 2,
    unit_price: 899000,
    subtotal: 1798000,
    status: "Entregado",
    created_at: "2025-08-31T11:45:00Z",
  },
];

export default revenues;

// Este select traer esa data
/*
SELECT 
    id,
    order_id,
    product_id,
    quantity,
    unit_price,
    subtotal,
    status,
    created_at
FROM order_items 
WHERE status IN ('Enviado', 'Entregado', 'Garantía')
ORDER BY created_at DESC
*/