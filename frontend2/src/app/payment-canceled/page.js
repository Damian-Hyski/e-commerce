import { PaymentStatusSection } from "../components/PaymentStatusSection";

export default function PaymentCanceled() {
    return <PaymentStatusSection paymentStatus={false} />;
}
