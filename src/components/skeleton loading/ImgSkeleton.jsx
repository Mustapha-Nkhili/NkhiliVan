import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function ImgSkeleton({ className }) {
  return (
    <div className={`skeleton img ${className}`}>
      <FontAwesomeIcon icon={faImage} />
    </div>
  );
}
