import { useState } from "react";
import "./FAqQuestions.css";

const FAqQuestions = () => {

const [openIndex, setOpenIndex] = useState(null);

const faqs = [
{
question: "1. What is your return policy ?",
answer: "You can return any product within 30 days of purchase if it is unused and in original packaging."
},
{
question: "2. Do you offer international shipping ?",
answer: "Yes, we ship worldwide. Delivery times vary depending on your location."
},
{
question: "3. How can I track my order ?",
answer: "Once your order is shipped, you will receive a tracking link via email to monitor your package."
},
{
question: "4. Are your products eco-friendly ?",
answer: "Yes, we prioritize sustainable materials and eco-friendly packaging for all our products."
}
];

const toggleFAQ = (index) => {
setOpenIndex(openIndex === index ? null : index);
};

return (
<div className="faq-container">
<label>NEED HELP ?</label>
<h2>Frequently Asked Questions</h2>
{faqs.map((faq, index) => (

<div className="faq-item">
<div className="faq-question" onClick={() => toggleFAQ(index)}>
{faq.question}
<span className="faq-icon">{openIndex === index ? "-" : "+"}</span>
</div>

<div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
{faq.answer}
</div>
</div>

))}
</div>
);

};

export default FAqQuestions;
