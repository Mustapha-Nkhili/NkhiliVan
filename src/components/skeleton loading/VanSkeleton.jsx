import ImgSkeleton from "./ImgSkeleton";
import Skeleton from "./Skeleton";

export default function VanSkeleton() {
  const vanSkeleton = (
    <div className="van">
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
  return (
    <div className="vans-container">
      {vanSkeleton} 
      {vanSkeleton} 
      {vanSkeleton} 
      {vanSkeleton} 
      {vanSkeleton}
      {vanSkeleton}
      {vanSkeleton} 
      {vanSkeleton}
    </div>
  );
}
