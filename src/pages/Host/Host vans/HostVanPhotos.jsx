import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
  const { imageUrl } = useOutletContext().van;

  return (
    <section className="photos-of-van">
      <img src={imageUrl} alt="this is an image of a van" />
    </section>
  );
}
