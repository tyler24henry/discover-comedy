import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import styled from 'styled-components';

const ContactStyles = styled.div`
    width: 70%;
    margin: 0 auto;
    transition: opacity 0.4s;
    &[disabled]{
        opacity: 0.6;
        pointer-events: none;
        cursor: default;
    }
    h2 {
        text-transform: uppercase;
        font-size: 2rem;
        font-weight: 600;
        color:#ccd6f6;
    }
    .details {
        font-size: 1.4rem;
        margin: 2rem 0 3rem 0;
        padding-left: 1.5rem;
        border-left: 8px solid #9da8c7;
    }
    .contact-form {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        justify-items: start;
        border-radius: 8px;
        input[type="text"], input[type="email"], textarea {
            width: calc(100% - 10px);
            padding: 0.5rem;
            border: none;
            background: snow;
            color: #0a1930;
        }
        textarea {
            height: 140px;
            resize: vertical;
        }
        button {
            padding: 1rem 2rem;
            background: var(--red);
            &:hover {
                filter: brightness(80%);
            }
            &[disabled]{
                opacity: 0.6;
                pointer-events: none;
                cursor: default;
            }
        }
    }
`;

export const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    // woohoo

    const serviceId = process.env.GATSBY_EMAILJS_SERVICE_ID;
    const templateId = process.env.GATSBY_EMAILJS_TEMPLATE_ID;
    const userId = process.env.GATSBY_EMAILJS_USER_ID;

  function sendEmail(e) {
    setLoading(true);
    e.preventDefault();
    emailjs.sendForm(serviceId, templateId, e.target, userId);
    setTimeout(() => {
        setLoading(false);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setSuccess(true);
    }, 2000);
  }

  const formFilledOut = name && email && subject && message;

  return (
    <ContactStyles disabled={loading}>
        {!success && (
            <>
                <h2>Contact</h2>
                <p className="details">Fill out the form below and we'll respond as soon as we can. If you're a comic and want to be put into the mix, let us know. We're also open to any suggestions to improve the site.</p>
                <form className="contact-form" onSubmit={sendEmail}>
                    <input type="text" name="name" autoComplete="off" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" name="email" autoComplete="off" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="text" name="subject" autoComplete="off" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
                    <textarea style={{ width: 'calc(100% - 10px)'}} name="message" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
                    <button type="submit" disabled={!formFilledOut}>Send</button>
                </form>
            </>
        )}
        {success && (
            <>
                <h2>Success</h2>
                <div className="contact-form">
                    <p>Your message has been sent.  Thanks for reaching out!  We'll get back to you as soon as we can.</p>
                </div>
            </>
        )}
    </ContactStyles>
  );
}