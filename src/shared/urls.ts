import { getUnitSlug } from "@/services/properties";

// append urls here, DO NOT remove this line
const URLS = {
  home: "/",
  notFound: "/404",
  faq: "https://rent-ak.com/Home/FAQs",
  auth: {
    login: "/login-register",
    forgetPassword: "/forget-password",
    resetPassword: "/reset-password",
    register: "/register",
    verify: "/verify",
    verifyForgetPassword: "/verify-forget-password",
  },
  settings: "/settings",
  notifications: "/notifications",
  wallet: "/wallet",
  invoices: "/invoices",
  rentPayment: "/rent-payment",
  vacayNow: "/vacay-now",
  rentCollection: "/rent-collection",
  rentManagement: "/rent-management",
  maintenancePayment: "/maintenance-payment",

  //Properties
  units: "/units",
  viewUnit: (property: { id: string | number; english_name: string }) =>
    `/units/${getUnitSlug(property)}`,

  pages: {
    aboutUs: "/about-us",
    termsConditions: "/terms-conditions",
    privacyPolicy: "/privacy-policy",
  },
  landlord: "/landlord",
  tenant: "/tenant",

  //Pages
  aboutUs: "#",
  projects: "#",
  contactUs: "https://rent-ak.com/Home/ContactUs",
  team: "#",
  services: "#",

  //Services
  kitchen: "#",
  livingArea: "#",
  bathroom: "#",
  dinningHall: "#",
  bedroom: "#",
  serviceOne: "",
  serviceTwo: "",
  serviceThree: "",
  serviceFour: "",

  //Contract
  contract: "/contract",
  survey: "/survey/:id",

  //Social Media
  facebook: "https://www.facebook.com/Rentakapp/",
  instagram: "https://www.instagram.com/rentakapp/",
  whatsapp: "https://wa.me/+201111111541",
  linkedin: "https://www.linkedin.com/company/rentak-app/",
  //Contact Info
  mailTo: "mailto:Info@rent-ak.com",
  tel: "tel:+201111111541",
  address: `https://maps.app.goo.gl/B28qPdtzBoW9FCmv6`,
};

export default URLS;
