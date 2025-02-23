import { getTranslations } from "next-intl/server";

import Container from "@/components/ui/container";
import { getUser, getUserTransferMethods } from "@/services/auth";

type ProfileSection = {
  title: string;
  data: Array<{
    title: string;
    value: string;
  }>;
};

export default async function Profile() {
  const t = await getTranslations("profile");
  const user = await getUser();
  const userTransferMethods = await getUserTransferMethods();

  const profileSections: Array<ProfileSection> = [
    {
      title: t("titles.overview"),
      data: [
        {
          title: t("data.full-name"),
          value: user.fullname,
        },
        {
          title: t("data.phone"),
          value: user.phone,
        },
        {
          title: t("data.email"),
          value: user.email,
        },
        // {
        //   title: "Account Type",
        //   value: "Landlord",
        // },
      ],
    },
    {
      title: t("titles.personal-infomation"),
      data: [
        {
          title: t("data.national-id"),
          value: user.national_id,
        },
        // {
        //   title: "Address",
        //   value: "123 Main Street, New York, NY 10001",
        // },
        // {
        //   title: "Country",
        //   value: "Egypt",
        // },
        // {
        //   title: "ID image",
        //   value: "add image later",
        // },
        // {
        //   title: "City",
        //   value: "Giza",
        // },
      ],
    },
    {
      title: t("titles.bank-details"),
      data: userTransferMethods.map((method) => ({
        title: method.methodName,
        value: method.value,
      })),
    },
  ];
  return (
    <Container className="mt-24">
      <h1 className="text-lg text-slate-700">My Profile</h1>

      <div className="mt-4 flex flex-col gap-6">
        {profileSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-primary-900 text-2xl font-semibold">
              {section.title}
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg border border-slate-200 p-4">
              {section.data.length > 0 ? (
                section.data.map((item) => (
                  <div key={item.title}>
                    <dt className="font-medium text-slate-500">{item.title}</dt>
                    <dd className="text-primary-900 mt-1 text-xl font-medium">
                      {item.value || "N/A"}
                    </dd>
                  </div>
                ))
              ) : (
                <div>
                  <h3 className="text-xl text-slate-500">{t("no-data")}</h3>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
