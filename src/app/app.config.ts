export const config = {
    'firebaseConfig': {
        apiKey: "AIzaSyCKz07EJoYh4_9j4a9EESCvxAVaSBE_fIg",
        authDomain: "medical-logbook.firebaseapp.com",
        databaseURL: "https://medical-logbook.firebaseio.com",
        projectId: "medical-logbook",
        storageBucket: "medical-logbook.appspot.com",
        messagingSenderId: "325280445800"
    },
    'googleWebClientId': '325280445800-qpj697soklhgeh55ocnnb6e4se647ih6.apps.googleusercontent.com',
    'specialityList': [
        { 'name': 'Cardiothoracic Surgery', 'value': 'cardiothoracic_surgery', 'icon': 'cardiothoracic_surgery.png' },
        { 'name': 'ENT (Otolaryngology)', 'value': 'ENT_Otolaryngology', 'icon': 'ENT_Otolaryngology.png' },
        { 'name': 'General Surgery', 'value': 'general_surgery', 'icon': 'general_surgery.png' },
        { 'name': 'Neurosurgery', 'value': 'Neurosurgery', 'icon': 'Neurosurgery.png' },
        { 'name': 'Obstetrics & Gynaecology', 'value': 'obstetrics&gynaecology', 'icon': 'obstetrics&gynaecology.png' },
        { 'name': 'Ophthalmology', 'value': 'Ophthalmology', 'icon': 'Ophthalmology.png' },
        { 'name': 'Paediatrics', 'value': 'Paediatrics', 'icon': 'Paediatrics.png' },
        { 'name': 'Plastic', 'value': 'Plastic', 'icon': 'Plastic.png' },
        { 'name': 'Trauma & Orthopaedic', 'value': 'trauma&orthopaedic', 'icon': 'trauma&orthopaedic.png' },
        { 'name': 'Urology', 'value': 'Urology', 'icon': 'Urology.png' },
        { 'name': 'Vascular', 'value': 'Vascular', 'icon': 'Vascular.png' },
        { 'name': 'Other', 'value': 'Other', 'icon': 'Other.png' },
    ],
    defaultUserDetails: {
        name: '',
        currentHospital: '',
        currentCountry: '',
        emailFromPartners: false,
        generalAnnouncements: false,
        medicalSchool: '',
        password: '',
        startYear: '',
    }
};