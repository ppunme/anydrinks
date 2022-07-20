import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import CartContext from "../../components/store/CartContext";
import "./ProductDetails.css";

const ProductDetails = ({ match }) => {
  const cartContext = useContext(CartContext);
  const paramsId = parseInt(match.params.id);
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="product-details">
      <div onClick={handleBack} className="back-btn d-flex">
        <i className="bi bi-chevron-left me-2 d-flex align-items-center"></i>
        Back
      </div>
      {cartContext.products
        .filter((product) => product.id === paramsId)
        .map((filteredProduct) => (
          <div key={filteredProduct.id}>
            <div className="row">
              <div className="col-sm-6 text-center mb-3">
                <img
                  src={filteredProduct.img}
                  alt={filteredProduct.title}
                ></img>
              </div>
              <div className="col-sm-6">
                <h1 className="s-product-title text-black">
                  {filteredProduct.title}
                </h1>
                <p>By {filteredProduct.brand}</p>
                <p className="s-product-price text-black">
                  $ {filteredProduct.price}
                </p>
                <p>{filteredProduct.desc}</p>

                <button
                  className="default-btn add-cart-btn mt-3"
                  onClick={cartContext.addItemToCart.bind(
                    this,
                    filteredProduct
                  )}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductDetails;
