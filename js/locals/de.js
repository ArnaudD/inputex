// InputEx German localization
(function() {

   var msgs = inputEx.messages;

   msgs.required = "Pflichtfeld";
   msgs.invalid = "Eingabe nicht korrekt";
   msgs.valid = "Eingabe korrekt";
   
   msgs.invalidEmail = "Email nicht korrekt; ej: ihr.name@beispiel.de";
   msgs.selectColor = "Farbe w�hlen:";
   msgs.invalidPassword = ["Das Passwort muss aus mindestens "," Zeichen bestehen"];
   msgs.invalidPasswordConfirmation = "Das Passwort stimmt nicht �berein!";
   msgs.passwordStrength = "Das Passwort ist zu schwach";
   msgs.capslockWarning = "Achtung: die caps-lock Taste ist aktiviert";
   msgs.invalidDate = "falsches Datumsformat, bsp: 25.01.2007";
   msgs.defaultDateFormat = "d.m.Y";
   msgs.shortMonths=["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez"];
   msgs.months=["Januar", "Februar", "M�rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
   msgs.weekdays1char=["S", "M", "D", "M", "D", "F", "S"];
   msgs.shortWeekdays=["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
   msgs.selectMonth = "- Monat ausw�hlen -";
   msgs.dayTypeInvite = "Tag";
   msgs.monthTypeInvite = "Monat";
   msgs.yearTypeInvite = "Jahr";
   msgs.cancelEditor = "Abbrechen";
   msgs.okEditor = "Ok";
   msgs.defautCalendarOpts = {
      navigator: {
        strings : {
            month: "Monat ausw�hlen",
            year: "Jahr erg�nzen",
            submit: "Ok",
            cancel: "Abbrechen",
            invalidYear: "Jahr stimmt nicht"
         }
      },
      start_weekday: 1 // Woche beginnt am Montag
   };
   msgs.stringTooShort = ["Dieses Feld braucht mindestens "," Zeichen (Buchstaben oder Zahlen)"];
   msgs.stringTooLong = ["Dieses Feld ist begrenzt auf "," Zeichen (Buchstaben oder Zahlen)"];
   msgs.ajaxWait = "lade...";
   
   // List
   msgs.listAddLink = "Hinzuf�gen";
   msgs.listRemoveLink = "L�schen";
   

   // Datatable
   msgs.saveText = "Speichern";
   msgs.cancelText = "Abbrechen";
   msgs.modifyText = "Bearbeiten";
   msgs.deleteText = "L�schen";
   msgs.insertItemText = "Einf�gen";
   msgs.confirmDeletion = "M�chten Sie das Element wirklich l�schen?";
   
      
   // TimeInterval
   msgs.timeUnits = {
      SECOND: "Sekunden",
      MINUTE: "Minuten",
      HOUR: "Stunden",
      DAY: "Tage",
      MONTH: "Monate",
      YEAR: "Jahre"
   };
   
   // for YUI loader 
   inputEx.lang_de = true;
})();