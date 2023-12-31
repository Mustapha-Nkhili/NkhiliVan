import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
  const { price } = useOutletContext().van;
  return (
    <section className="pricing-of-van">
      <span>${price}</span>/day
    </section>
  );
}
