import React, { useState } from "react";
import "../VehicleSearch.css";

// import "../../../sanity/.sanity/runtime/sanityClient"
import { useNavigate } from "react-router-dom";
const VehicleSearch = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [priceRange, setPriceRange] = useState(1000000); // ✅ Higher than your McLaren
  const [showMakeOptions, setShowMakeOptions] = useState(false);
  const [showModelOptions, setShowModelOptions] = useState(false);

  const makes = [
    { value: "land rover", label: "Range Rover Evoque" },
    { value: "toyota", label: "Toyota" },
    { value: "tesla", label: "Tesla " },
    { value: "tesla", label: "Tesla Model X " },
    { value: "mclaren", label: "McLaren" },
    { value: "lamborghini", label: "Lamborghini Huracán" },
    { value: "lexus", label: "Lexus UX " },
    { value: "mercedes-ben", label: "Mercedes-Benz GLE " },
    { value: "infiniti", label: "Infiniti Concept" },
  ];

  const models = [
    { value: "camry trd", label: "Toyota Camry TRD" },
    { value: "evoque", label: "Evoque" },
    // { value: "x5", label: "X5" },
    { value: "huracán", label: "huracán" },
    { value: "model 3", label: "Model 3" },
    { value: "model x", label: "Model x" },
    { value: "gt", label: "GT" },
    { value: "ux", label: "UX" },
    { value: "gle", label: "GLE" },
    { value: "concept", label: "Concept" },
  ];

  // ✅ ONLY ONE handleSearch: navigates with filters
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set("q", searchTerm);
    if (make) params.set("make", make);
    if (model) params.set("model", model);
    params.set("maxPrice", priceRange);

    navigate(`/vehicles?${params.toString()}`);
  };

  const handleMakeSelect = (value, label) => {
    setMake(value);
    setShowMakeOptions(false);
  };

  const handleModelSelect = (value, label) => {
    setModel(value);
    setShowModelOptions(false);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".custom-dropdown")) {
      setShowMakeOptions(false);
      setShowModelOptions(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="search-container">
      <div className="search-header">
        Unsure which vehicle you are looking for? Find it here
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-input">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="help-text">Keyword search?</div>
        </div>

        <div className="dropdown">
          <div className="custom-dropdown">
            <button
              type="button"
              className="dropdown-button"
              onClick={() => setShowMakeOptions(!showMakeOptions)}
            >
              {makes.find((m) => m.value === make)?.label || "Make"}
              <span className="dropdown-arrow">▼</span>
            </button>
            {showMakeOptions && (
              <div className="dropdown-options">
                {makes.map((option) => (
                  <div
                    key={option.value}
                    className="dropdown-option"
                    onClick={() => handleMakeSelect(option.value, option.label)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="help-text">Missing manufacture?</div>
        </div>

        <div className="dropdown">
          <div className="custom-dropdown">
            <button
              type="button"
              className="dropdown-button"
              onClick={() => setShowModelOptions(!showModelOptions)}
            >
              {models.find((m) => m.value === model)?.label || "Model"}
              <span className="dropdown-arrow">▼</span>
            </button>
            {showModelOptions && (
              <div className="dropdown-options">
                {models.map((option) => (
                  <div
                    key={option.value}
                    className="dropdown-option"
                    onClick={() =>
                      handleModelSelect(option.value, option.label)
                    }
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="help-text">Missing model?</div>
        </div>

        <div className="price-range">
          <span className="price-label">Price Range</span>
          <div className="slider-track-container">
            <input
              type="range"
              min="10000"
              max="100000"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="slider"
              style={{
                background: `linear-gradient(to right, #F59E0B 0%, #D97706 ${
                  ((priceRange - 10000) / 90000) * 100
                }%, #000000 ${
                  ((priceRange - 10000) / 90000) * 100
                }%, #000000 100%)`,
              }}
            />
          </div>
          <div className="price-values">
            <span>$10,000</span>
            <span className="current-price">
              ${Number(priceRange).toLocaleString()}
            </span>
            <span>$100,000</span>
          </div>
        </div>

        <button type="submit" className="advanced-search">
          Advanced Search
        </button>
      </form>
    </div>
  );
};

export default VehicleSearch;
