"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, StarIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import getLocaleDirection from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Sarah A.",
    paragraph:
      "Rentak has completely transformed how I manage my properties. The guaranteed rent option has given me peace of mind, and their team handles everything seamlessly.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
  },
  {
    id: 2,
    name: "Ahmed M.",
    paragraph:
      "I was tired of chasing down late payments. Rentak’s automated rent collection made my life so much easier. Plus, my tenants are happier!",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
  },
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.9,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 150 : -150,
      opacity: 0,
      scale: 0.9,
    };
  },
};

export function Testimonials() {
  const [currentId, setCurrentId] = useState(1);
  const [animationDirection, setAnimationDirection] = useState(0);
  const locale = useLocale();
  const direction = getLocaleDirection(locale);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentTestimonial = testimonials.find((t) => t.id === currentId)!;
  return (
    <div className="mx-auto mt-32 max-w-7xl overflow-x-hidden px-6 pb-8 md:px-8">
      <div className="flex flex-col items-center gap-y-6 lg:flex-row">
        <div className="flex max-w-lg flex-col items-center lg:items-start">
          {/* <h2 className="text-start text-2xl font-medium uppercase text-primary-600">
            Testimonials
          </h2> */}
          <h3 className="text-balance text-2xl font-semibold text-slate-700 lg:text-5xl">
            Hear from Our Happy Homeowners
          </h3>
          {/* <p className="mt-8 text-pretty text-lg text-slate-700">
            Fusce venenatis tellus a felis scelerisque, non pulvinar est
            pellentesque.
          </p> */}
          {/* <div className="mt-8 flex flex-row gap-16">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full border-primary-600"
              onClick={() => {
                if (currentId === 1) {
                  setCurrentId(testimonials.length);
                } else {
                  setCurrentId(currentId - 1);
                }
                setAnimationDirection(direction === "rtl" ? -1 : 1);
              }}
            >
              <ArrowLeft className="text-primary-600 rtl:rotate-180" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full border-primary-600"
              onClick={() => {
                if (currentId === testimonials.length) {
                  setCurrentId(1);
                } else {
                  setCurrentId(currentId + 1);
                }
                setAnimationDirection(direction === "rtl" ? 1 : -1);
              }}
            >
              <ArrowRight className="text-primary-600 rtl:rotate-180" />
            </Button>
          </div> */}
        </div>
        <div className="relative lg:ms-auto">
          <AnimatePresence
            mode="wait"
            initial={false}
            custom={animationDirection}
          >
            {/* <motion.div
              className="absolute -start-8 -top-8 -z-10 size-16 rounded-full bg-gradient-to-br from-primary-800 to-transparent"
              key={currentId}
              custom={animationDirection}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
            /> */}

            <motion.div
              className="relative z-0 max-w-xl rounded-3xl bg-white px-16 pb-6 pt-20 shadow-lg"
              key={currentId}
              custom={animationDirection}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute start-16 top-8 -z-10 h-32"
                width="74"
                height="46"
                fill="none"
              >
                <path
                  fill="#FFC700"
                  fillOpacity=".4"
                  d="M20.032.361.762 45.351H26.99L37.16.36H20.032Zm36.041 0-19.27 44.99h26.229L73.202.36H56.074Z"
                />
              </svg>

              <Button
                size="icon"
                variant="outline"
                className="absolute end-16 top-8 -z-10 rounded-full border-primary-600"
                onClick={() => {
                  if (currentId === testimonials.length) {
                    setCurrentId(1);
                  } else {
                    setCurrentId(currentId + 1);
                  }
                  setAnimationDirection(direction === "rtl" ? 1 : -1);
                }}
              >
                <ArrowRight className="text-primary-600 rtl:rotate-180" />
              </Button>

              <blockquote className="mt-2 text-lg font-medium leading-8 text-slate-500 sm:text-lg">
                <p>{currentTestimonial.paragraph}</p>
              </blockquote>
              <div className="mt-6 flex flex-col items-center gap-4 border-t pt-6 lg:flex-row">
                <div className="flex items-center gap-4">
                  <img
                    className="aspect-square size-16 rounded-full object-cover"
                    src={currentTestimonial.image}
                  />
                  <span className="text-2xl font-medium text-slate-700">
                    {currentTestimonial.name}
                  </span>
                </div>
                <p className="sr-only">
                  {currentTestimonial.rating} out of 5 stars
                </p>
                <div className="flex flex-row gap-1 lg:ms-auto">
                  {Array.from({ length: currentTestimonial.rating }).map(
                    (_, i) => (
                      <StarIcon
                        key={i}
                        className="fill-[#FFC700] stroke-none"
                      />
                    ),
                  )}
                  {Array.from({ length: 5 - currentTestimonial.rating }).map(
                    (_, i) => (
                      <StarIcon
                        key={i}
                        className="fill-slate-300 stroke-none"
                      />
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
