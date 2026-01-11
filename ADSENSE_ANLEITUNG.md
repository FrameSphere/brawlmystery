# Google AdSense Integration - Anleitung

## 📢 Aktueller Status

Die Webseite ist **vorbereitet** für Google AdSense, aber die Ads sind noch nicht integriert.

## 🎯 Platzhalter-Positionen

Es gibt derzeit **2 Werbeplatzhalter** auf der Seite:

1. **Zwischen Spielbereich und Statistiken** - Horizontal Banner
2. **Unter den Statistiken** - Horizontal Banner

Diese Platzhalter sind mit einem gestrichelten Rahmen und Text markiert.

## 🚀 Google AdSense einrichten

### Schritt 1: AdSense Konto erstellen

1. Gehe zu https://www.google.com/adsense
2. Melde dich mit deinem Google-Konto an
3. Folge den Anweisungen zur Kontoerstellung
4. Füge deine Website-URL hinzu
5. Warte auf die Genehmigung (kann 1-2 Wochen dauern)

### Schritt 2: Ad-Code erhalten

Nach der Genehmigung:

1. Gehe zum AdSense Dashboard
2. Navigiere zu "Anzeigen" → "Übersicht"
3. Klicke auf "Nach Anzeigeneinheit" → "Display-Anzeigen"
4. Wähle "Horizontal" oder "Banner" Format
5. Kopiere den generierten Code

### Schritt 3: Code in die Webseite einfügen

Öffne `index.html` und ersetze die Platzhalter:

**Vorher:**
```html
<div class="ad-placeholder ad-horizontal">
    <p>📢 Werbeplatz - Google AdSense wird hier eingefügt</p>
</div>
```

**Nachher:**
```html
<div class="ad-container">
    <!-- Hier dein Google AdSense Code -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
         crossorigin="anonymous"></script>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot="XXXXXXXXXX"
         data-ad-format="horizontal"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>
```

### Schritt 4: Auto Ads (Optional)

Für automatische Anzeigenplatzierung:

1. Kopiere den Auto Ads Code aus AdSense
2. Füge ihn im `<head>` Bereich von `index.html` ein:

```html
<head>
    <!-- ... andere Tags ... -->
    
    <!-- Google AdSense Auto Ads -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
         crossorigin="anonymous"></script>
</head>
```

## 💡 CSS für AdSense anpassen

Wenn du die Platzhalter-Styles entfernen möchtest, füge in `css/style.css` hinzu:

```css
.ad-container {
    margin: 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 120px;
}

.adsbygoogle {
    display: block;
}
```

## 📊 Empfohlene Ad-Formate

Für diese Webseite empfehle ich:

- **Desktop:** 728x90 (Leaderboard) oder 970x90 (Large Leaderboard)
- **Mobile:** 320x50 (Mobile Banner) oder Responsive
- **Beide:** Responsive Display Ads (passen sich automatisch an)

## ⚠️ Wichtige Hinweise

### Vor dem Go-Live:

1. **Warte mit AdSense** bis die Seite live ist und Traffic hat
2. **Teste die Seite** gründlich ohne Ads zuerst
3. **Stelle sicher**, dass genug Content vorhanden ist
4. Google möchte mindestens 20-30 Seiten Content sehen

### AdSense Richtlinien:

- ❌ Keine Klick-Aufforderungen ("Klicke auf die Werbung")
- ❌ Keine zu vielen Ads (max. 3 pro Seite empfohlen)
- ✅ Werbung muss klar als solche erkennbar sein
- ✅ Content muss qualitativ hochwertig sein

### Datenschutz:

Nach AdSense-Integration musst du:

1. Die `datenschutz.html` aktualisieren
2. Hinweis auf Google AdSense und Cookies hinzufügen
3. Cookie-Consent-Banner implementieren (falls noch nicht vorhanden)

## 🔧 Testen

1. **Teste NICHT mit deinen eigenen Klicks** - das ist gegen die AdSense-Richtlinien
2. Nutze die "AdSense Preview" im Dashboard
3. Teste auf verschiedenen Geräten und Bildschirmgrößen

## 📈 Performance

AdSense kann die Ladezeit beeinflussen:

- Nutze `async` beim Script-Tag
- Lade AdSense-Scripts am Ende des `<body>`
- Überwache die Core Web Vitals

## 🆘 Support

Bei Problemen:

- **AdSense Hilfe:** https://support.google.com/adsense
- **Policy Center:** https://www.google.com/adsense/start/policies/
- **Community Forum:** https://support.google.com/adsense/community

---

**Nächste Schritte:**

1. ✅ Webseite fertigstellen
2. ✅ Bilder hinzufügen
3. ⏳ Auf Cloudflare Pages deployen
4. ⏳ Traffic aufbauen
5. ⏳ AdSense beantragen
6. ⏳ Nach Genehmigung: Ads einbauen
