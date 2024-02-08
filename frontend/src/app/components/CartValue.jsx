import Link from "next/link";
import { API_URL } from "../helpers/config";
import { useCsrfToken } from "../contexts/CsrfTokenContext";
import { useUserData } from "../contexts/UserDataContext";
import { useAlert } from "../contexts/AlertContext";

export function CartValue({ totalPrice, checkput = false, userData }) {
  const { csrfToken } = useCsrfToken();
  const { userStatus } = useUserData();
  const { showAlert } = useAlert();
  const orderData = { ...userData, totalPrice };

  const redirectToCheckout = async () => {
    try {
      const response = await fetch(`${API_URL}/create-order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const session = await response.json();
        if (session.url) {
          window.location.href = session.url;
        } else {
          console.error(
            "Nie można przekierować do Stripe Checkout:",
            session.error,
          );
        }
      } else {
        console.error("Błąd realizacji zamówienia:", await response.text());
        showAlert("Realizacja zamówienia nie powiodła się", "error");
      }
    } catch (error) {
      console.error("Błąd sieci: ", error);
      showAlert("Błąd serwera", "error");
    }
  };

  return (
    <div className="rounded-lg bg-light px-6 py-4 text-dark">
      <h3 className="text-xl font-black">Wartość koszyka</h3>
      <div className="mt-8 flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            <p>Wszystkie książki</p>
            <p className="lowercase">{totalPrice} zł</p>
          </div>
          <div className="flex justify-between">
            <p>Dostawa</p>
            <p className="lowercase">10 zł</p>
          </div>
        </div>
        <div className="flex justify-between border-t-2 py-2">
          <p>Razem</p>
          <p className="lowercase">{totalPrice + 10} zł</p>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        {userStatus ? (
          !checkput ? (
            <Link href="/checkout" className="rounded-3xl border-2 px-4 py-2">
              Do kasy
            </Link>
          ) : (
            <button
              onClick={redirectToCheckout}
              className="rounded-3xl border-2 px-4 py-2"
            >
              Zapłać
            </button>
          )
        ) : (
          <Link href="/sign-in" className="rounded-3xl border-2 px-4 py-2">
            Zaloguj się
          </Link>
        )}
      </div>
    </div>
  );
}
