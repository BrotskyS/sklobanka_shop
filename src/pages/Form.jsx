import React from "react";
import { useForm } from "react-hook-form";
import { Link, withRouter, browserHistory, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TOKEN, chatId } from "./BotToken";
import { clearCart } from "../redux/actions/cart";

function Form() {
    const dispatch = useDispatch();
  const items = useSelector(({ cart }) => cart.items);
  const totalPrice = useSelector(({ cart }) => cart.totalPrice);
  const history = useHistory();

  const sendM = (data, items) => {
    const message = `Дані клієнта: ${data}\nЗаказ:\n\n${items}\n\nСума:${totalPrice} `;
    const request = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    fetch(request, {
      method: "POST",
      body: JSON.stringify({ chat_id: chatId, text: message }),
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          console.log(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  };

  const onClickOrder = () => {};
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    //   Переадресація на сторінку
    history.push("/thanks");
    // Новий масив, щоб витягнути дані з обєкту
    const newData = [];
    const newItem = [];

    console.log(items);

    for (const [key, value] of Object.entries(data)) {
      newData.push(`${key}: ${value}`);
    }

    // Витягнути дані з items
    const DataFromItems = Object.keys(items).map((key) => {
      return items[key].items[0];
    });

    // Кинути окремі дані з DataFromItems в newItem
    DataFromItems.map((obj) => {
      newItem.push("Назва: " + obj.name);
      newItem.push("Кількість: " + items[obj.id].items.length + "\n");
    });
    console.log(newItem);

    sendM(newData, newItem);
    dispatch(clearCart());
  };
  return (
    <div className="form">
      <div className="container">
        <h2>Введіть ваші дані і ми обовязково до вас передзвонимо</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-inner">
            <input type="text" placeholder="Імя" name="name" ref={register} />
            <input
              type="text"
              placeholder="Номер  телефона"
              name="phone"
              ref={register}
            />

            {/* <Link to='/thanks'> */}
            <input className="button" type="submit" onClick={onClickOrder} />
            {/* </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
