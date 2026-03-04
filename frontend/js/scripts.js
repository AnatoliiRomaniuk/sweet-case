const prices = { "Наполеон": 500, "Медовик": 450, "Бісквіт": 600 };

function updateForm() {
    const cakeType = document.getElementById('cake').value;
    const biscuitSection = document.getElementById('biscuit-section');

    // Показуємо весь блок бісквіта (де і тип, і начинка)
    if (cakeType === "Бісквіт") {
        biscuitSection.style.display = "flex";
    } else {
        biscuitSection.style.display = "none";
    }
    
    calculatePrice();
}

function toggleDeliveryFields() {
    const delivery = document.getElementById('delivery').value;
    const npSection = document.getElementById('np-section');
    const addressSection = document.getElementById('address-section');

    // Використовуємо "flex" замість "block", щоб працювали стилі вкладеності
    npSection.style.display = (delivery === "нова пошта") ? "flex" : "none";
    addressSection.style.display = (delivery === "адресна") ? "flex" : "none";
}

function calculatePrice() {
    const cakeType = document.getElementById('cake').value;
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    const total = (prices[cakeType] || 0) * weight;
    document.getElementById('total-price').innerText = total.toFixed(2);
}

function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    // Перевіряємо, чи видиме поле зараз (шукаємо найближчий видимий контейнер)
    const isVisible = field.offsetParent !== null;

    if (isVisible && !field.value.trim()) {
        field.classList.add('error');
        return false;
    } else {
        field.classList.remove('error');
        return true;
    }
}

async function sendOrder() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const cake = document.getElementById('cake').value;
    const weight = document.getElementById('weight').value;
    const delivery = document.getElementById('delivery').value;
    const coating = document.getElementById('coating').value;

    const data = {
        customer_name: name,
        phone: phone,
        cake_type: cake,
        weight: parseFloat(weight),
        delivery_method: delivery,
        details: {
            coating: coating // Покриття відправляємо завжди
        }
    };

    // Додаємо специфічні дані для Бісквіта
    if (cake === "Бісквіт") {
        data.details.biscuit_type = document.getElementById('biscuit-type').value;
        data.details.filling = document.getElementById('filling').value;
    }

    // Додаємо дані доставки
    if (delivery === "нова пошта") {
        data.details.city = document.getElementById('np-city').value;
        data.details.office = document.getElementById('np-office').value;
    } else if (delivery === "адресна") {
        data.details.address = document.getElementById('address').value;
    }

    console.log("Дані, що йдуть на сервер:", data);

    try {
        const response = await fetch('/submit_order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Замовлення успішно відправлено! 🎂");
        } else {
            const errorData = await response.json();
            console.error("Помилка валідації:", errorData);
            alert("Помилка! Перевір консоль (F12)");
        }
    } catch (error) {
        alert("Не вдалося з'єднатися з сервером.");
    }
}