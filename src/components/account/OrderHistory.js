import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment-timezone";
import { useAuth } from "../../components/store/AuthContext";
import {
  getDocs,
  getFirestore,
  collection,
  query,
  where,
} from "firebase/firestore";
import "./Account.css";

const OrderHistory = () => {
  const { currentUser } = useAuth();
  const [userOrders, setUserOrders] = useState([]);
  const [loading, isLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      isLoading(true);
      const db = getFirestore();

      if (currentUser) {
        // Get user's order history
        const ordersArray = [];
        const q = query(
          collection(db, "orders"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          //ordersArray.push(doc.data());
          const data = { id: doc.id, docData: doc.data() };
          ordersArray.push(data);
        });
        setUserOrders(ordersArray);
        isLoading(false);
      }
    })();
  }, [currentUser]);

  useEffect(() => {
    if (userOrders) {
      //Sort order by latest date
      userOrders.sort((a, b) => {
        const dateA = a.docData.orderDate;
        const dateB = b.docData.orderDate;
        return dateB - dateA;
      });
    }
  });

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="account-content">
      <div onClick={handleBack} className="back-btn mb-3 d-block d-md-none">
        <i className="bi bi-chevron-left me-2"></i>
        Return to Account
      </div>
      <h4 className="account-title mb-3">Order History</h4>
      {loading ? (
        <div className="text-center mt-3">
          <div className="spinner-border spinner-border-lg" role="status"></div>
        </div>
      ) : (
        <div>
          {" "}
          {userOrders.length <= 0 ? (
            <p>You don't have any previous orders</p>
          ) : (
            <p>
              Please find below all of your orders. You can check order details
              to access your invoice and track your order.
            </p>
          )}
        </div>
      )}

      <div>
        {userOrders.map((order) => (
          <div className="row order-history-item" key={order.id}>
            <div className="col-12 col-sm-4 mb-3">
              <h6 className="mb-1 fw-bold text-dark">
                #{order.docData.orderId}
              </h6>
              <p className="mb-0">
                Order date:{" "}
                {moment(order.docData.orderDate)
                  .tz("Australia/Melbourne")
                  .format("DD/MM/YYYY")}
              </p>
              <p className="mb-0">
                Total Paid: <span>$</span>
                <span>{order.docData.totalAmount}</span>
              </p>
            </div>
            <div className="col-12 col-sm-6 mb-3 order-img">
              {order.docData.orderDetails.map((order) => (
                <Fragment key={order.id}>
                  <img
                    className="product-img"
                    src={order.img}
                    alt={order.title}
                  />
                </Fragment>
              ))}
            </div>
            <div className="col-12 col-sm-2 d-flex align-items-start">
              <Link
                to={{
                  pathname: `/anydrinks/orderhistory/${order.id}`,
                  state: { userOrders },
                }}
                className="view-btn"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
