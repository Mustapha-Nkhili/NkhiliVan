import { useOutletContext } from "react-router-dom";

export default function HostVanInfo() {
  const { name, type, description } = useOutletContext().van;

  return (
    <section className="details-of-van">
      <h4>
        Name: <span className="detail-content">{name}</span>
      </h4>
      <h4>
        Type: <span className="detail-content">{type}</span>
      </h4>
      <h4>
        Description: <p className="detail-content">{description}</p>
      </h4>
      <h4>
        Visibility: <span className="detail-content">public</span>
      </h4>
    </section>
  );
}
