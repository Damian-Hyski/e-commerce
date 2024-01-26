"use client";
import { useState } from "react";

export function CheckoutForm() {
    const [nameValue, setNameValue] = useState("");
    const [addresValue, setAddresValue] = useState("");
    const [cityValue, setCityValue] = useState("");
    const [codeValue, setCodeValue] = useState("");

    return (
        <div className="bg-light rounded-lg text-dark px-6 py-4">
            <form method="POST">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-6">
                        <h4 className="font-black">Twoje dane</h4>
                        <div className="flex flex-col gap-2">
                            <div>
                                <label htmlFor="name">Imię i nazwisko</label>
                            </div>
                            <input
                                className="border border-dark rounded-xl px-4 py-2"
                                type="text"
                                name="name"
                                id="name"
                                value={nameValue}
                                onChange={(e) => {
                                    setNameValue(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>
                                <label htmlFor="addres">Adres</label>
                            </div>
                            <input
                                className="border border-dark rounded-xl px-4 py-2"
                                type="text"
                                name="addres"
                                id="addres"
                                value={addresValue}
                                onChange={(e) => {
                                    setAddresValue(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>
                                <label htmlFor="city">Miasto</label>
                            </div>
                            <input
                                className="border border-dark rounded-xl px-4 py-2"
                                type="text"
                                name="city"
                                id="city"
                                value={cityValue}
                                onChange={(e) => {
                                    setCityValue(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>
                                <label htmlFor="code">Kod pocztowy</label>
                            </div>
                            <input
                                className="border border-dark rounded-xl px-4 py-2"
                                type="text"
                                name="code"
                                id="code"
                                value={codeValue}
                                onChange={(e) => {
                                    setCodeValue(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h4 className="font-black">Forma dostawy</h4>
                        <div className="flex gap-2">
                            <input
                                className="border border-dark rounded-xl px-4 py-2"
                                type="radio"
                                name="post"
                                id="post"
                            />
                            <div>
                                <label htmlFor="post">Poczta polska</label>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="border border-dark rounded-xl px-4 py-2"
                                type="radio"
                                name="post"
                                id="inpost"
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
                                className="border border-dark rounded-xl px-4 py-2"
                                type="radio"
                                name="payment"
                                id="card"
                            />
                            <div>
                                <label htmlFor="card">Karta</label>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="border border-dark rounded-xl px-4 py-2"
                                type="radio"
                                name="payment"
                                id="paypal"
                            />
                            <div>
                                <label htmlFor="paypal">PayPal</label>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="border border-dark rounded-xl px-4 py-2"
                                type="radio"
                                name="payment"
                                id="blik"
                            />
                            <div>
                                <label htmlFor="blik">Blik</label>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="border border-dark rounded-xl px-4 py-2"
                                type="radio"
                                name="payment"
                                id="przelewy"
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
