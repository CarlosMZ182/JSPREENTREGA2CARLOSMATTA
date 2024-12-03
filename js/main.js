// Cargar el carrito desde localStorage de manera segura
let carrito = [];
try {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
} catch (e) {
  console.error("Error al leer el carrito desde localStorage", e);
}

// Lista de productos disponibles en la tienda
const productos = [
  {
    id: 1,
    nombre: "Polera Goku",
    img: "https://cdnx.jumpseller.com/dropp-merch-cl/image/53679234/131.jpg?1729553268",
    precio: 1200,
  },
  {
    id: 2,
    nombre: "Polera Naruto",
    img: "https://cdnx.jumpseller.com/dropp-merch-cl/image/53437677/52.jpg?1729555775",
    precio: 1500,
  },
  {
    id: 3,
    nombre: "Polera Luffy",
    img: "https://http2.mlstatic.com/D_NQ_NP_2X_717649-MLC71779673626_092023-F.webp",
    precio: 1400,
  },
  {
    id: 4,
    nombre: "Polera Itachi",
    img: "https://cdnx.jumpseller.com/estampados-bettoskys/image/27997301/resize/640/640?1664695732",
    precio: 1550,
  },
  {
    id: 5,
    nombre: "Polera Sasuke",
    img: "https://cdnx.jumpseller.com/dropp-merch-cl/image/53437455/66.jpg?1729555731",
    precio: 1800,
  },
  {
    id: 6,
    nombre: "Polera Vegeta",
    img: "https://http2.mlstatic.com/D_NQ_NP_2X_909404-MLC49174950764_022022-F.webp",
    precio: 1500,
  },
  {
    id: 7,
    nombre: "Polera Jiraiya",
    img: "https://cdnx.jumpseller.com/estampados-bettoskys/image/27997230/resize/640/640?1664694251",
    precio: 1250,
  },
  {
    id: 8,
    nombre: "Polera Neji",
    img: "https://http2.mlstatic.com/D_NQ_NP_2X_958879-MLC48316804449_112021-F.webp",
    precio: 1550,
  },
  {
    id: 9,
    nombre: "Polera Killua",
    img: "https://poleradicto.cl/wp-content/uploads/2023/03/MCH1909-01.jpg",
    precio: 1700,
  },
  {
    id: 10,
    nombre: "Polera Gon",
    img: "https://http2.mlstatic.com/D_NQ_NP_2X_937491-MLC51265756618_082022-F.webp",
    precio: 1800,
  },
];

// Función para calcular el total y la cantidad de productos en el carrito
const calcularTotales = () => {
  return carrito.reduce(
    (acc, prod) => {
      acc.total += prod.precio * prod.cantidad; // Suma el total del producto (precio * cantidad)
      acc.cantidad += prod.cantidad; // Suma la cantidad total de productos
      return acc;
    },
    { total: 0, cantidad: 0 } // Inicializa los totales
  );
};

// Abrir y cerrar el carrito al hacer clic en el icono
document.getElementById("carritoIcon").addEventListener("click", () => {
  document.getElementById("carrito").classList.toggle("active"); // Cambia la visibilidad del carrito
});

// Detectar clic fuera del carrito para cerrarlo
document.addEventListener("click", (event) => {
  const carritoElement = document.getElementById("carrito");
  const carritoIconElement = document.getElementById("carritoIcon");

  // Si se hace clic fuera del carrito y del icono, se cierra el carrito
  if (
    !carritoElement.contains(event.target) &&
    !carritoIconElement.contains(event.target)
  ) {
    carritoElement.classList.remove("active");
  }
});

// Renderizar los productos en el DOM
const renderProductos = () => {
  const productosContainer = document.getElementById("productos");
  productosContainer.innerHTML = productos
    .map(
      (prod) => `
        <div class="producto">
            <h3>${prod.nombre}</h3>
            <img src="${prod.img}" alt="${prod.nombre}">
            <p>Precio: $${prod.precio}</p>
            <button class="btn-agregar" data-id="${prod.id}" aria-label="Agregar al carrito">Agregar</button>
        </div>`
    )
    .join(""); // Convierte la lista de productos en un solo bloque HTML

  // Delegación de eventos para los botones "Agregar"
  productosContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-agregar")) {
      agregarAlCarrito(e); // Llama a la función para agregar productos
    }
  });
};

// Agregar productos al carrito
const agregarAlCarrito = (e) => {
  const id = +e.target.dataset.id; // Obtiene el ID del producto desde el botón
  const prod = productos.find((p) => p.id === id); // Encuentra el producto en la lista
  const prodCarrito = carrito.find((p) => p.id === id); // Verifica si ya está en el carrito

  if (prodCarrito) {
    prodCarrito.cantidad++; // Si ya existe, incrementa la cantidad
  } else {
    carrito.push({ ...prod, cantidad: 1 }); // Si no existe, lo agrega con cantidad 1
  }
  actualizarCarrito(); // Actualiza la vista del carrito
};

// Actualizar el carrito en el DOM
const actualizarCarrito = () => {
  const carritoContainer = document.getElementById("productosCarrito");
  carritoContainer.innerHTML = carrito
    .map(
      (prod) => `
        <div class="producto">
            <h3>${prod.nombre}</h3>
            <p>Precio: $${prod.precio}</p>
            <p>Cantidad: ${prod.cantidad}</p>
            <button class="btn-quitar" data-id="${prod.id}" aria-label="Quitar del carrito">Quitar</button>
        </div>`
    )
    .join(""); // Convierte el contenido del carrito en HTML dinámico

  const { total, cantidad } = calcularTotales(); // Calcula totales
  document.getElementById("total").textContent = "$" + total; // Actualiza el total en el DOM
  document.getElementById("contadorCarrito").textContent = cantidad; // Actualiza el contador de productos

  localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda el carrito en localStorage
};

// Eliminar un producto del carrito
const quitarDelCarrito = (e) => {
  const id = +e.target.dataset.id; // Obtiene el ID del producto desde el botón
  const index = carrito.findIndex((p) => p.id === id); // Encuentra el índice del producto
  if (index > -1) {
    if (carrito[index].cantidad === 1) {
      carrito.splice(index, 1); // Elimina el producto si solo hay uno
    } else {
      carrito[index].cantidad--; // Reduce la cantidad
    }
    actualizarCarrito(); // Actualiza el carrito
  }
};

// Borrar todo el carrito
const borrarTodo = () => {
  if (confirm("¿Estás seguro de que quieres borrar todo el carrito?")) {
    carrito.length = 0; // Vacía el array del carrito
    actualizarCarrito(); // Actualiza la vista
  }
};

// Finalizar compra
document.getElementById("finalizarCompra").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert(
      "Debes agregar al menos un producto al carrito antes de finalizar la compra."
    );
    return;
  }

  const resumen = carrito
    .map(
      (prod) =>
        `${prod.nombre} (Cantidad: ${prod.cantidad}) - Total: $${
          prod.precio * prod.cantidad
        }`
    )
    .join("\n"); // Genera un resumen de la compra

  const { total } = calcularTotales(); // Calcula el total general

  alert(
    `¡Gracias por tu compra!\n\nResumen:\n${resumen}\n\nTotal a pagar: $${total}`
  ); // Muestra el resumen

  localStorage.removeItem("carrito"); // Limpia el carrito en localStorage
  carrito.length = 0; // Limpia el carrito en memoria
  actualizarCarrito(); // Actualiza la vista
});

// Delegar eventos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  renderProductos(); // Muestra los productos en el DOM
  actualizarCarrito(); // Actualiza el carrito si hay datos guardados
  document.getElementById("borrarTodo").addEventListener("click", borrarTodo); // Evento para borrar todo el carrito
  document.getElementById("productosCarrito").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-quitar")) {
      quitarDelCarrito(e); // Evento para quitar productos
    }
  });
});
