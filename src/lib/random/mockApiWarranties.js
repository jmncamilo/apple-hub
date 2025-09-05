// Datos que vendrán de la tabla warranties mediante con JOINs
const mockWarranties = [
  {
    id: 1,
    order_item_id: 3,
    warranty_reason: "Producto defectuoso de fábrica",
    warranty_status: "Aprobada",
    warranty_date: "2024-09-02T08:30:00Z",
    notes: "Se evaluó el caso y Apple Inc. autorizó el cambio del producto",
    created_at: "2024-09-02T08:30:00Z",
    // Datos del JOIN
    order_id: 1,
    product_name: "iPhone 14 Pro",
    product_reference: "IPH14PRO256",
    quantity: 1,
    unit_price: 4599000.00,
    subtotal: 4599000.00,
    customer_names: "Juan Carlos",
    customer_lastnames: "Pérez Gómez",
    customer_email: "juan.perez@gmail.com"
  },
  {
    id: 2,
    order_item_id: 7,
    warranty_reason: "Pantalla con píxeles muertos al desempacar",
    warranty_status: "En Proceso",
    warranty_date: "2024-09-03T14:15:00Z",
    notes: "Caso escalado al departamento técnico para evaluación",
    created_at: "2024-09-03T14:15:00Z",
    order_id: 3,
    product_name: "MacBook Air M2",
    product_reference: "MBA13M2256",
    quantity: 1,
    unit_price: 5200000.00,
    subtotal: 5200000.00,
    customer_names: "María Elena",
    customer_lastnames: "Rodríguez Silva",
    customer_email: "maria.rodriguez@gmail.com"
  },
  {
    id: 3,
    order_item_id: 11,
    warranty_reason: "Producto defectuoso de fábrica",
    warranty_status: "Completada",
    warranty_date: "2024-08-28T10:45:00Z",
    notes: "Se evaluó el caso y Apple Inc. autorizó el cambio del producto. Producto reemplazado exitosamente.",
    created_at: "2024-08-28T10:45:00Z",
    order_id: 6,
    product_name: "AirPods Pro 2",
    product_reference: "APP2023",
    quantity: 1,
    unit_price: 899000.00,
    subtotal: 899000.00,
    customer_names: "Carlos",
    customer_lastnames: "Martínez López",
    customer_email: "carlos.martinez@gmail.com"
  }
];

export default mockWarranties;

// JOINs correspondientes a la data de arriba
/*
SELECT 
    w.id,
    w.order_item_id,
    w.warranty_reason,
    w.warranty_status,
    w.warranty_date,
    w.notes,
    w.created_at,
    
    o.id AS order_id,
    p.product_name,
    p.reference_code AS product_reference,
    oi.quantity,
    oi.unit_price,
    oi.subtotal,
    c.names AS customer_names,
    c.lastnames AS customer_lastnames,
    c.email AS customer_email

FROM warranties w
    INNER JOIN order_items oi ON w.order_item_id = oi.id
    INNER JOIN orders o ON oi.order_id = o.id
    INNER JOIN products p ON oi.product_id = p.id
    INNER JOIN customers c ON o.customer_id = c.id
    
ORDER BY w.created_at DESC;
*/