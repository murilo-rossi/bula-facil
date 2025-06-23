export const KEYWORD_ICONS = {
	"dor de cabeça": require('../assets/images/keywords/headache.png'),
	"febre": require('../assets/images/keywords/fever.png'),
	"dor muscular": require('../assets/images/keywords/muscle-pain.png'),
	"cólica": require('../assets/images/keywords/cramps.png'),
	"dor": require('../assets/images/keywords/pain.png'),
	"coriza": require('../assets/images/keywords/rhinitis.png'),
	"alergia": require('../assets/images/keywords/allergy.png'),
	"infecção": require('../assets/images/keywords/infection.png'),
	"dor de garganta": require('../assets/images/keywords/sore-throat.png'),
	"dor de dente": require('../assets/images/keywords/toothache.png'),
	"dor de ouvido": require('../assets/images/keywords/earache.png'),

	"náusea": require('../assets/images/keywords/nausea.png'),
	"tontura": require('../assets/images/keywords/dizziness.png'),
	"diarreia": require('../assets/images/keywords/diarrhea.png'),
	"alergia na pele": require('../assets/images/keywords/rash.png'),
	"sono": require('../assets/images/keywords/sleepiness.png'),

	"Asma": require('../assets/images/keywords/asthma.png'),
	"Insuficiência Renal": require('../assets/images/keywords/kidney-disease.png'),
	"Alergia ao Remédio": require('../assets/images/keywords/medicine-allergy.png'),
	"Alergia a Anti-Inflamatório": require('../assets/images/keywords/medicine-allergy.png'),
	"Insuficiência Hepática": require('../assets/images/keywords/liver-disease.png'),
	"Pressão Baixa": require('../assets/images/keywords/low-pressure.png'),
};


export const MEDICAMENTOS = [
  {
    id: 1,
    name: "Ibuprofeno",
    category: "Anti-inflamatório",
    indications: {
      text: "Alívio temporário de dores de cabeça, dor de dente, dores musculares, cólicas menstruais e para redução da febre.",
      keywords: ["dor de cabeça", "febre","dor de dente", "dor muscular", "cólica"]
    },
    adverseReactions: {
      text: "Pode causar náuseas, vômitos, dor de estômago e tontura. Em casos raros, reações alérgicas graves.",
      symptoms: ["náusea", "tontura"]
    },
    contraindications: {
      text: "Não deve ser usado por pessoas com asma, insuficiência renal ou que já tiveram reação alérgica a outro anti-inflamatório.",
      conditions: ["Asma", "Insuficiência Renal", "alergia a anti-inflamatório"]
    }
  },
  {
    id: 2,
    name: "Dipirona",
    category: "Analgésico e Antitérmico",
    indications: { text: "Utilizada no tratamento de dor e febre.", keywords: ["dor", "febre"] },
    adverseReactions: { text: "Pode causar reações de hipotensão (pressão baixa) e, em casos raros, reações alérgicas na pele.", symptoms: ["pressão baixa","alergia na pele"] },
    contraindications: { text: "Contraindicada em casos de alergia aos componentes e em certas doenças metabólicas.", conditions: ["Alergia ao Remédio"] }
  },
  {
    id: 3,
    name: "Paracetamol",
    category: "Analgésico e Antitérmico",
    indications: { text: "Indicado para o tratamento de dores leves a moderadas e para baixar a febre.", keywords: ["dor de cabeça", "febre"] },
    adverseReactions: { text: "Em doses excessivas, pode causar danos graves ao fígado. Reações comuns são raras.", symptoms: ["náusea"] },
    contraindications: { text: "Não deve ser usado por pessoas com doenças graves do fígado.", conditions: ["Insuficiência Hepática"] }
  },
  {
    id: 4,
    name: "Loratadina",
    category: "Antialérgico",
    indications: { text: "Alívio dos sintomas associados à rinite alérgica, como coriza, espirros e coceira no nariz.", keywords: ["coriza", "alergia"] },
    adverseReactions: { text: "Pode causar dor de cabeça e sonolência em alguns pacientes.", symptoms: ["dor de cabeça","sono"] },
    contraindications: { text: "Contraindicado para pacientes com alergia a qualquer componente da fórmula.", conditions: ["Alergia ao Remédio"] }
  },
  {
    id: 5,
    name: "Amoxicilina",
    category: "Antibiótico",
    indications: { text: "Tratamento de infecções bacterianas, como infecções de garganta, ouvido e sinusite.", keywords: ["infecção", "dor de garganta", "dor de ouvido"] },
    adverseReactions: { text: "As reações mais comuns são náusea, diarreia e erupções cutâneas.", symptoms: ["náusea","diarreia","alergia na pele"] },
    contraindications: { text: "Não usar em caso de alergia a penicilinas. Usar com cautela em pacientes com insuficiência renal.", conditions: ["Alergia ao Remédio","Insuficiência Renal"] }
  }
];

export const SINTOMAS = ["Dor de cabeça", "Febre", "Náusea", "Tontura", "Coriza"];
export const CONDICOES = ["Asma", "Hipertensão", "Insuficiência Renal", "Insuficiência Hepática"];