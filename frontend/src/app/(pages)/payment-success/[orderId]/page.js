import { PaymentStatusSection } from "@/app/views/PaymentStatusSection";

export default function PaymentSuccess({ params }) {
  return <PaymentStatusSection paymentStatus={true} orderId={params.orderId}/>;
}
