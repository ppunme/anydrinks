import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment-timezone";

const OrderDetails = ({ match }) => {
  const paramsId = match.params.id;
  const history = useHistory();
  const location = useLocation();
  const { userOrders } = location.state;

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="container-fluid order-details pt-1 px-3">
      <div onClick={handleBack} className="back-btn mb-3">
        <i className="bi bi-chevron-left me-2"></i>
        Return to Account
      </div>
      {userOrders
        .filter((doc) => doc.id === paramsId)
        .map((order) => (
          <Fragment>
            <div className="p-4 mb-4 order-details-header" key={order.id}>
              <h5 className="fw-bold">
                Order{" "}
                <span className="text-green">#{order.docData.orderId}</span>
              </h5>
              <p>
                Order date : {""}
                {moment(order.docData.orderDate)
                  .tz("Australia/Melbourne")
                  .format("DD/MM/YYYY, hh:mm:ss A")}
              </p>
              <h6 className="fw-bolder">Contact details</h6>
              <p>
                {order.docData.fName} {order.docData.lName}
              </p>
              <h6 className="fw-bolder">Delivery Address</h6>
              <p>
                {order.docData.street}, {order.docData.city},{" "}
                {order.docData.state}, {order.docData.postcode}
              </p>
            </div>
            <div className="row">
              <div className="col-12 mb-3">
                <div className="row">
                  <div className="col-4 col-sm-2"></div>
                  <div className="d-none d-sm-block col-sm-10">
                    <div className="row">
                      <div className="col-12 col-sm-6"></div>
                      <div className="col-4 col-sm-2 fw-bolder text-end">
                        Unit price
                      </div>
                      <div className="col-1 d-sm-none"></div>
                      <div className="col-2 col-sm-2 fw-bolder text-center">
                        Qty
                      </div>
                      <div className="col-4 col-sm-2 fw-bolder text-end">
                        Amount
                      </div>
                    </div>
                  </div>
                </div>
                {order.docData.orderDetails.map((order) => (
                  <div className="row pt-2" key={order.id}>
                    <div className="col-4 col-sm-2 text-center order-img">
                      <img
                        className="product-img"
                        src={order.img}
                        alt={order.title}
                      />
                    </div>
                    <div className="col-8 col-sm-10">
                      <div className="row">
                        <div className="col-12 col-sm-6">
                          <p className="mb-1 fw-bolder">{order.title}</p>
                          <p className="small">{order.brand}</p>
                        </div>
                        <div className="col-4 col-sm-2 detail-text">
                          <p>${order.price.toFixed(2)}</p>
                        </div>
                        <div className="col-1 d-sm-none detail-text text-center">
                          <p>x</p>
                        </div>
                        <div className="col-2 col-sm-2 detail-text text-center">
                          <p>{order.quantity}</p>
                        </div>
                        <div className="col-4 col-sm-2 detail-text">
                          ${order.amount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-end fw-bolder fs-6 pe-2">
              Total: ${order.docData.totalAmount.toFixed(2)}
            </div>
          </Fragment>
        ))}
    </div>
  );
};

export default OrderDetails;
