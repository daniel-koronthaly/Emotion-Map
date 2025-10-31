const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <header>
      <nav>
        <button onClick={() => setCurrentPage("MainPage")}>Plane</button>
        <button onClick={() => setCurrentPage("Explanation")}>Explanation</button>
        <button onClick={() => setCurrentPage("Demographics")}>Demographics</button>
      </nav>
    </header>
  );
};

export default Header;