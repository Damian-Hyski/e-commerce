import { PaymentStatusSection } from "@/app/views/PaymentStatusSection";


export default function PaymentCanceled() {
    return <PaymentStatusSection paymentStatus={false} />;
}
