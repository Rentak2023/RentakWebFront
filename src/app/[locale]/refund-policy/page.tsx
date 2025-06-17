import { getLocale } from "next-intl/server";
import Markdown from "react-markdown";

import Container from "@/components/ui/container";

const english = `Refund eligibility:

A full refund can be issued if the customer contacts us before the payment is transferred to the property owner; however, no refund is possible once the amount has been transferred, as the funds are no longer under our control.

How to request a refund: Customers should contact us through the available channels (email or support number) as soon as possible after the payment.

Refund processing time: For eligible cases, refunds will be processed within 3–5 business days and returned via the original payment method.
`;

const arabic = `نهدف إلى ضمان رضا العملاء وتقديم سياسة استرجاع عادلة وفقًا للشروط التالية:

أهلية الاسترجاع: يمكن رد كامل للمبلغ إذا تواصل العميل معنا قبل تحويل المبلغ إلى مالك العقار، ولكن لا يمكن رد المبلغ بعد التحويل لأن الأموال لم تعد تحت إدارتنا.

كيفية طلب الاسترجاع: يجب على العملاء التواصل معنا من خلال (البريد الإلكتروني أو رقم الدعم) في أقرب وقت ممكن بعد الدفع.

مدة معالجة الاسترجاع: في الحالات المؤهلة، تتم معالجة الاسترجاع خلال 3 إلى 5 أيام عمل ويُعاد المبلغ عبر وسيلة الدفع الأصلية
`;

export default async function RefundPolicy() {
  const locale = await getLocale();

  return (
    <main className="pt-32">
      <Container className="prose max-w-3xl">
        <h1>{locale === "en" ? "Refund Policy" : "سياسة الاسترجاع"}</h1>
        <Markdown>{locale === "en" ? english : arabic}</Markdown>
      </Container>
    </main>
  );
}
