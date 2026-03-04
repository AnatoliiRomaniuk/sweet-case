FROM python:3.11-slim
WORKDIR /app
# Копіюємо список залежностей
COPY requirements.txt .
# Встановлюємо ВСЕ, що є у файлі
RUN pip install --no-cache-dir -r requirements.txt
# Тільки потім копіюємо код
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--reload"]