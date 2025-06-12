import { getLocale } from "next-intl/server";
import Markdown from "react-markdown";

import Container from "@/components/ui/container";

const english = `We aim to ensure customer satisfaction and offer a fair refund policy under the following conditions:
1. Refund before transferring the amount to the owner: If the customer contacts us before we transfer the amount to the property owner, we can refund the full amount.
2. No refund after transferring the amount: If the amount has already been transferred to the owner before the customer contacts us, no refund can be issued as the funds are no longer under our control.
3. How to request a refund: Customers should contact us through the available channels (email or support number) as soon as possible after the payment.
4. Refund processing time: For eligible cases, refunds will be processed within 3–5 business days and returned via the original payment method.
`;

const arabic = `نحن نحرص على رضا عملائنا، ونقدم سياسة استرجاع مرنة ضمن الشروط التالية:
1. الاسترجاع قبل تحويل المبلغ للمالك: إذا تواصل معنا العميل قبل أن نقوم بتحويل المبلغ إلى المالك، يمكننا إعادة المبلغ بالكامل للعميل.
2. الاسترجاع بعد تحويل المبلغ للمالك: في حالة تم تحويل المبلغ إلى المالك قبل تواصل العميل، لا يمكن تنفيذ عملية الاسترجاع، لأن المبلغ لم يعد في حوزتنا.
3. كيفية تقديم طلب الاسترجاع: يجب على العميل التواصل معنا عبر الوسائل المتاحة (مثل البريد الإلكتروني أو رقم خدمة العملاء) بأسرع وقت ممكن بعد الدفع.
4. مدة معالجة الاسترجاع: في الحالات المؤهلة، تتم معالجة الاسترجاع خلال 3–5 أيام عمل، ويتم رد المبلغ بنفس وسيلة الدفع الأصلية.
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
