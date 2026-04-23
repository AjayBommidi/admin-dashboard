export default function Input({ placeholder, value, onChange }) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: "10px",
        margin: "5px",
        width: "200px"
      }}
    />
  );
}