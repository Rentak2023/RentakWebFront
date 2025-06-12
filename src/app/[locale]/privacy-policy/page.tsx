import { getLocale } from "next-intl/server";
import Markdown from "react-markdown";

import Container from "@/components/ui/container";

const english = `We respect your privacy and are committed to protecting your personal data. By using our website, you agree to the following privacy policy:
1. Information Collection: We may collect data such as your name, email, and phone number when you register or contact us.
2. Use of Information: We use the data to improve our services, respond to your inquiries, and send updates or offers if you agree.
3. Data Protection: We take appropriate security measures to protect your data from unauthorized access or disclosure.
4. Information Sharing: We do not share your personal data with third parties unless strictly necessary (e.g., legal obligations).
5. Cookies: We may use cookies to enhance your experience on our website.
6. Your Rights: You may request to modify or delete your data at any time by contacting us.

If you have any questions, please reach out via the contact email provided on the website.
`;

const arabic = `نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. من خلال استخدامك لموقعنا، فإنك توافق على سياسة الخصوصية التالية:
1. جمع المعلومات: قد نقوم بجمع بعض البيانات مثل الاسم، البريد الإلكتروني، ورقم الهاتف عندما تقوم بالتسجيل أو التواصل معنا.
2. استخدام المعلومات: نستخدم المعلومات لتحسين خدماتنا، والرد على استفساراتك، وإرسال تحديثات أو عروض إذا وافقت على ذلك.
3. حماية البيانات: نحن نتخذ إجراءات أمان مناسبة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الكشف.
4. مشاركة المعلومات: لا نشارك معلوماتك مع أي طرف ثالث إلا في حال الضرورة القصوى (مثل الالتزام بالقانون).
5. الكوكيز (Cookies): قد نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم على الموقع.
6. حقوقك: يمكنك طلب تعديل أو حذف بياناتك في أي وقت من خلال التواصل معنا.

إذا كان لديك أي استفسار، يرجى التواصل معنا عبر البريد الإلكتروني الموجود في الموقع.`;

export default async function PrivacyPolicy() {
  const locale = await getLocale();

  return (
    <main className="pt-32">
      <Container className="prose max-w-3xl">
        <h1>{locale === "en" ? "Privacy Policy" : "سياسة الخصوصية"}</h1>
        <Markdown>{locale === "en" ? english : arabic}</Markdown>
      </Container>
    </main>
  );
}
