import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import Carouseler from "./Carouseler";

export default function Home() {

  const [data, setData] = useState([]);
  const [priorityTwoData, setPriorityTwoData] = useState([]);
  const [priorityOneData, setPriorityOneData] = useState([]);
  const [brands, setBrands] = useState([]);
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product";
  const cartAPI = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart";
  const PreOrderAPI = "https://6684c67c56e7503d1ae11cfd.mockapi.io/Preorder"
  const nav = useNavigate();

  const handlePreorder = async (product) => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      nav("/SWP391-MomAndBaby/login");
      return;
    }

    try {
      const response = await fetch(`${PreOrderAPI}?userID=${userId}`);
      const preorders = await response.json();

      console.log("Preorders:", preorders); // Log the preorders response
      console.log("Preorders type:", typeof preorders); // Log the type of preorders

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
    } catch (error) {
      console.error("Error handling preorder:", error);
      toast.error("Failed to place preorder. Please try again later.");
    }
  };

  const fetchApi = () => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        setData(data.map(product => ({ ...product, hovered: false }))); // Initialize products with added hovered state
        setPriorityTwoData(data.filter(product => product.priority === 2));
        setPriorityOneData(data.filter(product => product.priority === 1));
        const brandSet = new Set();
        data.forEach((product) => {
          brandSet.add(product.brand);
        });
        setBrands(Array.from(brandSet));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    // Drift snippet integration
    !function() {
      var t = window.driftt = window.drift = window.driftt || [];
      if (!t.init) {
        if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
        t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
        t.factory = function(e) {
          return function() {
            var n = Array.prototype.slice.call(arguments);
            return n.unshift(e), t.push(n), t;
          };
        }, t.methods.forEach(function(e) {
          t[e] = t.factory(e);
        }), t.load = function(t) {
          var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
          o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
          var i = document.getElementsByTagName("script")[0];
          i.parentNode.insertBefore(o, i);
        };
      }
    }();
    drift.SNIPPET_VERSION = '0.3.1';
    drift.load('if3cxw4emka3');
  }, []);

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
      const response = await fetch(`${cartAPI}?userID=${userId}`);

      if (!response.ok) {
        if (response.status === 404) {
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
            throw new Error("Failed to create cart");
          }

          const createdCartItem = await createResponse.json();
          console.log("Product added to new cart:", createdCartItem);
          toast.success(`${product.name} added to cart successfully!`);
        } else {
          throw new Error("Failed to fetch user cart");
        }
      } else {
        const cartItems = await response.json();
        const existingCartItem = cartItems.find(
          (item) => item.productID === product.id
        );

        if (existingCartItem) {
          const updatedQuantity = existingCartItem.quantity + 1;
          const updatedTotalPrice = updatedQuantity * product.price;
          const updatedCartItem = {
            ...existingCartItem,
            quantity: updatedQuantity,
            totalPrice: updatedTotalPrice,
          };

          const updateResponse = await fetch(
            `${cartAPI}/${existingCartItem.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedCartItem),
            }
          );

          if (!updateResponse.ok) {
            throw new Error("Failed to update cart item");
          }

          const updatedItem = await updateResponse.json();
          console.log("Product quantity updated in cart:", updatedItem);
          toast.success(`${product.name} quantity updated in cart successfully!`);
        } else {
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
          toast.success(`${product.name} added to cart successfully!`);
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

      if (!productUpdateResponse.ok) {
        throw new Error("Failed to update product quantity");
      }

      setData(data.map(p => (p.id === product.id ? updatedProduct : p)));
      setPriorityOneData(priorityOneData.map(p => (p.id === product.id ? updatedProduct : p)));
      setPriorityTwoData(priorityTwoData.map(p => (p.id === product.id ? updatedProduct : p)));
      console.log("Product quantity updated:", updatedProduct);
    } catch (error) {
      console.error("Error handling add to cart:", error);
      toast.error("Failed to add product to cart. Please try again later.");
    }
  };

  const handleMouseEnter = (index, setState) => {
    setState(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index].hovered = true;
      return updatedProducts;
    });
  };

  const handleMouseLeave = (index, setState) => {
    setState(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index].hovered = false;
      return updatedProducts;
    });
  };

  const renderProductCard = (product, index, setState) => (
    <Col 
      key={product.id} 
      onMouseEnter={() => handleMouseEnter(index, setState)} 
      onMouseLeave={() => handleMouseLeave(index, setState)}
      style={{ position: 'relative' }}
    >
      <Card sx={{ maxWidth: 345, position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <CardMedia sx={{ height: 300 }} image={product.mainImg} />
          {product.hovered && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 1,
              transition: 'opacity 0.3s ease'
            }}>
              {product.quantity > 0 ? (
                <button 
                  style={{
                    backgroundColor: '#ff469e',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              ) : (
                <button 
                  style={{
                    backgroundColor: '#ff469e',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    cursor: 'pointer'
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
          <Typography gutterBottom variant="h6" component="div" style={{ height: 120, marginTop: 30 }}>
            <Link to={`/SWP391-MomAndBaby/product/detail/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {product.name}
            </Link>
          </Typography>
          <Typography gutterBottom variant="h6" component="div" style={{ textAlign: "left", marginLeft: 10, color: "#d10024" }}>
            <b>{product.price} VNĐ</b>
          </Typography>
        </CardContent>
      </Card>
    </Col>
  );

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Container>
      <ToastContainer />
      <Carouseler />
      <br />
      <Row>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "15px", height: "100%", backgroundColor: "red" }}>|</div>
          <div style={{ marginLeft: 10, color: "#db4444" }}>Today's</div>
        </div>
      </Row>
      <br />
      <Row>
        <Carousel responsive={responsive}>
          {priorityTwoData.map((product, index) => (
            renderProductCard(product, index, setPriorityTwoData)
          ))}
        </Carousel>
      </Row>
      <Row>
        <div className="col-md-12 text-center" style={{ marginTop: "55px" }}>
          <Link to={'/SWP391-MomAndBaby/product'}>
            <Button
              style={{
                padding: 10,
                color: "#fff",
                backgroundColor: "#ff469e",
                marginBottom: 10,
              }}
            >
              View All Products
            </Button>
          </Link>
        </div>
      </Row>
      <Row>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "15px", height: "100%", backgroundColor: "red" }}>|</div>
          <div style={{ marginLeft: 10, color: "#db4444" }}>Brands</div>
        </div>
      </Row>
      <br />
      <Carousel responsive={responsive}>
        {brands.map((brand, index) => (
          <Col key={index}>
            <Card>
              <Link to={'/SWP391-MomAndBaby/product'}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {brand}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Col>
        ))}
      </Carousel>
      <Row>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "15px", height: "100%", backgroundColor: "red" }}>|</div>
          <div style={{ marginLeft: 10, color: "#db4444" }}>This Month</div>
        </div>
      </Row>
      <br />
      <Carousel responsive={responsive}>
        {priorityOneData.map((product, index) => (
          renderProductCard(product, index, setPriorityOneData)
        ))}
      </Carousel>
      <Row>
        <div className="col-md-12 text-center" style={{ marginTop: "55px" }}>
          <Link to={'/SWP391-MomAndBaby/product'}>
            <Button
              style={{
                padding: 10,
                color: "#fff",
                backgroundColor: "#ff469e",
                marginBottom: 10,
              }}
            >
              View All Products
            </Button>
          </Link>
        </div>
      </Row>
      <Row>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "15px", height: "100%", backgroundColor: "red" }}>|</div>
          <div style={{ marginLeft: 10, color: "#db4444" }}>Our Product</div>
        </div>
      </Row>
      <br />
      <Carousel responsive={responsive}>
        {data.map((product, index) => (
          renderProductCard(product, index, setData)
        ))}
      </Carousel>
      <Row>
        <div className="col-md-12 text-center" style={{ marginTop: "55px" }}>
          <Link to={'/SWP391-MomAndBaby/product'}>
            <Button
              style={{
                padding: 10,
                color: "#fff",
                backgroundColor: "#ff469e",
                marginBottom: 10,
              }}
            >
              View All Products
            </Button>
          </Link>
        </div>
      </Row>

      {/* Chat Button */}
      <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#ff469e',
                    color: '#fff',
                    padding: '20px 40px',
                    borderRadius: '30px',
                    zIndex: '1000',
                    cursor: 'pointer',
                }}
            >
                <a
                    href="https://m.me/343721882163379"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                >
                    <FontAwesomeIcon icon={faFacebookMessenger} style={{ marginRight: '10px' }} />
                    Chat
                </a>
            </div>
    </Container>
  );
}
