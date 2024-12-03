import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles/ProgramFormData.css';

const ProgramFormData = () => {
  const [formData, setFormData] = useState({
    routine_id: "",
    description: "",
    image: "",
    categories: "",
    price: "",
    details: [],
    faqs: [],
    filters: []
  });
  const [routines, setRoutines] = useState([]);
  const [filters, setFilters] = useState([
    { filter_name: "genero", filter_value: "" },
    { filter_name: "objetivo", filter_value: "" },
    { filter_name: "dias", filter_value: "" },
    { filter_name: "tipo", filter_value: "" },
    { filter_name: "experiencia", filter_value: "" }
  ]);
  const [customValues, setCustomValues] = useState({
    genero: "",
    objetivo: "",
    dias: "",
    tipo: "",
    experiencia: ""
  });

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getRoutines");
        setRoutines(response.data);
      } catch (error) {
        console.error("Error al obtener las rutinas:", error);
      }
    };

    fetchRoutines();
  }, []);

  // Agregar un nuevo detalle
  const addDetail = () => {
    setFormData((prev) => ({
      ...prev,
      details: [...prev.details, { image: null, description: "" }]
    }));
  };

  // Manejar cambio en detalles
  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index][field] = value;
    setFormData((prev) => ({ ...prev, details: updatedDetails }));
  };

  // Agregar un nuevo FAQ
  const addFAQ = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }]
    }));
  };

  // Manejar cambio en FAQs
  const handleFAQChange = (index, field, value) => {
    const updatedFAQs = [...formData.faqs];
    updatedFAQs[index][field] = value;
    setFormData((prev) => ({ ...prev, faqs: updatedFAQs }));
  };

  // Manejar cambios en los campos generales
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar cambios en los filtros
  const handleFilterChange = (filterName, value) => {
    const updatedFilters = filters.map((filter) =>
      filter.filter_name === filterName
        ? { ...filter, filter_value: value }
        : filter
    );
    setFilters(updatedFilters);
    if (value !== "Otros") {
      // Si no es "Otros", limpiamos el valor personalizado correspondiente
      setCustomValues((prev) => ({
        ...prev,
        [filterName]: ""
      }));
    }
  };

  const handleCustomValueChange = (filterName, value) => {
    setCustomValues((prev) => ({
      ...prev,
      [filterName]: value
    }));
  };

  const filterOptions = {
    genero: ["hombre", "mujer", "ambos"],
    objetivo: ["ganar fuerza", "ganar musculo", "ambos"],
    dias: ["3", "4", "5", "6"],
    tipo: ["full-body", "upper-lower", "push-pull-legs"],
    experiencia: ["principiante", "intermedio", "avanzado"]
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Combina `filters` con los valores personalizados
    const filtersToSend = filters.map((filter) => ({
      filter_name: filter.filter_name,
      filter_value:
        filter.filter_value === "Otros"
          ? customValues[filter.filter_name]
          : filter.filter_value
    }));
  
    try {
      const response = await axios.post("http://localhost:3000/savePrograms", {
        ...formData,
        filters: filtersToSend
      });
      console.log("Programa guardado exitosamente:", response.data);
  
      // Limpia el formulario (opcional)
      setFormData({
        routine_id: "",
        description: "",
        image: "",
        categories: "",
        price: "",
        details: [],
        faqs: []
      });
      setFilters([
        { filter_name: "genero", filter_value: "" },
        { filter_name: "objetivo", filter_value: "" },
        { filter_name: "dias", filter_value: "" },
        { filter_name: "tipo", filter_value: "" },
        { filter_name: "experiencia", filter_value: "" }
      ]);
      setCustomValues({
        genero: "",
        objetivo: "",
        dias: "",
        tipo: "",
        experiencia: ""
      });
    } catch (error) {
      console.error("Error al guardar el programa:", error.response?.data || error.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="program-form">
      <h1>Crear Programa</h1>

      <div>
        <label>Selecciona una Rutina:</label>
        <select
          name="routine_id"
          value={formData.routine_id}
          onChange={handleChange}
          className="program-form-select"
          required
        >
          <option value="">-- Selecciona una rutina --</option>
          {routines.map((routine) => (
            <option key={routine.id} value={routine.id}>
              {routine.name}
            </option>
          ))}
        </select>
      </div>


      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="program-form-textarea"
          required
        />
      </div>

      <div>
        <label>URL de la Imagen:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="program-form-input"
          placeholder="https://example.com/imagen.jpg"
          required
        />
      </div>


      <div>
        <label>Categorías (separadas por comas):</label>
        <input
          type="text"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          className="program-form-input"
          placeholder="categoria 1, categoria 2, categoria 3, etc"
          required
        />
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="program-form-input"
          required
        />
      </div>

      <h3>Detalles</h3>
      <div className="details-container-program-form">
        {formData.details.map((detail, index) => (
          <div key={index} className="detail-item-program-form">
            <label>URL de la Imagen:</label>
            <input
              type="text"
              value={detail.image || ""}
              onChange={(e) =>
                handleDetailChange(index, "image", e.target.value)
              }
              className="program-form-input"
              placeholder="https://example.com/imagen.jpg"
            />
            <label>Descripción:</label>
            <textarea
              value={detail.description}
              onChange={(e) =>
                handleDetailChange(index, "description", e.target.value)
              }
              className="program-form-textarea"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addDetail}
          className="add-btn-program-form"
        >
          Agregar Detalle
        </button>
      </div>


      <h3>Preguntas Frecuentes</h3>
      <div className="faqs-container-program-form">
        {formData.faqs.map((faq, index) => (
          <div key={index} className="faq-item-program-form">
            <label>Pregunta:</label>
            <input
              type="text"
              value={faq.question}
              onChange={(e) =>
                handleFAQChange(index, "question", e.target.value)
              }
              className="program-form-input"
            />
            <label>Respuesta:</label>
            <textarea
              value={faq.answer}
              onChange={(e) =>
                handleFAQChange(index, "answer", e.target.value)
              }
              className="program-form-textarea"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addFAQ}
          className="add-btn-program-form"
        >
          Agregar FAQ
        </button>
      </div>

      <h3>Filtros</h3>
      <div className="filters-container-program-form">
        {filters.map((filter) => (
          <div key={filter.filter_name} className="filter-item-program-form">
            <label>{filter.filter_name.charAt(0).toUpperCase() + filter.filter_name.slice(1)}:</label>

            {/* Dropdown para opciones predefinidas */}
            <select
              value={filter.filter_value}
              onChange={(e) => handleFilterChange(filter.filter_name, e.target.value)}
              className="program-form-select"              
            >
              <option value="">-- Selecciona una opción --</option>
              {filterOptions[filter.filter_name]?.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
              <option value="Otros">Otros</option>
            </select>

            {/* Campo de texto para valor personalizado */}
            {filter.filter_value === "Otros" && (
              <input
                type="text"
                placeholder="Ingresa un valor personalizado"
                value={customValues[filter.filter_name]}
                onChange={(e) =>
                  handleCustomValueChange(filter.filter_name, e.target.value)
                }
                className="program-form-input"
              />
            )}
          </div>
        ))}
      </div>

      <button type="submit" className="btn-program-form">
        Guardar Programa
      </button>
    </form>
  );
};

export default ProgramFormData;
