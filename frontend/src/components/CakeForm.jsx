import { useState, useEffect } from 'react';
import './CakeForm.scss';

export default function CakeForm() {
  const [order, setOrder] = useState({
    customer_name: '',
    phone: '',
    cake_type: 'Наполеон',
    weight: 1,
    delivery_method: 'самовивіз',
    details: { coating: 'Крем', filling: 'Снікерс', city: '', office: '' }
  });

  const [price, setPrice] = useState(400);

  // Авто-рахунок ціни
  useEffect(() => {
    const prices = { 'Наполеон': 400, 'Бісквіт': 500, 'Медовик': 450 };
    setPrice(prices[order.cake_type] * order.weight);
  }, [order.cake_type, order.weight]);

  return (
    <div className="app-wrapper">
      <div className="card-container">
        <h2 className="title">🍰 Sweet Case</h2>
        
        <div className="row">
          <input placeholder="Ім'я" className="input-field" 
            onChange={e => setOrder({...order, customer_name: e.target.value})} />
          <input placeholder="Телефон" className="input-field" 
            onChange={e => setOrder({...order, phone: e.target.value})} />
        </div>

        <div className="row">
          <select className="input-field" onChange={e => setOrder({...order, cake_type: e.target.value})}>
            <option value="Наполеон">Наполеон</option>
            <option value="Бісквіт">Бісквіт</option>
          </select>
          <input type="number" step="0.5" className="input-field" value={order.weight}
            onChange={e => setOrder({...order, weight: parseFloat(e.target.value) || 0})} />
        </div>

        {/* Начинка ТІЛЬКИ для бісквіта */}
        {order.cake_type === 'Бісквіт' && (
          <div className="row">
            <select className="input-field" style={{gridColumn: 'span 2'}}>
              <option value="Снікерс">Начинка: Снікерс</option>
              <option value="Груша">Начинка: Груша-карамель</option>
            </select>
          </div>
        )}

        <select className="input-field" style={{marginTop: '10px'}} 
          onChange={e => setOrder({...order, delivery_method: e.target.value})}>
          <option value="самовивіз">Самовивіз</option>
          <option value="nova_poshta">Нова Пошта</option>
        </select>

        {/* Поля НОВОЇ ПОШТИ з'являються динамічно */}
        {order.delivery_method === 'nova_poshta' && (
          <div className="row" style={{marginTop: '10px'}}>
            <input placeholder="Місто" className="input-field" 
              onChange={e => setOrder({...order, details: {...order.details, city: e.target.value}})} />
            <input placeholder="Відділення №" className="input-field" 
              onChange={e => setOrder({...order, details: {...order.details, office: e.target.value}})} />
          </div>
        )}

        <div className="price-box">Вартість: {price} грн</div>
        <button className="submit-btn" onClick={() => console.log(order)}>Замовити</button>
      </div>
    </div>
  );
}