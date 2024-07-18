import React, { useState, useEffect } from 'react';
import FormularioProducto from './components/FormularioProducto';
import ListaProductos from './components/ListaProductos';

const Key = "Producto";

const App = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem(Key)) || [];
    if (productosGuardados) {
      setProductos(productosGuardados);
    }
  }, []);

  useEffect(() => {
    setProductosFiltrados(
      productos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(busqueda.toLowerCase())
      )
    );
  }, [busqueda, productos]);

  const agregarProducto = (producto) => {
    const nuevosProductos = [...productos, producto];
    setProductos(nuevosProductos);
    localStorage.setItem(Key, JSON.stringify(nuevosProductos));
  };

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter(producto => producto.id !== id);
    setProductos(nuevosProductos);
    localStorage.setItem(Key, JSON.stringify(nuevosProductos));
  };

  const editarProducto = (productoActualizado) => {
    const nuevosProductos = productos.map(producto =>
      producto.id === productoActualizado.id ? productoActualizado : producto
    );
    setProductos(nuevosProductos);
    localStorage.setItem(Key, JSON.stringify(nuevosProductos));
  };

  return (
    <div className="container">
      <div className="buscador">
        <input 
          type="text" 
          className="form-control mb-4" 
          placeholder="Buscar producto..." 
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)} 
        />
      </div>
      <FormularioProducto agregarProducto={agregarProducto} />
      <ListaProductos 
        productos={productosFiltrados} 
        eliminarProducto={eliminarProducto} 
        editarProducto={editarProducto} 
      />
    </div>
  );
};

export default App;
