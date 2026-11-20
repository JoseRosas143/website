export const clinicalAssistant = {
  name: "Clinical Assistant Bot",
  path: "/clinical-assistant-bot",
  privacyPath: "/clinical-assistant-bot/privacidad",
  termsPath: "/clinical-assistant-bot/terminos",
  deletionPath: "/clinical-assistant-bot/privacidad#eliminacion-de-datos",
  updated: "19 de noviembre de 2026",
  controller: "Jose Abraham Rosas",
  address: "Av. 5 de mayo 25, Vicente Suarez, Puebla, México",
  email: "contacto@jrconsulting.com.mx",
};

export const clinicalPrivacySections = [
  { id: "responsable", title: "1. Responsable y alcance", paragraphs: [
    `${clinicalAssistant.controller}, quien opera bajo el nombre comercial J R Consulting, con domicilio en ${clinicalAssistant.address}, es responsable del tratamiento de datos del proyecto Clinical Assistant Bot. Para asuntos de privacidad escribe a ${clinicalAssistant.email}.`,
    "Esta política corresponde al asistente de recepción por WhatsApp de J R Consulting y a su demostración Benson para J R Dental. J R Dental es un entorno de demostración; no se presenta aquí como una clínica que preste atención médica. Una implementación para otra clínica deberá identificar a su propio responsable y proporcionar el aviso aplicable antes de recabar datos de pacientes.",
  ] },
  { id: "datos", title: "2. Información que recibe el servicio", paragraphs: [
    "Al interactuar por WhatsApp se procesa tu número de teléfono, el nombre que proporcionas, el contenido de tus mensajes y las respuestas del asistente o del equipo humano. También se registran identificadores de mensajes, fechas, estado de la conversación y resultados de envío o entrega para operar el servicio y evitar respuestas duplicadas.",
    "Si solicitas una cita de demostración, se utilizan tu nombre, teléfono, fecha y horario solicitados, así como los registros de confirmación o cancelación. Si envías una nota de voz, el servicio descarga el audio desde Meta y lo envía a OpenAI para transcribirlo; el texto resultante puede incorporarse a la conversación.",
    "La base de datos contempla campos de edad y de alergias o medicamentos. Su existencia no significa que se requieran para probar el bot. No compartas datos de salud reales, expedientes, estudios, identificaciones ni información de terceros en esta demostración. Si los incluyes en un mensaje o audio, pueden formar parte del contenido procesado y almacenado.",
  ] },
  { id: "finalidades", title: "3. Para qué se utilizan", paragraphs: [
    "Los datos se utilizan para identificar la conversación, responder consultas sobre el catálogo de tratamientos y preguntas frecuentes del demo, gestionar solicitudes de agenda y cancelaciones, y permitir que una persona del equipo continúe la conversación cuando solicites atención humana.",
    "También permiten operar avisos de citas cuando estén habilitados, investigar incidencias y comprobar el procesamiento de mensajes. La recepción de recordatorios depende de la configuración y aprobación de las plantillas de WhatsApp; no constituye una garantía de entrega.",
    "Estas finalidades no incluyen vender datos, enviar publicidad ajena al servicio ni crear campañas comerciales a partir de tus conversaciones. Una finalidad distinta requerirá informarte y obtener el consentimiento que corresponda.",
  ] },
  { id: "proveedores", title: "4. Proveedores y circulación de datos", paragraphs: [
    "Meta / WhatsApp transporta los mensajes y las notas de voz. Supabase almacena el perfil, el historial de conversación y los registros operativos. OpenAI procesa el contexto de conversación necesario para generar respuestas y los audios enviados para su transcripción. Google Calendar gestiona las citas e incorpora el nombre, el horario y el teléfono asociado al evento. Vercel aloja y ejecuta el servicio y puede procesar metadatos y registros técnicos de funcionamiento.",
    "Cuando pides hablar con una persona, el contenido necesario se comunica al equipo autorizado para atenderte. El procesamiento por proveedores puede ocurrir fuera de México. Cada proveedor aplica sus condiciones y prácticas de conservación; esta política no promete que sus copias o registros desaparezcan de inmediato ni que toda la conversación permanezca exclusivamente en tu dispositivo.",
    "El uso de estos proveedores sirve para operar el asistente. Cualquier comunicación adicional a terceros deberá contar con fundamento legal o con la autorización que resulte aplicable. Las solicitudes de autoridades se atenderán cuando sean legalmente exigibles.",
  ] },
  { id: "datos-sensibles", title: "5. Datos sensibles y menores", paragraphs: [
    "El demo está dirigido a personas adultas que prueban funciones de recepción con información ficticia. No está habilitado como expediente clínico ni como canal para recabar datos de salud de pacientes reales. El tratamiento de datos sensibles exige un consentimiento específico cuando la ley lo requiere; escribir al bot o aceptar sus términos no sustituye ese consentimiento.",
    "No uses el demo para enviar información de menores de edad. Si detectas un envío accidental de datos sensibles o de un menor, contacta al responsable para solicitar su revisión y eliminación, sin repetir la información clínica en el correo.",
  ] },
  { id: "conservacion", title: "6. Conservación y seguridad", paragraphs: [
    "El historial y los registros operativos se guardan en la infraestructura del servicio; cerrar WhatsApp o borrar un chat del teléfono no elimina esas copias. La versión actual no ofrece un borrado automático del historial al terminar una sesión. Puedes solicitar la eliminación mediante el procedimiento indicado a continuación.",
    "La conservación debe limitarse a las finalidades descritas y a las obligaciones legales aplicables. Cuando proceda una solicitud, se revisarán los datos de la base de datos, los eventos del calendario y los registros asociados. Puede ser necesario conservar información bloqueada por obligaciones legales o responsabilidades pendientes; se explicará esa situación al responder.",
    "El servicio emplea controles de acceso al servidor y a la base de datos, y verificación de los mensajes entrantes de Meta. Ningún sistema elimina por completo el riesgo de incidentes. Si detectas un acceso indebido, notifícalo al contacto de privacidad.",
  ] },
  { id: "eliminacion-de-datos", title: "7. Derechos ARCO, revocación y eliminación de datos", paragraphs: [
    `Puedes solicitar acceso, rectificación, cancelación u oposición; revocar tu consentimiento; limitar el uso de tus datos; o pedir su eliminación. Envía un correo a ${clinicalAssistant.email} con el asunto «Privacidad — Clinical Assistant Bot» o «Eliminar datos — Clinical Assistant Bot».`,
    "Incluye tu nombre, el número de WhatsApp con el que usaste el bot, una descripción clara de la solicitud y un medio para recibir respuesta. Si actúas en representación de otra persona, indícalo. Te comunicaremos el procedimiento razonable para acreditar identidad o representación; no adjuntes expedientes ni documentos de identidad completos sin que se te soliciten por un medio adecuado.",
    "La solicitud será revisada manualmente. Recibirás respuesta conforme a los plazos legales aplicables y se te informará del alcance de la eliminación, las excepciones justificadas y las gestiones necesarias con proveedores. Revocar el consentimiento puede impedir continuar algunas funciones del bot y no tiene efectos retroactivos. Para copias bajo el control independiente de WhatsApp u otro proveedor, también puedes ejercer tus derechos directamente ante ese proveedor.",
  ] },
  { id: "cambios", title: "8. Cambios y contacto", paragraphs: [
    "Las modificaciones se publicarán en esta misma dirección con su fecha de actualización. Los cambios de finalidad o de tratamiento que requieran autorización no se considerarán aceptados únicamente por actualizar esta página. Las consultas comerciales y el asistente general del sitio de J R Consulting se rigen por el aviso del sitio, distinto de esta política del bot.",
  ] },
];

export const clinicalTermsSections = [
  { id: "alcance", title: "1. Servicio y alcance", paragraphs: [
    `Clinical Assistant Bot es un proyecto de ${clinicalAssistant.controller}, bajo el nombre comercial J R Consulting. Su demostración Benson para J R Dental permite explorar la recepción por WhatsApp, la consulta de un catálogo, las preguntas frecuentes, la agenda y la derivación a atención humana.`,
    "El demo utiliza datos de prueba y no representa una contratación de atención médica. Las funciones disponibles en cada implementación dependen de su configuración y del acuerdo con la clínica. El acceso al demo no constituye una suscripción de pago ni una promesa de disponibilidad comercial.",
  ] },
  { id: "limites", title: "2. No sustituye atención profesional", paragraphs: [
    "El bot es una herramienta de apoyo administrativo. No diagnostica, prescribe, interpreta estudios ni sustituye la evaluación de un profesional de salud. Las respuestas generadas con inteligencia artificial pueden contener errores o información incompleta y deben verificarse con el equipo responsable.",
    "No utilices este canal para emergencias. Ante una urgencia, acude a un servicio de urgencias o llama al número de emergencias de tu localidad; en México, 911. Solicitar atención humana no garantiza respuesta inmediata ni atención clínica.",
  ] },
  { id: "uso", title: "3. Uso permitido", paragraphs: [
    "Utiliza el demo únicamente si eres mayor de edad y tienes autorización para usar el número de WhatsApp correspondiente. Emplea información ficticia para los ejemplos de pacientes. No suplantes identidades, compartas datos ajenos sin autorización, envíes contenido ilícito ni intentes acceder a conversaciones, citas o funciones administrativas de otras personas.",
    "No envíes expedientes, datos de salud reales, medios de pago ni contraseñas. Si compartes información accidentalmente, utiliza el procedimiento de privacidad y eliminación de datos. Consulta la política antes de interactuar; estos términos no sustituyen el consentimiento específico exigible para datos sensibles.",
  ] },
  { id: "agenda", title: "4. Citas, precios y avisos", paragraphs: [
    "Los tratamientos y precios del demo ilustran un catálogo y no constituyen una oferta de atención clínica. En una implementación real, la clínica debe confirmar la información, las condiciones y el precio final antes de contratar un servicio.",
    "La propuesta de un horario no equivale a una reserva: revisa la fecha y la hora, confirma la acción y espera el resultado del sistema. Las cancelaciones también requieren confirmación. Una cita del demo es una prueba de agenda, no una cita médica real.",
    "Los recordatorios y avisos dependen de WhatsApp, sus plantillas, la conectividad y la configuración del servicio. La falta de un aviso no confirma ni cancela una cita. Para resolver dudas o solicitar intervención humana, contacta al equipo responsable.",
  ] },
  { id: "terceros", title: "5. Plataformas e inteligencia artificial", paragraphs: [
    "El funcionamiento depende de Meta / WhatsApp, OpenAI, Supabase, Google Calendar y Vercel. Sus políticas, límites, mantenimientos o interrupciones pueden afectar al bot. J R Consulting no afirma una certificación, alianza o respaldo de esos proveedores por el solo hecho de utilizar sus servicios.",
    "La transcripción de audio puede equivocarse. Comprueba cualquier nombre, fecha u horario antes de confirmar una acción. El acceso de administradores está reservado a personas autorizadas; los usuarios no deben compartir credenciales ni intentar eludir las restricciones.",
  ] },
  { id: "responsabilidad", title: "6. Disponibilidad y responsabilidad", paragraphs: [
    "El demo puede cambiar, suspenderse o interrumpirse por mantenimiento, seguridad o evolución del proyecto. No se garantiza funcionamiento continuo, ausencia de errores ni un resultado clínico o comercial. El equipo podrá limitar accesos que comprometan la seguridad o vulneren estos términos.",
    "Estas condiciones no excluyen responsabilidades que no puedan limitarse por ley ni eliminan los derechos que te correspondan. Los servicios de implementación para clínicas, soporte, precios y niveles de servicio se pactan en un acuerdo separado.",
  ] },
  { id: "propiedad", title: "7. Contenido y propiedad intelectual", paragraphs: [
    "La identidad y los materiales propios de J R Consulting pertenecen a sus titulares. El uso del demo no transfiere derechos sobre el software o la marca. Los datos que aportas no pasan a ser propiedad de J R Consulting; se tratan conforme a la política de privacidad. Las marcas de terceros conservan sus respectivos titulares.",
  ] },
  { id: "contacto", title: "8. Contacto, cambios y legislación", paragraphs: [
    `Para consultas del proyecto o de estos términos escribe a ${clinicalAssistant.email}. El domicilio de contacto es ${clinicalAssistant.address}.`,
    "Los cambios se publicarán en esta página con su fecha. Las controversias se atenderán conforme a la legislación mexicana aplicable y ante las autoridades competentes, sin renunciar a derechos irrenunciables ni imponer una jurisdicción que los limite.",
  ] },
];
