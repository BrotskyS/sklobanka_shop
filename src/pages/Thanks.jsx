import React from "react";
import { Link } from "react-router-dom";

function Thanks() {
  return (
    <div className="thanks">
      <div className="container">
        <div className="thanks-h1">
          <h1>
            Дякуюмо за заказ, наш менеджер звяжеться з вами протягом 2 годин
          </h1>
        </div>

        <div className="botton-container">
          <div className="cart__bottom-buttons">
            <a href="/" className="button button--outline  go-back-btn">
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Вернутися на головну</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thanks;
