import Link from "next/link";
import { clinicalAssistant as bot, clinicalPrivacySections, clinicalTermsSections } from "@/lib/clinical-assistant";
import styles from "@/app/clinical-assistant-bot/project.module.css";

export function ClinicalLegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const privacy = kind === "privacy";
  const sections = privacy ? clinicalPrivacySections : clinicalTermsSections;
  return <main className={`section-shell section-pad ${styles.legal}`}>
    <Link className="text-link" href={bot.path}>← Clinical Assistant Bot</Link>
    <p className="label">J R Consulting · Última actualización: {bot.updated}</p>
    <h1>{privacy ? "Política de privacidad" : "Términos y condiciones"}</h1>
    <p className={styles.lead}>Clinical Assistant Bot · Demo Benson para J R Dental</p>
    <nav aria-label="Índice del documento" className={styles.contents}>{sections.map(section=><a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav>
    {sections.map(section=><section key={section.id} id={section.id}><h2>{section.title}</h2>{section.paragraphs.map((text,index)=><p key={index}>{text}</p>)}
      {privacy && section.id === "eliminacion-de-datos" && <a className="button button--primary" href={`mailto:${bot.email}?subject=${encodeURIComponent("Eliminar datos — Clinical Assistant Bot")}`}>Solicitar eliminación por correo</a>}
    </section>)}
    <div className={styles.legalEnd}><p>Contacto: <a href={`mailto:${bot.email}`}>{bot.email}</a></p><Link href={privacy ? bot.termsPath : bot.privacyPath}>{privacy ? "Consultar términos y condiciones" : "Consultar política de privacidad"}</Link>{privacy && <p className={styles.caption}>Marco de referencia: <a href="https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf" target="_blank" rel="noreferrer">Ley Federal de Protección de Datos Personales en Posesión de los Particulares</a>.</p>}</div>
  </main>;
}
