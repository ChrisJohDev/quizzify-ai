import styles from '../styles/contact.module.css'
// import ContactForm from '@/components/contactForm';

export default function Contact() {
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
