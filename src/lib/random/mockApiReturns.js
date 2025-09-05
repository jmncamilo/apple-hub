// Datos que vendrán de la tabla returns y con JOINs correspondientes
const returns = [
  {
    id: 1, //id (returns)
    order_item_id: 5,
    return_reason: "Producto llegó defectuoso, la pantalla tiene rayas",
    return_status: "Solicitada",
    return_date: "2024-09-03T10:30:00Z",
    notes: "Cliente reportó el problema inmediatamente",
    // Datos del JOIN
    order_id: 2, // id (orders)
    product_name: "iPhone 14 Pro",
    product_reference: "IPH14PRO256",
    quantity: 1,
    unit_price: 4599000.00,
    subtotal: 4599000.00,
    customer_names: "María Elena",
    customer_lastnames: "García López",
    customer_email: "maria.garcia@gmail.com"
  },
  {
    id: 2,
    order_item_id: 8,
    return_reason: "No era lo que esperaba según la descripción",
    return_status: "Aprobada",
    return_date: "2024-09-01T14:20:00Z",
    notes: "Devolución aprobada, proceder con reembolso",
    order_id: 4,
    product_name: "MacBook Air M2",
    product_reference: "MBA13M2256",
    quantity: 1,
    unit_price: 5200000.00,
    subtotal: 5200000.00,
    customer_names: "Carlos",
    customer_lastnames: "Rodríguez",
    customer_email: "carlos.rodriguez@gmail.com"
  },
  {
    id: 3,
    order_item_id: 12,
    return_reason: null,
    return_status: "Solicitada",
    return_date: "2024-09-04T09:15:00Z",
    notes: null,
    order_id: 7,
    product_name: "AirPods Pro 2",
    product_reference: "APP2023",
    quantity: 2,
    unit_price: 899000.00,
    subtotal: 1798000.00,
    customer_names: "Ana",
    customer_lastnames: "Martínez",
    customer_email: "ana.martinez@gmail.com"
  }
];

export default returns;

// JOINs que traen esos datirris
/*
SELECT 
    -- Datos principales de returns
    r.id,
    r.order_item_id,
    r.return_reason,
    r.return_status,
    r.return_date,
    r.completion_date,
    r.notes,
    r.created_at,
    r.updated_at,
    
    -- Datos del pedido
    o.id AS order_id,
    
    -- Datos del producto
    p.product_name,
    p.reference_code AS product_reference,
    
    -- Datos del item del pedido
    oi.quantity,
    oi.unit_price,
    oi.subtotal,
    
    -- Datos del cliente
    c.names AS customer_names,
    c.lastnames AS customer_lastnames,
    c.email AS customer_email

FROM returns r
    INNER JOIN order_items oi ON r.order_item_id = oi.id
    INNER JOIN orders o ON oi.order_id = o.id
    INNER JOIN products p ON oi.product_id = p.id
    INNER JOIN customers c ON o.customer_id = c.id
    
ORDER BY r.created_at DESC;
*/