"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Account created successfully! Please check your email for confirmation.");
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Email Field */}
      <div>
        <label htmlFor="email" style={{
          display: 'block',
          fontSize: '16px',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '8px'
        }}>
          📧 Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="Enter your email address"
          style={{
            width: '100%',
            padding: '16px 20px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#f9fafb'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#10b981'
            e.target.style.backgroundColor = 'white'
            e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e5e7eb'
            e.target.style.backgroundColor = '#f9fafb'
            e.target.style.boxShadow = 'none'
          }}
        />
        {errors.email && (
          <p style={{ 
            color: '#dc2626', 
            fontSize: '14px', 
            marginTop: '8px', 
            margin: '8px 0 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>⚠️</span> {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" style={{
          display: 'block',
          fontSize: '16px',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '8px'
        }}>
          🔒 Password
        </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="Create a strong password"
          style={{
            width: '100%',
            padding: '16px 20px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#f9fafb'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#10b981'
            e.target.style.backgroundColor = 'white'
            e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e5e7eb'
            e.target.style.backgroundColor = '#f9fafb'
            e.target.style.boxShadow = 'none'
          }}
        />
        {errors.password && (
          <p style={{ 
            color: '#dc2626', 
            fontSize: '14px', 
            marginTop: '8px', 
            margin: '8px 0 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>⚠️</span> {errors.password.message}
          </p>
        )}
        
        {/* Password Requirements */}
        <div style={{
          marginTop: '8px',
          padding: '12px 16px',
          backgroundColor: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#0369a1'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>🔐 Password Requirements:</p>
          <ul style={{ margin: 0, paddingLeft: '16px' }}>
            <li>At least 6 characters long</li>
            <li>Use a mix of letters, numbers, and symbols</li>
            <li>Avoid common passwords</li>
          </ul>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '20px' }}>🚨</span>
          <p style={{ 
            color: '#dc2626', 
            margin: 0, 
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {error}
          </p>
        </div>
      )}

      {/* Success Display */}
      {success && (
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '20px' }}>🎉</span>
          <p style={{ 
            color: '#166534', 
            margin: 0, 
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {success}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          backgroundColor: isSubmitting ? '#9ca3af' : '#10b981',
          color: 'white',
          padding: '18px 24px',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: '700',
          border: 'none',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.backgroundColor = '#059669'
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.backgroundColor = '#10b981'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        {isSubmitting ? (
          <>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid #ffffff',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            Creating Account...
          </>
        ) : (
          <>
            ✨ Create Account
          </>
        )}
      </button>

      {/* Terms and Privacy */}
      <div style={{
        textAlign: 'center',
        fontSize: '13px',
        color: '#6b7280',
        lineHeight: '1.5'
      }}>
        <p style={{ margin: 0 }}>
          By creating an account, you agree to our{' '}
          <a href="#" style={{ color: '#10b981', textDecoration: 'none' }}>Terms of Service</a>
          {' '}and{' '}
          <a href="#" style={{ color: '#10b981', textDecoration: 'none' }}>Privacy Policy</a>
        </p>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
