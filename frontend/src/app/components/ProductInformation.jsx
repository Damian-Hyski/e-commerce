import Image from "next/image";
import BookCover from "/public/BookCover.png";
import Star from "/public/Star.svg";

export function ProductInformation() {
  return (
    <div className="container-fluid h-screen bg-custom-gradient p-3 pb-8 pt-24">
      <div className="container mx-auto">
        <div className="flex w-full">
          <div className="w-full">
            <Image src={BookCover} alt="Book Cover" className="-ml-10 -mt-6 w-[90%]" />
          </div>
          <div className="flex w-full flex-col uppercase leading-4 text-light justify-between">
            <div className="flex w-full flex-col gap-3 uppercase leading-4 text-light">
              <div className="flex gap-3">
                <Image src={Star} />
                <Image src={Star} />
                <Image src={Star} />
                <Image src={Star} />
                <Image src={Star} />
              </div>
              <div className="text-4xl font-black">
                <h2>Title Lorem ipsum</h2>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Autor:</p>
                <p>Rogelio Lesch</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Wydawca:</p>
                <p>O'Kon - Feest</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Rok wydania:</p>
                <p>2023</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Strony:</p>
                <p>999</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Oprawa:</p>
                <p>miękka</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Data premiery:</p>
                <p>24 Grudnia 2023</p>
              </div>
              <div className="flex w-full justify-between border-b">
                <p className="font-bold">Dostępne:</p>
                <p>200 sztuk</p>
              </div>
              <div className="flex w-full flex-col gap-2">
                <p className="font-bold">Opis:</p>
                <p className="font-light">
                  Lorem ipsum dolor sit amet consectetur. Amet amet et fringilla
                  ut sed odio eget. Interdum netus ut turpis sed duis
                  scelerisque quam amet accumsan. Ac aliquet eleifend dui
                  molestie in accumsan vel euismod. Mi sed ornare dolor lacus
                  platea pellentesque bibendum tincidunt ac. Elit cras nulla a
                  nibh leo tincidunt vitae sollicitudin arcu. Commodo neque
                  turpis accumsan ut sodales dolor tempor. In consequat blandit
                  dictum eget non. Lacus magnis ut nunc amet eget risus duis
                  platea ac. At sed fringilla nunc aliquet quam. Egestas sit
                  convallis aliquet id aliquam magnis platea risus. Fringilla
                  tincidunt ipsum sed rhoncus pulvinar nibh amet ullamcorper
                  sit. Vulputate suscipit rhoncus blandit aliquet amet nisl
                  malesuada tincidunt. Ac morbi sociis tempus sem dictumst. Et
                  nulla eros libero ullamcorper vitae morbi. Ut quis sapien id
                  consequat gravida.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 items-end mb-16">
              <div className="flex items-end gap-8">
                <p className="line-through">25.99 zł</p>
                <p className="text-4xl leading-8">21.81 zł</p>
              </div>
              <div className="">
                <button className="py-4 px-8 border-2 rounded-3xl w-[325px]">Dodaj do koszyka</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <Image src={BookCover} alt="Book Cover" className=" -ml-10 -mt-6"/> */
}
