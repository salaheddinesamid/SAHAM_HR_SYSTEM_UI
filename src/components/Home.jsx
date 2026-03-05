import { servicesConfig } from "./servicesConfig";
import "../styles/Home.css";
import { useService } from "../context/ViewNavigatorContext";
import { useEffect, useState } from "react";

export const Home = () => {
  const [user, setUser] = useState(null);
  const {service, selectService} = useService();
  const filteredServices = servicesConfig.filter(service =>
    !service.allowedRoles || service.allowedRoles.some(role => user?.roles.includes(role)));
  useEffect(()=>{
    setUser(
      JSON.parse(localStorage.getItem("userDetails"))
    )
  },[])
  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Bienvenue dans votre espace collaborateur</h2>
      </div>

      <div className="home-content">
        <div className="">
          {filteredServices.filter((s)=> s.id !== 10).map((s) => (
            s.id !== 1 && (
                <div key={s.id} className="row">
                    <h3>{s.name}</h3>
                    <div className="services-grid">
                        {s.subServices?.map((sub)=>(
                            <div className="service-card" onClick={() => selectService(sub)} style={{
                                backgroundColor : sub.color 
                            }}>
                                <div className="service-icon">{sub.icon}</div>
                                <p className="service-name">{sub.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
        ))}
        </div>
      </div>
    </div>
  );
};
