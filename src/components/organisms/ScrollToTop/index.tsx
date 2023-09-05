import Image from "next/image";
import React, { useState, useEffect } from "react";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  const clickToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      data-testid="scroll-to-top-btn"
      onClick={clickToTop}
      className="fixed z-50 bottom-10 right-7 md:right-10 p-2"
    >
      <Image src="/up-arrow.png" alt="to-top-arrow" height={50} width={50} />
    </button>
  );
}

export default ScrollToTop;
