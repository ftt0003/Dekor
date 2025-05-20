/**
 * Datos de ejemplo de productos
 * En un entorno real, estos datos vendrían de una API o base de datos
 */
const PRODUCTS = [
  {
    id: 1,
    name: "Jarrón Balú",
    price: 39.99,
    image: "fotos/jarron-balu.webp",
    description: "Jarrón decorativo de cerámica artesanal",
    category: "Decoración",
    stock: 10,
  },
  {
    id: 2,
    name: "Lámpara Nórdica",
    price: 89.5,
    image: "fotos/lampara-nordica.webp",
    description: "Lámpara de pie estilo nórdico con base de madera",
    category: "Iluminación",
    stock: 5,
  },
  {
    id: 3,
    name: "Cojín Étnico",
    price: 24.95,
    image: "fotos/cojin-etnico.webp",
    description: "Cojín decorativo con motivos étnicos",
    category: "Textil",
    stock: 15,
  },
  {
    id: 4,
    name: "Mesa Auxiliar Roble",
    price: 129.0,
    image: "fotos/mesa-auxiliar.webp",
    description: "Mesa auxiliar de madera de roble macizo",
    category: "Mobiliario",
    stock: 3,
  },
  {
    id: 5,
    name: "Espejo Circular",
    price: 59.95,
    image: "fotos/espejo-circular.webp",
    description: "Espejo redondo con marco de ratán",
    category: "Decoración",
    stock: 8,
  },
]

/**
 * Función para obtener un producto por su ID
 */
function getProductById(productId) {
  return PRODUCTS.find((product) => product.id === Number.parseInt(productId))
}

/**
 * Función para formatear precio en euros
 */
function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + " €"
}
