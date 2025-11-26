import { servicesConfig } from "./servicesConfig";
import "../styles/Home.css";
import { useService } from "../context/ViewNavigatorContext";

export const Home = () => {
  
  const {service, selectService} = useService();
  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Bienvenue dans votre espace collaborateur</h2>
      </div>

      <div className="home-content">
        <div className="">
          {servicesConfig.map((s) => (
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
