import { type Variants } from "motion/react";
import * as motion from "motion/react-client";

import Container from "@/components/ui/container";

export type Step = {
  title: string;
  color: string;
  description: string;
};

type StepsProps = {
  title: string;
  steps: Array<Step>;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 2,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0.4 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      duration: 2,
    },
  },
};

export default function Steps({ title, steps }: Readonly<StepsProps>) {
  return (
    <Container className="mt-32">
      <h2 className="text-primary-900 text-center text-4xl font-semibold tracking-tight">
        {title}
      </h2>

      <motion.ol
        className="relative mx-auto mt-16 flex w-fit max-w-2xl flex-col gap-5 border-s border-slate-200"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step, index) => (
          <motion.li className="ms-8" key={step.title} variants={stepVariants}>
            <span
              className="absolute -start-5 flex size-10 items-center justify-center rounded-full p-1 ring-4 ring-white"
              style={{
                backgroundColor: step.color,
              }}
            >
              {index + 1}
            </span>
            <h3 className="text-primary-800 font-medium leading-tight">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{step.description}</p>
          </motion.li>
        ))}
      </motion.ol>
    </Container>
  );
}
