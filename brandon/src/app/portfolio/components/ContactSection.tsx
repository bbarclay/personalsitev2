'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import {
  Mail,
  Phone,
  Send,
  Linkedin,
  Github,
  Twitter,
  Calendar,
  Check,
  MapPin,
  Globe
} from 'lucide-react';

const ContactSection: React.FC = () => {
  const [state, handleSubmit] = useForm("xgvezkgk");

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'barclaybrandon@hotmail.com',
      link: 'mailto:barclaybrandon@hotmail.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: '385-352-6855',
      link: 'tel:+13853526855'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'United States',
      link: null
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: 'Website',
      value: 'brandonbarclay.com',
      link: 'https://brandonbarclay.com'
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/brandontbarclay',
      color: 'hover:text-[#0077B5]'
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub',
      url: 'https://github.com/bbarclay/',
      color: 'hover:text-foreground'
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      label: 'Twitter',
      url: 'https://twitter.com',
      color: 'hover:text-[#1DA1F2]'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Let's Connect
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-lg border border-border"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">
                        {info.label}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-foreground hover:text-primary transition-colors break-all"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground break-all">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Connect on Social Media
              </h3>
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground ${social.color} transition-colors duration-200`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl p-6 shadow-lg border border-border"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-emerald-500/10">
                  <Calendar className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Currently Available
                  </h3>
                  <p className="text-muted-foreground">
                    Open for new projects and opportunities
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
            {state.succeeded ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-emerald-500/10">
                    <Check className="w-8 h-8 text-emerald-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      className="w-full px-4 py-2 rounded-lg border border-border
                               bg-background text-foreground
                               focus:ring-2 focus:ring-primary/50 focus:border-primary
                               dark:bg-card dark:border-border/50
                               dark:focus:border-primary dark:placeholder-muted-foreground"
                      required
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="w-full px-4 py-2 rounded-lg border border-border
                               bg-background text-foreground
                               focus:ring-2 focus:ring-primary/50 focus:border-primary
                               dark:bg-card dark:border-border/50
                               dark:focus:border-primary dark:placeholder-muted-foreground"
                      required
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    className="w-full px-4 py-2 rounded-lg border border-border
                             bg-background text-foreground
                             focus:ring-2 focus:ring-primary/50 focus:border-primary
                             dark:bg-card dark:border-border/50
                             dark:focus:border-primary dark:placeholder-muted-foreground"
                    required
                  />
                  <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-border
                             bg-background text-foreground
                             focus:ring-2 focus:ring-primary/50 focus:border-primary
                             dark:bg-card dark:border-border/50
                             dark:focus:border-primary dark:placeholder-muted-foreground"
                    required
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={state.submitting}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg
                           text-primary-foreground font-medium transition-colors duration-200
                           ${state.submitting
                             ? 'bg-muted cursor-not-allowed dark:bg-muted/50'
                             : 'bg-primary hover:bg-primary/90 dark:hover:bg-primary/80'
                           }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {state.submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
