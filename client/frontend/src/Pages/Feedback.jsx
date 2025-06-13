import React from 'react';

function Feedback() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Feedback</h2>
      <p>We’d love to hear your thoughts about the app. Please share your feedback!</p>
      <form>
        <textarea placeholder="Write your feedback here..." rows={5} style={{ width: '100%' }} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Feedback;
