import psycopg2
import os
import time
from psycopg2.extensions import connection
import json

def connect_to_db() -> connection:
    while True:
        try:
            db_url = os.getenv("DATABASE_URL")
            conn = psycopg2.connect(db_url)
            return conn
        except Exception as e:
            print(f"Database not ready... error: {e}")
            time.sleep(2)

def create_tables():
    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            customer_name VARCHAR(100),
            phone VARCHAR(20),
            cake_type VARCHAR(100),
            weight REAL,
            delivery_method VARCHAR(50),
            details JSONB,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    conn.commit()
    cur.close()
    conn.close()

def save_order(order_data: dict):
    conn = connect_to_db()
    cur = conn.cursor()
    try:
        cur.execute(
            """
            INSERT INTO orders (
                customer_name,
                phone,
                cake_type,
                weight,
                delivery_method,
                details
            )
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (
                order_data["customer_name"],
                order_data["phone"],
                order_data["cake_type"],
                order_data["weight"],
                order_data["delivery_method"],
                json.dumps(order_data["details"])
            )
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        return new_id
    finally:
        cur.close()
        conn.close()