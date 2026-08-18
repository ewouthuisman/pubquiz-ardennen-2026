Lokale media voor de pubquiz
=============================

Zet hier je eigen audio- of videobestanden (mp3, m4a, mp4 ...) neer als je
Ronde 2 (of een andere mediaronde) volledig offline wil kunnen afspelen,
zonder afhankelijk te zijn van YouTube of een internetverbinding op locatie.

Gebruik alleen bestanden waar je zelf de rechten op hebt (bv. een legaal
gekochte/gedownloade kopie). Dit project downloadt zelf niets van YouTube —
dat mag niet zomaar vanwege auteursrecht.

Hoe koppel je een bestand?
In Pubquiz-Ardennen-2026.html, bij de vraag in kwestie, voeg je toe:

  file: "media/naam-van-je-bestand.mp3"

Dat veld heeft voorrang op "url" als je beide invult. De rest (start, duur,
beepStart, beepDur) werkt precies hetzelfde als bij een YouTube-fragment.

Voorbeeld:
  {v:"Fragment 3 — welke darter?", a:"...",
   file:"media/r2-fragment3.mp3", start:0, duur:20, beepStart:6, beepDur:2}

Tip: als je toch liever met YouTube werkt, zorg dan voor een stabiele
internetverbinding op locatie — laat "file" dan gewoon weg.
