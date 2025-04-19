import "../css/AdminPage.css";

function SideBar() {
  return (
    <aside className="admin-sidebar">
      <nav>
        <ul>
          <li className="active">Configuration Panel</li>
          <li>Admin Page</li>
          <li>Users</li>
          <li>Projects</li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;