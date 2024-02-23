const AddVans = () => {
  return (
    <section className="add-vans container">
      <h1>Add new Van</h1>
      <input type="file" name="van-img" id="vanImgInput" accept="image/*" />

      <input
        type="text"
        name="van-name"
        id="vanName"
        placeholder="Enter van name"
      />

      <input
        type="text"
        name="van-price"
        id="vanPrice"
        placeholder="Enter van price"
      />
      <textarea
        name="van-description"
        id="vanDescription"
        rows="4"
        placeholder="Enter the description"
      ></textarea>

      <h2>Choose item type</h2>
      <ul className="vans-type-list">
        <li
          onClick={(e) =>
            (e.target.querySelector('input[type="radio"]').checked = true)
          }
        >
          <label htmlFor="simple">simple</label>
          <input type="radio" name="van-type" id="simple" value={"simple"} />
        </li>
        <li
          onClick={(e) =>
            (e.target.querySelector('input[type="radio"]').checked = true)
          }
        >
          <label htmlFor="rugged">rugged</label>
          <input type="radio" name="van-type" id="rugged" value={"rugged"} />
        </li>
        <li
          onClick={(e) =>
            (e.target.querySelector('input[type="radio"]').checked = true)
          }
        >
          <label htmlFor="luxury">luxury</label>
          <input type="radio" name="van-type" id="luxury" value={"luxury"} />
        </li>
      </ul>

      <button className="add-van-btn">add van</button>
    </section>
  );
};

export default AddVans;
