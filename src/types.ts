export type SubtitleChunk = { start: number; end: number; text: string };

export type VideoConfig = {
  lang: "en" | "es";
  colorTheme?: number;
  seed?: number;
  hook: { line1: string; line2: string; subline?: string };
  rehook?: { stat: string; label: string };
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

// ── StoryReel types ──────────────────────────────────────────

export type StoryBeat = {
  text: string;
  emoji?: string;
  sfx?: "ring" | "crash" | "notification" | "whoosh" | "tap";
  style?: "normal" | "impact" | "whisper";
  durationFrames?: number;
};

export type StoryConfig = {
  lang: "en" | "es";
  colorTheme?: number;
  seed?: number;
  opener: string;
  beats: StoryBeat[];
  twist: string;
  punchline: string;
  amyLine: string;
  benefits: string[];
  cta: { button: string; url: string };
  voice: { script: string };
  social: { description: string; hashtags: string[] };
};

export const DEFAULT_STORY_EN: StoryConfig = {
  lang: "en",
  colorTheme: 2,
  opener: "",
  beats: [
    { text: "He walked in. She already knew.", emoji: "📱", durationFrames: 240 },
    { text: "Three teeth.", emoji: "🦷💥", style: "impact", durationFrames: 150 },
    { text: "He called his lawyer.", emoji: "📞", durationFrames: 180 },
    { text: "It rang... and rang...", emoji: "😤", style: "whisper", durationFrames: 90 },
    { text: "He called his dentist.", emoji: "📞", durationFrames: 120 },
    { text: "Same thing.", emoji: "😭", style: "whisper", durationFrames: 60 },
  ],
  twist: "Why is no one picking up?",
  punchline: "But it wasn't her.",
  amyLine: "NOBODY had AMY.",
  benefits: [
    "Answers every call in under 30s",
    "100+ simultaneous calls, any language",
    "Books live — everything logged",
  ],
  cta: { button: "💬 Comment AMY → Free Trial", url: "actualyza.com" },
  voice: {
    script: "He walked in with his phone in his hand. His wife looked at him. He saw it in her eyes. She already knew. Without a word, she grabbed it... and knocked out three of his teeth. Desperate, he called his lawyer. It rang. And rang. No one answered. Then he called his dentist. Urgently. Same thing. Standing there, mouth broken, silence on the other end... he asked himself... why is no one picking up? He thought his wife had something to do with it. But no. What he didn't know was that neither his lawyer nor his dentist had AMY. An AI that answers every call in under 30 seconds, handles over 100 simultaneous calls in any language, books appointments live, and logs everything automatically. If you want your free trial, comment AMY. Or go to actualyza dot com.",
  },
  social: {
    description: "He walked in. She already knew. 📱\nWithout a word — she knocked out three of his teeth. 🦷💥\n\nHe called his lawyer. It rang and rang. No answer.\nHe called his dentist. Same thing.\n\nStanding there, mouth broken, he asked:\nWhy is no one picking up?\n\nNeither had AMY. 😳\n\nAMY answers every call in <30s, handles 100+ calls simultaneously, books live.\n💬 Comment AMY and get your free trial → actualyza.com",
    hashtags: ["#TrueStory", "#DentalHumor", "#AIReceptionist", "#AMY", "#Actualyza", "#MissedCalls", "#DentistLife", "#LawyerLife"],
  },
};

export const DEFAULT_STORY_ES: StoryConfig = {
  lang: "es",
  colorTheme: 2,
  opener: "",
  beats: [
    { text: "Llegó a casa. Ella ya lo sabía.", emoji: "📱", durationFrames: 240 },
    { text: "Tres dientes.", emoji: "🦷💥", style: "impact", durationFrames: 150 },
    { text: "Llamó a su abogado.", emoji: "📞", durationFrames: 180 },
    { text: "Sonaba... sonaba...", emoji: "😤", style: "whisper", durationFrames: 90 },
    { text: "Llamó a su dentista.", emoji: "📞", durationFrames: 120 },
    { text: "Tampoco.", emoji: "😭", style: "whisper", durationFrames: 60 },
  ],
  twist: "¿Por qué nadie me contesta?",
  punchline: "Pero no era ella.",
  amyLine: "NADIE tenía AMY.",
  benefits: [
    "Contesta cada llamada en menos de 30s",
    "+100 llamadas simultáneas, cualquier idioma",
    "Agenda en vivo — todo registrado",
  ],
  cta: { button: "💬 Comenta AMY → Prueba Gratis", url: "actualyza.com" },
  voice: {
    script: `Llegó a la casa con el teléfono en la mano.
Su esposa lo miró. Él lo vio en sus ojos.
Ya sabía.
Sin decir nada, ella se lo quitó de las manos — y de un golpe le voló tres dientes.
Él, desesperado, marcó a su abogado.
El teléfono sonaba. Sonaba. Nadie contestó.
Entonces llamó a su dentista. Con urgencia.
Tampoco.
Parado ahí, con la boca rota y el silencio del otro lado,
se preguntó: ¿por qué nadie me contesta?
Pensó que su esposa tenía algo que ver.
Pero no.
Lo que él no sabía era que ni su abogado ni su dentista tenían AMY —
una infraestructura de inteligencia artificial que contesta cada llamada en menos de 30 segundos,
gestiona más de 100 llamadas simultáneas en distintos idiomas,
agenda en vivo, y deja todo registrado.
Si quieres tu prueba gratis, comenta AMY —
o entra a actualyza.com`,
  },
  social: {
    description: "Llegó a casa. Ella ya lo sabía. 📱\nSin decir nada — le voló tres dientes. 🦷💥\n\nLlamó a su abogado. Sonaba y sonaba. Nadie.\nLlamó a su dentista. Tampoco.\n\nParado ahí, con la boca rota, se preguntó:\n¿Por qué nadie me contesta?\n\nNinguno tenía AMY. 😳\n\nAMY contesta cada llamada en <30s, gestiona +100 llamadas simultáneas, agenda en vivo.\n💬 Comenta AMY y te damos tu prueba gratis → actualyza.com",
    hashtags: ["#HistoriaReal", "#HumorDental", "#RecepcionistaIA", "#AMY", "#Actualyza", "#LlamadasPerdidas", "#Dentista", "#Abogado"],
  },
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
