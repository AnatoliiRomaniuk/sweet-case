import psycopg2
import os
import time
from psycopg2.extensions import connection

DB_URL = os.getenv("DATABASE_URL")

def connect_to_db() -> connection:
    while True:
        try:
            conn = psycopg2.connect(DB_URL)
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
            cake_type VARCHAR(100),
            weight REAL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    conn.commit()
    cur.close()
    conn.close()

def save_order(name, cake, weight):
    conn = connect_to_db()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO orders (customer_name, cake_type, weight) VALUES (%s, %s, %s) RETURNING id;",
            (name, cake, weight)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        return new_id
    finally:
        cur.close()
        conn.close()

