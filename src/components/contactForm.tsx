

const ContactForm = () => {
  return (
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
  );
}

export default ContactForm;