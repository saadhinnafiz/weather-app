import "./SearchBar.css";
import searchIcon from "../assets/search.png";

type SearchBarProps = {
  onSearch: (city: string) => void;
};

export default function SearchBar(props: SearchBarProps) {
  function handleSubmit(formData: FormData) {
    const city = formData.get("city") as string;
    if (!city) return;
    props.onSearch(city);
  }

  return (
    <form action={handleSubmit} className="search-bar">
      <input
        type="text"
        name="city"
        placeholder="Search city..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        <img src={searchIcon} alt="Search" className="search-icon" />
      </button>
    </form>
  );
}
