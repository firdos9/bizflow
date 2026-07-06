const Button = ({ children, onClick, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    style={{
      padding: "8px 16px",
      borderRadius: "6px",
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
    }}
  >
    {children}
  </button>
);
export default Button;
