import Image from "next/image";
import Ellipse from "/public/Ellipse.svg";
import Star from "/public/Star.svg";

export function ReviewSection() {
  return (
    <div className="container-fluid bg-light">
      <div className="container mx-auto flex flex-col gap-8 pb-8 pt-32">
        <h3 className="text-4xl font-black uppercase text-dark">Recenzje</h3>
        <div className="relative w-2/3 after:absolute after:bottom-0 after:top-0 after:block after:w-2 after:bg-custom-gradient after:content-['']">
          <div className="flex flex-col gap-4 pl-6">
            <div className="flex gap-6">
              <Image src={Ellipse} className="h-12 w-12" />
              <div className="">
                <p className="font-bold uppercase">Jane Cooper</p>
                <div className="flex">
                  <Image src={Star} className="h-6 w-6" />
                  <Image src={Star} className="h-6 w-6" />
                  <Image src={Star} className="h-6 w-6" />
                  <Image src={Star} className="h-6 w-6" />
                  <Image src={Star} className="h-6 w-6" />
                </div>
              </div>
            </div>
            <div className="">
              <p className="uppercase">
                Lorem ipsum dolor sit amet consectetur. In eget enim arcu
                viverra cras sed sagittis lorem. Ac bibendum est magnis velit
                sagittis. Lectus mi velit ultricies faucibus tempor. Amet purus
                aliquam et semper tortor. Quam sagittis diam netus massa. Hac
                lacus felis viverra id quis nunc sit.
              </p>
            </div>
          </div>
        </div>

        <div className="relative after:absolute after:bottom-0 after:top-0 after:block after:w-2 after:bg-custom-gradient after:content-[''] flex justify-end">
          <div className="flex flex-col gap-4 px-6 w-2/3">
            <div className="flex gap-6 justify-end">
              <Image src={Ellipse} className="h-12 w-12" />
              <div className="">
                <p className="font-bold uppercase">Jane Cooper</p>
                <div className="flex">
                  <Image src={Star} className="h-6 w-6" />
                  <Image src={Star} className="h-6 w-6" />
                  <Image src={Star} className="h-6 w-6" />
                  <Image src={Star} className="h-6 w-6" />
                  <Image src={Star} className="h-6 w-6" />
                </div>
              </div>
            </div>
            <div className="">
              <p className="uppercase">
                Lorem ipsum dolor sit amet consectetur. In eget enim arcu
                viverra cras sed sagittis lorem. Ac bibendum est magnis velit
                sagittis. Lectus mi velit ultricies faucibus tempor. Amet purus
                aliquam et semper tortor. Quam sagittis diam netus massa. Hac
                lacus felis viverra id quis nunc sit.
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-2/3 after:absolute after:bottom-0 after:top-0 after:block after:w-2 after:bg-custom-gradient after:content-['']">
          <div className="flex flex-col gap-4 pl-6">
            <div className="flex gap-6">
              <Image src={Ellipse} className="h-12 w-12" />
              <div className="">
                <p className="font-bold uppercase">Jane Cooper</p>
                <div className="flex">
                  <Image src={Star} className="h-6 w-6" />
                  <Image src={Star} className="h-6 w-6" />
                  <Image src={Star} className="h-6 w-6" />
                  <Image src={Star} className="h-6 w-6" />
                  <Image src={Star} className="h-6 w-6" />
                </div>
              </div>
            </div>
            <div className="">
              <p className="uppercase">
                Lorem ipsum dolor sit amet consectetur. In eget enim arcu
                viverra cras sed sagittis lorem. Ac bibendum est magnis velit
                sagittis. Lectus mi velit ultricies faucibus tempor. Amet purus
                aliquam et semper tortor. Quam sagittis diam netus massa. Hac
                lacus felis viverra id quis nunc sit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
