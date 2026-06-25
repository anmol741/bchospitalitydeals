import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_xzox1el";
const NDA_TEMPLATE_ID = "template_mwy7py7";
const AGENCY_TEMPLATE_ID = "template_67kvzrp";

export interface ContactFormParams {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  property: string;
  buyerProfile: string;
  budget: string;
  timeline: string;
  ndaComfort: string;
  details: string;
}

export async function sendContactForm(params: ContactFormParams) {
  const fullPhone = `${params.countryCode} ${params.phone}`;
  return emailjs.send(SERVICE_ID, NDA_TEMPLATE_ID, {
    name: params.name,
    email: params.email,
    phone: fullPhone,
    property: params.property,
    buyer_profile: params.buyerProfile,
    budget: params.budget,
    timeline: params.timeline,
    nda_comfort: params.ndaComfort,
    message: params.details || "—",
    to_email: "bcrealtorcj@gmail.com",
  });
}

export async function sendNDAForm(params: {
  name: string;
  email: string;
  phone: string;
  city: string;
  date: string;
}) {
  return emailjs.send(SERVICE_ID, NDA_TEMPLATE_ID, {
    from_name: params.name,
    from_email: params.email,
    phone: params.phone,
    city: params.city,
    date: params.date,
    document_type: "NDA - Signed",
    to_email: "bcrealtorcj@gmail.com",
  });
}

export async function sendAgencyAgreement(params: {
  name: string;
  email: string;
  address: string;
  date: string;
  agreement_type: string;
}) {
  return emailjs.send(SERVICE_ID, AGENCY_TEMPLATE_ID, {
    from_name: params.name,
    from_email: params.email,
    address: params.address,
    date: params.date,
    agreement_type: params.agreement_type,
    document_type: "Agency Agreement - Signed",
    to_email: "bcrealtorcj@gmail.com",
  });
}
