import { BooksSection } from "@/app/views/BooksSection";
import { BookInformation } from "@/app/views/BookInformation";
import { Reviews } from "@/app/views/Reviews";

export default function BookDetail({ params }) {
  return (
    <>
      <BookInformation bookTitle={params.bookTitle} />
      <Reviews />
      <BooksSection />
    </>
  );
}
