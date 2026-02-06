export const CarInsuranceDetails = () => {
  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <p>
            Tout salarié du Groupe bénéficie d’une
            <strong> réduction de 50 % </strong>
            sur la souscription à l’assurance auto <strong>SANLAM</strong>,
            au profit du salarié et de son conjoint.
          </p>

          <p className="text-warning fw-semibold">
            ⚠️ Cet avantage est débloqué uniquement après titularisation.
          </p>

          <hr />

          <h5 className="mt-3">Première demande</h5>
          <p>
            La première demande doit impérativement être adressée
            au service <strong>RH</strong> par email.
          </p>

          <h6 className="mt-3">Documents requis :</h6>
          <ul>
            <li>Copie de la CIN</li>
            <li>Copie de la carte de travail</li>
            <li>Copie de la carte grise / déclaration de mise en circulation</li>
            <li>Copie du permis de conduire</li>
            <li>Type d’assurance souhaitée</li>
            <li>Valeur du véhicule</li>
            <li>Date d’effet souhaitée</li>
          </ul>

          <p className="mt-2">
            <strong>En cas de souscription pour le conjoint :</strong>
          </p>
          <ul>
            <li>Copie de l’acte de mariage</li>
            <li>Copie de la carte de travail du collaborateur</li>
          </ul>

          <hr />

          <h5>Renouvellement</h5>
          <p>
            À partir de la deuxième demande, le collaborateur pourra gérer
            directement son assurance auprès du bureau direct <strong>Sanlam</strong>,
            situé à l’adresse suivante :
          </p>

          <p className="fw-semibold">
            📍 216, Boulevard Mohammed Zerktouni
          </p>

          <hr />

          <h5>En cas de départ</h5>
          <p>
            Le collaborateur doit obligatoirement transmettre au service
            <strong> RH</strong> une copie de son contrat d’assurance auto.
          </p>

        </div>
      </div>
    </div>
  );
};
