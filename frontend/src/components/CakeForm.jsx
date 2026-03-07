import { useState, useEffect } from 'react';
import './CakeForm.scss';

export default function CakeForm() {
  const [order, setOrder] = useState({
    customer_name: '',
    phone: '',
    cake_type: 'Наполеон',
    weight: 1,
    delivery_method: 'самовивіз',
    details: {
      coating: 'Крем',
      filling: 'Снікерс',
      city: '',
      office: '',
    },
  });

  const [price, setPrice] = useState(400);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const prices = { 'Наполеон': 400, 'Бісквіт': 500, 'Медовик': 450 };
    setPrice((prices[order.cake_type] || 0) * order.weight);
  }, [order.cake_type, order.weight]);

  const handleSubmit = async () => {
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/submit_order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error('Не вдалося відправити замовлення');
      }

      const data = await response.json();
      setMessage(data.message || 'Замовлення успішно відправлено!');

      setOrder({
        customer_name: '',
        phone: '',
        cake_type: 'Наполеон',
        weight: 1,
        delivery_method: 'самовивіз',
        details: {
          coating: 'Крем',
          filling: 'Снікерс',
          city: '',
          office: '',
        },
      });
    } catch (error) {
      setMessage(error.message || 'Сталася помилка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="card-container">
        <h2 className="title">🍰 Sweet Case</h2>

        <div className="row">
          <input
            placeholder="Ім'я"
            className="input-field"
            value={order.customer_name}
            onChange={(e) =>
              setOrder({ ...order, customer_name: e.target.value })
            }
          />
          <input
            placeholder="Телефон"
            className="input-field"
            value={order.phone}
            onChange={(e) => setOrder({ ...order, phone: e.target.value })}
          />
        </div>

        <div className="row">
          <select
            className="input-field"
            value={order.cake_type}
            onChange={(e) =>
              setOrder({ ...order, cake_type: e.target.value })
            }
          >
            <option value="Наполеон">Наполеон</option>
            <option value="Бісквіт">Бісквіт</option>
            <option value="Медовик">Медовик</option>
          </select>

          <input
            type="number"
            step="0.5"
            className="input-field"
            value={order.weight}
            onChange={(e) =>
              setOrder({
                ...order,
                weight: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>

        {order.cake_type === 'Бісквіт' && (
          <div className="row">
            <select
              className="input-field"
              style={{ gridColumn: 'span 2' }}
              value={order.details.filling}
              onChange={(e) =>
                setOrder({
                  ...order,
                  details: {
                    ...order.details,
                    filling: e.target.value,
                  },
                })
              }
            >
              <option value="Снікерс">Начинка: Снікерс</option>
              <option value="Груша">Начинка: Груша-карамель</option>
            </select>
          </div>
        )}

        <select
          className="input-field"
          style={{ marginTop: '10px' }}
          value={order.delivery_method}
          onChange={(e) =>
            setOrder({ ...order, delivery_method: e.target.value })
          }
        >
          <option value="самовивіз">Самовивіз</option>
          <option value="nova_poshta">Нова Пошта</option>
        </select>

        {order.delivery_method === 'nova_poshta' && (
          <div className="row" style={{ marginTop: '10px' }}>
            <input
              placeholder="Місто"
              className="input-field"
              value={order.details.city}
              onChange={(e) =>
                setOrder({
                  ...order,
                  details: { ...order.details, city: e.target.value },
                })
              }
            />
            <input
              placeholder="Відділення №"
              className="input-field"
              value={order.details.office}
              onChange={(e) =>
                setOrder({
                  ...order,
                  details: { ...order.details, office: e.target.value },
                })
              }
            />
          </div>
        )}

        <div className="price-box">Вартість: {price} грн</div>

        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Відправка...' : 'Замовити'}
        </button>

        {message && (
          <p style={{ marginTop: '12px', textAlign: 'center' }}>{message}</p>
        )}
      </div>
    </div>
  );
}