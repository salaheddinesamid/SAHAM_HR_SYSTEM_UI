import "./styles/ProfileManagement.css";

const mockEmployee = {
  firstName: "Salaheddine",
  lastName: "Samid",
  birthDate: "1995-06-12",
  profilePicture: "https://i.pravatar.cc/150?img=12",
  nationality: "Marocaine",
  cin: "BE123456",
  familySituation: "Marié",
  childrenCount: 1,
  address: "Casablanca, Maroc",

  professionalDetails: {
    matriculation: "SAHAMEMP001",
    occupation: "Software Engineer",
    department: "IT",
    managerName: "Ciryane El Khiati",
    joinDate: "2025-11-01",
    site: "Casablanca",
    professionalPhoneNumber: "+212 6 12 34 56 78",
    professionalFixedPhoneNumber: "05 22 12 34 56",
    extension: "1234",
    professionalEmail: "samid@saham.com"
  },

  socialDetails: {
    cnssNumber: "CNSS-789456",
    cimrNumber: "CIMR-456123",
    insuranceNumber: "MUT-123789"
  },

  contactDetails: {
    emergencyContactName: "Amina Samid",
    relationship: "Épouse",
    emergencyPhone: "+212 6 98 76 54 32"
  }
};
const Section = ({ title, children }) => (
  <div className="profile-section">
    <h3>{title}</h3>
    <div className="profile-view-grid">{children}</div>
  </div>
);

const Field = ({ label, value }) => (
  <div className="profile-field">
    <span className="label">{label}</span>
    <span className="value">{value || "-"}</span>
  </div>
);

const ProfileHeader = ({ employee }) => (
  <div className="profile-header">
    <img
      src={employee.profilePicture}
      alt="Profile"
      className="profile-avatar"
    />
  </div>
);


const PersonalDetails = ({ data }) => (
  <Section title="Informations personnelles">
    <Field label="Nom" value={data.lastName} />
    <Field label="Prénom" value={data.firstName} />
    <Field label="Date de naissance" value={data.birthDate} />
    <Field label="Nationalité" value={data.nationality} />
    <Field label="CIN" value={data.cin} />
    <Field label="Situation familiale" value={data.familySituation} />
    <Field label="Nombre d’enfants" value={data.childrenCount} />
    <Field label="Adresse" value={data.address} />
  </Section>
);

const ProfessionalDetails = ({ data }) => (
  <Section title="Informations professionnelles">
    <Field label="Matricule interne" value={data.matriculation} />
    <Field label="Poste / Fonction" value={data.occupation} />
    <Field label="Département / Direction" value={data.department} />
    <Field label="Manager direct" value={data.managerName} />
    <Field label="Date d’embauche" value={data.joinDate} />
    <Field label="Site" value={data.site} />
    <Field label="Téléphone pro" value={data.professionalPhoneNumber} />
    <Field label="Fixe pro" value={data.professionalFixedPhoneNumber} />
    <Field label="Extension" value={data.extension} />
    <Field label="Email pro" value={data.professionalEmail} />
  </Section>
);

const SocialDetails = ({ data }) => (
  <Section title="Informations administratives & sociales">
    <Field label="N° CNSS" value={data.cnssNumber} />
    <Field label="N° CIMR" value={data.cimrNumber} />
    <Field label="Mutuelle / Assurance santé" value={data.insuranceNumber} />
  </Section>
);

const ContactDetails = ({ data }) => (
  <Section title="Urgence & contact">
    <Field label="Personne à contacter" value={data.emergencyContactName} />
    <Field label="Lien de parenté" value={data.relationship} />
    <Field label="Téléphone d’urgence" value={data.emergencyPhone} />
  </Section>
);

export const ProfileManagement = () => {
  return (
    <div className="profile-container">
      <ProfileHeader employee={mockEmployee} />
      <PersonalDetails data={mockEmployee} />
      <ProfessionalDetails data={mockEmployee.professionalDetails} />
      <SocialDetails data={mockEmployee.socialDetails} />
      <ContactDetails data={mockEmployee.contactDetails} />
    </div>
  );
};
