import "./ThemeForm.css";

const ThemeForm = () => {
  return (
    <form className="theme">
      <h2>theme</h2>

      <label>name</label>
      <input placeholder="name" />

      <label>foreground color</label>
      <input placeholder="foreground color" />

      <label>background color</label>
      <input placeholder="background color" />

      <button>submit</button>
    </form>
  );
};

export default ThemeForm;
