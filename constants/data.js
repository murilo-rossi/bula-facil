export const MEDICAMENTOS = [
  {
    id: 1,
    name: "Ibuprofeno",
    category: "Anti-inflamatório",
    indications: {
      text: "Alívio temporário de dores de cabeça, dor de dente, dores musculares, cólicas menstruais e para redução da febre.",
      keywords: ["dor de cabeça", "febre", "dor muscular", "cólica"]
    },
    adverseReactions: {
      text: "Pode causar náuseas, vômitos, dor de estômago e tontura. Em casos raros, reações alérgicas graves.",
      symptoms: ["náusea", "tontura"]
    },
    contraindications: {
      text: "Não deve ser usado por pessoas com asma, insuficiência renal ou que já tiveram reação alérgica a outro anti-inflamatório.",
      conditions: ["Asma", "Insuficiência Renal"]
    }
  },
  {
    id: 2,
    name: "Dipirona",
    category: "Analgésico e Antitérmico",
    indications: { text: "Utilizada no tratamento de dor e febre.", keywords: ["dor", "febre"] },
    adverseReactions: { text: "Pode causar reações de hipotensão (pressão baixa) e, em casos raros, reações alérgicas na pele.", symptoms: [] },
    contraindications: { text: "Contraindicada em casos de alergia aos componentes e em certas doenças metabólicas.", conditions: [] }
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
    adverseReactions: { text: "Pode causar dor de cabeça e sonolência em alguns pacientes.", symptoms: ["dor de cabeça"] },
    contraindications: { text: "Contraindicado para pacientes com alergia a qualquer componente da fórmula.", conditions: [] }
  },
  {
    id: 5,
    name: "Amoxicilina",
    category: "Antibiótico",
    indications: { text: "Tratamento de infecções bacterianas, como infecções de garganta, ouvido e sinusite.", keywords: ["infecção", "garganta"] },
    adverseReactions: { text: "As reações mais comuns são náusea, diarreia e erupções cutâneas.", symptoms: ["náusea"] },
    contraindications: { text: "Não usar em caso de alergia a penicilinas. Usar com cautela em pacientes com insuficiência renal.", conditions: ["Insuficiência Renal"] }
  }
];

export const SINTOMAS = ["Dor de cabeça", "Febre", "Náusea", "Tontura", "Coriza"];
export const CONDICOES = ["Asma", "Hipertensão", "Insuficiência Renal", "Insuficiência Hepática"];