import "./App.css";

import SearchBar from "./components/SearchBar";

export default function App() {
  // functions
  function handleSearch(city: string) {
    console.log(city);
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} /> <p>This is a weather app</p>
    </>
  );
}
