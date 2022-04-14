import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clayful from "clayful/client-js";
import CartItem from "./Sections/CartItem"
import "./CartPage.scss";

function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});

  useEffect(() => {
    const Cart = clayful.Cart;
    const options = {
      customer: localStorage.getItem("accessToken"),
    };
    Cart.getForMe({}, options, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
      const data = result.data;
      setCart(data.cart);
      console.log(data);
    });
  }, []);

  const items = cart.items;

  return (
    <div className="page-wrapper">
      <div className="shopping-cart">
        <h1 className="title">장바구니</h1>

        <div className="shopping-cart-body">
          {items && items.length > 0 ? (
            items.map((item, index) => {
              return <CartItem key={item._id} item={item} index={index} />;
            })
          ) : (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              카트에 상품이 하나도 없습니다.
            </p>
          )}
        </div>

        {items && items.length > 0 && (
          <div className="bottom">
            <span className="total-price">
              총 금액: ￦ {(cart.total?.amount.raw).toLocaleString()}
            </span>
            <button
              style={{ float: "right", padding: "4px 8px" }}
              onClick={() => navigate("/payment")}
            >
              결제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
