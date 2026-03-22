import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  const { prompt } = req.body;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Tu es l'IA MonEmpireAuto. Tu génères des business plans. 
        TU DOIS RÉPONDRE EXCLUSIVEMENT EN JSON.
        Format attendu :
        {
          "business_nom": "Titre court",
          "estimation_gain": "Montant en €/mois",
          "difficulte": "Chiffre",
          "temps_requis": "X heures/jour",
          "plan_action": ["Étape 1", "Étape 2", "Étape 3", "Étape 4"],
          "lien_outil_recommande": "https://systeme.io?sa=ton_id_affilie"
        }`
      },
      { role: "user", content: prompt }
    ],
    model: "llama3-8b-8192",
    response_format: { type: "json_object" }
  });

  res.status(200).json({ text: completion.choices[0].message.content });
}
