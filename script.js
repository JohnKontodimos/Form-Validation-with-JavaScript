var result = true; //αρχικοποίηση αποτελέσματος
var errorString = ""; //αρχικοποίηση μηνύματος σφάλματος

// ελέγχει αν το dateObject είναι ένα Date object
function isValidDate(dateObject) {
  return dateObject instanceof Date && !isNaN(dateObject);
}

// Η επόμενη συνάρτηση ελέγχει (όχι τέλεια!) αν ενα αλφαριθμητικό
// μοιάζει με email οπότε και επιστρέφει true, αλλιώς επιστρέφει false.
// Χρησιμοποιείται στον validator της φόρμας, παρακάτω.

function looks_like_email(str) {
  var result = true; //έστω ότι όλα είναι καλά - θα κάνουμε διάφορους ελέγχους και
  //εφόσον κάποιος βγάζει πρόβλημα, θα βάλουμε result=false.
  var ampersatPos = str.indexOf("@"); //η θεση του @ στο str
  var dotPos = str.indexOf("."); //η θεση της . στο str
  var dotPosAfterAmpersat = str.indexOf(".", ampersatPos); //θεση της . μετά το @

  // αν το @ δεν βρεθεί, η indexOf επιστρέφει -1 ενώ αν είναι πρώτος χαρακτήρας
  // επιστρέφει 0. Σε κάθε περίτπωση δεν είναι αποδεκτό email
  if (ampersatPos <= 0) result = false;

  // αν δεν υπάρει καθόλου τελεία δεν είναι email
  if (dotPos < 0) result = false;

  // αν δεν υπάρχει . μετά το @ αλλά όχι αμέσως μετά, τότε δεν είναι email
  if (dotPosAfterAmpersat - ampersatPos == 1) result = false;

  // αν ο πρώτος ή ο τελευταίος χαρακτήρας είναι . τότε δεν είναι email
  if (str.indexOf(".") == 0 || str.lastIndexOf(".") == str.length - 1)
    result = false;

  // πιθανώς να απαιτούνται επιπλέον έλεγχοι - ας αρκεστούμε σε αυτούς
  return result;
}

// Ελέγχει αν στο πεδίο κειμένου element1 είναι γραμμένο κείμενο μήκους
// λιγότερου από limit και εμφανίζει στο στοιχείο με id element2 πόσοι
// χαρακτήρες απομένουν. Αν είναι γραμμένο περισσότερο κείμενο τότε το
// επιπλέον διαγράφεται και εμφανίζεται σχετικό μήνυμα στο element2
function check_limit(element1, limit, element2) {
  // διάβασε τι γράφει μέσα στο textarea
  var myText = document.getElementById(element1).value;

  // μέτρα το μήκος του (πόσοι χαρακτήρες είναι)
  var myTextLength = myText.length;

  // συνδέσου στο element2
  var counterElement = document.getElementById(element2);

  if (myTextLength > limit) {
    //αν το κείμενο ειναι μεγαλύτερο από limit
    // αντικατέστησε το κείμενο στο textarea με τους πρώτους limit χαρακτήρες
    document.getElementById(element1).value = myText.substr(0, limit);
    // βγάλε alert
    errorString = errorString + "Δεν επιτρέπεται παραπάνω κείμενο! \n";
    // τύπωσε σχετικό κείμενο στο element2
    counterElement.innerHTML =
      "Δεν μπορείτε να γράψετε πάνω από " + limit + " χαρακτήρες!";
  } else {
    // τύπωσε σχετικό κείμενο στο element2
    counterElement.innerHTML =
      "Απομένουν " + (limit - myTextLength) + " χαρακτήρες";
  }
}

function validate_form() {
  // ΠΡΟΣΟΧΗ! Οι έλεγχοι που γίνονται είναι ενδεικτικοί.
  //          Θα μπορούσε να είναι διαφορετικοί - ότι θέλουμε εμείς.
  // ---------------------------------------------------------------------
  // Αρχικοποιούμε το result (τιμή που επιστρέφει η συνάρτηση) σε true και
  // θα κάνουμε ελέγχους για να δούμε αν υπάρχει λόγος αλλαγής σε false.
  // Το σκεπτικό είναι απλό: Ψαχνουμε πάντα την ΜΗ ΑΠΟΔΕΚΤΗ περίπτωση - ΑΝ ΤΗΝ
  // ΒΡΟΥΜΕ ΚΑΝΟΥΜΕ ΤΟ result false.
  var result = true;
  //"Καθαρισμός" του error σε περιπτωση διόρθωσης
  if (errorString !== "") {
    errorString = "";
  }

  // δημιουργούμε κάθε φορά πρόσβαση στο επιθυμητό html στοιχείο
  // ή στο περιεχόμενό του και κάνουμε τους απαραίτητους ελέγχους

  // ------  έλεγχος απόδεκτού username ------------------------------------
  // λήψη τιμής του υπό εξέταση στοιχείου
  var username = document.getElementById("username").value;

  // Ακολουθεί regular expression που περιγράφει τους μη επιτρεπτούς χαρακτήρες.
  // Έστω ότι μη επιτρεπτοί είναι όλα εκτός από 0-9, A-Z, a-z, _ (κάτω παύλα)
  var illegalChars = new RegExp("/W/");

  // αν υπάρχει στο username μη επιτρεπτός χαρακτήρας ή το μήκος είναι < 8 ή >20
  // ΠΡΟΣΟΧΗ: Ο περιορισμός του 8 μπαίνει γιατί πρόκειται για φόρμα εγγραφής.
  //          Σε φόρμα login δεν θα πρέπει να βάζετε κανενός είδους βοήθεια
  //          καθώς έτσι βοηθάτε τον κακόβουλο χρήστη.
  if (
    illegalChars.test(username) ||
    username.length < 8 ||
    username.length > 20
  ) {
    //σημείωσε ότι υπάρχει πρόβλημα
    result = false;
    //ενημέρωσε τον χρήστη με alert
    //Προσέξτε την δυνατότητα αλλαγή γραμμής με \n μέσα στο alert box
    errorString =
      errorString +
      "Στο username απαιτούνται 8 ως 20 \n λατινικά γράμματα, αριθμοί ή underscore! \n";
  }

  // ------- ΣΥΜΠΛΗΡΩΣΤΕ ΤΟΥΣ ΛΟΙΠΟΥΣ ΕΛΕΓΧΟΥΣ --------------------------------

  // ----- να έχει καταχωρηθεί password τουλάχιστον από 8 ως 20 χαρακτήρες --------------
  // ΠΡΟΣΟΧΗ: το password θα πρέπει να επιβάλεται να είναι πιο πολύπλοκο
  // και φυσικά να υπάρχουν και οι σχετικοί έλεγχοι (πχ να έχει πεζά και
  // κεφαλαία γράμματα, αριθμούς, κάποιο σύμβολο, κτλ στη λογική του regular
  // expression που είδαμε παραπάνω.
  var password = document.getElementById("password").value;
  if (password.length < 8 || password.length > 20) {
    //σημείωσε ότι υπάρχει πρόβλημα
    result = false;
    //ενημέρωσε τον χρήστη με alert
    errorString = errorString + "Το password να είναι 8 ως 20 χαρακτήρες! \n";
  }

  // ---- να έχει καταχωρηθεί συντακτικά αποδεκτό email ---------------------
  var email = document.getElementById("email").value;
  if (!looks_like_email(email)) {
    //δείτε σχετική συνάρτηση
    //σημείωσε ότι υπάρχει πρόβλημα
    result = false;
    //ενημέρωσε τον χρήστη με alert
    errorString = errorString + "Το email δεν είναι αποδεκτό! \n";
  }

  // ---- να έχει καταχωρηθεί 9- ψήφιο ΑΦΜ  --------------------------------
  var afm = document.getElementById("afm").value;
  // Η συνάρτηση isNaN(X) επιστρέφει true αν ο Χ ΔΕΝ είναι αριθμός, αλλιώς false
  if (afm.length != 9 || isNaN(afm)) {
    result = false;
    errorString = errorString + "Μη αποδεκτό ΑΦΜ! \n";
  }

  // ---- να έχει επιλεγεί κατηγορία εισοδήματος ---------------------------
  var element = document.getElementById("income");
  var incomeIndex = element.options[element.selectedIndex].value;
  // var incomeIndex=document.forms["userdata"]["income"].selectedIndex;
  // Η πρώτη επιλογή σε λίστα αντιστοιχεί σε index 0, η δεύτερη σε 1, κ.ο.κ.
  // Εδώ η πρώτη επιλογή είναι οδηγία στο χρήστη οπότε δεν θεωρείται αποδεκτή
  // επιλογή. Αν ΔΕΝ είναι κάτι επιλεγμένο, τότε selectedIndex=-1.
  if (incomeIndex < 1) {
    result = false;
    errorString = errorString + "Δεν επιλέξατε Εισόδημα! \n";
  }

  // ---- να έχει επιλεγεί φύλλο -------------------------------------------
  var sex1 = document.getElementById("sex1").checked;
  var sex2 = document.getElementById("sex2").checked;
  if (sex1 == false && sex2 == false) {
    result = false;
    errorString = errorString + "Δεν επιλέξατε Φύλο! \n";
  }

  // ---- να έχει καταχωρηθεί ημερομηνία γέννησης  μεγαλύτερη από
  //      1910-01-01 και μικρότερη από σήμερα
  var birthdate = document.getElementById("birthdate").value;
  // Η συνάρτηση isNaN(X) επιστρέφει true αν ο Χ ΔΕΝ είναι αριθμός, αλλιώς false
  // Η συνάρτηση Number(X) μετατρέπει το Χ σε αριθμό ή αν δεν γίνεται επιστρέφει NaN (not a number)
  d1 = new Date("1910-01-01"); //ημερομηνία ΑΠΟ
  d2 = new Date(Date.now()); //ημερομηνία ΕΩΣ (σήμερα)
  d = new Date(birthdate); //ημερομηνία χρήστη
  // αν ΔΕΝ δόθηκε ημερομηνία OR είναι εκτός ορίων...
  if (!isValidDate(d) || d < d1 || d > d2) {
    result = false;
    errorString =
      errorString +
      "Μη αποδεκτή Ημ/νία Γέννησης! \nΠρέπει να είναι μεταξύ 1-Ιαν-1910 και Σήμερα \n";
  }

  // ---- να έχει καταχωρηθεί ύψος  --------------------------------------
  var height = document.getElementById("height").value;
  if (
    isNaN(height) ||
    (!isNaN(height) && (Number(height) > 250 || Number(height) < 50))
  ) {
    // ( (δεν είναι αριθμός)
    //         OR
    //   ( (είναι αριθμός) AND (είναι εκτός ορίων 50 ως 250) )
    // )
    result = false;
    errorString =
      errorString +
      "Μη αποδεκτό ύψος! \nΠρέπει να είναι μεταξύ 50 και 250 cm. \n";
  }

  // ----- ένα από τα ενδιαφέροντα έχει τσεκαριστεί ---------------------
  var interests1 = document.getElementById("interests1").checked;
  var interests2 = document.getElementById("interests2").checked;
  var interests3 = document.getElementById("interests3").checked;
  if (interests1 == false && interests2 == false && interests3 == false) {
    result = false;
    errorString =
      errorString + "Επιλέξτε τουλάχιστον ένα από τα 'Ενδιαφέροντα'! \n";
  }

  // ----- τα σχόλια ως 150 χαρακτήρες -----------------------------------
  var comments = document.getElementById("comments").value;
  if (comments.length > 150) {
    result = false;
    errorString = errorString + "Τα σχόλια να είναι ως 150 χαρακτήρες! \n";
  }

  // ----- ΤΕΛΟΣ ΕΛΕΓΧΩΝ -------------------------------------------------
  if (errorString !== "") {
    alert(errorString);
  }
  return result;
}

// -------- μηχανισμός για εφέ και αφαίρεση εφέ σε textbox -----//

var style; //global variable για αποθήκευση του τρέχοντος στυλ

function highlightOn(element) {
  //την καλούμε στο onfocus event
  style = document.getElementById(element).style; //αποθήκευσε το τρέχον στυλ
  document.getElementById(element).style.border = "solid 2px red";
  document.getElementById(element).style.boxShadow = "0px 0px 15px 2px yellow";
}

function highlightOff(element) {
  //την καλούμε στο onblur event
  document.getElementById(element).style = style; //επαναφορά του αποθηκευμένου στυλ
}
