import Link from "next/link";

const paymentSuccess = [
    "Twoje Zamówienie zostało opłacone i przekazane do realizacji!",
    "Dziękujemy",
];

const paymentCanceled = "Twoje zamówienie nie zostało opłacone!";

export function PaymentStatusSection({paymentStatus}) {
    return (
        <div className="min-h-screen bg-custom-gradient">
            <div className="container h-screen mx-auto flex flex-col justify-center items-center">
                <div className="w-3/5 flex flex-col gap-20 text-light uppercase text-3xl justify-center items-center">
                    {paymentStatus ? (
                        <>
                            <p className="text-center">{paymentSuccess[0]}</p>
                            <p>{paymentSuccess[1]}</p>
                        </>
                    ) : (
                        <p>{paymentCanceled}</p>
                    )}
                    <Link
                        href=""
                        className="border-2 px-4 py-2 rounded-lg text-lg"
                    >
                        Zobacz swoje zamówienia
                    </Link>
                </div>
            </div>
        </div>
    );
}
