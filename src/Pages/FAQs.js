import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import './ReturnPolicy.css';

const FAQs = () => {

return (

<div>

<Navbar></Navbar>

<div className="return_flex_">

<div>

<h2 className="return_tag">FAQS</h2>

<p>This Privacy Policy describes how your personal 
information is collected, used, and shared when you 
visit or make a purchase from www.htlondon.shop.
</p>

<h2>PERSONAL INFORMATION</h2>

<p>
{" "}
When you visit the Site, we automatically 
collect certain information about your device, 
including information about your web browser, IP 
address, time zone, and some of the cookies that are 
installed on your device. Additionally, as you browse 
the Site, we collect information about the individual
web pages or products that you view, what websites or
search terms referred you to the Site, and information 
about how you interact with the Site. We refer to this 
automatically collected information as 
“Device Information.”
{" "}
</p>

<h2>PAYMENT GATEWAY</h2>

<p>
{" "}
All online payments on www.htlondon.shop are 
managed on a secure payment gateway. We do 
not store or have visibility into customers' net 
banking information or credit/debit card details as 
all payments are handled by a secure 3rd party gateway 
with world-class security.
{" "}
</p>

<h2>CHANGES IN PRIVACY POLICY</h2>

<p>
{" "}
We may update our Privacy Policy from time to time. 
Thus, we advise you to review this page periodically 
for any changes. We will notify you of any changes by 
posting the new Privacy Policy on this page. These 
changes are effective immediately, after they are 
posted on this page.
{" "}
</p>

</div>

</div>

<Header></Header>

</div>

)

}

export default FAQs;
