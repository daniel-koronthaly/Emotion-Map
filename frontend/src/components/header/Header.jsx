const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <header>
      <nav>
        <button onClick={() => setCurrentPage(3)}>Plane</button>
        <button onClick={() => setCurrentPage(1)}>Explanation</button>
        <button onClick={() => setCurrentPage(2)}>Demographics</button>
      </nav>
    </header>
  );
};

export default Header;