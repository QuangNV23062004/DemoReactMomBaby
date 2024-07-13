import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Col, Row } from "react-bootstrap";
import FilterSidebar from "./FilterSidebar";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "react-bootstrap/Pagination";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductPage() {
  // Base URLs for APIs
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product";
  const cartAPI = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart";
  const PreOrderAPI = "https://6684c67c56e7503d1ae11cfd.mockapi.io/Preorder";


  const [data, setData] = useState([]);// State to store fetched product data
  const [filteredProducts, setFilteredProducts] = useState([]);// State to store filtered product data
  
  // State to manage search query from URL
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";


  const nav = useNavigate();

   // State to manage current page number
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchApi = () => {// Fetch product data from the API
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);

        // Filter products based on search query
        const filteredData = data.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filteredData.map((product) => ({ ...product, hovered: false })));
        setCurrentPage(1); // Reset current page only when new data is fetched
      })
      .catch((error) => console.log(error));
  };

  // Fetch data when the component mounts or the search query changes
  useEffect(() => {
    fetchApi();
  }, [searchQuery]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

   // Handle pre-order functionality: 
   //1.Check user login ? {check product preordered ? notify already preordered : create new preorder} : nav loginpage
   const handlePreorder = async (product) => {
    const userId = sessionStorage.getItem("userId");
  
    if (!userId) {
      nav("/SWP391-MomAndBaby/login");
      return;
    }
  
    try {
      const response = await fetch(`${PreOrderAPI}?userID=${userId}`);
  
      if (response.status === 404) {
        // If no preorders found, proceed with creating a new preorder
        const newPreorder = {
          userID: userId,
          productID: product.id,
          productName: product.name,
          productImage: product.mainImg,
          price: product.price,
        };
  
        const createResponse = await fetch(PreOrderAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPreorder),
        });
  
        if (!createResponse.ok) {
          throw new Error("Failed to create preorder");
        }
  
        const createdPreorder = await createResponse.json();
        console.log("Preorder created:", createdPreorder);
        toast.success("Preorder placed successfully!");
      } else {
        const preorders = await response.json();
  
        if (!Array.isArray(preorders)) {
          throw new Error("Preorders response is not an array");
        }
  
        const existingPreorder = preorders.find(
          (item) => item.productID === product.id
        );
  
        if (existingPreorder) {
          toast.error("You've already preordered this product.");
        } else {
          const newPreorder = {
            userID: userId,
            productID: product.id,
            productName: product.name,
            productImage: product.mainImg,
            price: product.price,
          };
  
          const createResponse = await fetch(PreOrderAPI, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPreorder),
          });
  
          if (!createResponse.ok) {
            throw new Error("Failed to create preorder");
          }
  
          const createdPreorder = await createResponse.json();
          console.log("Preorder created:", createdPreorder);
          toast.success("Preorder placed successfully!");
        }
      }
    } catch (error) {
      console.error("Error handling preorder:", error);
      toast.error("Failed to place preorder. Please try again later.");
    }
  };
  

  // Handle filtered products update from the FilterSidebar component
  const handleFilteredProducts = (filteredData) => {
    setFilteredProducts(filteredData.map((product) => ({ ...product, hovered: false })));
  };
// Handle mouse enter event to show the hover effect
  const handleMouseEnter = (index) => {
    setFilteredProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[(currentPage - 1) * itemsPerPage + index].hovered = true;
      return updatedProducts;
    });
  };

// Handle mouse leave event to hide the hover effect
  const handleMouseLeave = (index) => {
    setFilteredProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[(currentPage - 1) * itemsPerPage + index].hovered = false;
      return updatedProducts;
    });
  };

  const showSuccessToast = (productName) => {
    toast.success(`${productName} added to cart successfully!`);
  };

  const showErrorToast = (message) => {
    toast.error(message);
  };


  // Handle add to cart functionality
  //    user login 
  //        ? {quantity > 0 ? 
  //            {user has cart with that product 
  //            ? PUT new quantity in cart(+1) and product(-1) 
  //            : POST new cart and product quantity(-1) } 
  //        :not happening because of preorder} 
  //    : loginPage
  const handleAddToCart = async (product) => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      nav("/SWP391-MomAndBaby/login");
      return;
    }

    if (product.quantity <= 0) {
      toast.error("Sorry, this product is out of stock.");
      return;
    }

    try {
      //fetch cart based on userID
      const response = await fetch(`${cartAPI}?userID=${userId}`);

      if (!response.ok) {
        if (response.status === 404) {
          //no cart found => new cart
          const newCartItem = {
            userID: userId,
            productID: product.id,
            productName: product.name,
            productImage: product.mainImg,
            price: product.price,
            quantity: 1,
            totalPrice: product.price,
          };

          const createResponse = await fetch(cartAPI, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCartItem),
          });//create new cart

          if (!createResponse.ok) {
            throw new Error("Failed to create cart");
          }

          const createdCartItem = await createResponse.json();
          console.log("Product added to new cart:", createdCartItem);
          showSuccessToast(product.name);
        } else {
          throw new Error("Failed to fetch user cart");
        }
      } else {
        const cartItems = await response.json();
        const existingCartItem = cartItems.find(
          (item) => item.productID === product.id
        );//find cart has that product

        if (existingCartItem) {
          const updatedQuantity = existingCartItem.quantity + 1;
          const updatedTotalPrice = updatedQuantity * product.price;
          const updatedCartItem = {
            ...existingCartItem,
            quantity: updatedQuantity,
            totalPrice: updatedTotalPrice,
          };

          const updateResponse = await fetch(`${cartAPI}/${existingCartItem.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCartItem),
          });//update cart

          if (!updateResponse.ok) {
            throw new Error("Failed to update cart item");
          }

          const updatedItem = await updateResponse.json();
          console.log("Product quantity updated in cart:", updatedItem);
          showSuccessToast(product.name);
        } else {//user have cart, dont have that product
          const newCartItem = {
            userID: userId,
            productID: product.id,
            productName: product.name,
            productImage: product.mainImg,
            price: product.price,
            quantity: 1,
            totalPrice: product.price,
          };

          const createResponse = await fetch(cartAPI, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCartItem),
          });

          if (!createResponse.ok) {
            throw new Error("Failed to add product to cart");
          }

          const createdCartItem = await createResponse.json();
          console.log("Product added to cart:", createdCartItem);
          showSuccessToast(product.name);
        }
      }

      const updatedProductQuantity = product.quantity - 1;
      const updatedProduct = {
        ...product,
        quantity: updatedProductQuantity,
      };

      const productUpdateResponse = await fetch(`${baseURL}/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      //update product's quantity in product api

      if (!productUpdateResponse.ok) {
        throw new Error("Failed to update product quantity");
      }

      setFilteredProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === product.id ? updatedProduct : p))
      );

      console.log("Product quantity updated:", updatedProduct);
    } catch (error) {
      console.error("Error handling add to cart:", error);
      toast.error("Failed to add product to cart. Please try again later.");
    }
  };

  const currentData = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: 10,
          marginBottom: 50,
        }}
      >
        <Col md={3} style={{ height: "100%" }}>
          <FilterSidebar products={data} setFilteredProducts={handleFilteredProducts} />
        </Col>
        <Col md={9} style={{ display: "inline" }}>
          {currentData.map((product, index) => (
            <Col key={index} md={4} style={{ display: "inline-flex", marginBottom: 20 }}>
              <Card
                sx={{ width: "100%", position: "relative" }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div style={{ position: "relative" }}>
                  <CardMedia
                    sx={{ height: 300, position: "relative" }}
                    image={product.mainImg}
                    title={product.name}
                  />
                  {product.hovered && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: 1,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      {product.quantity > 0 ? (
                        <button
                          style={{
                            backgroundColor: "#ff469e",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <button
                          style={{
                            backgroundColor: "#ff469e",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            cursor: "pointer",
                          }}
                          onClick={() => handlePreorder(product)}
                        >
                          Preorder
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{ height: 120, marginTop: 30 }}
                  >
                    <Link
                      to={`/SWP391-MomAndBaby/product/detail/${product.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {product.name}
                    </Link>
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{ textAlign: "left", marginLeft: 10, color: "#d10024" }}
                  >
                    <b>{product.price} VNĐ</b>
                  </Typography>
                </CardContent>
                <CardActions>{/* Add actions as needed */}</CardActions>
              </Card>
            </Col>
          ))}
        </Col>
      </Row>
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <Pagination.Item
            key={pageNumber + 1}
            active={currentPage === pageNumber + 1}
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            {pageNumber + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
