import o3plussunscreen from "../Slider/o3plusessunscreen.png";
import o3plushandmask from "../Slider/o3plushandmask.png";
import o3pluspedicure from "../Slider/o3pluspedicure.png";
import o3plushydrogelmask from "../Slider/o3plushydrogelmask.png";
import "./Featured.css";

const Featured = () => {
  const products = [
    { id: 1, img: o3plussunscreen, name: "Sunscreen", tag: "Essential" },
    { id: 2, img: o3plushandmask, name: "Hand Mask", tag: "Luxury" },
    { id: 3, img: o3pluspedicure, name: "Pedicure", tag: "Premium" },
    { id: 4, img: o3plushydrogelmask, name: "Hydrogel Mask", tag: "Signature" },
  ];

  return (
    <div className="featured_container">
      <div className="featured_center">
        <div className="featured_header">
          <span className="featured_badge">✦ Editor's Pick</span>
          <h2>FEATURED</h2>
          <h2 className="featured_sub">COLLECTION</h2>
          <div className="header_line"></div>
          <p className="featured_desc">Curated essentials for the discerning</p>
        </div>

        <section className="shopcategory_flex">
          {products.map((product) => (
            <div className="shopcategory_card" key={product.id}>
              <div className="card_image_wrapper">
                <img src={product.img} alt={product.name} />
                <div className="card_tag">{product.tag}</div>
                <div className="card_shadow"></div>
              </div>
              <div className="card_content">
                <label>{product.name}</label>
                <span className="card_category">Shop The Look</span>
                <button className="discover_btn">
                  <span>DISCOVER</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Featured;