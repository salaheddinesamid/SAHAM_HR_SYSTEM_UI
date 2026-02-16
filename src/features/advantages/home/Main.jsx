import { FaHome, FaMapMarkerAlt, FaUserTie } from "react-icons/fa";

export const HomeInsuranceDetails = () => {
  return (
    <div className="container my-5">

      <div className="card shadow border-0 rounded-4">
        <div className="card-body px-4 py-4">

          <p className="fs-6">
            Tout salarié du Groupe bénéficie d’une
            <strong className="text-primary"> réduction de 50 % </strong>
            sur la souscription au contrat
            <strong> Multirisque Habitation </strong>
            auprès de <strong>SANLAM</strong>.
          </p>

          <div className="bg-light p-3 rounded-3 mb-4">
            Vous êtes invité(e) à vous présenter directement
            au bureau direct <strong>Sanlam</strong> pour effectuer
            votre souscription ou obtenir des informations complémentaires.
          </div>

          <hr />
          <h6 className="fw-bold mb-3">Coordonnées</h6>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="border rounded-3 p-3 h-100 bg-white shadow-sm">
                <div className="d-flex align-items-center mb-2">
                  <FaMapMarkerAlt className="text-primary me-2"/>
                  <strong>Adresse</strong>
                </div>

                <div>
                  216, Boulevard Mohammed Zerktouni
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded-3 p-3 h-100 bg-white shadow-sm">
                <div className="d-flex align-items-center mb-2">
                  <FaUserTie className="text-primary me-2"/>
                  <strong>Contact</strong>
                </div>

                <div>
                  Mme Asmaa Basli
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
