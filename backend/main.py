from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
from psycopg2.extensions import connection
import os
import time

app = FastAPI()

# Дозволяємо фронтенду (8080) спілкуватися з бекендом (8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_URL = os.getenv("DATABASE_URL")

def connect_to_db() -> connection:
    while True:
        try:
            conn = psycopg2.connect(DB_URL)
            return conn
        except Exception as e:
            print(f"Database not ready... error: {e}")
            time.sleep(2)

class OrderCreate(BaseModel):
    customer_name: str
    cake_type: str
    weight: float

# ГОЛОВНИЙ ШЛЯХ ДЛЯ ВАШОЇ ФОРМИ
@app.post("/submit_order")
def submit_order(order: OrderCreate):
    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO orders (customer_name, cake_type, weight) VALUES (%s, %s, %s) RETURNING id;",
        (order.customer_name, order.cake_type, order.weight)
    )
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return {"status": "success", "order_id": new_id, "message": "Дякуємо! Замовлення прийнято."}

# Функція створення таблиці (викликається при старті)
def create_tables():
    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            customer_name VARCHAR(100),
            cake_type VARCHAR(100),
            weight REAL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    conn.commit()
    cur.close()
    conn.close()

create_tables()