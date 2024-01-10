import Skeleton from "./Skeleton";
import ImgSkeleton from "./ImgSkeleton";

export default function HostedVansSkeleton() {
  const vans = new Array(3);
  return (
    <div className="vans container">
        {[...vans].map((_, index) => {
          return (
            <Skeleton className="van" key={index}>
              <ImgSkeleton className="van-img" />
              <div>
                <Skeleton className="van-name" />
                <Skeleton className="van-price" />
              </div>
              <Skeleton className="edit-btn" />
            </Skeleton>
          );
        })}
    </div>
  );
}
