import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const posts = [
  {
    id: 1,
    title: "How to budget your first rental",
    arTitle: "إزاي تحط ميزانية لأول إيجار ليك",
    href: "#",
    content: `Starting your first rental journey? Here's how to budget smartly and enjoy the experience without financial stress!
Know Your Monthly Rent Limit
Start by calculating how much you can comfortably afford for rent each month. A common rule is to keep rent within 30% of your income. This ensures you have enough left over for other essential expenses.
Account for Additional Costs
Beyond rent, budget for utilities like water, electricity, and internet. Some rentals include these costs, while others don't, so it's good to know in advance. Other costs may include renter's insurance, parking, and any building fees.
Save for Upfront Costs
Most rentals require a security deposit and possibly the first and last month's rent upfront. Plan for these initial payments and, if possible, create a small “moving fund” to cover any extra expenses for furnishings or essentials.
Prioritize a Small Emergency Fund
Life is unpredictable! Setting aside a small emergency fund can provide peace of mind and help cover unexpected expenses, whether it's a repair need or an extra utility bill.

Budgeting well for your first rental will not only make your life easier but will also help you start your rental experience stress-free.`,
    arContent: `بتبدأ رحلتك لأول مرة كساكن؟ هنا إزاي تظبط ميزانيتك عشان تكون تجربة سلسة ومن غير ضغوط مالية!
حدد حد أقصى للإيجار الشهري
ابدأ بحساب المبلغ اللي تقدر تتحمله للإيجار كل شهر. القاعدة الشائعة إن الإيجار ميبقاش أكتر من ٣٠٪ من دخلك. كده تضمن إن باقي احتياجاتك تقدر تغطيها.
خد في اعتبارك التكاليف الإضافية
غير الإيجار، خلي في بالك ميزانية للمرافق زي المياه والكهرباء والإنترنت. بعض الوحدات الإيجارية بتشمل التكاليف دي، وبعضها لأ، فمهم تعرف التفاصيل. كمان خد في اعتبارك تأمين الإيجار، ورسوم الركنة، وأي مصاريف تانية.
جهز مصاريف أولية
معظم الأماكن بتطلب مقدم تأمين وممكن كمان إيجار شهرين أو شهر مقدم. خطط للمصاريف دي ولو قدرت، اعمل "صندوق انتقال" صغير عشان تقدر تشتري اللي ناقصك.
حط أولوية لصندوق طوارئ صغير
الدنيا ساعات بتبقى غير متوقعة! حط مبلغ صغير للطوارئ يضمنلك راحة بال لو ظهر أي ظرف فجائي زي تصليح أو فاتورة مفاجئة.
تحضير الميزانية صح لأول إيجار هيسهلك حياتك ويخلي تجربتك في الإيجار بدون ضغوط.`,
    imageUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
  },
  {
    id: 2,
    title: "What to look for in a new rental home",
    arTitle: "إزاي تختار شقة جديدة للإيجار؟",
    href: "#",
    content: `Finding the right rental home is more than just loving the first one you see! Here's what to keep an eye out for to make sure it's a perfect fit.
Location, Location, Location
Think about proximity to your workplace, favorite spots, and transportation options. A convenient location can save you time and money in the long run and make your day-to-day life more enjoyable.
Consider the Amenities
Amenities can make a big difference. Is there a gym, laundry facilities, or security services on-site? These can add convenience and value to your rental experience. Make a list of “must-haves” and “nice-to-haves” so you can prioritize.
Check for Safety Features
Safety is essential. Look for features like secure locks, smoke detectors, and well-lit surroundings. A safe environment is vital, and these features help ensure your peace of mind.
Understand the Rent Terms
Read through the lease carefully. Check for details on renewal terms, pet policies, and notice periods. Clear lease terms help you avoid surprises down the road and ensure your experience will be smooth and straightforward.

By focusing on these elements, you can find a rental home that meets your needs and truly feels like home.`,
    arContent: `اختيار المكان الصح مش مجرد أول شقة تعجبك! هنا الحاجات اللي لازم تركز عليها عشان تكون متأكد إن الشقة مناسبة ليك.
الموقع، الموقع، الموقع
فكر في قرب المكان من شغلك، وأماكنك المفضلة، ووسائل المواصلات. الموقع المريح هيوفر عليك وقت وفلوس في المدى الطويل وهيخلي حياتك اليومية أسهل.
اهتم بالخدمات المتاحة
الخدمات بتفرق فعلاً. هل في جيم، أو مغسلة، أو أمن في المكان؟ دي حاجات بتضيف راحة وقيمة لتجربتك الإيجارية. اعمل قائمة بالاحتياجات الأساسية والاختيارية عشان تحدد أولوياتك.
راجع الأمان
الأمان شيء مهم جداً. دور على حاجات زي أقفال آمنة، كاشف دخان، وإضاءة كويسة. المكان الآمن هيضمنلك راحة البال.
اتأكد من شروط العقد
اقرأ العقد بعناية. شوف تفاصيل زي شروط التجديد، سياسات الحيوانات الأليفة، وفترة الإخطار. الشروط الواضحة في العقد هتساعدك تتجنب المفاجآت في المستقبل وتضمن تجربة إيجارية مريحة.
بالتركيز على الحاجات دي، تقدر تلاقي مكان إيجار يناسبك ويشعرك بالراحة.
`,
    imageUrl: "https://images.unsplash.com/photo-1499916078039-922301b0eb9b",
  },
  {
    id: 3,
    title: "Understanding flexible rent payments ",
    arTitle: "فهم طرق الدفع المرنة في الإيجارات",
    href: "#",
    content: `Flexible payment options can make renting more manageable and convenient. Here's how they work and why they might be perfect for you!
What are Flexible Payments?
Flexible payments mean you're not stuck with traditional payment structures. Instead, you can choose a plan that suits your financial situation, such as monthly, bi-weekly, or even installment-based payments.
How Flexible Payments Benefit You
Flexible options help with budgeting. If your income varies month-to-month, or you'd like to spread out rent costs more evenly, flexible payments allow you to manage expenses without strain.
Explore Various Payment Methods
With flexible payments, you often have different ways to pay, like direct deposit, credit card, or through financing options. This variety provides more control over how and when you pay.
Avoid Late Fees and Improve Cash Flow
Flexible payment plans can also reduce the risk of late fees. By tailoring your rent payments to align with your cash flow, you're less likely to miss payments, which can help you save money and reduce stress.

Understanding flexible payments allows you to rent in a way that works best for you, making the entire process more manageable and enjoyable.`,
    arContent: `طرق الدفع المرنة بتخلي تجربة الإيجار أسهل. هنا إزاي بتشتغل وإزاي ممكن تكون مناسبة ليك!
إيه هي طرق الدفع المرنة؟
طرق الدفع المرنة معناها إنك مش ملتزم بالنظام التقليدي. بدل كده، تقدر تختار خطة تناسب ظروفك المالية، زي الدفع شهريًا، نصف شهري، أو حتى على أقساط.
إزاي طرق الدفع المرنة تفيدك؟
المرونة في الدفع بتساعدك في تنظيم ميزانيتك. لو دخلك بيختلف من شهر للتاني، أو بتحب تقسم مصاريف الإيجار بشكل متساوي، طرق الدفع المرنة بتخليك تتحكم في نفقاتك بشكل أحسن.
جرّب طرق الدفع المختلفة
مع الدفع المرن، غالباً هتلاقي طرق دفع مختلفة زي التحويل البنكي، بطاقة الائتمان، أو خيارات التمويل. التنوع ده بيديك حرية أكبر في طريقة ووقت الدفع.
تجنب الرسوم المتأخرة وحسن تدفقك المالي
طرق الدفع المرنة ممكن كمان تقلل خطر الرسوم المتأخرة. بتنظم دفعاتك مع تدفقك المالي، عشان كده بتقلل فرصة التأخير، وده هيوفرلك فلوس ويقلل التوتر.
فهمك لطرق الدفع المرنة بيخليك تقدر تدير إيجارك بالشكل اللي يناسبك، ويخلي العملية كلها أسهل وأكتر راحة.`,
    imageUrl: "https://images.unsplash.com/photo-1496128858413-b36217c2ce36",
  },
];

export default function BlogPosts() {
  const locale = useLocale();
  const t = useTranslations("tenant.blog");

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-primary-900 sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg/8 text-slate-600">{t("subtitle")}</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col items-start justify-between"
            >
              <div className="relative w-full">
                <Image
                  width={384}
                  height={256}
                  alt=""
                  src={post.imageUrl}
                  className="aspect-[16/9] w-full rounded-2xl bg-slate-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="group relative">
                  <h3 className="mt-6 text-lg/6 font-semibold text-primary-900 group-hover:text-slate-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {locale === "en" ? post.title : post.arTitle}
                    </a>
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm/6 text-slate-600">
                    {locale === "en" ? post.content : post.arContent}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
