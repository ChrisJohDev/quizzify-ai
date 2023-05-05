import Image from "next/image";
import Head from "next/head";
import Menu from "@/frontend/components/menu";
import styles from '../styles/contact.module.css'

export default function Contact() {
  return (
    <div className={`container flex flex-col mx-auto ${styles.contactPage}`}>
      <h1 className="text-center">Contact Us</h1>
      <div className={`col-md-6 offset-md-3 flex flex-col ${styles.info}`}>
        <div className={`mx-auto ${styles.tableWrapper}`}>
          <table>
            <tbody>
              <tr>
                <td>Telephone:</td>
                <td>+46 - (0)31 123 45 67</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>support@quizzify-ai.com</td>
              </tr>
            </tbody>
          </table>
        </div>
        <form className="mx-auto">
          <label htmlFor="issue">What is your issue?</label>
          <select id="issue" name="issue">
            <option value="bug">Bug</option>
            <option value="feature">Feature Request</option>
            <option value="other">Other</option>
          </select>
          <label htmlFor="input-element">Label Text:</label>
          <input type="text" id="input-element" name="input-name" />
          <label htmlFor="input-element1">Label Text:</label>
          <textarea id="input-element1" name="input-name1" /> <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
