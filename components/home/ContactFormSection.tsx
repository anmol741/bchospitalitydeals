import RequestInfoForm from "@/components/RequestInfoForm";
import { propertyOptions } from "@/lib/listings";

export default function ContactFormSection() {
  return <RequestInfoForm propertyOptions={propertyOptions()} />;
}
