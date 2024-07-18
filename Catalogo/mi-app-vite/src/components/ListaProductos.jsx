import React, { useState } from 'react';
import Producto from './Producto';

const ListaProductos = ({ productos, eliminarProducto, editarProducto }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 4;

  const productosOrdenados = productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosPaginados = productosOrdenados.slice(indicePrimerProducto, indiceUltimoProducto);

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  const numeroPaginas = Math.ceil(productos.length / productosPorPagina);

  return (
    <div>
      <div className="lista-productos">
        {productosPaginados.map(producto => (
          <Producto 
            key={producto.id} 
            producto={producto} 
            eliminarProducto={eliminarProducto} 
            editarProducto={editarProducto} 
          />
        ))}
      </div>
      <nav>
        <ul className="pagination">
          {[...Array(numeroPaginas)].map((_, i) => (
            <li key={i} className={`page-item ${paginaActual === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => cambiarPagina(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ListaProductos;
