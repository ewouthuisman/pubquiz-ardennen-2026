/* Bouwt de PowerPoint-versie uit dezelfde data als het HTML-deck. */
const fs = require('fs');
const pptxgen = require('pptxgenjs');

const html = fs.readFileSync(process.argv[2] || 'Pubquiz-Ardennen-2026.html', 'utf8');
const start = html.indexOf('const QUIZ = {');
const end = html.indexOf('\n};', start) + 3;
const QUIZ = eval(html.slice(start, end).replace('const QUIZ =', '(') .replace(/;\s*$/, ')'));

const BG = '0A0F0D', PANEL = '111A16', INK = 'F3ECE0', MUTED = '9DB3A6', GOLD = 'D9A441', GOLD2 = 'F2C568';
const W = 13.333, H = 7.5, M = 0.85;

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.author = 'Quizmaster';
pres.title = QUIZ.titel;

function base(accent) {
  const s = pres.addSlide();
  s.background = { color: BG };
  // subtiele hoekgloed als motief
  s.addShape(pres.ShapeType.ellipse, { x: -2.6, y: -3.2, w: 8.5, h: 6.4, fill: { color: accent, transparency: 90 }, line: { type: 'none' } });
  s.addShape(pres.ShapeType.ellipse, { x: 8.6, y: 4.7, w: 7.4, h: 5.6, fill: { color: accent, transparency: 92 }, line: { type: 'none' } });
  return s;
}
const T = (o) => Object.assign({ fontFace: 'Calibri', color: INK }, o);
const SER = (o) => Object.assign({ fontFace: 'Cambria', color: INK }, o);

/* ---------- titel ---------- */
{
  const s = base(GOLD);
  s.addShape(pres.ShapeType.diamond, { x: W / 2 - 0.22, y: 1.05, w: 0.44, h: 0.44, fill: { color: GOLD }, line: { type: 'none' } });
  s.addText(QUIZ.datum.toUpperCase(), T({ x: 0, y: 1.75, w: W, h: 0.35, align: 'center', fontSize: 13, color: GOLD, bold: true, charSpacing: 5 }));
  s.addText(QUIZ.titel, SER({ x: 0.6, y: 2.15, w: W - 1.2, h: 1.9, align: 'center', fontSize: 58, bold: true, color: INK }));
  s.addText(QUIZ.subtitel, T({ x: 0, y: 4.15, w: W, h: 0.45, align: 'center', fontSize: 20, color: MUTED, italic: true }));
  const chips = [QUIZ.locatie, QUIZ.vanuit, '8 rondes · 64 vragen'];
  const cw = 3.7, gap = 0.25, totalW = chips.length * cw + (chips.length - 1) * gap;
  chips.forEach((c, n) => {
    s.addShape(pres.ShapeType.roundRect, {
      x: (W - totalW) / 2 + n * (cw + gap), y: 5.0, w: cw, h: 0.62, rectRadius: 0.3,
      fill: { color: GOLD, transparency: 88 }, line: { color: GOLD, width: 0.75 }
    });
    s.addText(c, T({ x: (W - totalW) / 2 + n * (cw + gap), y: 5.0, w: cw, h: 0.62, align: 'center', valign: 'middle', fontSize: 12.5 }));
  });
  s.addNotes('Welkom. Teams laten kiezen, naam op het antwoordblad, telefoons in het midden.');
}

/* ---------- spelregels ---------- */
{
  const s = base(GOLD);
  s.addText('VOORDAT WE BEGINNEN', T({ x: M, y: 0.6, w: 8, h: 0.3, fontSize: 12, color: GOLD, bold: true, charSpacing: 5 }));
  s.addText('Spelregels', SER({ x: M, y: 0.95, w: 8, h: 0.95, fontSize: 44, bold: true }));
  QUIZ.spelregels.forEach((t, n) => {
    const y = 2.15 + n * 0.78;
    s.addShape(pres.ShapeType.ellipse, { x: M, y: y, w: 0.44, h: 0.44, fill: { color: GOLD }, line: { type: 'none' } });
    s.addText(String(n + 1), SER({ x: M, y: y, w: 0.44, h: 0.44, align: 'center', valign: 'middle', fontSize: 15, bold: true, color: BG }));
    s.addText(t, T({ x: M + 0.66, y: y - 0.05, w: W - M * 2 - 0.7, h: 0.55, fontSize: 15.5, valign: 'middle', margin: 0 }));
  });
}

/* ---------- rondes ---------- */
QUIZ.rondes.forEach((r, ri) => {
  const accent = r.kleur.replace('#', '').toUpperCase();

  /* rondekop */
  {
    const s = base(accent);
    s.addText(String(ri + 1), SER({ x: 0, y: 0.5, w: W, h: 2.5, align: 'center', fontSize: 150, bold: true, color: accent, transparency: 55 }));
    s.addText(('Ronde ' + (ri + 1) + ' — ' + r.thema).toUpperCase(), T({ x: 0, y: 3.05, w: W, h: 0.3, align: 'center', fontSize: 12, color: accent, bold: true, charSpacing: 5 }));
    s.addText(r.naam, SER({ x: 0.7, y: 3.4, w: W - 1.4, h: 1.15, align: 'center', fontSize: 46, bold: true }));
    s.addText(r.intro, T({ x: 2.4, y: 4.6, w: W - 4.8, h: 1.2, align: 'center', fontSize: 15, color: MUTED }));
    s.addShape(pres.ShapeType.roundRect, { x: W / 2 - 1.1, y: 6.05, w: 2.2, h: 0.55, rectRadius: 0.27, fill: { color: accent, transparency: 85 }, line: { color: accent, width: 0.75 } });
    s.addText(r.vragen.length + ' vragen', T({ x: W / 2 - 1.1, y: 6.05, w: 2.2, h: 0.55, align: 'center', valign: 'middle', fontSize: 13 }));
    s.addNotes(r.intro);
  }

  /* vragen */
  r.vragen.forEach((q, qi) => {
    const s = base(accent);
    s.addShape(pres.ShapeType.ellipse, { x: M, y: 0.62, w: 0.78, h: 0.78, fill: { color: accent }, line: { type: 'none' } });
    s.addText(String(qi + 1), SER({ x: M, y: 0.62, w: 0.78, h: 0.78, align: 'center', valign: 'middle', fontSize: 26, bold: true, color: BG }));
    s.addText(('Ronde ' + (ri + 1) + ' · ' + r.naam).toUpperCase(),
      T({ x: M + 1.0, y: 0.62, w: W - M * 2 - 1.0, h: 0.78, valign: 'middle', fontSize: 11.5, color: MUTED, bold: true, charSpacing: 4, margin: 0 }));

    const hasVisual = (r.type === 'streetview') || (r.type === 'media' && q.url !== null);
    if (!hasVisual) {
      // groot vraagteken als motief, zodat tekstvragen niet leeg aanvoelen
      s.addText('?', SER({ x: W - 3.9, y: 1.3, w: 3.4, h: 5.3, align: 'center', valign: 'middle', fontSize: 300, bold: true, color: accent, transparency: 82 }));
    }
    s.addText(q.v, SER({ x: M, y: hasVisual ? 1.6 : 2.15, w: hasVisual ? W - M * 2 : W - M * 2 - 3.2, h: hasVisual ? 1.35 : 2.7, fontSize: hasVisual ? 26 : 33, bold: true, valign: 'middle', lineSpacing: hasVisual ? 32 : 42 }));

    if (r.type === 'streetview') {
      const link = 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=' + q.lat + ',' + q.lng + '&heading=' + (q.heading || 0);
      s.addShape(pres.ShapeType.roundRect, { x: M, y: 3.15, w: W - M * 2, h: 2.35, rectRadius: 0.12, fill: { color: PANEL }, line: { color: accent, width: 1 } });
      s.addText('STREET VIEW', T({ x: M + 0.4, y: 3.4, w: 4, h: 0.3, fontSize: 11, color: accent, bold: true, charSpacing: 5, margin: 0 }));
      s.addShape(pres.ShapeType.triangle, { x: M + 0.4, y: 3.92, w: 0.26, h: 0.3, rotate: 90, fill: { color: GOLD2 }, line: { type: 'none' } });
      s.addText([{ text: 'Open locatie ' + (qi + 1) + ' in Street View', options: { hyperlink: { url: link }, color: GOLD2, bold: true } }],
        T({ x: M + 0.78, y: 3.8, w: W - M * 2 - 1.2, h: 0.55, fontSize: 22, margin: 0 }));
      s.addText('Coördinaten: ' + q.lat + ', ' + q.lng + '   ·   kijkrichting ' + (q.heading || 0) + '°',
        T({ x: M + 0.4, y: 4.42, w: W - M * 2 - 0.8, h: 0.35, fontSize: 13, color: MUTED, margin: 0 }));
      s.addText('Tip: het HTML-deck toont Street View direct in de slide — dit is de back-up.',
        T({ x: M + 0.4, y: 4.8, w: W - M * 2 - 0.8, h: 0.4, fontSize: 11.5, color: MUTED, italic: true, margin: 0 }));
    }

    if (r.type === 'media' && q.url !== null) {
      const zoek = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q.a.replace(/\(.*?\)/g, ''));
      const link = q.url ? q.url : zoek;
      s.addShape(pres.ShapeType.roundRect, { x: M, y: 3.15, w: W - M * 2, h: 2.35, rectRadius: 0.12, fill: { color: PANEL }, line: { color: accent, width: 1 } });
      s.addText(q.film ? 'FILMFRAGMENT' : 'MUZIEKFRAGMENT', T({ x: M + 0.4, y: 3.4, w: 4, h: 0.3, fontSize: 11, color: accent, bold: true, charSpacing: 5, margin: 0 }));
      s.addShape(pres.ShapeType.triangle, { x: M + 0.4, y: 3.92, w: 0.26, h: 0.3, rotate: 90, fill: { color: GOLD2 }, line: { type: 'none' } });
      s.addText([{ text: (q.url ? 'Speel fragment' : 'Zoek fragment op YouTube') + '  (' + (q.duur || 20) + ' s)', options: { hyperlink: { url: link }, color: GOLD2, bold: true } }],
        T({ x: M + 0.78, y: 3.8, w: W - M * 2 - 1.2, h: 0.55, fontSize: 22, margin: 0 }));
      s.addText(q.url ? 'Start op ' + (q.start || 0) + ' seconden.' : 'Nog geen link ingevuld — vul “url” in de config van het HTML-deck, of speel het van je telefoon.',
        T({ x: M + 0.4, y: 4.42, w: W - M * 2 - 0.8, h: 0.5, fontSize: 13, color: MUTED, margin: 0 }));
      s.addText('Let op: kijk niet mee naar het YouTube-tabblad, daar staat de titel.',
        T({ x: M + 0.4, y: 4.9, w: W - M * 2 - 0.8, h: 0.4, fontSize: 11.5, color: MUTED, italic: true, margin: 0 }));
    }

    if (!hasVisual && q.extra) {
      s.addText(q.extra, T({ x: M, y: 5.15, w: W - M * 2 - 3.2, h: 0.75, fontSize: 14.5, color: MUTED, italic: true, valign: 'top' }));
    }
    s.addText('Antwoord: ' + q.a + (q.extra ? '  —  ' + q.extra : ''), T({ x: M, y: 6.6, w: W - M * 2, h: 0.4, fontSize: 9, color: BG }));
    s.addNotes('ANTWOORD: ' + q.a + (q.extra ? '\n' + q.extra : ''));
  });

  /* na elke 2 rondes: wisselen + nakijksheet */
  if (ri % 2 === 1) {
    const a = QUIZ.rondes[ri - 1], b = r;
    {
      const s = base(GOLD);
      s.addText('PAUZE', T({ x: 0, y: 2.1, w: W, h: 0.3, align: 'center', fontSize: 12, color: GOLD, bold: true, charSpacing: 6 }));
      s.addText('Bladen wisselen', SER({ x: 0, y: 2.5, w: W, h: 1.3, align: 'center', fontSize: 58, bold: true }));
      s.addText('Geef je antwoordblad van ronde ' + ri + ' en ' + (ri + 1) + ' door aan de tafel links van je.\nPen op tafel. Bier bijvullen.',
        T({ x: 2.6, y: 4.0, w: W - 5.2, h: 1.1, align: 'center', fontSize: 17, color: MUTED }));
      s.addNotes('Even 5 minuten pauze. Daarna de antwoorden.');
    }
    {
      const s = base(GOLD);
      s.addText('NAKIJKSHEET', T({ x: M, y: 0.5, w: 8, h: 0.3, fontSize: 12, color: GOLD, bold: true, charSpacing: 5 }));
      s.addText('Ronde ' + ri + ' & ' + (ri + 1), SER({ x: M, y: 0.82, w: 8, h: 0.7, fontSize: 34, bold: true }));
      [[a, ri, M], [b, ri + 1, W / 2 + 0.15]].forEach(([rr, nr, x]) => {
        const colW = W / 2 - M - 0.15;
        s.addText('Ronde ' + nr + ' — ' + rr.naam, T({ x: x, y: 1.7, w: colW, h: 0.4, fontSize: 16, bold: true, color: GOLD, fontFace: 'Cambria', margin: 0 }));
        s.addShape(pres.ShapeType.line, { x: x, y: 2.12, w: colW, h: 0, line: { color: GOLD, width: 0.75, transparency: 55 } });
        rr.vragen.forEach((q, n) => {
          const y = 2.24 + n * 0.545;
          s.addText(String(n + 1), T({ x: x, y: y, w: 0.3, h: 0.45, fontSize: 12, bold: true, color: rr.kleur.replace('#', '').toUpperCase(), margin: 0, valign: 'top' }));
          s.addText([{ text: q.a, options: { fontSize: 13, color: INK, bold: true } }].concat(
            q.extra ? [{ text: '\n' + q.extra, options: { fontSize: 9.5, color: MUTED, italic: true } }] : []),
            T({ x: x + 0.32, y: y - 0.02, w: colW - 0.32, h: 0.52, margin: 0, valign: 'top', lineSpacing: 14 }));
        });
      });
    }
  }
});

/* ---------- eindstand ---------- */
{
  const s = base(GOLD);
  s.addText('HET MOMENT VAN DE WAARHEID', T({ x: M, y: 0.6, w: 8, h: 0.3, fontSize: 12, color: GOLD, bold: true, charSpacing: 5 }));
  s.addText('Eindstand', SER({ x: M, y: 0.95, w: 8, h: 0.95, fontSize: 44, bold: true }));
  const rows = [[
    { text: '#', options: { color: GOLD, bold: true, fontSize: 11 } },
    { text: 'TEAM', options: { color: GOLD, bold: true, fontSize: 11 } },
    { text: 'PUNTEN', options: { color: GOLD, bold: true, fontSize: 11 } }
  ]].concat(QUIZ.teams.map((t, n) => [
    { text: String(n + 1), options: { color: MUTED, fontSize: 17 } },
    { text: t || ' ', options: { color: INK, fontSize: 17 } },
    { text: ' ', options: {} }
  ]));
  s.addTable(rows, {
    x: M, y: 2.1, w: W - M * 2, colW: [0.9, (W - M * 2) - 2.9, 2.0], rowH: 0.62,
    fontFace: 'Calibri', border: { type: 'solid', color: '2A3A31', pt: 1 }, fill: { color: PANEL }, valign: 'middle'
  });
  s.addText('Maximaal 64 punten plus bonussen. Ronde 8 kan pijn doen.', T({ x: M, y: 6.3, w: 10, h: 0.4, fontSize: 13, color: MUTED, italic: true }));
}

/* ---------- slot ---------- */
{
  const s = base(GOLD);
  s.addShape(pres.ShapeType.diamond, { x: W / 2 - 0.26, y: 1.95, w: 0.52, h: 0.52, fill: { color: GOLD }, line: { type: 'none' } });
  s.addText('Proost', SER({ x: 0, y: 2.75, w: W, h: 1.5, align: 'center', fontSize: 76, bold: true }));
  s.addText('De verliezers doen de afwas.\nDe winnaars kiezen het bier.', T({ x: 0, y: 4.4, w: W, h: 1.0, align: 'center', fontSize: 19, color: MUTED }));
  s.addText(QUIZ.locatie, T({ x: 0, y: 5.7, w: W, h: 0.4, align: 'center', fontSize: 13, color: GOLD, charSpacing: 3 }));
}

pres.writeFile({ fileName: process.argv[3] || 'Pubquiz-Ardennen-2026.pptx' })
  .then(f => console.log('Klaar:', f));
