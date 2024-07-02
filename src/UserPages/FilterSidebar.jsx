import React, { useState, useEffect } from 'react';


const FilterSidebar = ({ products, setFilteredProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState('0'); // Default sort by decrease
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product";
  const [data, setData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]); // Initial price range
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const fetchApi = () => {
    fetch(baseURL)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // Extract categories and brands from fetched data
  useEffect(() => {
    if (data.length > 0) {
      const categories = new Set(data.map(product => product.category));
      const brands = new Set(data.map(product => product.brand));
      setCategories(Array.from(categories));
      setBrands(Array.from(brands));
    }
  }, [data]);

  // Handle checkbox change for category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category, selectedBrand);
  };

  // Handle checkbox change for brand
  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    filterProducts(selectedCategory, brand);
  };

  // Filter products based on selected category and brand
  const filterProducts = (category, brand) => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    if (brand) {
      filtered = filtered.filter(product => product.brand === brand);
    }
    setFilteredProducts(filtered);
  };

  // Handle sort by change
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    let sortedProducts = [...products];
    if (e.target.value === '0') {
      // Sort by decrease
      sortedProducts.sort((a, b) => b.price - a.price);
    } else {
      // Sort by ascending
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    setFilteredProducts(sortedProducts);
  };

  // Custom tooltip renderer for price range slider
  const handleRenderTooltip = renderProps => {
    const { value, index, ...restProps } = renderProps.props;
    return (
      <SliderTooltip {...renderProps}>
        {index === 0 ? `${value} VNĐ` : `${value} VNĐ`}
      </SliderTooltip>
    );
  };

  return (
    <div id="aside" className="col-md-12" style={{ margin: "20px 0px" }}>
      <div className="aside">
        <h3 className="aside-title"><b>Categories</b></h3>
        <div className="checkbox-filter">
          {categories.map((category, index) => (
            <div className="input-checkbox-1" key={index}>
              <input
                type="checkbox"
                className="category-filter"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
              />
              <label style={{ margin: "5px 10px" }}>
                <span></span>
                <b>{category}</b>
                <small>
                  ({data.filter(product => product.category === category).length})
                </small>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="aside" style={{ margin: "20px 0px" }}>
        <h3 className="aside-title"><b>Brand</b></h3>
        <div className="checkbox-filter">
          {brands.map((brand, index) => (
            <div className="input-checkbox-1" key={index}>
              <input
                type="checkbox"
                className="brand-filter"
                name="brand"
                value={brand}
                checked={selectedBrand === brand}
                onChange={() => handleBrandChange(brand)}
              />
              <label style={{ margin: "5px 10px" }}>
                <span></span>
                <b>{brand}</b>
                <small>
                  ({data.filter(product => product.brand === brand).length})
                </small>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="aside" style={{ margin: "20px 0px" }}>
        <h3 className="aside-title">Sort by</h3>
        <select
          style={{ margin: "10px 0px" }}
          className="input-select sort-filter"
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option value="0">Decrease</option>
          <option value="1">Ascending</option>
        </select>
        <div className="input-checkbox" style={{ marginTop: 10 }}>
          <button className="btn btn-primary" type="submit" name="btn-filter">
            Filter
          </button>
        </div>
      </div>

    </div>
  );
};

export default FilterSidebar;
