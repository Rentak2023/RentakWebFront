import { getUser, getUserTransferMethods } from "@/services/auth";

type ProfileSection = {
  title: string;
  data: Array<{
    title: string;
    value: string;
  }>;
};

export default async function Profile() {
  const user = await getUser();
  const userTransferMethods = await getUserTransferMethods();

  const profileSections: Array<ProfileSection> = [
    {
      title: "Overview",
      data: [
        {
          title: "Full Name",
          value: user.fullname,
        },
        {
          title: "Phone Number",
          value: user.phone,
        },
        {
          title: "Email Address",
          value: user.email,
        },
        // {
        //   title: "Account Type",
        //   value: "Landlord",
        // },
      ],
    },
    {
      title: "Personal Information",
      data: [
        {
          title: "ID/Passport Number",
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
      title: "Bank Details",
      data: userTransferMethods.map((method) => ({
        title: method.methodName,
        value: method.value,
      })),
    },
  ];
  return (
    <div className="container mx-auto mt-24 px-4 sm:px-6 lg:px-8">
      <h1 className="text-lg text-slate-700">My Profile</h1>

      <div className="mt-4 flex flex-col gap-6">
        {profileSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-primary-900 text-2xl font-semibold">
              {section.title}
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg border border-slate-200 p-4">
              {section.data.map((item) => (
                <div key={item.title}>
                  <dt className="font-medium text-slate-500">{item.title}</dt>
                  <dd className="text-primary-900 text-xl font-medium">
                    {item.value}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
