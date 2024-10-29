import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mt-20">
      <div className="row">
        <div className="col-md-12">
          <section className="text-gray-600 body-font">
            <div className="card">
              <h1 className="title">Privacy Policy</h1>
              <hr />
              <p className='text-justify'>
                This Privacy Policy outlines how D'Sa Fashion Wear & Home Decor (hereinafter referred to as "Company") collects, stores, and uses information or data provided by you or related to you. This data is collected/stored and used when you access and/or use the website [Your Website URL] (hereinafter referred to as "Website") and when you engage in transactions related to the products offered on or through the Website, including various fashion wear and home decor items (hereinafter referred to as "Products") and services provided on the Website or other platforms (hereinafter referred to as "Services").
              </p>
              <p className='text-justify'>
                This Privacy Policy should be read alongside the Terms of Use available at [Your Terms of Use URL]. Your access to and use of the Website and Services is conditional upon your acceptance of this Privacy Policy and the Terms of Use. By accessing and/or using the Website and/or Services, you confirm that you are over 18 years of age and are competent to enter into legally binding contracts. By doing so, you consent to the collection, storage, and use of your information as described in this Privacy Policy.
              </p>
              <h5 className="font-serif">Collection of Information</h5>
              <p className='text-justify'>
                The Company may collect the following information (hereinafter referred to as "Your Information") depending on your use of the Website and/or Services:
              </p>
              <ul className='text-justify'>
                <li>Name</li>
                <li>Phone number</li>
                <li>Address</li>
                <li>Email ID</li>
                <li>Age</li>
                <li>Gender</li>
                <li>Location</li>
                <li>Language</li>
                <li>Shopping interests and preferences</li>
                <li>Date of birth</li>
                <li>Any applicable tax IDs</li>
                <li>Government-issued ID details</li>
                <li>Browsing history, including URLs visited before and after your visit to the Website</li>
                <li>Buying behavior</li>
              </ul>
              <p className='text-justify'>
                The Company utilizes third-party payment gateway systems. Any information provided to these third parties is governed by their respective privacy policies. The Company does not collect, store, or process this information without your express consent.
              </p>

              <h5 className="font-serif">Use of Information</h5>
              <p className='text-justify'>
                The Company may use Your Information for the following purposes:
              </p>
              <ul className='text-justify'>
                <li>Processing your orders and delivering products to you</li>
                <li>Providing relevant and appropriate products and services, and sending targeted communications</li>
                <li>Monitoring, improving, and troubleshooting the products and services offered</li>
                <li>Resolving complaints, including issues related to defective products and payment disputes</li>
                <li>Storing information to enhance our services and product offerings</li>
                <li>Conducting research on user demographics and behavior to better serve our users</li>
              </ul>
              <p className='text-justify'>
                The Company does not retain Your Information longer than necessary for the purposes outlined above. Cookies may be used to enhance user experience, as detailed in our Cookie Policy.
              </p>

              <h5 className="font-serif">Cookie Policy</h5>
              <p className='text-justify'>
                Like many websites, the Company uses cookies to gather information when you access or browse the Website. Cookies help remember your preferences and improve your experience. You can control cookie settings through your web browser. However, disabling cookies may limit your access to certain features of the Website.
              </p>

              <h5 className="font-serif">Consent</h5>
              <p className='text-justify'>
                By accessing and/or using the Website and/or Services, you consent to the collection and use of Your Information as described in this Privacy Policy. You have the right to access, correct, or update your personal information at any time by contacting us.
              </p>

              <h5 className="font-serif">Disclosure and Transfer of Information</h5>
              <p className='text-justify'>
                The Company may disclose Your Information to third parties, including service providers and marketing agencies, without your consent in specific circumstances, such as:
              </p>
              <ul className='text-justify'>
                <li>To comply with applicable laws or court orders</li>
                <li>For verification of identity and prevention of cyber incidents</li>
                <li>In the event of a merger or acquisition of the Company</li>
              </ul>

              <h5 className="font-serif">Security</h5>
              <p className='text-justify'>
                The Company takes reasonable steps to ensure the security of Your Information. However, no method of transmission over the internet is completely secure. The Company does not guarantee the security of Your Information and will notify you in case of any security breach.
              </p>

              <h5 className="font-serif">Grievance Officer</h5>
              <p className='text-justify'>
                Any grievances regarding the processing of Your Information can be directed to the Grievance Officer:
              </p>
              <p className='text-justify'>
                [Grievance Officer Name]<br />
                [Position]<br />
                [Address]<br />
                Email: [Grievance Officer Email]
              </p>

              <h5 className="font-serif">Changes to the Privacy Policy</h5>
              <p className='text-justify'>
                The Company reserves the right to update this Privacy Policy at any time. Changes will be effective as soon as they are posted on [Your Privacy Policy URL]. You are advised to review this Privacy Policy periodically to stay informed about any updates.
              </p>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .card {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          margin: 240px auto;
          max-width: 800px;
          text-align: left;
        }

        .title {
          font-size: 2rem;
          color: #333;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1rem;
          color: #666;
          margin: 10px 0;
        }

        ul {
          margin: 10px 0;
          padding-left: 20px;
        }

        @media (max-width: 768px) {
          .title {
            font-size: 1.5rem;
          }

          p {
            font-size: 0.9rem;
          }

          .card {
            padding: 1.5rem;
            margin: 230px auto;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 1.25rem;
          }

          p {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;