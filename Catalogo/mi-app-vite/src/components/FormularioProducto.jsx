import React, { useState } from 'react';

const FormularioProducto = ({ agregarProducto }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [errores, setErrores] = useState({});

  const manejarEnvio = (e) => {
    e.preventDefault();
    let erroresFormulario = {};

    if (!nombre.trim()) erroresFormulario.nombre = 'El nombre del producto es obligatorio';
    if (!categoria.trim()) erroresFormulario.categoria = 'La categoría es obligatoria';
    if (!precio.trim()) erroresFormulario.precio = 'El precio es obligatorio';
    if (!stock.trim()) erroresFormulario.stock = 'El stock es obligatorio';
    if (!/^\d+$/.test(stock)) erroresFormulario.stock = 'El stock debe ser un número';

    if (Object.keys(erroresFormulario).length > 0) {
      setErrores(erroresFormulario);
      return;
    }

    agregarProducto({
      id: Date.now(),
      nombre,
      categoria,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    });

    setNombre('');
    setCategoria('');
    setPrecio('');
    setStock('');
    setErrores({});
  };

  return (
    <form onSubmit={manejarEnvio}>
        <div>
            <h1>Formulario para Productos</h1>
        </div>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input 
          type="text" 
          className={`form-control ${errores.nombre ? 'is-invalid' : ''}`} 
          id="nombre" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
        />
        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="categoria" className="form-label">Categoría</label>
        <select
          className={`form-control ${errores.categoria ? 'is-invalid' : ''}`}
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Seleccionar categoría</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Ropa">Ropa</option>
          <option value="Juguetería">Juguetería</option>
        </select>
        {errores.categoria && <div className="invalid-feedback">{errores.categoria}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="precio" className="form-label">Precio</label>
        <input 
          type="text" 
          className={`form-control ${errores.precio ? 'is-invalid' : ''}`} 
          id="precio" 
          value={precio} 
          onChange={(e) => setPrecio(e.target.value)} 
        />
        {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="stock" className="form-label">Stock</label>
        <input 
          type="text" 
          className={`form-control ${errores.stock ? 'is-invalid' : ''}`} 
          id="stock" 
          value={stock} 
          onChange={(e) => setStock(e.target.value)} 
        />
        {errores.stock && <div className="invalid-feedback">{errores.stock}</div>}
      </div>
      <button type="submit" className="btn btn-primary">Agregar</button>
    </form>
  );
};

export default FormularioProducto;
