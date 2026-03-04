from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from database import create_tables, save_order
from telegram_utils import send_telegram_msg



app = FastAPI()


# Дозволяємо фронтенду (8080) спілкуватися з бекендом (8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()

class OrderCreate(BaseModel):
    customer_name: str = Field(..., min_length=2)
    cake_type : str
    weight : float = Field(..., gt=0)

@app.post("/submit_order")
def submit_order(order: OrderCreate):
    try:
        # Використовуємо функції з інших файлів
        new_id = save_order(order.customer_name, order.cake_type, order.weight)
        send_telegram_msg(order.customer_name, order.cake_type, order.weight)

        return {
            "status": "success", 
            "order_id": new_id, 
            "message": "Дякуємо! Замовлення прийнято."
        }
    except Exception as e:
        print(f"General error: {e}")
        return {"status": "error", "message": "Щось пішло не так"}