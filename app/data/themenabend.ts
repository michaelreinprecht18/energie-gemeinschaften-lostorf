export type ProgrammPunkt = { zeit: string; titel: string; details?: string[] }

export type Themenabend = {
  kicker: string
  datum: string
  ort: string
  start: string
  ende: string
  titel: string
  ziel: string
  etappenTitel: string
  etappen: string[]
  programm: ProgrammPunkt[]
}

export const THEMENABEND: Themenabend = {
  kicker: '5. Energiestadt Themenabend',
  datum: 'Mittwoch, 27. Januar 2027',
  ort: 'Aula Schulhaus 1912, Lostorf',
  start: '2027-01-27T18:30:00+01:00',
  ende: '2027-01-27T21:00:00+01:00',
  titel: 'Für Winter & Sommer dämmen',
  ziel: 'Der Abend zeigt der interessierten Bevölkerung Lostorfs, welche Bedeutung das energetische Sanieren hat und wie es angegangen werden kann. Das ist besonders jetzt wichtig, vor der Abschaffung des Eigenmietwerts per 1.1.2029.',
  etappenTitel: 'In vier Etappen zur Sanierung',
  etappen: ['Wärmebildauswertung', 'GEAK-Analyse', 'Finanzplanung', 'Umsetzungsplanung'],
  programm: [
    { zeit: '18:30', titel: 'Türöffnung / Marktstände' },
    {
      zeit: '19:00',
      titel: 'Fachreferate',
      details: [
        'Wärmebild- und GEAK-Analyse (Energieberater)',
        'Finanzierung (Finanzplaner)',
        'Umsetzungsplanung (Architekt/Fachplaner)',
      ],
    },
    {
      zeit: '19:45',
      titel: 'Austausch am Marktstand',
      details: ['Marktstand Wärmebild- und GEAK-Analyse', 'Marktstand Dämmung', 'Marktstand Finanzplaner'],
    },
    { zeit: '20:40', titel: 'Wrap-Up im Plenum' },
    { zeit: '21:00', titel: 'Schluss & Apéro' },
  ],
}
