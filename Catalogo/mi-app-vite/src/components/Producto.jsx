import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Producto = ({ producto, eliminarProducto, editarProducto }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nombre, setNombre] = useState(producto.nombre);
  const [categoria, setCategoria] = useState(producto.categoria);
  const [precio, setPrecio] = useState(producto.precio);
  const [stock, setStock] = useState(producto.stock);

  const manejarGuardar = () => {
    editarProducto({ ...producto, nombre, categoria, precio, stock });
    setIsEditing(false);
  };

  return (
    <div className="card">
      <div className="card-body">
        {isEditing ? (
          <>
            <input 
              type="text" 
              className="form-control mb-2" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
            />
            <select 
              className="form-control mb-2" 
              value={categoria} 
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="Tecnología">Tecnología</option>
              <option value="Ropa">Ropa</option>
              <option value="Juguetería">Juguetería</option>
            </select>
            <input 
              type="text" 
              className="form-control mb-2" 
              value={precio} 
              onChange={(e) => setPrecio(e.target.value)} 
            />
            <input 
              type="text" 
              className="form-control mb-2" 
              value={stock} 
              onChange={(e) => setStock(e.target.value)} 
            />
            <button className="btn btn-success" onClick={manejarGuardar}>
              Guardar
            </button>
          </>
        ) : (
          <>
            <h5 className="card-title">{producto.nombre}</h5>
            <p className="card-text">Categoría: {producto.categoria}</p>
            <p className="card-text">Precio: ${producto.precio}</p>
            <p className="card-text">Stock: {producto.stock}</p>
            <button className="btn btn-primary me-2" onClick={() => setIsEditing(true)}>
              Editar <FaEdit />
            </button>
            <button className="btn btn-danger" onClick={() => eliminarProducto(producto.id)}>
              Eliminar <FaTrash />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Producto;
