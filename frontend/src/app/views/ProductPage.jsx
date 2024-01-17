import { ProductInformation } from "../components/ProductInformation";
import { ProductSection } from "../components/ProductSection";
import { ReviewSection } from "../components/ReviewSection";

export function ProductPage() {
  return (
    <>
      <ProductInformation />
      <ReviewSection />
      <ProductSection />
    </>
  );
}
