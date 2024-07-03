import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

const FilterSidebar = ({ products, setFilteredProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState('0'); // Default sort by decrease
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product";
  const [data, setData] = useState([]);
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
    setSelectedCategory(prevCategory => prevCategory === category ? '' : category);
  };

  // Handle checkbox change for brand
  const handleBrandChange = (brand) => {
    setSelectedBrand(prevBrand => prevBrand === brand ? '' : brand);
  };

  // Filter products based on selected category, brand, and sort order
  const filterProducts = () => {
    let filtered = [...products];
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }
    if (sortBy === '0') {
      // Sort by decrease
      filtered.sort((a, b) => b.price - a.price);
    } else {
      // Sort by ascending
      filtered.sort((a, b) => a.price - b.price);
    }
    setFilteredProducts(filtered);
  };

  // Handle sort by change
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div id="aside" className="col-md-12">
      <div className="aside" style={{ margin: "20px 5px" }}>
        <h3 className="aside-title"><b>Categories</b></h3>
        <div className="checkbox-filter" style={{ margin: "10px 0px" }}>
          {categories.map((category, index) => (
            <Row className="input-checkbox-1" key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Col md={8}>
                <label style={{}}>
                  <b>{category}</b>
                  <small> ({data.filter(product => product.category === category).length})</small>
                </label>
              </Col>
              <Col md={4}>
                <input
                  type="checkbox"
                  className="category-filter"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                />
              </Col>
            </Row>
          ))}
        </div>
      </div>

      <div className="aside" style={{ margin: "20px 5px" }}>
        <h3 className="aside-title"><b>Brand</b></h3>
        <div className="checkbox-filter">
          {brands.map((brand, index) => (
            <Row className="input-checkbox-1" key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Col md={8}>
                <label style={{}}>
                  <b>{brand}</b>
                  <small> ({data.filter(product => product.brand === brand).length})</small>
                </label>
              </Col>
              <Col md={4}>
                <input
                  type="checkbox"
                  className="brand-filter"
                  name="brand"
                  value={brand}
                  checked={selectedBrand === brand}
                  onChange={() => handleBrandChange(brand)}
                />
              </Col>
            </Row>
          ))}
        </div>
      </div>

      <div className="aside" style={{ margin: "20px 5px" }}>
        <h3 className="aside-title">Sort by</h3>
        <select
          className="input-select sort-filter"
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option value="0">Decrease</option>
          <option value="1">Ascending</option>
        </select>
        <div className="input-checkbox" style={{ marginTop: 10 }}>
          <button className="btn btn-primary" type="button" name="btn-filter" onClick={filterProducts}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
