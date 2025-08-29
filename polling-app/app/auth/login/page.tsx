"use client";

import LoginForm from "../../../components/LoginForm";
import InteractiveButton from "../../../components/InteractiveButton";

export default function LoginPage() {
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
          background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
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
              🗳️
            </div>
            
            <h1 style={{
              fontSize: '36px',
              fontWeight: '800',
              marginBottom: '20px',
              textAlign: 'center',
              lineHeight: '1.2'
            }}>
              Welcome Back!
            </h1>
            
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              textAlign: 'center',
              marginBottom: '30px',
              opacity: 0.9
            }}>
              Ready to continue creating amazing polls and gathering insights? 
              Sign in to access your dashboard and see how your polls are performing.
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
                <span style={{ fontSize: '20px' }}>✅</span>
                <span>Access all your polls</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                opacity: 0.9
              }}>
                <span style={{ fontSize: '20px' }}>📊</span>
                <span>View real-time results</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                opacity: 0.9
              }}>
                <span style={{ fontSize: '20px' }}>🚀</span>
                <span>Create new polls instantly</span>
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

        {/* Right Side - Login Form */}
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
              Sign In
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: 0
            }}>
              Access your polling dashboard
            </p>
          </div>
          
          <LoginForm />
          
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
              Don&apos;t have an account?
            </p>
            <InteractiveButton href="/auth/register">
              ✨ Create Account
            </InteractiveButton>
          </div>
        </div>
      </div>
    </div>
  );
}
