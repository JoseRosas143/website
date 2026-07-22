import { Bell, Database, FileText, GitBranch, LayoutTemplate, Search, Sparkles } from "lucide-react";

export function BusinessSystemVisual() {
  return (
    <div className="system-visual" aria-label="Representación de website, estrategia y automatización integrados">
      <div className="browser-frame system-browser">
        <div className="browser-bar"><span className="traffic-lights"><i /><i /><i /></span><span>jrconsulting.mx</span></div>
        <div className="mini-site">
          <div className="mini-nav"><strong>JR</strong><span>Inicio&nbsp;&nbsp; Servicios&nbsp;&nbsp; Casos&nbsp;&nbsp; Contacto</span></div>
          <div className="mini-site-copy"><h3>Sistemas que impulsan negocios con claridad.</h3><p>Estrategia, tecnología e IA para convertir ideas en crecimiento.</p><span>Conocer servicios →</span></div>
          <div className="architectural-shape"><i /><i /></div>
        </div>
      </div>
      <div className="strategy-float">
        <h3><span /> Plan estratégico</h3>
        {["Diagnóstico", "Estrategia", "Ejecución"].map((item, index) => <p key={item}><b>0{index + 1}</b><span>{item}<small>{index === 0 ? "Entendemos el reto" : index === 1 ? "Definimos prioridades" : "Implementamos y medimos"}</small></span></p>)}
      </div>
      <div className="automation-float">
        <h3><span /> Automatización de procesos</h3>
        <div className="automation-flow">
          <span><FileText />Formulario</span><i>→</i><span><GitBranch />Clasificar</span><i>→</i><span><Bell />Notificar</span>
        </div>
        <div className="automation-db"><Database /> Registrar y dar seguimiento</div>
      </div>
      <Sparkles className="system-spark" aria-hidden="true" />
      <LayoutTemplate className="system-layout-icon" aria-hidden="true" />
      <Search className="system-search-icon" aria-hidden="true" />
    </div>
  );
}
