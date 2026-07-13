import { Link } from "@/i18n/routing";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

export function PayYourRent() {
  return (
    <Container className="mt-12 flex items-center justify-center">
      <Button size="3xl" variant="default" asChild>
        <Link href="/rent-management">Submit Your Unit</Link>
      </Button>
    </Container>
  );
}
