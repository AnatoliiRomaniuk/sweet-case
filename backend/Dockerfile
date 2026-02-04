FROM python:3.11-slim

WORKDIR /app

# Встановлюємо FastAPI та сервер Uvicorn прямо тут
RUN pip install --no-cache-dir fastapi uvicorn psycopg2-binary

# Копіюємо код (хоча через volumes він і так буде)
COPY . .

# Запускаємо сервер
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]