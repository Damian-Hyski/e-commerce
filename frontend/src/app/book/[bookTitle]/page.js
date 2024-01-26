import { ProductInformation } from "@/app/components/ProductInformation";
import { ProductSection } from "@/app/components/ProductSection";
import { ReviewSection } from "@/app/components/ReviewSection";

export default function BookDetail() {
    return (
        <>
            <ProductInformation />
            <ReviewSection />
            <ProductSection />
        </>
    );
}
