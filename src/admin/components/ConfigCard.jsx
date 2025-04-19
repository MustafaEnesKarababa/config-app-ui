import { useState, useEffect } from "react";
import { createConfig, updateConfig, deleteConfig } from "../api/configApi";
import "../css/ConfigCard.css";

function ConfigCard({ initialData = null, onClose, onSuccess }) {
  const isEdit = initialData !== null;
  
  const [form, setForm] = useState({
    name: "",
    type: "string",
    value: "",
    applicationName: "",
    isActive: true,
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateConfig(form);
        alert("Konfigürasyon başarıyla güncellendi!");
      } else {
        await createConfig({ ...form, isActive: true });
        alert("Yeni konfigürasyon başarıyla eklendi!");
      }
      onSuccess();
      onClose();
    } catch (err) {
      alert("İşlem sırasında bir hata oluştu: " + err.message);
    }
  };

  const handleStatusChange = async () => {
    const newStatus = !form.isActive;
    const confirmMessage = newStatus 
      ? "Bu konfigürasyonu aktif hale getirmek istediğinize emin misiniz?"
      : "Bu konfigürasyonu pasif hale getirmek istediğinize emin misiniz?";

    if (window.confirm(confirmMessage)) {
      try {
        await updateConfig({ ...form, isActive: newStatus });
        onSuccess();
        alert("Durum başarıyla güncellendi!");
      } catch (err) {
        alert("Durum güncelleme hatası: " + err.message);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bu konfigürasyonu kalıcı olarak silmek istediğinize emin misiniz?")) {
      try {
        // console.log(form.id)
        await deleteConfig(form.id);
        onSuccess();
        onClose();
        alert("Konfigürasyon başarıyla silindi!");
      } catch (err) {
        alert("Silme işlemi sırasında hata: " + err.message);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="config-card">
        <div className="card-header">
          <h3>{isEdit ? "Update Configuration" : "Add Configuration"}</h3>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <br></br>
            <label>Application Name</label>
            <input
              type="text"
              name="applicationName"
              value={form.applicationName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="type-select"
            >
              <option value="string">String</option>
              <option value="int">Integer</option>
              <option value="bool">Boolean</option>
              <option value="double">Double</option>
            </select>
          </div>

          <div className="form-group">
            <label>Value</label>
            <input
              type="text"
              name="value"
              value={form.value}
              onChange={handleChange}
              className="value-input"
              required
            />
          </div>

          <div className="button-group">
            {isEdit && (
              <>
                <div className="left-buttons">
                  <button
                    type="button"
                    onClick={handleStatusChange}
                    className={`status-button ${form.isActive ? 'deactivate' : 'activate'}`}
                  >
                    {form.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="delete-button"
                  >
                    Hard Delete
                  </button>
                </div>
              </>
            )}
            <button type="submit" className="save-button">
              {isEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfigCard;