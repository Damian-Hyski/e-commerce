import Image from "next/image";
import herobooks from "/public/herobooks.png";

export function Hero() {
  return (
    <>
      <div className="container-fluid h-screen overflow-hidden bg-custom-gradient p-3">
        <div className="container mx-auto grid grid-cols-12 gap-8">
          <div className="col-start-1 col-end-5 flex flex-col gap-16 py-32 uppercase text-light">
            <h2 className="text-4xl font-black leading-[36px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </h2>
            <button className="rounded-3xl border-2 border-solid border-light py-4 text-[21px] uppercase leading-[21px]">
              Ut enim ad minima
            </button>
          </div>
          <div className="col-start-6 col-end-13">
            <Image
              src={herobooks}
              alt="Hero Books"
              priority
              className="max-w-[150%] -translate-y-[15%] transform"
            />
          </div>
        </div>
      </div>
    </>
  );
}
