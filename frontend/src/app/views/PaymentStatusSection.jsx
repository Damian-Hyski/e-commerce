import Link from "next/link";

const paymentSuccess = [
  "Twoje Zamówienie zostało opłacone i przekazane do realizacji!",
  "Dziękujemy",
];

const paymentCanceled = "Twoje zamówienie nie zostało opłacone!";

export function PaymentStatusSection({ paymentStatus }) {

  return (
    <div className="min-h-screen bg-custom-gradient">
      <div className="container mx-auto flex h-screen flex-col items-center justify-center">
        <div className="flex w-3/5 flex-col items-center justify-center gap-20 text-3xl uppercase text-light">
          {paymentStatus ? (
            <>
              <p className="text-center">{paymentSuccess[0]}</p>
              <p>{paymentSuccess[1]}</p>
            </>
          ) : (
            <p>{paymentCanceled}</p>
          )}
          <Link href="" className="rounded-lg border-2 px-4 py-2 text-lg">
            Zobacz swoje zamówienia
          </Link>
        </div>
      </div>
    </div>
  );
}
