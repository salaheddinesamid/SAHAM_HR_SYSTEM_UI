import { FaCar, FaFileAlt, FaSync, FaSignOutAlt, FaExclamationTriangle } from "react-icons/fa";

export const CarInsuranceDetails = () => {
  return (
    <div className="container my-5">
      <div className="card shadow border-0 rounded-4">
        <div className="card-body px-4 py-4">

          <div className="mb-3 fs-6">
            Tout salarié du Groupe bénéficie d’une
            <strong className="text-primary"> réduction de 50 % </strong>
            sur la souscription à l’assurance auto <strong>SANLAM</strong>,
            au profit du salarié et de son conjoint.
          </div>
          <div className="alert alert-warning d-flex align-items-center rounded-3">
            <FaExclamationTriangle className="me-2"/>
            Cet avantage est débloqué uniquement après titularisation.
          </div>

          <Section
            icon={<FaFileAlt />}
            title="Première demande"
          >
            <p>
              La première demande doit être adressée au service
              <strong> RH</strong> par email.
            </p>

            <h6 className="fw-bold mt-3">Documents requis</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Copie de la CIN</li>
              <li className="list-group-item">Copie de la carte de travail</li>
              <li className="list-group-item">Carte grise / mise en circulation</li>
              <li className="list-group-item">Permis de conduire</li>
              <li className="list-group-item">Type d’assurance souhaitée</li>
              <li className="list-group-item">Valeur du véhicule</li>
              <li className="list-group-item">Date d’effet souhaitée</li>
            </ul>

            <div className="mt-3">
              <strong>Pour le conjoint :</strong>
              <ul className="mt-2">
                <li>Acte de mariage</li>
                <li>Carte de travail du collaborateur</li>
              </ul>
            </div>
          </Section>
          <Section
            icon={<FaSync />}
            title="Renouvellement"
          >
            <p>
              À partir de la deuxième demande, le collaborateur gère directement
              son assurance auprès du bureau direct <strong>Sanlam</strong>.
            </p>

            <div className="bg-light p-3 rounded-3 fw-semibold">
              📍 216, Boulevard Mohammed Zerktouni
            </div>
          </Section>

          {/* Section */}
          <Section
            icon={<FaSignOutAlt />}
            title="En cas de départ"
          >
            <p>
              Le collaborateur doit transmettre au service
              <strong> RH</strong> une copie du contrat d’assurance auto.
            </p>
          </Section>

        </div>
      </div>
    </div>
  );
};

const Section = ({ icon, title, children }) => (
  <div className="mb-4">

    <div className="d-flex align-items-center mb-2">
      <div className="me-2 text-primary">{icon}</div>
      <h6 className="fw-bold mb-0">{title}</h6>
    </div>

    <div className="ps-4">
      {children}
    </div>

    <hr className="mt-4"/>
  </div>
);
