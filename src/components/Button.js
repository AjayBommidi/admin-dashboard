export default function Button({ text, onClick }) {
  return (
    <button 
      onClick={onClick}
      style={{
        padding: "10px 15px",
        background: "blue",
        color: "white",
        border: "none",
        cursor: "pointer",
        margin: "5px"
      }}
    >
      {text}
    </button>
  );
}