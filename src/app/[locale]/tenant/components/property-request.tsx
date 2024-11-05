import { Button } from "@/components/ui/button";

export default function PropertyRequest() {
  return (
    <div className="container mx-auto mt-32 flex items-center justify-between px-4">
      <div>
        <p className="text-lg font-medium text-primary-800">
          Can’t find what you’re looking for?
        </p>
        <h2 className="mt-6 text-4xl font-semibold tracking-tight text-primary-900">
          Instant property request
        </h2>
        <p className="mt-6 text-primary-800">
          Submit a request, and Rentak will help you find the property that
          meets your needs.
        </p>
      </div>
      <Button variant="dark" size="lg">
        Submit a request
      </Button>
    </div>
  );
}
