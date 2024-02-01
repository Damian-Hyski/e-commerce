import { BooksSection } from "@/app/views/BooksSection";
import { BookInformation } from "@/app/views/BookInformation";
import { Reviews } from "@/app/views/Reviews";
import { AddReviewProvider } from "@/app/contexts/AddReviewContext";

export default function BookDetail({ params }) {
  return (
    <>
      <BookInformation bookTitle={params.bookTitle} />
      <AddReviewProvider>
        <Reviews bookTitle={params.bookTitle} />
      </AddReviewProvider>
      <BooksSection />
    </>
  );
}
