import { ClinicalLegalPage } from "@/components/ClinicalLegalPage";
import { clinicalAssistant as bot } from "@/lib/clinical-assistant";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Política de privacidad | Clinical Assistant Bot", "Datos personales, proveedores, derechos ARCO y solicitud de eliminación de datos del demo Benson de Clinical Assistant Bot, J R Consulting.", bot.privacyPath);
export default function PrivacyPage() { return <ClinicalLegalPage kind="privacy" />; }
