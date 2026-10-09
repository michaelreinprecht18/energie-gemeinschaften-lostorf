export type FaqLink = { label: string; href: string }
export type FaqItem = { q: string; a: string; links?: FaqLink[] }
export type FaqGroup = { id: string; title: string; items: FaqItem[] }

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'allgemein',
    title: 'Allgemein',
    items: [
      {
        q: "Lohnt es sich noch, eine eigene PV-Anlage zu installieren?",
        a: "Ja, in den meisten Fällen weiterhin, vor allem wenn möglichst viel Solarstrom selbst genutzt wird. Eingespeister Strom wird nur noch tief vergütet (Mindestvergütung 6 Rp./kWh bei Anlagen unter 150 kWp), während Netzstrom mit den Primeo-Tarifen 2027 je nach Tarif rund 28 bis 34 Rp./kWh kostet (Energie, Netz und Abgaben, inkl. MwSt.). Jede selbst verbrauchte Kilowattstunde ist deshalb deutlich mehr wert als eine eingespeiste.\n\nMit einem intelligenten Energiemanagementsystem und einer Batterie lässt sich der Eigenverbrauch stark steigern: Wärmepumpe, Warmwasser und Elektroauto laufen dann, wenn die Sonne scheint, und die Batterie hebt den Mittagsüberschuss für Abend und Nacht auf. Laut EnergieSchweiz lässt sich der Netzbezug über die reine PV-Anlage hinaus praktisch nur mit Speichern und einer intelligenten Regelung weiter senken. Als Faustregel (Swissolar) genügt oft ein Speicher von rund 1 kWh pro 1'000 kWh Jahresverbrauch.\n\nDazu kommen Förderungen: die Einmalvergütung des Bundes für die PV-Anlage und der Energiefonds von Primeo, der sich mit bis zu 30 % an den Kosten eines Batteriespeichers beteiligt. Ob sich eine Anlage für dein Haus rechnet, hängt von Dach, Verbrauch und Speichergrösse ab. Eine Beratung durch eine Fachperson oder der Solarrechner von EnergieSchweiz geben dir eine genaue Antwort.",
        links: [
          { label: "EnergieSchweiz/BFE: Faktenblatt «Photovoltaik Eigenverbrauch» (2022)", href: "https://pubdb.bfe.admin.ch/de/publication/download/11200" },
          { label: "Swissolar: Merkblatt Nr. 13 «Planung und Installation von stationären Batteriespeichern»", href: "https://www.swissolar.ch/01_wissen/fachwissen/photovoltaik/merkblaetter/21013d_merkblatt_pv_speicher.pdf" },
        ],
      },
      {
        q: "Kann man eine PV-Anlage oder einen Batteriespeicher von den Steuern abziehen?",
        a: "Das hängt davon ab, ob es ein Neubau oder ein bestehendes Haus ist. Die Angaben gelten für selbstgenutztes Wohneigentum im Kanton Solothurn (Solothurner Steuerbuch, Fassung vom 24.04.2025).\n\n• Bestehendes Haus: Ja. Die Kosten für eine PV-Anlage (auch freistehend auf demselben Grundstück) gelten als Energiespar- und Umweltschutzmassnahme und können bei der Einkommenssteuer abgezogen werden. Das gilt seit einem Urteil des Steuergerichts von 2022 auch für Batteriespeicher, besonders mit intelligenter Steuerung. Nicht abziehbar sind mobile Balkonkraftwerke.\n• Neubau: Nein. Bei Neubauten, Ersatzneubauten und Gebäuden, die in den letzten fünf Jahren fertiggestellt wurden, sind die Kosten nicht abziehbar, auch nicht für den Batteriespeicher. Die Frist von fünf Jahren beginnt mit der Fertigstellung beziehungsweise Bezugsbereitschaft. Die Kosten zählen dann zu den Anlagekosten und senken später bei einem Verkauf die Grundstückgewinnsteuer. Wird die Anlage auf einem neu gebauten Anbau installiert (zum Beispiel einem Carport), ist sie abziehbar, wenn das Hauptgebäude älter als fünf Jahre ist.\n\nIn der Steuererklärung ist der effektive Abzug für den Liegenschaftsunterhalt zu wählen, mit der Pauschale ist dieser Abzug bereits abgegolten. Förderbeiträge wie die Einmalvergütung vermindern den Abzug, denn abziehbar ist nur der selbst getragene Teil. Kosten, die im Rechnungsjahr nicht vollständig abgezogen werden können, lassen sich auf die zwei folgenden Steuerjahre übertragen, wenn das Reineinkommen negativ ist.\n\nWie lange noch? Der Bundesrat hat die Abschaffung des Eigenmietwerts auf den 1. Januar 2029 in Kraft gesetzt. Bis und mit Steuerjahr 2028 gelten die heutigen Abzüge. Danach entfällt der Abzug für Energiespar- und Umweltschutzinvestitionen bei der direkten Bundessteuer. Die Kantone können ihn weiterführen, aber nur zeitlich begrenzt. Wie der Kanton Solothurn dies für die Staatssteuer regelt, sollte vor einem Projekt beim Kantonalen Steueramt erfragt werden. Wer vom Abzug profitieren will, realisiert und bezahlt die Anlage am besten bis Ende 2028.\n\nDas ist keine Steuerberatung. Verbindlich ist die Auskunft des Kantonalen Steueramts Solothurn.",
        links: [
          { label: "Solothurner Steuerbuch § 27 Nr. 4: Betrieb einer Photovoltaikanlage (24.04.2025)", href: "https://steuerbuch.so.ch/fileadmin/steuerbuch/aktuell/027-04_Photovoltaikanlage_V06_2025-04-24.pdf" },
          { label: "Solothurner Steuerbuch § 39 Nr. 2: Liegenschaftskosten (24.04.2025)", href: "https://steuerbuch.so.ch/fileadmin/steuerbuch/aktuell/039-02_Liegenschaftskosten_V14_2025-04-24.pdf" },
          { label: "Bundesrat: Reform der Wohneigentumsbesteuerung ab 1. Januar 2029 (Medienmitteilung 01.04.2026)", href: "https://www.admin.ch/de/newnsb/yGTqBPowRqyVh0zPokW-q" },
        ],
      },
    ],
  },
  {
    id: 'vzev',
    title: 'vZEV',
    items: [
      {
        q: "Muss der vZEV-Verwalter die gesamte Stromrechnung der Gemeinschaft an Primeo bezahlen?",
        a: "Ja, formell schon. Der vZEV hat gegenüber dem Netzbetreiber (in Lostorf Primeo) nur einen einzigen Messpunkt. Die vZEV-Vertretung, also der vZEV-Verwalter, ist Vertragspartner des Netzbetreibers für Netzanschluss, Messdienstleistungen und Grundversorgung. Deshalb geht die Rechnung für den Strombezug der ganzen Gemeinschaft an ihn.\n\nDie Kosten bleiben aber nicht beim vZEV-Verwalter hängen: Er verteilt die Netzrechnung anhand der Smartmeter-Messdaten auf die Teilnehmenden und verrechnet ihnen Netzstrom und Solarstrom. Der Netzstrompreis ergibt sich aus den effektiv verrechneten Kosten des Netzbetreibers. Dafür bietet Primeo die Software «Primeo EasyBill» an. Daneben gibt es private Anbieter wie zevvy, die die Abrechnung für ZEV, vZEV und LEG als Plattform übernehmen. Ob ein Anbieter zusätzlich Rechnungsversand und Inkasso übernimmt, ist je nach Angebot verschieden und sollte vor Vertragsabschluss geklärt werden. Gemäss der Vertragsvorlage von Primeo erfolgt die Abrechnung quartalsweise nach Eingang der Netzrechnung, die Zahlung ist innert 30 Tagen fällig.\n\nDas Debitorenrisiko im Detail: Schuldner des Netzbetreibers ist der vZEV-Verwalter, nicht der einzelne Teilnehmende. Er muss die Netzrechnung auch dann vollständig bezahlen, wenn einzelne Teilnehmende zu spät oder gar nicht zahlen.\n\n• Vorfinanzierung: Die Netzrechnung trifft ein, bevor die Teilnehmenden abgerechnet sind und bezahlt haben. Bei einer Zahlungsfrist von 30 Tagen muss der vZEV-Verwalter den Betrag in der Regel vorstrecken.\n• Zahlungsausfall: Was ein Teilnehmender nicht bezahlt, bleibt beim vZEV-Verwalter hängen. Mahnungen kosten Zeit, und selbst eine Betreibung führt nicht immer zu einer Zahlung.\n• Absichern: Empfehlenswert sind Akontozahlungen im Voraus (wie bei den Nebenkosten), klare Zahlungsfristen und Mahngebühren in der schriftlichen vZEV-Vereinbarung sowie, wenn gewünscht, ein Dienstleister, der auch das Inkasso übernimmt.\n\nEine unverbindliche Vereinbarungsvorlage stellt Primeo zur Verfügung. Bei Unsicherheiten lohnt sich eine rechtliche Prüfung.",
        links: [
          { label: "Primeo: Vertragsvorlage vZEV mit Abrechnung über EasyBill", href: "https://www.primeo-energie.ch/magnolia/dam/jcr:9d351ed8-d2d9-49ed-9529-8950fc542606/Vertrag%20Abrechnung%20Primeo-EasyBill.pdf" },
          { label: "Primeo: vZEV-Checkliste zur Abrechnung mit EasyBill", href: "https://www.primeo-energie.ch/magnolia/dam/jcr:a190d5a7-0fd1-4d6a-9684-de5ebcc2363d/vZEV%20Checkliste%20Primeo%20Energy%20EasyBill.pdf" },
          { label: "zevvy: Plattform für Energie- und Nebenkosten (Abrechnung ZEV, vZEV, LEG)", href: "https://www.zevvy.org/de-CH/" },
          { label: "SAK: Kurzzusammenfassung vZEV (Gesamtrechnung und interne Abrechnung)", href: "https://www.sak.ch/downloads/energiegemeinschaften/vzev.pdf" },
        ],
      },
    ],
  },
  {
    id: 'leg',
    title: 'LEG',
    items: [
      {
        q: "Entlastet eine LEG das Stromnetz?",
        a: "Nicht automatisch. Eine LEG ist zunächst eine Abrechnungs- und Handelsgemeinschaft: Der Strom fliesst physikalisch genau gleich zum Nachbarn, egal ob er aus der Solaranlage oder aus dem Netz stammt. Der Netzrabatt von bis zu 40 % entsteht, weil für den lokalen Austausch nicht die gesamten Netzgebühren anfallen, und nicht, weil das Netz dadurch entlastet wird.\n\nEntlastet wird das Netz erst, wenn Verbrauch und Solarproduktion zeitlich zusammenpassen. Dafür müssen Konsumenten oder ihre Geräte wissen, ob gerade ein Solarüberschuss vorhanden ist. Es braucht also eine Live-Ansicht und eine gewisse Intelligenz, zum Beispiel ein Energiemanagement, das Wärmepumpe, Boiler oder Elektroauto bei Überschuss einschaltet.\n\nFür die Live-Ansicht braucht es zusätzlich ein Gerät, das die Messdaten des Smartmeters ausliest und weiterleitet. Die meisten Smartmeter besitzen dafür eine Kundenschnittstelle, und Primeo schaltet den Zugang auf Anfrage frei. Ein Beispiel für ein solches Gerät ist das Schweizer «Wattling»: Es liest die Daten über den P1/DSMR-Port des Smartmeters in Echtzeit aus und zeigt sie in einer App und einem lokalen Dashboard an.\n\nEine Plattform, die solche Daten einer ganzen Gemeinschaft zusammenführt, ist lastamina.ch (aktuell in der Beta-Phase). Sie zeigt Erzeugung, Verbrauch und Überschuss live an und sieht gemäss ihrem Beispieldiagramm auch Steuersignale an Verbraucher vor. Wattling und lastamina.ch stammen beide von der ecolabor GmbH.",
        links: [
          { label: "Wattling: Smart Meter Reader für die Schweiz", href: "https://wattling.ch/" },
          { label: "lastamina.ch: Energy-Community-Plattform (Beta)", href: "https://lastamina.ch/" },
          { label: "lastamina.ch: Beispieldiagramm Gemeinde-Energiemanagement", href: "https://lastamina.ch/svg/gemeinde-energiemanagement.svg" },
          { label: "BFH: Fachtagung Netzanschluss 2026", href: "https://www.bfh.ch/de/aktuell/news/2026/fachtagung-netzanschluss-2026/" },
        ],
      },
    ],
  },
]
