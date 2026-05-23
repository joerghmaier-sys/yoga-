export interface PranayamaExercise {
  id: string;
  name: string;
  germanName: string;
  description: string;
  duration: number;
  breathingPattern: string;
  benefits: string[];
  instructions: string[];
}

export interface Meditation {
  id: string;
  name: string;
  germanName: string;
  description: string;
  duration: number;
  focusPoint: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  affirmation?: string;
  musicUrl?: string;
}

export const PRANAYAMA_EXERCISES: PranayamaExercise[] = [
  {
    id: 'nadi-shodhana',
    name: 'Nadi Shodhana',
    germanName: 'Wechselatmung',
    description: 'Eine ausgleichende Atemtechnik, die beide Nasenlöcher nutzt',
    duration: 5,
    breathingPattern: '4-4-4',
    benefits: [
      'Beruhigt das Nervensystem',
      'Verbessert die Konzentration',
      'Balanciert die linke und rechte Gehirnhälfte',
      'Reduziert Stress und Angst'
    ],
    instructions: [
      'Setz dich aufrecht hin, Wirbelsäule gerade',
      'Schließ dein rechtes Nasenloch mit dem Daumen',
      'Atme langsam durch das linke Nasenloch ein (zähle 4)',
      'Schließ beide Nasenlöcher, halte an (zähle 4)',
      'Öffne das rechte Nasenloch, atme aus (zähle 4)',
      'Wiederhole 10-15 Zyklen'
    ]
  },
  {
    id: 'ujjayi',
    name: 'Ujjayi Breath',
    germanName: 'Siegreicher Atem',
    description: 'Ein wärmendes Pranayama, das den Atem verlangsamt',
    duration: 5,
    breathingPattern: '4-4-4-4',
    benefits: [
      'Erwärmt den Körper',
      'Verbessert die Ausdauer',
      'Beruhigt das Nervensystem',
      'Stärkt die Atemkontrolle'
    ],
    instructions: [
      'Setz dich komfortabel hin',
      'Atme durch die Nase ein, erzeuge einen sanften Ton im Hals',
      'Der Atem sollte wie das Meer klingen',
      'Atme langsam aus und erzeuge denselben Ton',
      'Praktiziere 5-10 Minuten'
    ]
  },
  {
    id: 'kapalabhati',
    name: 'Kapalabhati',
    germanName: 'Schädelbasis-Atmung',
    description: 'Eine energetisierende Atemtechnik mit aktiven Ausatmungen',
    duration: 5,
    breathingPattern: '1-1-1',
    benefits: [
      'Energetisiert und belebt',
      'Reinigt die Atemwege',
      'Verbessert die Konzentration',
      'Stärkt die Bauchmuskulatur'
    ],
    instructions: [
      'Setz dich aufrecht hin',
      'Atme tief ein durch die Nase',
      'Stoße schnell und kraftvoll durch die Nase aus',
      'Die Einatmung geschieht passiv',
      'Starte mit 30 schnellen Ausatmungen, dann Pause'
    ]
  },
  {
    id: 'bhramari',
    name: 'Bhramari',
    germanName: 'Bienentem',
    description: 'Ein entspannendes Pranayama mit summenden Tönen',
    duration: 3,
    breathingPattern: '4-summen-4',
    benefits: [
      'Beruhigt das Nervensystem',
      'Reduziert Angstzustände',
      'Verbessert die Stimme',
      'Hilft bei Migräne'
    ],
    instructions: [
      'Setz dich entspannt hin, Augen geschlossen',
      'Atme langsam ein durch die Nase',
      'Bei der Ausatmung mache einen summenden Laut wie eine Biene',
      'Der Laut sollte tief und konstant sein',
      'Wiederhole 5-10 Mal'
    ]
  }
];

export const MEDITATIONS: Meditation[] = [
  {
    id: 'morning-energy',
    name: 'Morning Energy Meditation',
    germanName: 'Morgen-Energie Meditation',
    description: 'Beginne deinen Tag mit Energie und Klarheit',
    duration: 10,
    focusPoint: 'Sonnenenergie und innere Kraft',
    level: 'beginner',
    affirmation: 'Ich bin erfüllt mit Kraft und Klarheit für den kommenden Tag',
    musicUrl: ''
  },
  {
    id: 'gratitude',
    name: 'Gratitude Meditation',
    germanName: 'Dankbarkeits-Meditation',
    description: 'Kultiviere ein Gefühl der Dankbarkeit',
    duration: 8,
    focusPoint: 'Dankbarkeit für alle Segnungen',
    level: 'beginner',
    affirmation: 'Ich bin dankbar für alles in meinem Leben',
    musicUrl: ''
  },
  {
    id: 'body-scan',
    name: 'Body Scan Meditation',
    germanName: 'Body-Scan Meditation',
    description: 'Erkunde deinen Körper von oben bis unten',
    duration: 15,
    focusPoint: 'Bewusstheit des Körpers',
    level: 'beginner',
    affirmation: 'Ich bin in meinem Körper präsent und achtsam',
    musicUrl: ''
  },
  {
    id: 'breath-awareness',
    name: 'Breath Awareness',
    germanName: 'Atem-Bewusstheit',
    description: 'Fokussiere dich auf den natürlichen Atem',
    duration: 12,
    focusPoint: 'Der natürliche Rhythmus des Atems',
    level: 'beginner',
    affirmation: 'Mit jedem Atem bin ich zentriert und ruhig',
    musicUrl: ''
  },
  {
    id: 'loving-kindness',
    name: 'Loving Kindness Meditation',
    germanName: 'Liebevolle-Güte Meditation',
    description: 'Verbreite Liebe und Mitgefühl',
    duration: 13,
    focusPoint: 'Universelle Liebe und Mitgefühl',
    level: 'intermediate',
    affirmation: 'Ich sende Liebe und Mitgefühl zu mir und der Welt',
    musicUrl: ''
  },
  {
    id: 'chakra-meditation',
    name: 'Chakra Meditation',
    germanName: 'Chakra-Meditation',
    description: 'Harmonisiere deine sieben Energiezentren',
    duration: 20,
    focusPoint: 'Die sieben Chakren',
    level: 'intermediate',
    affirmation: 'Meine Energie fließt frei und ausgewogen',
    musicUrl: ''
  }
];

export const MORNING_ROUTINE = {
  duration: 30,
  steps: [
    {
      name: 'Pranayama',
      defaultDuration: 5,
      options: PRANAYAMA_EXERCISES.slice(0, 2)
    },
    {
      name: 'Meditation',
      defaultDuration: 10,
      options: MEDITATIONS.filter(m => m.level === 'beginner')
    }
  ]
};
