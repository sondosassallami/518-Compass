import React from 'react';
import '../App.css'; // Use your shared global styles

function Feedback() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>We Value Your Feedback</h2>
        <p style={styles.subheading}>Let us know how we can improve 518 Compass.</p>
        <form style={styles.form}>
          <input type="text" placeholder="Your Name (optional)" style={styles.input} />
          <input type="email" placeholder="Your Email (optional)" style={styles.input} />
          <textarea placeholder="Your Feedback" required style={styles.textarea}></textarea>
          <button type="submit" style={styles.button}>Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg)',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '12px',
    color: 'var(--color-heading, #004d40)',
  },
  subheading: {
    marginBottom: '24px',
    color: '#555',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    minHeight: '100px',
    resize: 'vertical',
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'var(--color-button, #00695c)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
};

export default Feedback;
