"use client";
import { ArrowRight, StarIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useFormatter, useLocale } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { getLocaleDirection } from "@/lib/utils";

import Container from "../ui/container";

export type Testimonial = {
  id: number;
  name: string;
  rating: number;
  paragraphs: Array<string>;
  date: Date;
};

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

type TestimonialsProps = {
  title: string;
  testimonials: Array<Testimonial>;
};

export function Testimonials({ title, testimonials }: TestimonialsProps) {
  const [currentId, setCurrentId] = useState(1);
  const [animationDirection, setAnimationDirection] = useState(0);
  const locale = useLocale();
  const direction = getLocaleDirection(locale);
  const formatter = useFormatter();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentTestimonial = testimonials.find((t) => t.id === currentId)!;
  return (
    <Container className="mt-28 overflow-x-hidden pb-8">
      <div className="flex flex-col items-center gap-y-6 lg:flex-row">
        <div className="flex max-w-lg flex-col items-center lg:items-start">
          <h3 className="text-primary-900 text-balance text-2xl font-semibold lg:text-5xl">
            {title}
          </h3>
        </div>
        <div className="relative lg:ms-auto">
          <AnimatePresence
            mode="wait"
            initial={false}
            custom={animationDirection}
          >
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
                className="absolute end-16 top-8 -z-10 rounded-full border-slate-500"
                onClick={() => {
                  if (currentId === testimonials.length) {
                    setCurrentId(1);
                  } else {
                    setCurrentId(currentId + 1);
                  }
                  setAnimationDirection(direction === "rtl" ? 1 : -1);
                }}
              >
                <ArrowRight className="text-slate-500 rtl:rotate-180" />
              </Button>

              <blockquote className="mt-2 text-lg font-medium leading-8 text-slate-500 sm:text-lg">
                {currentTestimonial.paragraphs.map((paragraph) => (
                  <p key={paragraph} dir="ltr">
                    {paragraph}
                  </p>
                ))}
              </blockquote>
              <div className="mt-6 flex flex-col items-center gap-4 border-t pt-6 lg:flex-row">
                <div className="flex items-baseline gap-5">
                  <span
                    className="text-2xl font-medium text-slate-700"
                    dir="ltr"
                  >
                    {currentTestimonial.name}
                  </span>
                  <span>
                    {formatter.dateTime(currentTestimonial.date, "long")}
                  </span>
                </div>
                <p className="sr-only">
                  {currentTestimonial.rating} out of 5 stars
                </p>
                <div className="flex flex-row gap-1 lg:ms-auto">
                  {Array.from(
                    { length: currentTestimonial.rating },
                    (_, i) => i,
                  ).map((n) => (
                    <StarIcon key={n} className="fill-[#FFC700] stroke-none" />
                  ))}
                  {Array.from(
                    { length: 5 - currentTestimonial.rating },
                    (_, i) => i,
                  ).map((n) => (
                    <StarIcon key={n} className="fill-slate-300 stroke-none" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
}
