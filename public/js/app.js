console.log("Halo Express!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault(); //Menghilangkan perilaku default dari form yakni merefresh page otomatis

    const address = search.value;
    message1.textContent = "Loading...";
    message2.textContent = "";

    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return (message1.textContent = data.error);
            }

            message1.textContent = data.location;
            message2.textContent = data.forecast;
        });
    });
});
