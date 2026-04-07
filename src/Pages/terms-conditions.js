import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import './ReturnPolicy.css';


const TermsCondition = () => {

return (

<div>

<Navbar></Navbar>

<div className="return_flex_">

<div>

<h2 className="return_tag">TERMS & CONDITIONS</h2>

<p>Welcome to our website. HtLondon.shop is an 
online service operated and managed by HtLondon 
Hunter International LLP. If you continue to browse 
and use HtLondon.shop you are agreeing to comply with 
and be bound by the following terms and conditions
of the agreement listed below or as may be revised 
from time to time ('User Agreement').
</p>

<h2>REGISTERATION AND ACCOUNTS</h2>

<p>
{" "}
You may register for an account with our website 
by completing and submitting the account registration 
form on our website.
{" "}
</p>

<h2>ENTIRE ANGREEMENT</h2>

<p>
{" "}
The terms and conditions, together with our privacy 
and cookies policy, shall constitute the entire 
agreement between you and us in relation to your 
use of our website and shall supersede all previous 
agreements between you and us in relation to your use 
of our website.
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

export default TermsCondition;
