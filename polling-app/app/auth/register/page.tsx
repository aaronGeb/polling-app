"use client";

import RegisterForm from "../../../components/RegisterForm";
import InteractiveButton from "../../../components/InteractiveButton";

export default function RegisterPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        maxWidth: '1000px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        minHeight: '600px'
      }}>
        {/* Left Side - Welcome Content */}
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              🎉
            </div>
            
            <h1 style={{
              fontSize: '36px',
              fontWeight: '800',
              marginBottom: '20px',
              textAlign: 'center',
              lineHeight: '1.2'
            }}>
              Join the Fun!
            </h1>
            
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              textAlign: 'center',
              marginBottom: '30px',
              opacity: 0.9
            }}>
              Start your journey with the most engaging polling platform! 
              Create polls, gather insights, and make data-driven decisions with style.
            </p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                opacity: 0.9
              }}>
                <span style={{ fontSize: '20px' }}>🚀</span>
                <span>Create unlimited polls</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                opacity: 0.9
              }}>
                <span style={{ fontSize: '20px' }}>📱</span>
                <span>Mobile-first design</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                opacity: 0.9
              }}>
                <span style={{ fontSize: '20px' }}>🔒</span>
                <span>100% secure & private</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                opacity: 0.9
              }}>
                <span style={{ fontSize: '20px' }}>⚡</span>
                <span>Real-time results</span>
              </div>
            </div>
          </div>
          
          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(180deg); }
            }
          `}</style>
        </div>

        {/* Right Side - Register Form */}
        <div style={{
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: 'white'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '12px'
            }}>
              Create Account
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: 0
            }}>
              Start building amazing polls today
            </p>
          </div>
          
          <RegisterForm />
          
          <div style={{
            textAlign: 'center',
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0 0 16px 0'
            }}>
              Already have an account?
            </p>
            <InteractiveButton href="/auth/login">
              🔑 Sign In
            </InteractiveButton>
          </div>
        </div>
      </div>
    </div>
  );
}
