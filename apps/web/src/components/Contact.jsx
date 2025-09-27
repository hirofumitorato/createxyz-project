"use client";

import { useState } from "react";
import { Send, Twitter, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "お名前を入力してください";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "メッセージを入力してください";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({ name: "", email: "", message: "" });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-[120px] px-6 lg:px-20 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 
          className="text-[40px] font-bold text-white mb-16 tracking-wider uppercase text-center"
          style={{ fontFamily: "Orbitron, monospace" }}
        >
          CONTACT
        </h2>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-8 p-4 bg-[#00ffff]/10 border border-[#00ffff] rounded-lg flex items-center space-x-3">
            <CheckCircle size={24} className="text-[#00ffff]" />
            <span 
              className="text-[#00ffff] text-[16px] font-medium"
              style={{ fontFamily: "Noto Sans JP, sans-serif" }}
            >
              Thanks! メッセージを送信しました。
            </span>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500 rounded-lg flex items-center space-x-3">
            <AlertCircle size={24} className="text-red-500" />
            <span 
              className="text-red-500 text-[16px] font-medium"
              style={{ fontFamily: "Noto Sans JP, sans-serif" }}
            >
              送信に失敗しました。もう一度お試しください。
            </span>
          </div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 w-[70%] mx-auto">
          {/* Name Field */}
          <div>
            <label 
              htmlFor="name"
              className="block text-white text-[14px] font-medium mb-2 tracking-wider"
              style={{ fontFamily: "Noto Sans JP, sans-serif" }}
            >
              お名前 *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#1a1a1a] border ${
                errors.name ? 'border-red-500' : 'border-[#00ffff]/30'
              } rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00ffff] focus:shadow-[0_0_20px_#00ffff/30] transition-all duration-300`}
              style={{ fontFamily: "Noto Sans JP, sans-serif" }}
              placeholder="山田太郎"
            />
            {errors.name && (
              <p className="mt-1 text-red-500 text-[12px]" style={{ fontFamily: "Noto Sans JP, sans-serif" }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label 
              htmlFor="email"
              className="block text-white text-[14px] font-medium mb-2 tracking-wider"
              style={{ fontFamily: "Noto Sans JP, sans-serif" }}
            >
              メールアドレス *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#1a1a1a] border ${
                errors.email ? 'border-red-500' : 'border-[#00ffff]/30'
              } rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00ffff] focus:shadow-[0_0_20px_#00ffff/30] transition-all duration-300`}
              style={{ fontFamily: "Noto Sans JP, sans-serif" }}
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-[12px]" style={{ fontFamily: "Noto Sans JP, sans-serif" }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label 
              htmlFor="message"
              className="block text-white text-[14px] font-medium mb-2 tracking-wider"
              style={{ fontFamily: "Noto Sans JP, sans-serif" }}
            >
              メッセージ *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-3 bg-[#1a1a1a] border ${
                errors.message ? 'border-red-500' : 'border-[#00ffff]/30'
              } rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#00ffff] focus:shadow-[0_0_20px_#00ffff/30] transition-all duration-300 resize-none`}
              style={{ fontFamily: "Noto Sans JP, sans-serif" }}
              placeholder="お気軽にメッセージをお送りください..."
            />
            {errors.message && (
              <p className="mt-1 text-red-500 text-[12px]" style={{ fontFamily: "Noto Sans JP, sans-serif" }}>
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#00ffff] to-[#a855f7] text-black font-bold rounded-lg hover:from-[#00ffff]/90 hover:to-[#a855f7]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                fontFamily: "Orbitron, monospace",
                boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)"
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>送信中...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>SEND MESSAGE</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* SNS Links */}
        <div className="flex justify-center items-center space-x-8 mt-16">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center space-y-2 text-white hover:text-[#00ffff] transition-all duration-300"
          >
            <div className="p-4 rounded-full border border-[#00ffff]/30 group-hover:border-[#00ffff] group-hover:shadow-[0_0_20px_#00ffff] transition-all duration-300">
              <Twitter size={24} className="group-hover:animate-pulse" />
            </div>
            <span 
              className="text-[12px] font-medium tracking-wider"
              style={{ fontFamily: "Noto Sans JP, sans-serif" }}
            >
              X
            </span>
          </a>

          <a
            href="https://note.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center space-y-2 text-white hover:text-[#00ffff] transition-all duration-300"
          >
            <div className="p-4 rounded-full border border-[#00ffff]/30 group-hover:border-[#00ffff] group-hover:shadow-[0_0_20px_#00ffff] transition-all duration-300">
              <FileText size={24} className="group-hover:animate-pulse" />
            </div>
            <span 
              className="text-[12px] font-medium tracking-wider"
              style={{ fontFamily: "Noto Sans JP, sans-serif" }}
            >
              note
            </span>
          </a>
        </div>

        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00ffff] rounded-full opacity-60 animate-ping"></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-[#a855f7] rounded-full opacity-40 animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-[#00ffff] rounded-full opacity-50 animate-ping" style={{ animationDelay: "2s" }}></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00ffff" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}