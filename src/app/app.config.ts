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
        { 'name': 'Cardiothoracic Surgery', 'value': 'cardiothoracic_surgery', 'icon': 'cardiothoracic_surgery.svg' },
        { 'name': 'ENT (Otolaryngology)', 'value': 'ENT_Otolaryngology', 'icon': 'ENT_Otolaryngology.svg' },
        { 'name': 'General Surgery', 'value': 'general_surgery', 'icon': 'general_surgery.svg' },
        { 'name': 'Neurosurgery', 'value': 'Neurosurgery', 'icon': 'Neurosurgery.svg' },
        { 'name': 'Obstetrics & Gynaecology', 'value': 'obstetrics&gynaecology', 'icon': 'obstetrics&gynaecology.svg' },
        { 'name': 'Ophthalmology', 'value': 'Ophthalmology', 'icon': 'Ophthalmology.svg' },
        { 'name': 'Paediatrics', 'value': 'Paediatrics', 'icon': 'Paediatrics.svg' },
        { 'name': 'Plastic', 'value': 'Plastic', 'icon': 'Plastic.svg' },
        { 'name': 'Trauma & Orthopaedic', 'value': 'trauma&orthopaedic', 'icon': 'trauma&orthopaedic.svg' },
        { 'name': 'Urology', 'value': 'Urology', 'icon': 'Urology.svg' },
        { 'name': 'Vascular', 'value': 'Vascular', 'icon': 'Vascular.svg' },
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
    },
    chartOption: {
        scales: {
            yAxes: [{
                ticks: {
                    callback: (value, index, values) => {
                        return `${value}h`;
                    }
                }
            }]
        }
    }
};