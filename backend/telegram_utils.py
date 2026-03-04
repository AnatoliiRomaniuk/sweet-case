import os
import requests

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

def send_telegram_msg(customer, cake, weight):
    if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
        return

    text = (
        f"🔔 **Нове замовлення!**\n"
        f"👤 Клієнт: {customer}\n"
        f"🎂 Торт: {cake}\n"
        f"⚖️ Вага: {weight} кг"
    )
    
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {"chat_id": TELEGRAM_CHAT_ID, "text": text, "parse_mode": "Markdown"}
    
    try:
        requests.post(url, json=payload, timeout=5)
    except Exception as e:
        print(f"Telegram error: {e}")