export type SubtitleChunk = { start: number; end: number; text: string };

export type VideoConfig = {
  lang: "en" | "es";
  colorTheme?: number;
  seed?: number;
  hook: { line1: string; line2: string; subline?: string };
  problem: { intro: string; stats: Array<{ value: string; label: string }> };
  chat: {
    label: string;
    messages: Array<{ from: "patient" | "amy"; text: string; delay: number }>;
    footer: string;
  };
  result: {
    mainStat: string;
    mainLabel: string;
    subStats: Array<{ n: string; l: string }>;
  };
  cta: { button: string; url: string };
  voice: { script: string };
  subtitles: SubtitleChunk[];
  social: {
    description: string;
    hashtags: string[];
    bestTime: string;
    hookText: string;
  };
};

// S1:0-75  ReHook:75-120  S2:120-270  S3:270-480  S4:480-690  S5:690-900
export const DEFAULT_CONFIG: VideoConfig = {
  lang: "en",
  hook: {
    line1: "3 patients called.",
    line2: "3 hung up.",
    subline: "That's $540 gone.",
  },
  problem: {
    intro: "Every missed call =",
    stats: [
      { value: "62%", label: "never call back" },
      { value: "$180", label: "per lost patient" },
      { value: "24/7", label: "your competitor never sleeps" },
    ],
  },
  chat: {
    label: "Active — answering now",
    messages: [
      { from: "patient", text: "Hi, I'd like to schedule a cleaning", delay: 10 },
      { from: "amy", text: "Of course! Tuesday 2pm or Thursday 10am — which works?", delay: 35 },
      { from: "patient", text: "Tuesday at 2", delay: 65 },
      { from: "amy", text: "✅ Confirmed for Tuesday at 2pm. Email on its way.", delay: 90 },
    ],
    footer: "3am — zero staff needed",
  },
  result: {
    mainStat: "3",
    mainLabel: "more appointments booked",
    subStats: [
      { n: "100%", l: "calls answered" },
      { n: "<30s", l: "response time" },
      { n: "24/7", l: "always on" },
    ],
  },
  cta: { button: "Start Free Trial — 14 days", url: "actualyza.com" },
  voice: {
    script: `3 patients called. 3 hung up. That's $540 gone — today alone. 62% of callers who don't get an answer never call back. Meet AMY. Your AI voice agent that answers every call, books the appointment, and follows up — automatically. 24 hours. 7 days. Zero staff. Clinics using AMY book 3 times more appointments. Start your free 14-day trial at actualyza.com.`,
  },
  subtitles: [
    { start: 0,   end: 55,  text: "3 patients called. 3 hung up." },
    { start: 55,  end: 90,  text: "That's $540 gone — today alone." },
    { start: 90,  end: 150, text: "62% of callers never call back." },
    { start: 150, end: 210, text: "Every missed call = lost revenue." },
    { start: 210, end: 270, text: "Meet AMY." },
    { start: 270, end: 360, text: "AI that answers every call, 24/7." },
    { start: 360, end: 430, text: "Books the appointment automatically." },
    { start: 430, end: 510, text: "Zero staff needed." },
    { start: 510, end: 600, text: "Clinics using AMY book 3× more." },
    { start: 600, end: 720, text: "3 times more appointments booked." },
    { start: 720, end: 840, text: "Start your free 14-day trial." },
    { start: 840, end: 900, text: "actualyza.com" },
  ],
  social: {
    description: "3 patients called today.\n3 hung up.\nThat's $540 gone. 📵\n\n62% of callers who don't get an answer never call back.\n\nAMY answers every call, books the appointment, and follows up — automatically. 24/7.\n\n✅ No staff needed\n✅ Books in real time\n✅ Follows up with leads\n\nStart your free 14-day trial 👇\nactualyza.com",
    hashtags: ["#DentalMarketing", "#MedicalPractice", "#AIReceptionist", "#PracticeGrowth", "#HealthcareAI", "#AMY", "#Actualyza", "#MissedCalls", "#PatientRetention", "#AutomationAI"],
    bestTime: "Tue–Thu, 7–9am or 6–8pm",
    hookText: "3 patients called today. 3 hung up. 📵",
  },
};

export const CONFIG_ES: VideoConfig = {
  lang: "es",
  hook: {
    line1: "3 pacientes llamaron.",
    line2: "3 colgaron.",
    subline: "Perdiste $540 hoy.",
  },
  problem: {
    intro: "Cada llamada perdida =",
    stats: [
      { value: "62%", label: "nunca vuelven a llamar" },
      { value: "$180", label: "por paciente perdido" },
      { value: "24/7", label: "tu competencia nunca duerme" },
    ],
  },
  chat: {
    label: "Activa — respondiendo ahora",
    messages: [
      { from: "patient", text: "Hola, quiero agendar una limpieza", delay: 10 },
      { from: "amy", text: "¡Claro! Martes 2pm o jueves 10am — ¿cuál te viene mejor?", delay: 35 },
      { from: "patient", text: "El martes a las 2", delay: 65 },
      { from: "amy", text: "✅ Confirmado para el martes a las 2pm. Te llega un email.", delay: 90 },
    ],
    footer: "3am — sin personal, sin costo extra",
  },
  result: {
    mainStat: "3",
    mainLabel: "veces más citas agendadas",
    subStats: [
      { n: "100%", l: "llamadas atendidas" },
      { n: "<30s", l: "tiempo de respuesta" },
      { n: "24/7", l: "siempre disponible" },
    ],
  },
  cta: { button: "Prueba Gratis — 14 días", url: "actualyza.com" },
  voice: {
    script: `3 pacientes llamaron. 3 colgaron. Eso son 540 dólares perdidos, solo hoy. El 62% de quienes no reciben respuesta nunca vuelven a llamar. Conoce a AMY. Tu agente de voz con inteligencia artificial que atiende cada llamada, agenda la cita y hace seguimiento — automáticamente. Las 24 horas. Los 7 días. Sin personal. Las clínicas que usan AMY agendan 3 veces más citas. Empieza tu prueba gratuita de 14 días en actualyza punto com.`,
  },
  subtitles: [
    { start: 0,   end: 55,  text: "3 pacientes llamaron. 3 colgaron." },
    { start: 55,  end: 90,  text: "Perdiste $540 hoy." },
    { start: 90,  end: 150, text: "El 62% nunca vuelve a llamar." },
    { start: 150, end: 210, text: "Cada llamada perdida = dinero perdido." },
    { start: 210, end: 270, text: "Conoce a AMY." },
    { start: 270, end: 360, text: "IA que atiende cada llamada, 24/7." },
    { start: 360, end: 430, text: "Agenda la cita automáticamente." },
    { start: 430, end: 510, text: "Sin necesidad de personal." },
    { start: 510, end: 600, text: "3 veces más citas agendadas." },
    { start: 600, end: 720, text: "Con AMY, tu clínica nunca descansa." },
    { start: 720, end: 840, text: "Prueba gratis por 14 días." },
    { start: 840, end: 900, text: "actualyza.com" },
  ],
  social: {
    description: "3 pacientes llamaron hoy.\n3 colgaron.\nEso son $540 perdidos. 📵\n\nEl 62% de quienes no reciben respuesta nunca vuelven a llamar.\n\nAMY atiende cada llamada, agenda la cita y hace seguimiento — automáticamente. 24/7.\n\n✅ Sin personal adicional\n✅ Agenda en tiempo real\n✅ Seguimiento automático de leads\n\nEmpieza tu prueba gratuita de 14 días 👇\nactualyza.com",
    hashtags: ["#MarketingDental", "#ClínicaMédica", "#RecepcionistaIA", "#CrecimientoClínica", "#IAenSalud", "#AMY", "#Actualyza", "#LlamadasPerdidas", "#RetenciónPacientes", "#AutomatizaciónIA"],
    bestTime: "Mar–Jue, 7–9am o 6–8pm",
    hookText: "3 pacientes llamaron hoy. 3 colgaron. 📵",
  },
};
