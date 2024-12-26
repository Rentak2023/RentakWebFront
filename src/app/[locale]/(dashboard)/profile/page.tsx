type ProfileSection = {
  title: string;
  data: Array<{
    title: string;
    value: string;
  }>;
};

const profileSections: Array<ProfileSection> = [
  {
    title: "Overview",
    data: [
      {
        title: "Full Name",
        value: "John Doe",
      },
      {
        title: "Phone Number",
        value: "01234567890",
      },
      {
        title: "Email Address",
        value: "john.doe@example.com",
      },
      {
        title: "Account Type",
        value: "Landlord",
      },
    ],
  },
  {
    title: "Personal Information",
    data: [
      {
        title: "ID/Passport Number",
        value: "***********848",
      },
      {
        title: "Address",
        value: "123 Main Street, New York, NY 10001",
      },
      {
        title: "Country",
        value: "Egypt",
      },
      {
        title: "ID image",
        value: "add image later",
      },
      {
        title: "City",
        value: "Giza",
      },
    ],
  },
  {
    title: "Bank Details",
    data: [
      {
        title: "Bank Name",
        value: "HSBC",
      },
      {
        title: "Branch",
        value: "Cairo",
      },
      {
        title: "Account/IBAN Number",
        value: "xxxx-4931",
      },
      {
        title: "InstaPay/Wallet",
        value: "j*****@instaPay",
      },
    ],
  },
];

export default function Profile() {
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
