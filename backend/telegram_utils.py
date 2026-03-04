import os
import requests

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

def send_telegram_msg(order_data: dict):
    if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
        print("Telegram credentials not found!")
        return

    # Витягуємо основні дані
    customer = order_data.get("customer_name", "Невідомо")
    phone = order_data.get("phone", "Не вказано")
    cake = order_data.get("cake_type", "Не вказано")
    weight = order_data.get("weight", 0)
    delivery = order_data.get("delivery_method", "Самовивіз")
    details = order_data.get("details", {})

    # Словник для гарного перекладу технічних ключів
    labels = {
        "biscuit_type": "🧁 Тип бісквіта",
        "filling": "🍓 Начинка",
        "coating": "🍫 Покриття",
        "city": "🏙️ Місто",
        "office": "📦 Відділення №",
        "address": "🏠 Адреса"
    }

    # Формуємо заголовок та основну інфо
    text = (
        f"🔔 *НОВЕ ЗАМОВЛЕННЯ!*\n"
        f"━━━━━━━━━━━━━━━\n"
        f"👤 *Клієнт:* {customer}\n"
        f"📞 *Тел:* `{phone}`\n"
        f"🎂 *Торт:* {cake}\n"
        f"⚖️ *Вага:* {weight} кг\n"
        f"🚚 *Доставка:* {delivery}\n"
    )

    # Додаємо деталі, якщо вони є
    if details:
        text += "━━━━━━━━━━━━━━━\n"
        for key, value in details.items():
            if value: # Додаємо тільки якщо поле не порожнє
                label = labels.get(key, key.replace("_", " ").capitalize())
                text += f"{label}: {value}\n"
    
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID, 
        "text": text, 
        "parse_mode": "Markdown"
    }
    
    try:
        response = requests.post(url, json=payload, timeout=5)
        response.raise_for_status()
    except Exception as e:
        print(f"Telegram error: {e}")