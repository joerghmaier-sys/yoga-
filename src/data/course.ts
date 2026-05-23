export interface CourseLesson {
  tag: number;
  sanskritWort: string;
  aussprache: string;
  bedeutung: string;
  yogaWeisheit: string;
  gottheit: string;
  gottheitBeschreibung: string;
  geschichte: string;
  reflexionsfragen: string[];
}

export interface CourseBlock {
  id: string;
  blockNr: number;
  name: string;
  tage: number;
  status: 'completed' | 'active' | 'locked';
  lektionen: CourseLesson[];
}

export const COURSE_DATA: CourseBlock[] = [
  {
    id: 'block_1',
    blockNr: 1,
    name: 'Fundament: Die Grundlagen des Yoga',
    tage: 12,
    status: 'completed',
    lektionen: [
      {
        tag: 1,
        sanskritWort: 'Yoga',
        aussprache: '[JO-ga]',
        bedeutung: 'Vereinigung – die Verbindung von Atem, Körper und Geist',
        yogaWeisheit: '"Yogah Chitta Vritti Nirodhah" – Yoga ist die Beruhigung der Gedankenwellen des Geistes. (Yoga Sutras 1.2)',
        gottheit: 'Shiva',
        gottheitBeschreibung: 'Der erste Yoga-Meister, der alle Posen und Atemtechniken lehrte',
        geschichte: 'Der Wanderer und die Statue: Ein Mann suchte überall nach Glück, bis er erfuhr, dass es in der Ruhe des Geistes liegt.',
        reflexionsfragen: [
          'Was bedeutet Yoga für dich persönlich?',
          'Wie verbindest du derzeit Atem und Bewegung?',
        ],
      },
      {
        tag: 2,
        sanskritWort: 'Prana',
        aussprache: '[PRA-na]',
        bedeutung: 'Lebensenergie – die unsichtbare Kraft, die alles belebt',
        yogaWeisheit: '"Der Atem ist das Pferd, die Gedanken sind der Reiter" – Alte Yoga-Weisheit',
        gottheit: 'Vayu',
        gottheitBeschreibung: 'Der Windgott, der die Prana durch den Körper trägt',
        geschichte: 'Der Baum und der Wind: Der Baum konnte nicht sehen, wer ihn bewegte, bis er lernte, den Wind zu spüren.',
        reflexionsfragen: [
          'Kannst du deine Prana fühlen?',
          'Wie beeinflusst dein Atem deine Stimmung?',
        ],
      },
    ],
  },
  {
    id: 'block_2',
    blockNr: 2,
    name: 'Upanishaden: Das Geheimnis des Absoluten',
    tage: 28,
    status: 'active',
    lektionen: [
      {
        tag: 1,
        sanskritWort: 'Upanishad',
        aussprache: '[u-pa-ni-SCHAD]',
        bedeutung: 'Sich nahe hinsetzen – die heiligen Weisheiten, die ein Guru seinen Schülern flüstert',
        yogaWeisheit: '"Tat Tvam Asi" – Das bist du. (Chandogya Upanishad) Du bist nicht getrennt vom Absoluten.',
        gottheit: 'Brahman',
        gottheitBeschreibung: 'Das Absolute ohne Form – das Sein, das Bewusstsein, die Seligkeit (Sat-Chit-Ananda)',
        geschichte: 'Der Wassertropfen: Ein Wassertropfen fürchtete sich vor dem Ozean, bis er erfuhr, dass er bereits Teil des Ozeans war.',
        reflexionsfragen: [
          '"Tat Tvam Asi" – Das bist du. Was bedeutet das für dich?',
          'Wer bist du wirklich, wenn du all deine Rollen ablegst?',
        ],
      },
      {
        tag: 2,
        sanskritWort: 'Brahman',
        aussprache: '[BRAH-man]',
        bedeutung: 'Das Absolute – das Unendliche, Ewige, Unvergängliche',
        yogaWeisheit: '"Brahman ist wirklich. Die Welt ist Maya (Illusion). Der Atman (Selbst) ist nicht verschieden von Brahman" – Adi Shankara',
        gottheit: 'Brahma',
        gottheitBeschreibung: 'Der Schöpfergott – der das Universum aus Brahman manifestiert',
        geschichte: 'Das Paradox der Bewegung: Wie kann das Absolute sich bewegen? Wie kann das Ewige Zeit erfahren?',
        reflexionsfragen: [
          'Ist dein wahres Selbst ewig oder vergänglich?',
          'Wenn alles Brahman ist, was bedeutet das für deine Probleme?',
        ],
      },
      {
        tag: 3,
        sanskritWort: 'Atman',
        aussprache: '[AHT-man]',
        bedeutung: 'Das Selbst – die unsterbliche Seele, identisch mit Brahman',
        yogaWeisheit: '"Aham Brahmasmi" – Ich bin Brahman. (Brihadaranyaka Upanishad) Mein wahres Selbst ist unendlich.',
        gottheit: 'Hari (Vishnu)',
        gottheitBeschreibung: 'Der Bewahrer – der dein Atman beschützt und führt',
        geschichte: 'Der König und sein Sklave: Ein König wurde verzaubert und glaubte, ein Sklave zu sein. Als er erwachte, war er wieder ein König.',
        reflexionsfragen: [
          'Glaubst du, dass dein Atman unvergänglich ist?',
          'Welche Unterschiede siehst du zwischen dir und anderen, wenn alle Atman sind?',
        ],
      },
    ],
  },
  {
    id: 'block_3',
    blockNr: 3,
    name: 'Das Bhagavad Gita: Der Weg des Handelns',
    tage: 28,
    status: 'locked',
    lektionen: [],
  },
  {
    id: 'block_4',
    blockNr: 4,
    name: 'Die Chakras: Energiezentren des Körpers',
    tage: 28,
    status: 'locked',
    lektionen: [],
  },
  {
    id: 'block_5',
    blockNr: 5,
    name: 'Tantra: Die Kraft der Energie',
    tage: 28,
    status: 'locked',
    lektionen: [],
  },
  {
    id: 'block_6',
    blockNr: 6,
    name: 'Die Mahabharata: Krieg und Dharma',
    tage: 28,
    status: 'locked',
    lektionen: [],
  },
  {
    id: 'block_7',
    blockNr: 7,
    name: 'Bhakti: Der Weg der Hingabe',
    tage: 28,
    status: 'locked',
    lektionen: [],
  },
  {
    id: 'block_8',
    blockNr: 8,
    name: 'Samadhi: Die höchste Erkenntnis',
    tage: 28,
    status: 'locked',
    lektionen: [],
  },
  {
    id: 'block_9',
    blockNr: 9,
    name: 'Kundalini: Die schlafende Göttin erwecken',
    tage: 28,
    status: 'locked',
    lektionen: [],
  },
  {
    id: 'block_10',
    blockNr: 10,
    name: 'Integration: Der Weg zurück zum Leben',
    tage: 28,
    status: 'locked',
    lektionen: [],
  },
];
