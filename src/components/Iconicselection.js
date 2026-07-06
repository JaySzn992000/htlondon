import "./Iconicselection.css";

const categories = [

{
name: "SHIRTS",
img: "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/aaef3c11-531f-4996-bfdc-779c33ff0cec/1772714622.jpeg?w=500",
},
{
name: "TROUSERS",
img: "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/4c91b6ae-4117-4aac-a97b-78ef219325ee/1772714639.jpeg?w=500",
},
{
name: "JEANS",
img: "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/59d59218-a414-4995-94c8-4aa61aae9ae0/1772714656.jpeg?w=500",
},
{
name: "POLOS",
img: "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/aebdc03f-f280-4cf9-8a80-12a648b2025a/1772714669.jpeg?w=500",
},
{
name: "CARGOS",
img: "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/b83959e3-074a-409f-a033-e56e2781ab73/1772714681.jpeg?w=500",
},
{
name: "T-SHIRTS",
img: "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/5b1d3e8b-adff-4539-8be7-96d8c01c0d12/1772714845.jpeg?w=500",
},
{
name: "SHORTS",
img: "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/04088c7a-3216-4a8b-9b23-e7f7703e1f6b/1772714906.jpeg?w=500",
},
{
name: "PLUS SIZE",
img: "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/9d62e211-00c9-4b34-9180-28365f3454be/1772714968.jpeg?w=500",
},
];

const Iconicselection = () => {

return (

<section className="selection">

<div className="selection_heading">
<p>DISCOVER</p>
<h2>POPULAR CATEGORIES</h2>
</div>

<div className="selection_grid">

{categories.map((item, index) => (
<div className="category_card" key={index}>
<img src={item.img} alt={item.name} />

<div className="overlay">
<h3>{item.name}</h3>
<span>SHOP NOW →</span>
</div>

</div>

))}

</div>

</section>

);
};

export default Iconicselection;