# Sweet Case — Telegram Notification System

**Sweet Case** — це веб-додаток для збору інформації про замовлення та надсилання сповіщень користувачам через Telegram-бота.

Проєкт створений як **pet-project** для практики розробки backend-сервісів, контейнеризації та розгортання додатків у Linux середовищі.

⚠️ Проєкт перебуває на початковій стадії розробки, тому деякі функції ще можуть бути не реалізовані.

---

## Technologies

- **Backend:** FastAPI (Python)
- **Frontend:** React
- **Database:** PostgreSQL
- **Infrastructure:** Docker, Docker Compose
- **Reverse Proxy:** Nginx
- **Messaging:** Telegram Bot API

---

## Features

- надсилання сповіщень через Telegram-бота  
- веб-інтерфейс для керування замовленнями  
- збереження історії замовлень у PostgreSQL  
- повна контейнеризація сервісів за допомогою Docker  
- запуск усіх компонентів через Docker Compose  

---

## Project Structure

```
sweet-case
│
├── backend/          # FastAPI backend
├── frontend/         # React frontend
├── nginx.conf        # reverse proxy configuration
├── docker-compose.yml
├── uploads/
└── README.md
```

---

## Quick Start

### 1. Clone repository

```bash
git clone https://github.com/AnatoliiRomaniuk/sweet-case.git
cd sweet-case
```

### 2. Configure environment variables

Створіть файл `.env` на основі прикладу:

```bash
cp .env.example .env
```

Додайте необхідні значення змінних, зокрема для Telegram-бота.

### 3. Run containers

```bash
docker compose up -d --build
```

---

## Access

Після запуску сервіс буде доступний:

Frontend  
```
http://localhost:5173
```

API documentation (FastAPI Swagger)  
```
http://localhost:8000/docs
```

---

## Purpose of the project

Цей проєкт створений для практики:

- Linux-адміністрування  
- контейнеризації з Docker  
- роботи з FastAPI  
- інтеграції PostgreSQL  
- розгортання веб-сервісів

