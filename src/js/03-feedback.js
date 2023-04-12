import throttle from "lodash/throttle";                                // імпортуємо функцію throttle з бібліотеки lodash

const feedbackForm = document.querySelector(".feedback-form");         // посилання на форму
const email = document.querySelector('input[name="email"]')            // посилання на input (поле введення Email) 
const message = document.querySelector('textarea[name="message"]');    // посилання на textarea (поле введення Message) 
const LOCALSTORAGE_KEY = "feedback-form-state";                        // змінна, яка сберігає назву ключа у локальному сховищі
const inputFormData = {email : "", message : "",};                     // об'єкт, в якому будемо сберігати дані, введені в формі

try {
    // перевіряємо на старті поля локального сховища, та якщо вони не порожні заповнюємо ними форму
    const parsedStorageData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    if (parsedStorageData){
        email.value =  parsedStorageData.email;
        message.value = parsedStorageData.message;
    }

    // Вішаємо слухач на форму, який відстежуватиме подію "input" кожні 500 міліхвл 
    feedbackForm.addEventListener("input", throttle(onInput, 500));
    function onInput(event){
        inputFormData.email = email.value.trim();
        inputFormData.message = message.value.trim();
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(inputFormData));
    }

    // Вішаємо слухач на форму, який відстежуватиме подію "submit", по якій будемо очищати локальне сховище та форму, 
    // і виводити у консоль об`єкт з полями {email, message}
    feedbackForm.addEventListener("submit", onSubmit);
    function onSubmit(event){
        event.preventDefault();
        localStorage.removeItem(LOCALSTORAGE_KEY);
        email.value = "";
        message.value = "";
        console.dir("event.turget = ",event.turget);
        //console.dir(inputFormData); 
    }

} catch (error) {
    console.log(error.name); 
    console.log(error.message);
}
