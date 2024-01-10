export default function Skeleton({ className, children }) {
  return <div className={`skeleton ${className}`}>{children}</div>;
}
