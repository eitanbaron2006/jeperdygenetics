import React, { useState } from "react";
import GameBoard from "./game/GameBoard";
import ScoreBoard from "./game/ScoreBoard";
import HostPanel from "./game/HostPanel";
import QuestionModal from "./game/QuestionModal";

interface Team {
  id: string;
  name: string;
  score: number;
  isActive: boolean;
}

const Home = () => {
  const [teams, setTeams] = useState<Team[]>([
    { id: "1", name: "קבוצה אלפא", score: 1000, isActive: true },
    { id: "2", name: "קבוצה בטא", score: 800, isActive: false },
    { id: "3", name: "קבוצה גמא", score: 600, isActive: false },
  ]);

  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    category: "",
    points: 0,
    question: "",
    answer: "",
  });

  /*
  const questions = {
    "מבנה DNA": {
      200: {
        question: "הסבר את המבנה הבסיסי של DNA ומה תפקיד הקשרים המימניים בו",
        answer:
          "ה-DNA בנוי משני גדילים המחוברים בקשרי מימן בין בסיסים חנקניים משלימים: A-T ו-G-C. קשרים אלו מייצבים את המבנה הסלילי הכפול ומאפשרים את פתיחת הסליל בזמן שכפול ותעתוק",
      },
      400: {
        question: "תאר את תהליך השכפול של DNA והאנזימים המעורבים בו",
        answer:
          "תהליך השכפול כולל: 1) פתיחת סליל על ידי הליקאז 2) סינתזת גדיל חדש על ידי DNA פולימראז 3) חיבור קטעי אוקזאקי על ידי DNA ליגאז. התהליך הוא חצי-שמרני ומדויק מאוד",
      },
      600: {
        question: "הסבר את מנגנון התיקון של DNA ומדוע הוא חשוב",
        answer:
          "מנגנוני תיקון DNA כוללים: 1) תיקון שגיאות התאמה (mismatch repair) 2) תיקון נזקי UV על ידי אנזימי NER 3) תיקון שברים דו-גדיליים. חשיבותם במניעת מוטציות ושמירה על יציבות הגנום",
      },
      800: {
        question: "הסבר את תהליך התעתוק (transcription) ואת השלבים העיקריים בו",
        answer:
          "תהליך התעתוק כולל: 1) התחלה - זיהוי פרומוטור והיצמדות RNA פולימראז 2) התארכות - סינתזת RNA משלים 3) סיום - זיהוי רצף סיום והתנתקות. כולל גם עיבוד ה-RNA לאחר התעתוק",
      },
      1000: {
        question:
          "הסבר את הקשר בין מבנה הכרומטין לפעילות הגנים ואת מנגנוני בקרת הביטוי",
        answer:
          "מבנה הכרומטין משפיע על נגישות גורמי תעתוק: 1) אזורים פתוחים (אוכרומטין) מאפשרים תעתוק 2) אזורים סגורים (הטרוכרומטין) מדכאים תעתוק. שינויים אפיגנטיים כמו מתילציה והיסטון מודיפיקציות מווסתים את המבנה",
      },
    },
    תורשה: {
      200: {
        question: "הסבר את חוקי מנדל והדגם כיצד הם באים לידי ביטוי בהכלאות",
        answer:
          "חוקי מנדל כוללים: 1) חוק ההפרדה - הפרדת אללים בגמטות 2) חוק הסגרגציה העצמאית - תכונות נפרדות עוברות באופן עצמאי. בהכלאה F1 מתקבל יחס של 3:1 בתכונה דומיננטית",
      },
      400: {
        question: "הסבר את התופעה של תאחיזה מינית ואת השפעתה על דפוסי תורשה",
        answer:
          "תאחיזה מינית מתרחשת כאשר גן נמצא על כרומוזום X. בזכרים (XY) הגן מתבטא תמיד, בעוד בנקבות (XX) יש שני עותקים. דוגמאות: עיוורון צבעים, המופיליה",
      },
      600: {
        question: "הסבר את המושג פנטרציה משתנה והדגם מקרים בהם זה מתרחש",
        answer:
          "פנטרציה משתנה מתארת מצב בו אותו גנוטיפ יכול להתבטא בעוצמות שונות או לא להתבטא כלל. דוגמאות: 1) סרטן שד תורשתי BRCA 2) מחלת הנטינגטון. גורמים סביבתיים ומודיפיקטורים גנטיים משפיעים על הביטוי",
      },
      800: {
        question: "הסבר את התופעה של אפיסטזיס והשפעתה על היחסים המנדליאניים",
        answer:
          "אפיסטזיס היא אינטראקציה בין גנים שונים המשפיעה על הפנוטיפ. לדוגמה: 1) גן אחד מסכל את פעולת גן אחר 2) שני גנים נדרשים יחד לביטוי תכונה. משנה את היחסים הקלאסיים של מנדל ל-9:7, 12:3:1 וכדומה",
      },
      1000: {
        question: "הסבר את המושג פלאוטרופיה והשלכותיו הקליניות",
        answer:
          "פלאוטרופיה היא השפעה של גן אחד על מספר תכונות שונות. דוגמה: תסמונת מארפן - מוטציה בגן פיברילין משפיעה על מערכות שונות: שלד, עיניים, לב. חשוב להבנת מחלות גנטיות מורכבות ואבחונן",
      },
    },
    מוטציות: {
      200: {
        question: "מהם הסוגים העיקריים של מוטציות נקודתיות?",
        answer:
          "מוטציות נקודתיות כוללות: 1) החלפת בסיס (missense/nonsense) 2) הוספה/חסר של בסיס (frameshift) 3) מוטציות באתרי splicing. השפעתן תלויה במיקום ובסוג השינוי",
      },
      400: {
        question:
          "הסבר את ההבדל בין מוטציות סומטיות למוטציות בתאי הנבט והשלכותיהן",
        answer:
          "מוטציות סומטיות מתרחשות בתאי גוף ולא עוברות בתורשה, קשורות בעיקר להתפתחות סרטן. מוטציות בתאי נבט עוברות לצאצאים ומשפיעות על כל תאי הגוף, גורמות למחלות תורשתיות",
      },
      600: {
        question: "הסבר את הקשר בין מוטציות לאבולוציה ואת מנגנוני הסלקציה",
        answer:
          "מוטציות הן מקור השונות הגנטית באבולוציה. סלקציה טבעית פועלת על שונות זו: 1) סלקציה חיובית מעדיפה מוטציות מועילות 2) סלקציה שלילית מסלקת מוטציות מזיקות 3) סלקציה מאזנת שומרת על פולימורפיזם",
      },
      800: {
        question: "הסבר את המושג 'נטל מוטציות' והשלכותיו על אוכלוסיות",
        answer:
          "נטל מוטציות הוא הצטברות מוטציות מזיקות באוכלוסייה. השפעות: 1) ירידה בכשירות האוכלוסייה 2) חשיבות הרבייה המינית בסילוק מוטציות 3) השפעה על גודל אוכלוסייה אפקטיבי. חשוב במיוחד באוכלוסיות קטנות ומבודדות",
      },
      1000: {
        question:
          "הסבר את הקשר בין מוטציות אפיגנטיות לסרטן ואת המנגנונים המולקולריים",
        answer:
          "מוטציות אפיגנטיות משנות דפוסי ביטוי גנים ללא שינוי ברצף DNA: 1) היפרמתילציה של גני מדכאי סרטן 2) היפומתילציה גלובלית המובילה לחוסר יציבות גנומית 3) שינויים בהיסטונים המשפיעים על מבנה הכרומטין",
      },
    },
    "ביולוגיה של התא": {
      200: {
        question: "הסבר את מבנה ותפקוד הממברנה התאית",
        answer:
          "הממברנה התאית מורכבת משכבה כפולה של פוספוליפידים וחלבונים. תפקידים: 1) בררנות במעבר חומרים 2) קליטת אותות 3) תקשורת בין-תאית. חלבוני הממברנה מאפשרים העברה סלקטיבית של מולקולות",
      },
      400: {
        question: "תאר את תהליך הנשימה התאית ותפקיד המיטוכונדריה",
        answer:
          "נשימה תאית כוללת: 1) גליקוליזה בציטופלסמה 2) מעגל קרבס במטריקס המיטוכונדריה 3) שרשרת העברת אלקטרונים בממברנה הפנימית. המיטוכונדריה מייצרת ATP דרך זרחון חמצוני",
      },
      600: {
        question: "הסבר את מנגנוני בקרת מחזור התא ונקודות הבקרה",
        answer:
          "בקרת מחזור התא כוללת: 1) נקודות בקרה ב-G1, G2, M 2) מערכת ציקלינים ו-CDKs 3) בקרת תיקון DNA. כשל בבקרה מוביל להתפתחות סרטן. חלבון p53 מרכזי בתגובה לנזקי DNA",
      },
      800: {
        question: "הסבר את תהליך האוטופגיה ותפקידו בתא",
        answer:
          "אוטופגיה היא תהליך פירוק רכיבי תא פגומים: 1) יצירת אוטופגוסום 2) היתוך עם ליזוזום 3) פירוק ומיחזור. חשוב להסרת אברונים פגומים, הגנה מפני פתוגנים, והסתגלות לרעב",
      },
      1000: {
        question: "הסבר את מנגנוני התקשורת הבין-תאית ומסלולי העברת האותות",
        answer:
          "תקשורת בין-תאית כוללת: 1) קולטנים ממברנליים המזהים ליגנדים 2) מסלולי העברת אותות דרך חלבוני G ואנזימי קינאז 3) פקטורי תעתוק המשנים ביטוי גנים. חשוב להתפתחות, דיפרנציאציה ותגובה להורמונים",
      },
    },
    אבולוציה: {
      200: {
        question: "הסבר את עקרונות הברירה הטבעית של דרווין",
        answer:
          "עקרונות הברירה הטבעית: 1) שונות בין פרטים 2) תכונות עוברות בתורשה 3) תחרות על משאבים 4) הישרדות והתרבות דיפרנציאלית של הפרטים המותאמים ביותר",
      },
      400: {
        question: "הסבר את משמעות שיווי המשקל הרדי-ויינברג ומתי הוא מופר",
        answer:
          "חוק הרדי-ויינברג מתאר יציבות תדירויות אללים באוכלוסייה. מופר על ידי: 1) מוטציות 2) סלקציה 3) זרימת גנים 4) רבייה לא אקראית 5) אפקט המייסד. משמש כנקודת ייחוס לזיהוי אבולוציה",
      },
      600: {
        question: "הסבר את תופעת הסחיפה הגנטית והשפעתה על אוכלוסיות קטנות",
        answer:
          "סחיפה גנטית היא שינוי אקראי בתדירויות אללים. השפעות: 1) אובדן שונות גנטית 2) קיבוע אללים אקראי 3) אפקט צוואר הבקבוק באוכלוסיות קטנות. משמעותי יותר באוכלוסיות קטנות ומבודדות",
      },
      800: {
        question: "הסבר את תהליך הספציאציה ומנגנוני בידוד רבייתי",
        answer:
          "ספציאציה היא היווצרות מינים חדשים דרך: 1) בידוד גיאוגרפי 2) בידוד רבייתי - התנהגותי, מכני, גמטי 3) הצטברות שינויים גנטיים. דוגמאות: עגורי גלפגוס, זבובי הוואי",
      },
      1000: {
        question: "הסבר את תיאוריית האבולוציה הניטרלית ומשמעותה",
        answer:
          "תיאוריית האבולוציה הניטרלית גורסת: 1) רוב המוטציות ניטרליות מבחינת סלקציה 2) שינויים מולקולריים מתרחשים בקצב קבוע 3) סחיפה גנטית משמעותית יותר מסלקציה ברמה המולקולרית. משמשת בסיס לשעון המולקולרי",
      },
    },
  };*/

  const questions = {
  "DNA ותהליכים מרכזיים": {
    200: {
      question: "הסבר את המבנה הבסיסי של DNA והקשר בין מבנה לתפקוד",
      answer: "ה-DNA בנוי משני גדילים משלימים בצורת סליל כפול. המבנה כולל: 1) שלד סוכר-זרחה 2) בסיסים חנקניים משלימים A-T ו-G-C 3) קשרי מימן בין הבסיסים. המבנה מאפשר שכפול מדויק והעברת מידע גנטי"
    },
    400: {
      question: "תאר את השלבים העיקריים בתהליך השעתוק",
      answer: "שעתוק כולל: 1) התחלה - היצמדות RNA פולימראז לפרומוטור 2) התארכות - סינתזת RNA משלים לפי תבנית ה-DNA 3) סיום כאשר האנזים מזהה רצף סיום 4) עיבוד ה-RNA לקבלת mRNA בוגר"
    },
    600: {
      question: "הסבר את תהליך התרגום ומרכיביו העיקריים",
      answer: "תהליך התרגום כולל: 1) התחלה בקודון AUG וקישור tRNA ראשון 2) התארכות - הוספת חומצות אמינו לפי רצף הקודונים 3) סיום בקודון עצירה. מתרחש על גבי ריבוזומים בציטופלסמה"
    },
    800: {
      question: "תאר את תהליך השכפול של DNA ומרכיביו",
      answer: "שכפול DNA כולל: 1) פתיחת הסליל על ידי הליקאז 2) סינתזת גדיל חדש על ידי DNA פולימראז 3) סינתזה רציפה בגדיל המוביל 4) סינתזת קטעי אוקזאקי בגדיל המשנה 5) חיבור הקטעים על ידי ליגאז"
    },
    1000: {
      question: "הסבר את מנגנוני העיבוד של RNA",
      answer: "עיבוד RNA כולל: 1) הוספת כיפה בקצה 5' 2) הוספת זנב פולי-A בקצה 3' 3) חיתוך והוצאת אינטרונים (splicing) 4) חיבור אקסונים 5) בקרת איכות ויציבות ה-RNA המבשיל"
    }
  },
  "אנזימי הגבלה": {
    200: {
      question: "מהם אנזימי הגבלה וכיצד הם פועלים?",
      answer: "אנזימי הגבלה הם אנזימים החותכים DNA ברצפים ספציפיים. תכונות: 1) מזהים רצפים פלינדרומיים 2) יוצרים קצוות דביקים או קהים 3) ספציפיות גבוהה לרצף"
    },
    400: {
      question: "מהם הסוגים העיקריים של אנזימי הגבלה ותוצרי החיתוך שלהם?",
      answer: "סוגי אנזימי הגבלה: 1) יוצרי קצוות דביקים - חיתוך מדורג 2) יוצרי קצוות קהים - חיתוך ישר 3) מזהים רצפים שונים באורכם 4) פועלים בתנאי טמפרטורה ומלחים שונים"
    },
    600: {
      question: "הסבר את תהליך הליגציה ותפקיד DNA ליגאז",
      answer: "ליגציה: 1) חיבור קטעי DNA עם קצוות תואמים 2) יצירת קשר פוספודיאסטרי 3) דורש ATP כמקור אנרגיה 4) פועל על קצוות דביקים או קהים 5) חיוני ליצירת DNA רקומביננטי"
    },
    800: {
      question: "הסבר את תהליך זיהוי רצף ההכרה על ידי אנזימי הגבלה",
      answer: "זיהוי הרצף כולל: 1) קישור ספציפי לרצף פלינדרומי 2) זיהוי הרצף על ידי חומצות אמינו ספציפיות 3) יצירת קומפלקס אנזים-סובסטרט 4) ביצוע החיתוך במיקום המדויק"
    },
    1000: {
      question: "כיצד משתמשים באנזימי הגבלה ליצירת מפות הגבלה?",
      answer: "יצירת מפת הגבלה: 1) חיתוך ה-DNA עם אנזימים שונים 2) הרצה בג'ל לקביעת גודל הקטעים 3) שימוש בחיתוכים כפולים 4) חישוב מרחקים בין אתרי החיתוך 5) בניית מפה מסודרת"
    }
  },
  "פלסמידים": {
    200: {
      question: "מהם המרכיבים העיקריים של פלסמיד לשיבוט?",
      answer: "פלסמיד שיבוט כולל: 1) אתר תחילת שכפול (ori) 2) גן לעמידות לאנטיביוטיקה 3) אתר שיבוט מרובה (MCS) 4) פרומוטור לביטוי הגן המשובט 5) מרקר סלקציה"
    },
    400: {
      question: "תאר את תהליך הטרנספורמציה של פלסמידים לחיידקים",
      answer: "טרנספורמציה כוללת: 1) הכנת תאים קומפטנטיים 2) טיפול בקור וחום 3) החדרת ה-DNA לתאים 4) סלקציה על מצע סלקטיבי 5) זיהוי מושבות טרנספורמנטים"
    },
    600: {
      question: "מהי חשיבות תקינות אתר ה-ORI בפלסמידים ומה קורה כשהוא פגום?",
      answer: "חשיבות אתר ORI: 1) הכרחי להתחלת שכפול הפלסמיד 2) פגיעה בו מונעת שכפול והעברה לתאי בת 3) משפיע על מספר העותקים בתא 4) חיוני לשימור הפלסמיד באוכלוסיית החיידקים"
    },
    800: {
      question: "כיצד מתבצע תהליך הביטוי של חלבונים מפלסמיד?",
      answer: "ביטוי חלבונים כולל: 1) הפעלת הפרומוטור 2) תעתוק הגן המשובט 3) תרגום ל-mRNA 4) קיפול החלבון 5) ייצוב החלבון או הפרשתו מהתא"
    },
    1000: {
      question: "הסבר את מבנה ותפקוד אתר השיבוט המרובה (MCS)",
      answer: "אתר השיבוט המרובה: 1) רצף המכיל אתרי חיתוך מרובים 2) סדר אתרים ייחודי 3) מאפשר גמישות בבחירת אנזימי ההגבלה 4) מקל על הכנסה והוצאה של גנים 5) מאפשר שיבוט כיווני"
    }
  },
  "PCR": {
    200: {
      question: "הסבר את העקרונות הבסיסיים של תגובת PCR",
      answer: "PCR כולל: 1) דנטורציה ב-95°C 2) היברידיזציה של פריימרים 3) הארכה ב-72°C על ידי Taq פולימראז. מאפשר הגברה מעריכית של רצף DNA ספציפי"
    },
    400: {
      question: "תאר את הרכיבים החיוניים לתגובת PCR ותפקידם",
      answer: "רכיבי PCR: 1) תבנית DNA 2) פריימרים ספציפיים 3) Taq פולימראז עמיד לחום 4) dNTPs 5) מגנזיום כקופקטור 6) בופר מתאים. כל רכיב חיוני להצלחת התגובה"
    },
    600: {
      question: "הסבר את תכנון הפריימרים ב-PCR",
      answer: "תכנון פריימרים כולל: 1) אורך 18-25 בסיסים 2) תכולת GC מאוזנת 3) טמפרטורת התכה דומה 4) מניעת דימרים ומבנים משניים 5) ספציפיות לרצף המטרה"
    },
    800: {
      question: "הסבר את השלבים המולקולריים בכל מחזור PCR",
      answer: "שלבי PCR: 1) פתיחת סליל ב-95°C 2) קירור מבוקר להיברידיזציה 3) חיבור פריימרים לרצפים משלימים 4) פעילות פולימראז וסינתזת DNA 5) חזרה על המחזור להגברה מעריכית"
    },
    1000: {
      question: "תאר את תהליך ה-RT-PCR והרכיבים הייחודיים לו",
      answer: "RT-PCR כולל: 1) סינתזת cDNA מ-RNA על ידי רברס טרנסקריפטאז 2) שימוש בפריימר אקראי או oligo-dT 3) הגברת ה-cDNA ב-PCR רגיל 4) שימוש ב-RNase H 5) בקרות מתאימות"
    }
  },
  "CRISPR": {
    200: {
      question: "הסבר את המרכיבים הבסיסיים של מערכת CRISPR-Cas9",
      answer: "מערכת CRISPR כוללת: 1) אנזים Cas9 2) RNA מנחה (gRNA) 3) רצף PAM במטרה. המערכת מאפשרת חיתוך DNA במיקום ספציפי"
    },
    400: {
      question: "תאר את המנגנון המולקולרי של חיתוך DNA על ידי CRISPR-Cas9",
      answer: "מנגנון פעולה: 1) זיהוי רצף PAM 2) היפרדות גדילי DNA 3) היברידיזציה של gRNA 4) חיתוך דו-גדילי על ידי Cas9 5) תיקון על ידי מנגנוני התא"
    },
    600: {
      question: "הסבר את תהליך התיקון לאחר חיתוך CRISPR",
      answer: "מסלולי תיקון: 1) NHEJ - חיבור קצוות לא הומולוגי 2) HDR - תיקון מכוון תבנית 3) תיקון שגוי יוצר מוטציות 4) תיקון מדויק מכניס שינויים רצויים"
    },
    800: {
      question: "תאר את תהליך התכנון והכנת gRNA",
      answer: "תכנון gRNA: 1) בחירת רצף מטרה ליד PAM 2) בדיקת ספציפיות הרצף 3) תכנון אוליגונוקלאוטידים 4) יצירת מבנה שניוני מתאים 5) שילוב עם Cas9"
    },
    1000: {
      question: "הסבר את מנגנון ההכרה והספציפיות של מערכת CRISPR",
      answer: "מנגנון ההכרה: 1) חיפוש רצף PAM בגנום 2) פתיחת DNA מקומית 3) סריקת התאמה לגדיל המנחה 4) יצירת קומפלקס יציב 5) הפעלת דומיין הנוקלאז"
    }
  }
};

  const handleCardSelect = (category: string, points: number) => {
    const questionData = questions[category]?.[points] || {
      question: "שאלה לא נמצאה",
      answer: "תשובה לא נמצאה",
    };
    setCurrentQuestion({
      category,
      points,
      question: questionData.question,
      answer: questionData.answer,
    });
    setIsQuestionModalOpen(true);
  };

  const handleCorrectAnswer = () => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.isActive
          ? { ...team, score: team.score + currentQuestion.points }
          : team,
      ),
    );
    setIsQuestionModalOpen(false);
    advanceToNextTeam();
  };

  const handleIncorrectAnswer = () => {
    setIsQuestionModalOpen(false);
    advanceToNextTeam();
  };

  const advanceToNextTeam = () => {
    setTeams((prevTeams) => {
      const activeIndex = prevTeams.findIndex((team) => team.isActive);
      const nextIndex = (activeIndex + 1) % prevTeams.length;
      return prevTeams.map((team, index) => ({
        ...team,
        isActive: index === nextIndex,
      }));
    });
  };

  const handleScoreAdjust = (teamId: string, amount: number) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, score: team.score + amount } : team,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Main Game Area */}
      <div className="flex-1 p-8 flex flex-col items-center justify-start pt-16">
        <GameBoard
          onCardSelect={handleCardSelect}
          className="justify-center items-center grow h-screen min-h-screen min-h-[1300] h-[1300] h-[1500] min-h-[1500]"
        />
      </div>
      {/* Scoreboard */}
      <div className="w-[300px] border-l border-slate-800">
        <ScoreBoard teams={teams} />
      </div>
      {/* Host Panel */}
      <HostPanel teams={teams} onScoreAdjust={handleScoreAdjust} />
      {/* Question Modal */}
      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        category={currentQuestion.category}
        points={currentQuestion.points}
        question={currentQuestion.question}
        answer={currentQuestion.answer}
        onCorrect={handleCorrectAnswer}
        onIncorrect={handleIncorrectAnswer}
      />
    </div>
  );
};

export default Home;
