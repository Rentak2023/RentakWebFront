import { cn } from "@/lib/utils";

type ContainerProps<E extends React.ElementType> = React.PropsWithChildren<
  React.ComponentPropsWithRef<E> & {
    as?: E;
  }
>;

export default function Container<T extends React.ElementType = "div">({
  className,
  as,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
