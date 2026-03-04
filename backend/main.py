from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from database import create_tables, save_order
from telegram_utils import send_telegram_msg
from typing import Dict, Any, Optional


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
    customer_name: str
    phone: str
    cake_type: str
    weight: float
    delivery_method: str
    details: Dict[str, Any] = {}

@app.post("/submit_order")
async def handle_order(order: OrderCreate):
    order_dict = order.model_dump()
    send_telegram_msg(order_dict)
    
    # Отримуємо ID, який повернула база
    order_id = save_order(order_dict)
    
    # Додаємо ID до словника, щоб він теж пішов у Телеграм (за бажанням)
    order_dict["id"] = order_id
    
    send_telegram_msg(order_dict)
    
    return {"message": "Замовлення отримано!", "order_id": order_id}