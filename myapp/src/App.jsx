import { useState } from "react";

function App() {
  // état pour stocker les informations du stagiaire saisi
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [groupe, setGroupe] = useState("");

  // état pour stocker le module et la note à ajouter
  const [nomModule, setNomModule] = useState("");
  const [note, setNote] = useState("");

  // tableau qui contient tous les stagiaires avec leurs modules
  const [stagiaires, setStagiaires] = useState([]);

  // fonction appelée quand on clique sur "Entrer"
  const ajouter = () => {
    // chercher si le stagiaire existe déjà
    const index = stagiaires.findIndex(
      s => s.nom === nom && s.prenom === prenom && s.groupe === groupe
    );

    // si le stagiaire existe déjà
    if (index !== -1) {
      // on fait une copie du tableau
      const copie = [...stagiaires];

      // on ajoute le module + note au stagiaire trouvé
      copie[index].modules.push({
        nomModule,
        note: Number(note)
      });

      // on met à jour le state
      setStagiaires(copie);
    } 
    // si le stagiaire n'existe pas encore
    else {
      setStagiaires([
        ...stagiaires,
        {
          nom,
          prenom,
          groupe,
          modules: [
            {
              nomModule,
              note: Number(note)
            }
          ]
        }
      ]);
    }

    // réinitialiser les champs module et note
    setNomModule("");
    setNote("");
  };

  // fonction pour calculer la moyenne d'un stagiaire
  const moyenne = (modules) => {
    let somme = 0;

    // additionner toutes les notes
    for (let m of modules) {
      somme += m.note;
    }

    // calcul de la moyenne
    return (somme / modules.length).toFixed(2);
  };

  return (
    <>
      {/* saisie des informations du stagiaire */}
      Nom
      <input value={nom} onChange={e => setNom(e.target.value)} />
      <br />

      Prénom
      <input value={prenom} onChange={e => setPrenom(e.target.value)} />
      <br />

      Groupe
      <input value={groupe} onChange={e => setGroupe(e.target.value)} />
      <br /><br />

      {/* saisie du module et de la note */}
      Module
      <input value={nomModule} onChange={e => setNomModule(e.target.value)} />

      Note
      <input
        type="number"
        value={note}
        onChange={e => setNote(e.target.value)}
      />

      <button onClick={ajouter}>Entrer</button>

      <hr />

      {/* affichage des stagiaires */}
      {stagiaires.map((s, i) => (
        <div key={i}>
          <strong>
            {s.nom} {s.prenom} - {s.groupe}
          </strong>

          <ul>
            {s.modules.map((m, j) => (
              <li key={j}>
                {m.nomModule} : {m.note}
              </li>
            ))}
          </ul>

          {/* affichage de la moyenne */}
          Moyenne : {moyenne(s.modules)}

          <hr />
        </div>
      ))}
    </>
  );
}

export default App;
