import Avatar from '@mui/material/Avatar';


export const UserProfile = () => {
    return (
      <div className="user-info">
        
        <div className="user-avatar">
          <Avatar />
        </div>
        <div className="user-details">
          <p className="user-name">Salaheddine Samid</p>
          <p className="user-company">SAHAM</p>
        </div>
      </div>
    );
  };