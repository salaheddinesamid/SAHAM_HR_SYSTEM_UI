import { useEffect, useState } from "react";
import "./styles/ProfileManagement.css";
import { getEmployee } from "../../services/EmployeeService";
import axios from "axios";

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

const ProfileHeader = ({ employee }) => {
  if (!employee) return null;

  const hasProfilePic =
    employee.profilePictureUrl &&
    employee.profilePictureUrl.trim() !== "";

  return (
    <div className="profile-header">
      {hasProfilePic ? (
        <img
          src={`/api/profile-picture/${employee.profilePictureUrl}`}
          alt="Profile"
          className="profile-avatar"
        />
      ) : (
        <ProfilePictureUploader employeeId={employee.id} />
      )}
    </div>
  );
};
const ProfilePictureUploader = ({ employeeId }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `/api/profile-picture/upload/${employeeId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      window.location.reload(); // quick refresh
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};


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
  const [employeeDetails, setEmployeeDetails] = useState(null);

  const fetchEmployeeDetails = async() =>{
    const authUserEmail = JSON.parse(localStorage.getItem("userDetails"))?.email
    try{
      const res = await getEmployee(authUserEmail);
      console.log(res);
      setEmployeeDetails(res);
    }catch(err){
      console.log(err);
    }
    finally{
      console.log(employeeDetails);
    }
  }
  useEffect(()=>{
    fetchEmployeeDetails();
  },[])
  return (
    <div className="profile-container">
      <ProfileHeader employee={employeeDetails} />
      <PersonalDetails data={employeeDetails} />
      <ProfessionalDetails data={employeeDetails?.professionalDetails} />
      <SocialDetails data={employeeDetails?.socialDetails} />
      <ContactDetails data={employeeDetails?.contactDetails} />
    </div>
  );
};
