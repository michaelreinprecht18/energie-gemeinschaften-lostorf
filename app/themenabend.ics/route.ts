import { THEMENABEND } from '../data/themenabend'

export const dynamic = 'force-static'

const SITE_URL = 'https://lostorf.solar'

const escapeText = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')

const formatUtc = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

const fold = (line: string) => {
  const parts: string[] = []
  let rest = line
  while (rest.length > 73) {
    parts.push(rest.slice(0, 73))
    rest = ' ' + rest.slice(73)
  }
  parts.push(rest)
  return parts.join('\r\n')
}

export function GET() {
  const t = THEMENABEND

  const programm = t.programm
    .map(p => [`${p.zeit} ${p.titel}`, ...(p.details ?? []).map(d => `   ${d}`)].join('\n'))
    .join('\n')
  const beschreibung = `${t.ziel}\n\nVorläufiges Programm:\n${programm}\n\nMehr Infos: ${SITE_URL}/#themenabende`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//lostorf.solar//Themenabend//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:themenabend-${t.start.slice(0, 10)}@lostorf.solar`,
    `DTSTAMP:${formatUtc(new Date().toISOString())}`,
    `DTSTART:${formatUtc(t.start)}`,
    `DTEND:${formatUtc(t.ende)}`,
    `SUMMARY:${escapeText(`${t.kicker}: ${t.titel}`)}`,
    `LOCATION:${escapeText(t.ort)}`,
    `DESCRIPTION:${escapeText(beschreibung)}`,
    `URL:${SITE_URL}/#themenabende`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  return new Response(lines.map(fold).join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="Energiestadt-Themenabend-${t.start.slice(0, 10)}.ics"`,
    },
  })
}
