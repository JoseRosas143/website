import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Headphones, MessageCircle, ShieldCheck, Mic, BookOpen } from "lucide-react";
import { VisualPage } from "@/components/VisualPage";
import { CmsAdditionalBlocks } from "@/components/CmsAdditionalBlocks";
import { editableTree } from "@/lib/editable-tree";
import { pageFor } from "@/lib/site-content";
import { getSiteContent } from "@/lib/storage";
import { pageMetadata } from "@/lib/seo";
import { clinicalAssistant as bot } from "@/lib/clinical-assistant";
import styles from "./project.module.css";

export const metadata: Metadata = pageMetadata("Clinical Assistant Bot | Recepción por WhatsApp", "Conoce Clinical Assistant Bot de J R Consulting: recepción por WhatsApp, agenda y atención humana. Demo Benson, privacidad y términos de uso.", bot.path);

export default async function ClinicalAssistantPage() {
  const content = await getSiteContent();
  const page = pageFor(content, "clinical");
  return <VisualPage pageKey="clinical" initialPage={page}>{editableTree(<main className={styles.project}>
    <section className={styles.hero}>
      <div className={`section-shell ${styles.heroGrid}`}>
        <div><span className="label">J R Consulting · Proyecto HealthTech</span>
          <h1>{page.title}</h1><p className={styles.lead}>{page.description}</p>
          <div className="hero-actions"><Link className="button button--primary" href="/contacto">{page.primaryCta} <ArrowRight size={18} /></Link><Link className="button button--outline" href="#privacidad-y-terminos">{page.secondaryCta}</Link></div>
          <p className={styles.caption}>Demostración: Benson · J R Dental. Apoyo de recepción; no sustituye atención médica.</p>
        </div>
        <div className={styles.conversation} aria-label="Ejemplo ilustrativo de conversación; no es un chat activo">
          <div className={styles.chatHeader}><MessageCircle aria-hidden="true" /><div><strong>Benson</strong><span>Demo de recepción · J R Dental</span></div><span className={styles.demo}>DEMO</span></div>
          <div className={styles.chatBody}><p className={styles.bubble}>Hola, soy Benson, el asistente de recepción. ¿Qué necesitas consultar?</p><p className={styles.patient}>Quiero conocer los tratamientos y revisar un horario.</p><p className={styles.bubble}>Podemos consultar el catálogo y la disponibilidad. Antes de reservar, te pediré confirmar la fecha y la hora.</p><div className={styles.chatOptions}><span>Tratamientos y precios</span><span>Consultar horarios</span><span>Hablar con el equipo</span></div></div>
          <p className={styles.chatDisclaimer}>Ejemplo ilustrativo. No envíes datos de salud reales al demo.</p>
        </div>
      </div>
    </section>
    <section className="section-shell section-pad"><span className="label">Una recepción más clara</span><h2 className="section-heading">Del primer mensaje al siguiente paso.</h2><p className="section-intro">Un proyecto para organizar consultas administrativas, mantener el contexto y acercar a cada persona con el equipo adecuado.</p>
      <div className={styles.features}>{[
        { icon: BookOpen, title: "Información del catálogo", text: "Consulta tratamientos, precios y preguntas frecuentes registrados por el administrador, con menús y opciones de navegación." },
        { icon: CalendarDays, title: "Agenda con confirmación", text: "Revisa horarios y propone reservas o cancelaciones en Google Calendar. Cada acción requiere confirmación antes de ejecutarse." },
        { icon: Headphones, title: "Atención humana", text: "Permite solicitar al equipo que continúe la conversación. La respuesta depende de su disponibilidad; no es un canal de urgencias." },
        { icon: Mic, title: "Notas de voz", text: "Convierte audios en texto para continuar la conversación. Las transcripciones pueden tener errores: revisa los datos antes de confirmar." },
      ].map(({icon: Icon,title,text})=><article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className={styles.scope}><div className={`section-shell ${styles.scopeGrid}`}><div><span className="label">Estado del proyecto</span><h2>Benson es una demostración.</h2></div><div><p>J R Dental es el entorno demo de Clinical Assistant Bot. Sus conversaciones y reservas sirven para probar la experiencia; no representan una consulta ni una cita médica real.</p><p>Los avisos y recordatorios dependen de la configuración y aprobación de plantillas de WhatsApp. Las funciones de cada clínica se definen durante su implementación.</p><p><strong>No es un sistema de diagnóstico ni de prescripción.</strong> Ante una urgencia, acude a un servicio de urgencias o llama al 911 en México.</p></div></div></section>
    <section id="privacidad-y-terminos" className="section-shell section-pad"><span className="label">Información del servicio</span><h2 className="section-heading">Privacidad y condiciones, a la vista.</h2><div className={styles.legalCards}>
      <Link href={bot.privacyPath}><ShieldCheck aria-hidden="true" /><h3>Política de privacidad</h3><p>Qué datos recibe el bot, para qué los utiliza, qué proveedores intervienen y cómo ejercer tus derechos.</p><span>Leer política <ArrowRight size={18} /></span></Link>
      <Link href={bot.termsPath}><BookOpen aria-hidden="true" /><h3>Términos y condiciones</h3><p>Alcance del demo, uso permitido, funcionamiento de las citas y límites de la asistencia automatizada.</p><span>Leer términos <ArrowRight size={18} /></span></Link>
    </div><p className={styles.privacyContact}>¿Necesitas eliminar tus datos? <Link href={bot.deletionPath}>Consulta el procedimiento de solicitud</Link>.</p></section>
    <CmsAdditionalBlocks blocks={page.blocks} pageKey="clinical" />
  </main>, "clinical")}</VisualPage>;
}
