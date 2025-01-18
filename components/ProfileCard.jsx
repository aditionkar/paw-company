import Image from "next/image";
import React from "react";

function ProfileCard() {
  return (
    <div
      className="h-[600px] bg-cover bg-center bg-no-repeat flex items-center justify-center bg-[#B5C6FF]"
    >
      <div className="bg-[url('/profileCard.svg')] bg-cover bg-no-repeat md:h-[400px] md:w-[800px] h-[500px] w-[350px] flex flex-col md:flex-row items-center md:items-start justify-center gap-5 md:gap-10 p-5">
        {/* Pet Image */}
        <div className="petImage bg-slate-500 w-52 h-52 md:w-64 md:h-64 flex items-center justify-center overflow-hidden md:translate-x-[-70px] mt-5 md:mt-16 rounded-xl">
          <Image
            src="/cuteCat.jpeg"
            alt="Pet Image"
            width={320} // Desktop size: 320px
            height={320} // Desktop size: 320px
            className="md:w-[300px] md:h-[300px] w-[208px] h-[208px]" // Ensure responsive sizing
          />
        </div>

        {/* Pet Info */}
        <div className="petInfo text-center md:text-left mt-5 md:mt-16">
          <h1 className="font-poppins text-[32px] font-[600] text-[#370EA3] leading-[48px] md:text-[48px] md:leading-[72px]">Pet Name</h1>
          <p className="font-poppins text-[18px] font-[500] text-white leading-[28px] md:text-[24px] md:leading-[36px] mt-2">Breed: Husky</p>
          <p className="font-poppins text-[18px] font-[500] text-white leading-[28px] md:text-[24px] md:leading-[36px] mt-1">Age: 4</p>
          <p className="font-poppins text-[18px] font-[500] text-white leading-[28px] md:text-[24px] md:leading-[36px] mt-1">Weight: 5kg</p>
          <p className="font-poppins text-[18px] font-[500] text-white leading-[28px] md:text-[24px] md:leading-[36px] mt-1">Height: 2</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
