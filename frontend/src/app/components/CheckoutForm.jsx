// "use client";

export function CheckoutForm({ setUserData }) {
  const handleChange = (name, value) => {
    if (["name", "address", "city", "zip_code", "email"].includes(name)) {
      // Aktualizacja zagnieżdżonego obiektu address dla określonych pól
      setUserData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      // Aktualizacja innych pól na najwyższym poziomie w userData
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="rounded-lg bg-light px-6 py-4 text-dark">
      <form method="POST">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h4 className="font-black">Twoje dane</h4>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="name">Imię i nazwisko</label>
              </div>
              <input
                className="rounded-xl border border-dark px-4 py-2"
                type="text"
                name="name"
                id="name"
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="name">Adres email</label>
              </div>
              <input
                className="rounded-xl border border-dark px-4 py-2"
                type="email"
                name="email"
                id="email"
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="addres">Adres</label>
              </div>
              <input
                className="rounded-xl border border-dark px-4 py-2"
                type="text"
                name="address"
                id="address"
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="city">Miasto</label>
              </div>
              <input
                className="rounded-xl border border-dark px-4 py-2"
                type="text"
                name="city"
                id="city"
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="code">Kod pocztowy</label>
              </div>
              <input
                className="rounded-xl border border-dark px-4 py-2"
                type="text"
                name="zip_code"
                id="code"
                onChange={(e) => handleChange("zip_code", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="font-black">Forma dostawy</h4>
            <div className="flex gap-2">
              <input
                className="rounded-xl border border-dark px-4 py-2"
                type="radio"
                name="delivery_method"
                id="post"
                value="poczta"
                onChange={(e) =>
                  handleChange("delivery_method", e.target.value)
                }
              />
              <div>
                <label htmlFor="post">Poczta polska</label>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                className="rounded-xl border border-dark px-4 py-2"
                type="radio"
                name="delivery_method"
                id="inpost"
                value="inpost"
                onChange={(e) =>
                  handleChange("delivery_method", e.target.value)
                }
              />
              <div>
                <label htmlFor="inpost">Inpost</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="font-black">Forma płatności</h4>
            <div className="flex gap-2">
              <input
                className="rounded-xl border border-dark px-4 py-2"
                type="radio"
                name="payment_method"
                id="card"
                value="card"
                onChange={(e) => handleChange("payment_method", e.target.value)}
              />
              <div>
                <label htmlFor="card">Karta</label>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                className="rounded-xl border border-dark px-4 py-2"
                type="radio"
                name="payment_method"
                id="paypal"
                value="paypal"
                onChange={(e) => handleChange("payment_method", e.target.value)}
              />
              <div>
                <label htmlFor="paypal">PayPal</label>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                className="rounded-xl border border-dark px-4 py-2"
                type="radio"
                name="payment_method"
                id="blik"
                value="blik"
                onChange={(e) => handleChange("payment_method", e.target.value)}
              />
              <div>
                <label htmlFor="blik">Blik</label>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                className="rounded-xl border border-dark px-4 py-2"
                type="radio"
                name="payment_method"
                id="przelewy"
                value="p24"
                onChange={(e) => handleChange("payment_method", e.target.value)}
              />
              <div>
                <label htmlFor="przelewy">Przelewy 24</label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
