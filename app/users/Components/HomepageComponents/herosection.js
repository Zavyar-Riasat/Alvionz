'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const heroImages = [
  { src: '/homepageimges/hero.jpg', title: 'Welcome to Our Website', subtitle: 'Discover amazing products and experiences with us.' },
  { src: '/homepageimges/hero2.jpg', title: 'Quality Products', subtitle: 'Only the best for our customers.' },
//   { src: '/homepageimges/hero3.jpg', title: 'Fast Delivery', subtitle: 'Get your orders quickly and safely.' },
];

const NextArrow = ({ className, style, onClick }) => (
  <button
    aria-label="Next slide"
    onClick={onClick}
    className={`${className} !z-30`}
    style={{ ...style, pointerEvents: 'auto' }}
  />
);
const PrevArrow = ({ className, style, onClick }) => (
  <button
    aria-label="Previous slide"
    onClick={onClick}
    className={`${className} !z-30`}
    style={{ ...style, pointerEvents: 'auto' }}
  />
);

const Herosection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: true,
    pauseOnHover: true,
    swipe: true,
    swipeToSlide: true,
    draggable: true,
    cssEase: 'ease-in-out',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="relative w-full overflow-hidden">
      <Slider {...settings} className="relative">
        {heroImages.map((image, idx) => (
          <div key={idx} className="relative h-[500px] md:h-[700px]">
            {/* image wrapper (positioning for next/image fill) */}
            <div className="relative w-full h-full">
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>

            {/* Gradient overlay: allow pointer events to pass through so slider receives drag */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50 pointer-events-none" />

            {/* Text container: pointer-events-none so swipes work. Buttons inside are pointer-events-auto */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10 pointer-events-none">
              <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">
                {image.title}
              </h1>
              <p className="text-base md:text-2xl text-white mb-6 max-w-2xl">
                {image.subtitle}
              </p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 pointer-events-auto"
                onClick={() => {
                  /* your CTA click handler */
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </Slider>

      {/* small style adjustments to ensure touch/drag works well */}
      <style jsx global>{`
        /* allow horizontal swipes while keeping vertical scroll stable */
        .slick-list {
          touch-action: pan-y;
        }

        /* ensure our arrow buttons are visible above overlays (react-slick classes) */
        .slick-prev,
        .slick-next {
          width: 48px;
          height: 48px;
          border-radius: 9999px;
          background: rgba(0,0,0,0.5);
          display: flex !important;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .slick-prev:hover,
        .slick-next:hover {
          background: rgba(0,0,0,0.7);
        }
        .slick-prev:before,
        .slick-next:before {
          color: white;
          font-size: 20px;
        }

        /* make dots slightly larger and clickable */
        .slick-dots li button:before {
          font-size: 12px;
          opacity: 0.85;
        }
      `}</style>
    </section>
  );
};

export default Herosection;
