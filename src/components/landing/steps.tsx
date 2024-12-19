export type Step = {
  title: string;
  color: string;
  description: string;
};

type StepsProps = {
  title: string;
  steps: Array<Step>;
};

export default function Steps({ title, steps }: StepsProps) {
  return (
    <section className="mt-28">
      <div className="container mx-auto">
        <h2 className="text-primary-900 text-center text-4xl font-semibold tracking-tight">
          {title}
        </h2>

        <ol className="relative mx-auto mt-16 flex max-w-2xl flex-col gap-5 border-s border-slate-200">
          {steps.map((step, index) => (
            <li className="ms-8" key={step.title}>
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
