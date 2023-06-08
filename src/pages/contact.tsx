/**
 * Project Name: Quizzify-AI
 * 
 * Contact page.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import styles from '../styles/contact.module.css'
import React from 'react';
// import ContactForm from '@/components/contactForm';

/**
 *
 *
 * @export
 * @return {React.ReactElement} 
 */
export default function Contact(): React.ReactElement {
  return (
    <div className={`container flex flex-col mx-auto ${styles.contactPage}`}>
      <h1 className="text-center">Contact Us</h1>
      <div className={`col-md-6 offset-md-3 flex flex-col ${styles.info}`}>
        <div className={`mx-auto ${styles.tableWrapper}`}>
          <table>
            <tbody>
              <tr>
                <td>Inquiries:</td>
                <td>info@quizzify-ai.org</td>
              </tr>
              <tr>
                <td>Support:</td>
                <td>support@quizzify-ai.org</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <ContactForm /> */}
      </div>
    </div>
  );
}
