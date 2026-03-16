import { IconButton } from "@mui/material";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { getProfilePicture } from "../../../services/EmployeeService";
import { ProfilePictureUpdateDialog } from "../dialogs/ProfilePictureUpdateDialog";

export const ProfilePicture = ({ id, path, name }) => {

  const initials = name
    ?.split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0,2);

  const [image, setImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [updateImageDialogOpen, setUpdateImageDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchImage = async () => {
    try {
      setLoading(true);

      const res = await getProfilePicture(id, path);

      const imageUrl = URL.createObjectURL(res.data);

      setImage(imageUrl);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [id, path]);

  return (
    <div
      style={{
        position: "relative",
        width: "200px",
        height: "200px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div
        style={{
          borderRadius: "50%",
          border: "2px solid #004170",
          width: "200px",
          height: "200px",
          overflow: "hidden",
          opacity: isHovered ? 0.4 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        {loading ? (
          <div>Loading...</div>
        ) : image ? (
          <img
            src={image}
            alt="profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            {initials}
          </div>
        )}

      </div>

      {isHovered && (
        <IconButton
          onClick={() => setUpdateImageDialogOpen(true)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
          }}
        >
          <Edit />
        </IconButton>
      )}

      <ProfilePictureUpdateDialog
        open={updateImageDialogOpen}
        onClose={() => setUpdateImageDialogOpen(false)}
        employeeId={id}
        onSuccess={fetchImage}
      />

    </div>
  );
};