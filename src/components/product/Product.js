import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../components/store/CartContext";
import "./Product.css";

const Product = ({ productList, currentPage, itemPerPage }) => {
  const cartContext = useContext(CartContext);

  const startIndex = (currentPage - 1) * itemPerPage;
  const selectedProduct = productList.slice(
    startIndex,
    startIndex + itemPerPage
  );

  return (
    <div className="row">
      {selectedProduct.map((product) => (
        <div className="col-6 col-sm-4 col-lg-4 col-xl-3 mb-4" key={product.id}>
          <div className="position-relative d-flex justify-content-center overflow-hidden w-100 product-img-wrapper">
            <Link to={`/anydrinks/products/${product.id}`}>
              <img
                className="position-absolute top-50 start-50 translate-middle w-100 h-100"
                src={product.img}
                alt=""
              />
            </Link>
            <div className="position-absolute quick-buy">
              <button
                className="add-product-btn"
                onClick={cartContext.addItemToCart.bind(this, product)}
              >
                Add to cart
              </button>
            </div>
          </div>

          <div className="position-relative caption-wrapper">
            <div className="row">
              <div className="col-8 product-caption">
                <Link to={`/anydrinks/products/${product.id}`}>
                  <p className="product-title">{product.title}</p>
                  <p className="product-brand">By {product.brand}</p>
                </Link>
                <p className="product-alcohol text-white d-flex align-items-center justify-content-center">
                  {product.alcohol}% ABV
                </p>
              </div>
              <div className="col-4 text-end product-price ps-0">
                <p>
                  <span>$</span>
                  <span>{product.price.toFixed(2)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
