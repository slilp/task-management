import React from "react";
import Image from "next/image";

type HelloSectionProps = {
  name: string;
  pic: string;
};

function HelloSection({ name, pic }: HelloSectionProps) {
  return (
    <div className="grid grid-cols-4 p-3 mb-5 bg-pink-50 rounded-xl w-full lg:w-1/3 md:w-1/2 gap-3">
      <div className="col-span-1 flex items-center justify-center">
        <div className="relative w-20 h-20">
          <Image
            alt="avatar"
            fill
            sizes="50vw"
            style={{ objectFit: "cover", borderRadius: "100%" }}
            src={pic}
          />
        </div>
      </div>
      <div className="col-span-3 flex flex-col items-center justify-center gap-3">
        <h1 className="font-bold text-2xl">Hi, Welcome back 👋</h1>
        <h1 className="text-lg" data-testid="hello-section-neme-text">
          {name}
        </h1>
      </div>
    </div>
  );
}

export default HelloSection;
