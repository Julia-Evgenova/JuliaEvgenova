const renderCatalog = () => {
    const cars = [
        {
            brand: "BMW",
            model: "x5",
            color: "#c64e4e",
            imgUrl: "img/bmw.jpg",
            price: "100000",
            year: "1992"
        },
        {
            brand: "Audi",
            model: "q5",
            color: "#33d7d4",
            imgUrl: "img/audi.jpg",
            price: "100000",
            year: "1995"
        }
    ];

    const render = (data) => {
        const carsHtml = data.map(car => {
            return `
            <div class="card" style="width: 18rem;">
                <img src="${car.imgUrl}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${car.brand} ${car.model}</h5>
                    <div class="car-color" style="background-color: ${car.color};"></div>
                    <p class="card-text car-price">price: ${car.price}$</p>
                    <p class="card-text car-year">year: ${car.year}</p>
                    <p class="card-text car-transmission">transmission: variator</p>
                    <a href="#" class="btn btn-primary">Buy</a>
                </div>
            </div>
            `
        })

        return carsHtml;
    }

    return render(cars);
};