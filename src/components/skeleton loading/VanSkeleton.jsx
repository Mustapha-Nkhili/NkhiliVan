import ImgSkeleton from "./ImgSkeleton";
import Skeleton from "./Skeleton";

export default function VanSkeleton() {
  return (
    <div className="vans">
      {[...Array(10)].map((_, index) => {
        return (
          <div className="van" key={index}>
            <ImgSkeleton className="van-img" />
            <div className="van-name-price-wrapper">
              <Skeleton className="van-name" />
              <div className="price-wrapper">
                <Skeleton className="price" />
                <Skeleton />
              </div>
            </div>
            <Skeleton className="van-type" />
          </div>
        );
      })}
    </div>
  );
}
