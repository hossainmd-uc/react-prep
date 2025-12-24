import { useEffect, useMemo, useState } from "react";
import "./Search.css";
import SearchCard from "./SearchCard";
import Dropdown from "./Dropdown";

const Search = ({ searchData, setSearchData }) => {

  const PAGE_SIZE = 100;

  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [params, setParams] = useState({
    query: "",
    quantity: "",
    cuisine: "",
    diet: "",
    min_protein: "",
    max_carbs: "",
    max_calories: "",
  });

  const [totalResults, setTotalResults] = useState(null)
  const [page, setPage] = useState(0)


  const [filterSearch, setFilterSearch] = useState('')

  const setFilter = (e) => {

    setFilterSearch(e.target.value)

  }

  const [queryAuto, setQueryAuto] = useState([]);

  // --- Autocomplete ---
  async function queryAutocomplete() {
    const apiKey = import.meta.env.VITE_API_KEY;

    const rawParams = {
      apiKey,
      query: params.query,
      cuisine: params.cuisine,
      minProtein: params.min_protein,
      maxCarbs: params.max_carbs,
      maxCalories: params.max_calories,
      number: 12,
    };

    const queryParams = new URLSearchParams(
      Object.entries(rawParams).filter(([_, x]) => x !== "" && x !== undefined)
    );

    const url = `https://api.spoonacular.com/recipes/autocomplete?${queryParams}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setQueryAuto(data);
    } catch (e) {
      console.log(`Exception: ${e}`);
    }
  }

  useEffect(() => {
    if (!params.query) {
      setQueryAuto([]);
      return;
    }
    const t = setTimeout(queryAutocomplete, 300);
    return () => clearTimeout(t);
  }, [params.query, params.cuisine, params.min_protein, params.max_carbs, params.max_calories, params.quantity]);

  function adjustParams(e) {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  }

  async function fetchResults() {

    const apiKey = import.meta.env.VITE_API_KEY;

    const rawParams = {
      query: params.query,
      apiKey,
      cuisine: params.cuisine,
      diet: params.diet,
      minProtein: params.min_protein,
      maxCarbs: params.max_carbs,
      maxCalories: params.max_calories,
      number: PAGE_SIZE,
      offset: page * PAGE_SIZE
    };

    const queryParams = new URLSearchParams(
      Object.entries(rawParams).filter(([_, v]) => v !== undefined && v !== "")
    );

    const url = `https://api.spoonacular.com/recipes/complexSearch?${queryParams.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const parsed = await response.json();
      console.log(parsed)
      setSearchData(parsed);
      setTotalResults(parsed.totalResults)
    } catch (e) {
      console.log(`Exception detected: ${e}`);
    }
  }

  function search(e) {
    e.preventDefault();
    setPage(0);
    fetchResults();
  }

  useEffect(() => {
    if (!params.query) return;
    fetchResults();
  }, [page])


  const hasResults = useMemo(
    () => Array.isArray(searchData?.results) && searchData.results.length > 0,
    [searchData]
  );

  return (
    <div className="search-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">Find your next recipe</h1>
          <p className="hero-subtitle">Search by dish, ingredient, cuisine, or dietary style.</p>

          <form className="search-panel" onSubmit={search}>
            {/* Big search input */}
            <div className="search-row autocomplete">
              <div className="search-input-wrap">
                <span className="search-icon" aria-hidden="true">⌕</span>

                <input
                  className="hero-search"
                  name="query"
                  value={params.query}
                  onChange={adjustParams}
                  placeholder="Try “spicy chicken”, “pasta”, “high protein”…"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 120)}
                />

                {isFocused && queryAuto?.length > 1 && (
                  <Dropdown setParams={setParams} suggestions={queryAuto} />
                )}
              </div>

              <button className="primary-btn" type="submit">
                Search
              </button>
            </div>

            {/* Filters toggle */}
            <div className="filters-bar">
              <button
                type="button"
                className="ghost-btn"
                onClick={() => setShowFilters((s) => !s)}
              >
                {showFilters ? "Hide filters" : "Add filters"}
              </button>

              <div className="chips">
                {params.cuisine && <span className="chip">Cuisine: {params.cuisine}</span>}
                {params.diet && <span className="chip">Diet: {params.diet}</span>}
                {params.quantity && <span className="chip">Qty: {params.quantity}</span>}
                {params.min_protein && <span className="chip">Min protein: {params.min_protein}</span>}
                {params.max_carbs && <span className="chip">Max carbs: {params.max_carbs}</span>}
                {params.max_calories && <span className="chip">Max cal: {params.max_calories}</span>}
              </div>
            </div>

            {/* Collapsible filters */}
            {showFilters && (
              <div className="filters-grid">
                {/* <div className="field">
                  <label>Quantity</label>
                  <input
                    className="field-input"
                    name="quantity"
                    value={params.quantity}
                    onChange={adjustParams}
                    placeholder="e.g. 10"
                    inputMode="numeric"
                  />
                </div> */}

                <div className="field">
                  <label>Cuisine</label>
                  <input
                    className="field-input"
                    name="cuisine"
                    value={params.cuisine}
                    onChange={adjustParams}
                    placeholder="e.g. italian"
                  />
                </div>

                <div className="field">
                  <label>Diet</label>
                  <input
                    className="field-input"
                    name="diet"
                    value={params.diet}
                    onChange={adjustParams}
                    placeholder="e.g. vegetarian"
                  />
                </div>

                <div className="field">
                  <label>Min protein</label>
                  <input
                    className="field-input"
                    name="min_protein"
                    value={params.min_protein}
                    onChange={adjustParams}
                    placeholder="e.g. 20"
                    inputMode="numeric"
                  />
                </div>

                <div className="field">
                  <label>Max carbs</label>
                  <input
                    className="field-input"
                    name="max_carbs"
                    value={params.max_carbs}
                    onChange={adjustParams}
                    placeholder="e.g. 50"
                    inputMode="numeric"
                  />
                </div>

                <div className="field">
                  <label>Max calories</label>
                  <input
                    className="field-input"
                    name="max_calories"
                    value={params.max_calories}
                    onChange={adjustParams}
                    placeholder="e.g. 600"
                    inputMode="numeric"
                  />
                </div>
              </div>
            )}
          </form>
        </div>
      </section>


      {/* RESULTS */}
      {hasResults && <section className="results-section">
        <div className="results-inner">
          <div className="results-head">
            <h2>Results: {searchData.totalResults} in total</h2>
            <input value={filterSearch} name='filter' onChange={setFilter} placeholder="Filter by text..." />
            <span className="results-count">
              {hasResults ? `${searchData.results.length} recipes` : "No results yet"}
            </span>
          </div>

          <div className="results-surface">
            {hasResults ? (
              <SearchCard filter={filterSearch} data={searchData} />
            ) : (
              <div className="empty-state">
                <p>Search something tasty to see recipes here.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      }
      {Array.from({ length: Math.floor(totalResults / PAGE_SIZE) }).map((_, i) => (
        <button key={i} onClick={() => setPage(i)}>{i + 1}</button>
      ))}
    </div>
  );
};

export default Search;
