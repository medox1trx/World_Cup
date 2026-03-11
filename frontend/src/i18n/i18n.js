
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({

resources: {

en: {
translation: {
home: "Home",
matches: "Scores & Matches",
standings: "Standings",
teams: "Teams",
qualifications: "Qualifications",
cities: "Host Cities",
tickets: "Tickets",
hospitality: "Hospitality",
fans: "Fans Zone",
tournaments: "FIFA Tournaments",
login: "Login",
homeWorldCup: "Home World Cup",
footerDescription: "Your portal for FIFA World Cup news, scores, and updates.",
quickLinks: "Quick Links",
followUs: "Follow Us",
newsletter: "Newsletter",
yourEmail: "Your email",
subscribe: "Subscribe",
allRightsReserved: "All rights reserved."
}
},

fr: {
translation: {
home: "Accueil",
matches: "Scores & Matchs",
standings: "Classements",
teams: "Equipes",
qualifications: "Qualifications",
cities: "Villes hôtes",
tickets: "Billets",
hospitality: "Hospitalité",
fans: "Coin des fans",
tournaments: "Tournois FIFA",
login: "Connexion",
homeWorldCup: "Accueil Coupe du Monde",
footerDescription: "Votre portail pour les nouvelles, scores et mises à jour de la Coupe du Monde FIFA.",
quickLinks: "Liens rapides",
followUs: "Suivez-nous",
newsletter: "Newsletter",
yourEmail: "Votre email",
subscribe: "S'abonner",
allRightsReserved: "Tous droits réservés."
}
},

ar: {
translation: {
home: "الرئيسية",
matches: "النتائج والمباريات",
standings: "الترتيب",
teams: "الفرق",
qualifications: "التصفيات",
cities: "المدن المستضيفة",
tickets: "التذاكر",
hospitality: "الضيافة",
fans: "منطقة الجماهير",
tournaments: "بطولات فيفا",
login: "تسجيل الدخول",
homeWorldCup: "الرئيسية كأس العالم",
footerDescription: "بوابتك لأخبار كأس العالم، النتائج والتحديثات.",
quickLinks: "روابط سريعة",
followUs: "تابعنا",
newsletter: "النشرة الإخبارية",
yourEmail: "بريدك الإلكتروني",
subscribe: "اشترك",
allRightsReserved: "جميع الحقوق محفوظة."
}
}

},

fallbackLng: "en",
interpolation: { escapeValue: false }

});

export default i18n;

