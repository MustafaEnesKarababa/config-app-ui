import "../css/ConfigTable.css";

function ConfigTable({ configs, onEdit }) {
  return (
    <div className="table-container">
      <table className="config-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Value</th>
            <th>Status</th>
            <th>Application</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {configs.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td><span className="type-badge">{item.type}</span></td>
              <td className="value-cell">{item.value}</td>
              <td>
                <span className={`status-badge ${item.isActive ? 'active' : 'inactive'}`}>
                  {item.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>{item.applicationName}</td>
              <td className="actions-cell">
                <button 
                  onClick={() => onEdit(item)}
                  className="edit-button"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConfigTable;