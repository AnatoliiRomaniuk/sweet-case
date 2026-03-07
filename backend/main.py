from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any

from database import create_tables, save_order
from telegram_utils import send_telegram_msg

app = FastAPI()

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

    order_id = save_order(order_dict)
    order_dict["id"] = order_id

    send_telegram_msg(order_dict)

    return {"message": "Замовлення відправлено до кондитера!", "order_id": order_id}