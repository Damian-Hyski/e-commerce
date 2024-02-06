import { BooksSection } from "@/app/views/BooksSection";
import { BookInformation } from "@/app/views/BookInformation";
import { Reviews } from "@/app/views/Reviews";
import { AddReviewProvider } from "@/app/contexts/AddReviewContext";

export default function BookDetail({ params }) {
  return (
    <>
      <BookInformation slug={params.slug} />
      <AddReviewProvider>
        <Reviews slug={params.slug} />
      </AddReviewProvider>
      <BooksSection />
    </>
  );
}
