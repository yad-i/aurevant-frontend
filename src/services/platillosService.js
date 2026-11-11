import axios from 'axios'

const API = 'http://localhost:8000/api'

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const authForm = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data'
  }
})

/* Convierte el objeto del formulario en FormData (necesario para subir archivos) */
function aFormData(datos) {
  const fd = new FormData()
  fd.append('nombre', datos.nombre ?? '')
  fd.append('descripcion', datos.descripcion ?? '')
  fd.append('precio', datos.precio ?? 0)
  fd.append('categoria', datos.categoria ?? '')
  fd.append('tipo', datos.tipo ?? 'platillo')
  fd.append('ingredientes', datos.ingredientes ?? '')
  fd.append('activo', datos.activo ? 1 : 0)

  if (datos.img instanceof File) {
    fd.append('img', datos.img)
  }

  return fd
}

export const listarPlatillos = () =>
  axios.get(`${API}/platillos`, auth())

export const crearPlatillo = (datos) =>
  axios.post(`${API}/platillos`, aFormData(datos), authForm())

export const actualizarPlatillo = (id, datos) => {
  const fd = aFormData(datos)
  // Laravel no lee archivos en PUT: se envía como POST con _method=PUT
  fd.append('_method', 'PUT')
  return axios.post(`${API}/platillos/${id}`, fd, authForm())
}

export const eliminarPlatillo = (id) =>
  axios.delete(`${API}/platillos/${id}`, auth())
