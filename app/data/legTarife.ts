export type LegTarifPaar = { hochtarif: string; niedertarif: string }

export const LEG_TARIFE = {
  jahr: '2027',
  produzenten: { hochtarif: '13.05', niedertarif: '11.80' } as LegTarifPaar,
  konsumenten: { hochtarif: '15.05', niedertarif: '13.80' } as LegTarifPaar,
  zeiten: 'Hochtarif: Montag bis Freitag, 6–21 Uhr. Niedertarif: übrige Zeiten.',
  gebuehr: 'In den Tarifen ist die LEG-Abrechnungsgebühr von 1 Rp./kWh bereits enthalten.',
}
