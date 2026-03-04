import { useState } from 'react';
import './CakeForm.scss';

export default function CakeForm() {
  const [order, setOrder] = useState({
    customer_name: '',
    phone: '',
    cake_type: 'Бісквіт',
    weight: 1.5,
    delivery_method: 'Самовивіз',
    details: { coating: 'Шоколад' }
  });

  return (
    <div className="card">
      <h1 className="title">🎂 Замовити тортик</h1>
      <form className="form">
        <input 
          className="input"
          placeholder="Ваше ім'я"
          value={order.customer_name}
          onChange={(e) => setOrder({...order, customer_name: e.target.value})}
        />
        {/* Додамо решту полів пізніше */}
        <button className="button">Відправити замовлення</button>
      </form>
    </div>
  );
}