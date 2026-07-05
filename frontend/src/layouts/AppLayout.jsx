// frontend/src/layouts/AppLayout.jsx
const AppLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "280px", borderRight: "1px solid #ccc" }}>
        Sidebar (Menu)
      </aside>
      <main style={{ padding: "24px", flex: 1 }}>{children}</main>
    </div>
  );
};

export default AppLayout;
