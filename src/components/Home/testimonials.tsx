"use client";

import React, { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

// Testimonials data
const testimonials = [
  {
    text: "Vestify One helped me stay consistent. My salary auto‑debited every Friday and I finally built an emergency fund.",
    author: "Amaka, Lagos",
  },
  {
    text: "Got a quick loan against my savings when my car broke down. Funds hit instantly. Repaying weekly has been smooth.",
    author: "Seyi, Ibadan",
  },
  {
    text: "Our Esusu group is fully automated now. No more chasing people — reminders and payouts just work.",
    author: "Blessing, Abuja",
  },
  {
    text: "The low‑risk investment options are solid. I like that everything is vetted and easy to understand.",
    author: "Chidi, Enugu",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(1);

  const prevTestimonial = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const getIndex = (offset: number) =>
    (current + offset + testimonials.length) % testimonials.length;

  return (
    <div className="w-full mt-[4rem] md:mt-[6rem]" id="testimonials">
      <div className="flex items-center flex-wrap justify-between">
        <div className="w-[97%] md:w-[62%] 2xl:w-[52%] left-0">
          <h2 className="text-3xl md:text-4xl xl:text-5xl text-center md:text-left pt-4">
            What Nigerians <span className="text-[var(--accent)]">say</span>
          </h2>
          <p className="text-base pt-3.5 text-muted text-center md:text-left">
            Real stories from savers, investors, and Ajo/Esusu circles using Vestify One every day.
          </p>
        </div>
      </div>

      <div className="w-full flex items-center flex-wrap mt-[2rem] md:mt-[3.5rem] justify-center relative">
        {/* Left Arrow */}
        <button
          className="absolute cursor-pointer left-0 z-10 bg-[var(--card)] rounded-full p-2 border border-base hover:bg-white/5 transition md:block hidden"
          onClick={prevTestimonial}
          aria-label="Previous"
        >
          <ArrowLeftIcon className="w-6 h-6 text-[var(--accent)]" />
        </button>

        {/* Left */}
        <article
          className="w-[96%] md:w-[33.3%] flex-col items-center justify-center space-y-8 px-6 2xl:px-14 relative transition-all duration-300 scale-90 -translate-x-6 z-0 md:flex hidden"
          style={{ zIndex: 1 }}
        >
          <div className="absolute left-0 top-0 h-full w-[80%] pointer-events-none bg-gradient-to-r from-[var(--bg)] to-transparent" />
          <div className="w-full flex items-center justify-between">
            <div className="w-[40%] h-px bg-[var(--border)]"></div>
            <span className="text-sm text-muted">Review</span>
            <div className="w-[40%] h-px bg-[var(--border)]"></div>
          </div>
          <p className="text-base text-center text-muted">
            {testimonials[getIndex(-1)].text}
          </p>
          <p className="text-sm text-[var(--accent)]">
            {testimonials[getIndex(-1)].author}
          </p>
        </article>

        {/* Center */}
        <article
          className="relative w-[87%] mx-auto md:mx-0 md:w-[33.3%] mt-5 md:mt-0 md:border-0 border border-base flex flex-col items-center justify-center space-y-8 pt-6 md:pt-0 px-6 2xl:px-14 transition-all duration-300 bg-transparent rounded-xl scale-110 z-20"
          style={{ zIndex: 2 }}
        >
          <div className="absolute left-0 top-0 h-full w-[30%] pointer-events-none bg-gradient-to-r from-[var(--bg)] to-transparent block md:hidden" />
          <div className="w-full flex items-center justify-between">
            <div className="w-[40%] h-px bg-[var(--border)]"></div>
            <span className="text-sm text-muted">Review</span>
            <div className="w-[40%] h-px bg-[var(--border)]"></div>
          </div>
          <p className={`text-base text-center`}>
            {testimonials[getIndex(0)].text}
          </p>
          <p className="text-sm text-[var(--accent)]">
            {testimonials[getIndex(0)].author}
          </p>
          <div className="absolute right-0 top-0 h-full w-[30%] pointer-events-none bg-gradient-to-l from-[var(--bg)] to-transparent block md:hidden" />
        </article>

        {/* Right */}
        <article
          className="w-[96%] md:w-[33.3%] flex-col items-center justify-center space-y-8 px-6 2xl:px-14 relative transition-all duration-300 scale-90 translate-x-6 z-0 md:flex hidden"
          style={{ zIndex: 1 }}
        >
          <div className="absolute right-0 top-0 h-full w-[80%] pointer-events-none bg-gradient-to-l from-[var(--bg)] to-transparent" />
          <div className="w-full flex items-center justify-between">
            <div className="w-[40%] h-px bg-[var(--border)]"></div>
            <span className="text-sm text-muted">Review</span>
            <div className="w-[40%] h-px bg-[var(--border)]"></div>
          </div>
          <p className="text-base text-center text-muted">
            {testimonials[getIndex(1)].text}
          </p>
          <p className="text-sm text-[var(--accent)]">
            {testimonials[getIndex(1)].author}
          </p>
        </article>

        {/* Right Arrow */}
        <button
          className="absolute cursor-pointer right-0 z-10 bg-[var(--card)] rounded-full p-2 border border-base transition md:block hidden hover:bg-white/5"
          onClick={nextTestimonial}
          aria-label="Next"
        >
          <ArrowRightIcon className="w-6 h-6 text-[var(--accent)]" />
        </button>

        {/* Mobile navigation arrows */}
        <div className="flex w-full justify-center items-center gap-4 mt-9 md:hidden">
          <button
            className="bg-[var(--card)] rounded-full border border-base p-2 hover:bg-white/5 transition"
            onClick={prevTestimonial}
            aria-label="Previous"
          >
            <ArrowLeftIcon className="w-7 h-7 text-[var(--accent)]" />
          </button>
          <button
            className="bg-[var(--card)] rounded-full border border-base p-2 transition hover:bg-white/5"
            onClick={nextTestimonial}
            aria-label="Next"
          >
            <ArrowRightIcon className="w-7 h-7 text-[var(--accent)]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
