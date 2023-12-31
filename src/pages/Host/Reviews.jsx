import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Reviews() {
  const reviewsData = [
    {
      rating: 5,
      name: "Elliot",
      date: "January 3, 2023",
      text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
      id: "1",
    },
    {
      rating: 5,
      name: "Sandy",
      date: "December 12, 2022",
      text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
      id: "2",
    },
  ];

  return (
    <div className="reviews">
      <div className="header">
        <h1>Your reviews</h1>
        <div className="income-time">
          last <span className="days">30 days</span>
        </div>
      </div>
      <div className="rating">
        <span className="rating-details">
          <span className="rating-value">5.0 </span>
          <FontAwesomeIcon icon={faStar} className="star" /> overall rating
        </span>
        <div className="progress-wrapper">
          <div className="five-star progress-bar flex-sb-ctr">
            <span>5 star</span>
            <progress value="100" max="100"></progress>
            <span>100%</span>
          </div>
          <div className="four-star progress-bar flex-sb-ctr">
            <span>4 star</span>
            <progress value="0" max="100"></progress>
            <span>0</span>
          </div>
          <div className="three-star progress-bar flex-sb-ctr">
            <span>3 star</span>
            <progress value="0" max="100"></progress>
            <span>0</span>
          </div>
          <div className="two-star progress-bar flex-sb-ctr">
            <span>2 star</span>
            <progress value="0" max="100"></progress>
            <span>0</span>
          </div>
          <div className="one-star progress-bar flex-sb-ctr">
            <span>1 star</span>
            <progress value="0" max="100"></progress>
            <span>0</span>
          </div>
        </div>
      </div>
      <div className="reviews-comments">
        <h2>Reviews (2)</h2>
        <div className="comments">
          {reviewsData.map((comment) => {
            return (
              <div className="comment" key={comment.id}>
                <div className="stars">
                  {[...Array(comment.rating)].map((_, index) => {
                    return (
                      <FontAwesomeIcon
                        icon={faStar}
                        className="star"
                        key={index}
                      />
                    );
                  })}
                </div>
                <div className="voter-name-date-wrapper">
                  <p className="voter-name">{comment.name}</p>
                  <div className="date">{comment.date}</div>
                </div>
                <p className="text">{comment.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
