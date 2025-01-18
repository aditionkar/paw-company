"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <div className="relative bg-gradient-to-b from-[#B5C6FF] to-[#A39FFF]">
        <div className="relative w-full h-[260px] ">
          <div className="absolute top-0 left-0 h-[320px] w-full bg-[url('/clouds.svg')] bg-repeat-x bg-[length:1429px_365px] animate-marquee z-20" />
          <div className="relative z-10 flex justify-center items-center h-full">
            <h1 className="font-poppins text-[#370EA3] md:font-extrabold md:text-[100px] font-extrabold text-[50px] text-center px-5 mt-20">
              Paw Company
            </h1>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/cityscape.svg"
            alt="Cityscape Downtown"
            width={1400}
            height={1400 * (9 / 16)}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="bg-gradient-to-b from-[#A39FFF] via-[#B5C6FF] to-[#B5C6FF] min-h-screen flex flex-col items-center py-20 relative">
        <div className="bg-[#b1b7ff] md:w-[1000px] w-[350px] rounded-[80px] px-8 pt-12 pb-7 relative flex flex-col items-center">
          {/* Header Section */}
          <div className="text-center mb-12">
            <p className="font-poppins text-[20px] font-[500] text-[#7465FF] italic leading-[30px]">
              Care for your pet
            </p>
            <p className="font-poppins text-[40px] md:text-[64px] font-[600] text-[#370EA3] leading-[48px] md:leading-[96px]">
              What We Do
            </p>
          </div>

          {/* Boxes Wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
            {[
              {
                title: "Pet Grooming",
                description:
                  "Let us groom your pet and keep them looking great.",
              },
              {
                title: "Book Appointments",
                description:
                  "Schedule a visit anytime and get care for your pet.",
              },
              {
                title: "Diet Plan",
                description:
                  "Create the perfect meal plan to meet your pet's dietary needs.",
              },
              {
                title: "Track Symptoms",
                description:
                  "Monitor symptoms regularly to ensure your pet stays healthy.",
              },
            ].map((card, index) => (
              <button
                key={index}
                className="bg-[#E8E7FF] w-full h-[260px] rounded-[40px] transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl flex flex-col items-center px-4 pt-6"
              >
                <div className="bg-[#370EA3] rounded-full w-[45px] h-[45px] mb-5"></div>
                <h2 className="font-poppins text-[24px] font-[600] text-[#370EA3] leading-[36px] text-center">
                  {card.title}
                </h2>
                <h3 className="font-poppins text-[16px] font-[500] text-[#A39FFF] leading-[24px] text-center mt-2">
                  {card.description}
                </h3>
              </button>
            ))}
          </div>
          <Link
            href="/"
            className="text-center font-poppins italic text-[#370EA3] text-[20px] font-[600] leading-[30px] mt-7 hover:underline"
          >
            Create your pet profile
          </Link>
        </div>

        {/* Side Images */}
        <img
          src="/homeMale.svg"
          alt="Male"
          className="hidden md:block absolute mr-[900px] top-1/2 transform -translate-y-1/2 "
          height={470}
          width={390}
        />
        <img
          src="/homeFemale.svg"
          alt="Female"
          className="hidden md:block absolute ml-[900px] top-1/2 transform -translate-y-1/2 "
          height={470}
          width={320}
        />
      </div>
    </div>
  );
}
