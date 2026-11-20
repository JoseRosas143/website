import { ClinicalLegalPage } from "@/components/ClinicalLegalPage";
import { clinicalAssistant as bot } from "@/lib/clinical-assistant";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Términos y condiciones | Clinical Assistant Bot", "Alcance, uso permitido, agenda, atención humana y condiciones de la demostración Benson de Clinical Assistant Bot de J R Consulting.", bot.termsPath);
export default function TermsPage() { return <ClinicalLegalPage kind="terms" />; }
