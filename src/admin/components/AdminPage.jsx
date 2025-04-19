import { useEffect, useState } from "react";
import { getAllConfigs } from "../api/configApi";
import ConfigTable from "./ConfigTable";
import ConfigCard from "./ConfigCard";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import "../css/AdminPage.css";
import "../css/ConfigTable.css";

function AdminPage() {
  const [configs, setConfigs] = useState([]);
  const [openForm, setOpenForm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchConfigs = () => {
    getAllConfigs().then((res) => setConfigs(res.data));
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const filteredConfigs = configs.filter(config =>
    config.applicationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <NavBar />

      <div className="main-layout">
        <SideBar />

        <main className="content-area">
          <div className="page-header">
            <h1>Configuration Panel</h1>
            <button 
              onClick={() => setOpenForm("create")}
              className="primary-button"
            >
              Add New Config
            </button>
          </div>


          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Application Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <ConfigTable configs={filteredConfigs} onEdit={(item) => setOpenForm(item)} />

          {openForm && (
            <ConfigCard
              initialData={openForm === "create" ? null : openForm}
              onClose={() => setOpenForm(null)}
              onSuccess={fetchConfigs}
            />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AdminPage;
