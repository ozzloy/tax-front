import "./App.css";

function App() {
  const handleLogin = () => {
    alert("login clicked!");
  };
  return (
    <>
      <header>
        <nav>
          <h1>tax front</h1>
          <button onClick={handleLogin}>login</button>
        </nav>
      </header>
      <main>
        <article>
          <p>fill usa tax form 1040 for entertainment purposes.</p>
        </article>
        <footer>
          <small>built with love and kindness</small>
        </footer>
      </main>
    </>
  );
}

export default App;
