import React, { useState } from 'react';
import { Container, MainHeading } from '../globalStyles';

const Nucleus = () => {
  const [email, setEmail] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [description, setDescription] = useState('');
  const [teamsFile, setTeamsFile] = useState(null);
  const [usersFile, setUsersFile] = useState(null);
  const [companyDomain, setCompanyDomain] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (setter) => (e) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!ownerName) {
      setError('Please enter the business owner name.');
      return;
    }
    if (!companyDomain) {
      setError('Please enter your company email domain name.');
      return;
    }
    if (!teamsFile) {
      setError('Please upload the Teams spreadsheet.');
      return;
    }
    if (!usersFile) {
      setError('Please upload the Users spreadsheet.');
      return;
    }
    // Prepare form data
    const formData = new FormData();
    formData.append('ownerName', ownerName);
    formData.append('email', email);
    formData.append('description', description);
    // Remove file uploads for free Formspree
    // formData.append('teams', teamsFile);
    // formData.append('users', usersFile);
    formData.append('teamsFileName', teamsFile ? teamsFile.name : '');
    formData.append('usersFileName', usersFile ? usersFile.name : '');

    // Send to backend API (should be configured to email you)
    try {
      await fetch('https://formspree.io/f/xqabpeav', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      setSubmitted(true);
    } catch (err) {
      setError('Submission failed. Please try again later.');
    }
  };

  // Glassmorphism and background video overlay styles
  const glassCard = {
    background: 'rgba(255,255,255,0.75)',
    borderRadius: 28,
    boxShadow: '0 16px 48px 0 #a5b4fc55',
    padding: 56,
    maxWidth: 600,
    width: '100%',
    margin: '0 64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '2px solid #e0e7ff',
    backdropFilter: 'blur(16px) saturate(1.2)',
    WebkitBackdropFilter: 'blur(16px) saturate(1.2)',
    minHeight: 640,
    position: 'relative',
    zIndex: 2
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Animated blurred video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/assets/bg.mp4"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          filter: 'blur(12px) brightness(0.85) saturate(1.2)',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />
      <Container style={{ minHeight: 900, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', background: 'none', padding: '64px 0', position: 'relative', zIndex: 1 }}>
        {/* Left image - revolving animation, better proportions */}
        <div style={{ flex: 0.6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 120, maxWidth: 180, height: '100%' }}>
          <img src="/assets/teamwork.jpg" alt="Teamwork" className="nucleus-spin" style={{ width: '100%', maxWidth: 150, height: 220, objectFit: 'cover', borderRadius: 24, boxShadow: '0 4px 32px #e0e7ff', border: '2px solid #e0e7ff', background: '#fff', opacity: 0.97, marginBottom: 24, transition: 'transform 0.7s cubic-bezier(.4,2,.6,1)' }} />
          <img src="/assets/security.jpg" alt="Security" className="nucleus-spin" style={{ width: '100%', maxWidth: 150, height: 90, objectFit: 'cover', borderRadius: 18, boxShadow: '0 2px 16px #e0e7ff', border: '2px solid #e0e7ff', background: '#fff', opacity: 0.93, transition: 'transform 0.7s cubic-bezier(.4,2,.6,1)' }} />
        </div>
        {/* Main form card - improved field layout, better additional section, better placeholder */}
        <div style={{ ...glassCard, maxWidth: 520, width: '100%', padding: '40px 24px', minHeight: 700, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box', alignSelf: 'center' }}>
          {/* Stepper/progress bar */}
          <div style={{ width: '100%', marginBottom: 18, display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'linear-gradient(90deg,#7C3AED,#6366F1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, boxShadow: '0 2px 8px #a5b4fc' }}>1</div>
              <span style={{ color: '#6366F1', fontWeight: 700, fontSize: 15, letterSpacing: 0.2 }}>Waitlist Form</span>
            </div>
          </div>
          <MainHeading style={{ background: 'linear-gradient(90deg,#7C3AED,#6366F1 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900, fontSize: 36, textAlign: 'center', letterSpacing: 0.5, lineHeight: 1.2, marginBottom: 10 }}>
            Join the Nucleus Waitlist
          </MainHeading>
          <p style={{ fontSize: 17, color: '#334155', marginBottom: 28, textAlign: 'center', maxWidth: 500, fontWeight: 400, lineHeight: 1.5 }}>
            Be the first to experience <span style={{ color: '#6366f1', fontWeight: 700 }}>Nucleus</span>, our next-generation workspace and analytics platform.<br />
            Enter your details below to join the waitlist and get early access updates!
          </p>
          {submitted ? (
            <div style={{ color: '#16a34a', fontWeight: 700, fontSize: 24, textAlign: 'center', letterSpacing: 0.2, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
              <div>Thank you for joining the waitlist!</div>
              <div style={{ fontSize: 15, color: '#64748b', marginTop: 8 }}>We’ll be in touch soon with early access details.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <label style={{ fontWeight: 700, color: '#312e81', marginBottom: 2, fontSize: 15 }}>Business Owner Name</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={e => setOwnerName(e.target.value)}
                  placeholder="Enter your full name"
                  style={{ padding: '15px 16px', borderRadius: 12, border: '2px solid #cbd5e1', fontSize: 16, width: '100%', maxWidth: 400, background: '#f1f5f9', outline: 'none', fontWeight: 500, transition: 'border 0.2s, box-shadow 0.2s', boxShadow: '0 1px 4px #e0e7ff', marginBottom: 2, boxSizing: 'border-box' }}
                  required
                  onFocus={e => e.target.style.border = '2px solid #6366F1'}
                  onBlur={e => e.target.style.border = '2px solid #cbd5e1'}
                />
                <label style={{ fontWeight: 700, color: '#312e81', marginBottom: 2, fontSize: 15 }}>Business Owner Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your business email address"
                  style={{ padding: '15px 16px', borderRadius: 12, border: '2px solid #cbd5e1', fontSize: 16, width: '100%', maxWidth: 400, background: '#f1f5f9', outline: 'none', fontWeight: 500, transition: 'border 0.2s, box-shadow 0.2s', boxShadow: '0 1px 4px #e0e7ff', marginBottom: 2, boxSizing: 'border-box' }}
                  required
                  onFocus={e => e.target.style.border = '2px solid #6366F1'}
                  onBlur={e => e.target.style.border = '2px solid #cbd5e1'}
                />
                <label style={{ fontWeight: 700, color: '#312e81', marginBottom: 2, fontSize: 15 }}>Company Email Domain Name</label>
                <input
                  type="text"
                  value={companyDomain}
                  onChange={e => setCompanyDomain(e.target.value)}
                  placeholder="Enter your company domain (e.g. company.com)"
                  style={{ padding: '15px 16px', borderRadius: 12, border: '2px solid #cbd5e1', fontSize: 16, width: '100%', maxWidth: 400, background: '#f1f5f9', outline: 'none', fontWeight: 500, transition: 'border 0.2s, box-shadow 0.2s', boxShadow: '0 1px 4px #e0e7ff', marginBottom: 2, boxSizing: 'border-box' }}
                  required
                  onFocus={e => e.target.style.border = '2px solid #6366F1'}
                  onBlur={e => e.target.style.border = '2px solid #cbd5e1'}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 18 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <label style={{ fontWeight: 700, color: '#312e81', marginBottom: 2, fontSize: 15 }}>Teams Spreadsheet <span style={{ color: '#64748b', fontWeight: 400 }}>(.csv only)</span></label>
                  <input type="file" accept=".csv" onChange={handleFileChange(setTeamsFile)} style={{ marginBottom: 2, background: '#f1f5f9', borderRadius: 10, border: '2px solid #cbd5e1', padding: 8, fontSize: 15, transition: 'border 0.2s', boxShadow: '0 1px 4px #e0e7ff', maxWidth: 400, width: '100%', boxSizing: 'border-box' }} required />
                  <span style={{ fontSize: 13, color: '#64748b' }}>Required columns: <b>Team ID</b>, <b>Team Name</b>, <b>Product Owner</b>, <b>Project Manager</b></span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Example: <code>101,Data Science,Jane Doe,John Smith</code></span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <label style={{ fontWeight: 700, color: '#312e81', marginBottom: 2, fontSize: 15 }}>Users Spreadsheet <span style={{ color: '#64748b', fontWeight: 400 }}>(.csv only)</span></label>
                  <input type="file" accept=".csv" onChange={handleFileChange(setUsersFile)} style={{ marginBottom: 2, background: '#f1f5f9', borderRadius: 10, border: '2px solid #cbd5e1', padding: 8, fontSize: 15, transition: 'border 0.2s', boxShadow: '0 1px 4px #e0e7ff', maxWidth: 400, width: '100%', boxSizing: 'border-box' }} required />
                  <span style={{ fontSize: 13, color: '#64748b' }}>Required columns: <b>ID</b>, <b>Username</b>, <b>Profile Picture</b></span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Example: <code>1,janedoe,janedoe.png</code></span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                <label style={{ fontWeight: 700, color: '#312e81', marginBottom: 2, fontSize: 15 }}>Additional Description <span style={{ color: '#64748b', fontWeight: 400 }}>(optional)</span></label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe your business, team, or any special needs..."
                  style={{ padding: '15px 16px', borderRadius: 12, border: '2px solid #cbd5e1', fontSize: 16, width: '100%', maxWidth: 400, minHeight: 70, background: '#f1f5f9', outline: 'none', resize: 'vertical', fontWeight: 500, transition: 'border 0.2s, box-shadow 0.2s', boxShadow: '0 1px 4px #e0e7ff', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.border = '2px solid #6366F1'}
                  onBlur={e => e.target.style.border = '2px solid #cbd5e1'}
                />
              </div>
              {error && <div style={{ color: '#dc2626', marginBottom: 4, fontSize: 16, fontWeight: 600, textAlign: 'center' }}>{error}</div>}
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(90deg, #7C3AED 0%, #6366F1 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 14,
                  padding: '16px 0',
                  fontSize: 19,
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 2px 12px #a5b4fc',
                  marginTop: 8,
                  transition: 'background 0.2s, box-shadow 0.2s',
                  letterSpacing: 0.2,
                  width: '100%',
                  maxWidth: 400,
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onMouseOver={e => e.target.style.background = 'linear-gradient(90deg, #6366F1 0%, #7C3AED 100%)'}
                onMouseOut={e => e.target.style.background = 'linear-gradient(90deg, #7C3AED 0%, #6366F1 100%)'}
              >
                Join Waitlist
              </button>
            </form>
          )}
        </div>
        {/* Right image - revolving animation, better proportions */}
        <div style={{ flex: 0.6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 120, maxWidth: 180, height: '100%' }}>
          <img src="/assets/clients.jpg" alt="Clients" className="nucleus-spin" style={{ width: '100%', maxWidth: 150, height: 220, objectFit: 'cover', borderRadius: 24, boxShadow: '0 4px 32px #e0e7ff', border: '2px solid #e0e7ff', background: '#fff', opacity: 0.97, marginBottom: 24, transition: 'transform 0.7s cubic-bezier(.4,2,.6,1)' }} />
          <img src="/assets/techno.png" alt="Analytics" className="nucleus-spin" style={{ width: '100%', maxWidth: 150, height: 90, objectFit: 'cover', borderRadius: 18, boxShadow: '0 2px 16px #e0e7ff', border: '2px solid #e0e7ff', background: '#fff', opacity: 0.93, transition: 'transform 0.7s cubic-bezier(.4,2,.6,1)' }} />
        </div>
      </Container>
      {/* Add revolving animation CSS */}
      <style>{`
        .nucleus-spin {
          animation: nucleus-spin 12s linear infinite;
        }
        .nucleus-spin:hover {
          animation-play-state: paused;
        }
        @keyframes nucleus-spin {
          0% { transform: rotateY(0deg) scale(1); }
          50% { transform: rotateY(180deg) scale(1.04); }
          100% { transform: rotateY(360deg) scale(1); }
        }
      `}</style>
      {/* Subtle overlay for harmony */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'linear-gradient(120deg, #f8fafc99 60%, #e0e7ffcc 100%)', zIndex: 0, pointerEvents: 'none' }} />
    </div>
  );
};

export default Nucleus;
