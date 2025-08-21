import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface BookingData {
  name: string;
  email: string;
  contact: string;
  companyName: string;
  companySize: string;
  bookingType: 'demo' | 'call' | 'sales';
  createdAt: string;
}

interface CustomerBookingConfirmationProps {
  booking: BookingData;
}

export default function CustomerBookingConfirmation({
  booking,
}: CustomerBookingConfirmationProps) {
  const getBookingTypeInfo = (type: string) => {
    switch (type) {
      case 'demo':
        return {
          title: 'Demo Request',
          description: 'Experience our AI voice agents in action',
          nextSteps: 'Our team will set up a personalized demo showcasing how our AI voice agents can transform your customer interactions.',
          icon: '🎯',
          color: '#1e40af',
          bgColor: '#eff6ff',
          lightBgColor: '#dbeafe'
        };
      case 'sales':
        return {
          title: 'Sales Inquiry',
          description: 'Explore enterprise solutions',
          nextSteps: 'Our sales team will contact you to discuss custom enterprise solutions tailored to your business needs.',
          icon: '💼',
          color: '#7c3aed',
          bgColor: '#f3e8ff',
          lightBgColor: '#e9d5ff'
        };
      default:
        return {
          title: 'Consultation Call',
          description: 'Discuss your business needs',
          nextSteps: 'Our experts will reach out to schedule a consultation call to understand your requirements and recommend the best solutions.',
          icon: '📞',
          color: '#059669',
          bgColor: '#ecfdf5',
          lightBgColor: '#d1fae5'
        };
    }
  };

  const bookingInfo = getBookingTypeInfo(booking.bookingType);
  const formattedDate = new Date(booking.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Html>
      <Head />
      <Preview>Your {bookingInfo.title} has been confirmed - Aegis AI</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Row>
              <Column style={{width: '100%', textAlign: 'center'}}>
                <Text style={logoText}>AEGIS</Text>
                <Text style={logoSubText}>AI VOICE AGENTS</Text>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            {/* Success Banner */}
            <Section style={successBanner}>
              <Row>
                <Column style={{width: '60px', textAlign: 'center', paddingRight: '16px'}}>
                  <Text style={{fontSize: '40px', margin: '0'}}>✅</Text>
                </Column>
                <Column>
                  <Text style={successTitle}>Booking Confirmed!</Text>
                  <Text style={successSubtitle}>We've received your {bookingInfo.title.toLowerCase()}</Text>
                </Column>
              </Row>
            </Section>
            <Text style={greeting}>
              Hi <strong>{booking.name}</strong>,
            </Text>
            
            <Text style={text}>
              Thank you for your interest in Aegis AI! We're excited to help you discover how our AI voice agents can revolutionize your customer interactions.
            </Text>

            {/* Booking Details Card */}
            <Section style={{...bookingCard, borderLeftColor: bookingInfo.color}}>
              <Row>
                <Column style={{width: '50px', paddingRight: '16px'}}>
                  <Text style={{fontSize: '32px', margin: '0', textAlign: 'center'}}>{bookingInfo.icon}</Text>
                </Column>
                <Column>
                  <Heading style={{...cardTitle, color: bookingInfo.color}}>{bookingInfo.title}</Heading>
                  <Text style={cardDescription}>{bookingInfo.description}</Text>
                </Column>
              </Row>
              
              <Section style={detailsContainer}>
                <Row style={detailRow}>
                  <Column style={{width: '140px', ...detailLabel}}>
                    <Text style={labelText}>Contact Person</Text>
                  </Column>
                  <Column style={detailValue}>
                    <Text style={valueText}>{booking.name}</Text>
                  </Column>
                </Row>
                
                <Row style={detailRow}>
                  <Column style={{width: '140px', ...detailLabel}}>
                    <Text style={labelText}>Company</Text>
                  </Column>
                  <Column style={detailValue}>
                    <Text style={valueText}>{booking.companyName}</Text>
                  </Column>
                </Row>
                
                <Row style={detailRow}>
                  <Column style={{width: '140px', ...detailLabel}}>
                    <Text style={labelText}>Company Size</Text>
                  </Column>
                  <Column style={detailValue}>
                    <Text style={valueText}>{booking.companySize} employees</Text>
                  </Column>
                </Row>
                
                <Row style={detailRow}>
                  <Column style={{width: '140px', ...detailLabel}}>
                    <Text style={labelText}>Request Type</Text>
                  </Column>
                  <Column style={detailValue}>
                    <Text style={{...priorityBadge, backgroundColor: bookingInfo.lightBgColor, color: bookingInfo.color}}>
                      {bookingInfo.icon} {bookingInfo.title}
                    </Text>
                  </Column>
                </Row>
                
                <Row style={detailRow}>
                  <Column style={{width: '140px', ...detailLabel}}>
                    <Text style={labelText}>Submitted</Text>
                  </Column>
                  <Column style={detailValue}>
                    <Text style={valueText}>{formattedDate}</Text>
                  </Column>
                </Row>
              </Section>
            </Section>

            {/* Next Steps */}
            <Section style={nextStepsSection}>
              <Row>
                <Column style={{width: '40px', paddingRight: '16px'}}>
                  <Text style={{fontSize: '24px', margin: '0', textAlign: 'center'}}>🚀</Text>
                </Column>
                <Column>
                  <Heading style={h2}>What happens next?</Heading>
                  <Text style={{...text, marginBottom: '16px'}}>
                    {bookingInfo.nextSteps}
                  </Text>
                  <Text style={responseTime}>
                    ⏰ <strong>Response Time:</strong> We typically respond within 24 hours during business days.
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* CTA Buttons */}
            <Section style={buttonSection}>
              <Row>
                <Column style={{width: '50%', paddingRight: '10px'}}>
                  <Button style={{...button, backgroundColor: bookingInfo.color}} href="https://aegisai.com">
                    🌐 Visit Our Website
                  </Button>
                </Column>
                <Column style={{width: '50%', paddingLeft: '10px'}}>
                  <Button style={{...button, backgroundColor: '#6b7280'}} href="mailto:support@aegisai.com">
                    📧 Contact Support
                  </Button>
                </Column>
              </Row>
            </Section>

            {/* Features Highlight */}
            <Section style={featuresSection}>
              <Heading style={{...h2, textAlign: 'center', marginBottom: '24px'}}>
                🌟 Why Choose Aegis AI?
              </Heading>
              <Row style={{marginBottom: '16px'}}>
                <Column style={featureColumn}>
                  <Section style={featureCard}>
                    <Text style={featureIcon}>🤖</Text>
                    <Text style={featureTitle}>Natural Conversations</Text>
                    <Text style={featureText}>AI that understands context and responds naturally</Text>
                  </Section>
                </Column>
                <Column style={featureColumn}>
                  <Section style={featureCard}>
                    <Text style={featureIcon}>⚡</Text>
                    <Text style={featureTitle}>Lightning Fast</Text>
                    <Text style={featureText}>Sub-second response times for smooth interactions</Text>
                  </Section>
                </Column>
              </Row>
              <Row>
                <Column style={featureColumn}>
                  <Section style={featureCard}>
                    <Text style={featureIcon}>🔒</Text>
                    <Text style={featureTitle}>Enterprise Security</Text>
                    <Text style={featureText}>Bank-grade encryption and compliance</Text>
                  </Section>
                </Column>
                <Column style={featureColumn}>
                  <Section style={featureCard}>
                    <Text style={featureIcon}>🌍</Text>
                    <Text style={featureTitle}>24/7 Availability</Text>
                    <Text style={featureText}>Never miss a customer call</Text>
                  </Section>
                </Column>
              </Row>
            </Section>

            {/* Social Proof */}
            <Section style={socialProofSection}>
              <Text style={{...h2, textAlign: 'center', marginBottom: '16px'}}>
                🏆 Trusted by Industry Leaders
              </Text>
              <Text style={{...text, textAlign: 'center', color: '#6b7280'}}>
                Join thousands of businesses already using Aegis AI to enhance their customer experience
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Questions? Reply to this email or contact us at{' '}
              <Link href="mailto:support@aegisai.com" style={link}>
                support@aegisai.com
              </Link>
            </Text>
            <Text style={footerText}>
              Follow us: 
              <Link href="#" style={{...link, marginLeft: '8px'}}>Twitter</Link> • 
              <Link href="#" style={{...link, margin: '0 4px'}}>LinkedIn</Link> • 
              <Link href="#" style={{...link, margin: '0 4px'}}>YouTube</Link>
            </Text>
            <Text style={footerText}>
              © 2025 Aegis AI. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Enhanced Styles
const main = {
  backgroundColor: '#f1f5f9',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '20px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  marginBottom: '32px',
  maxWidth: '600px',
  borderRadius: '12px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  overflow: 'hidden',
};

const header = {
  background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
  padding: '32px 40px',
};

const logoText = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
  letterSpacing: '2px',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const logoSubText = {
  color: '#93c5fd',
  fontSize: '12px',
  margin: '4px 0 0',
  letterSpacing: '1px',
  fontWeight: '500',
};

const successBanner = {
  backgroundColor: '#f0fdf4',
  border: '2px solid #22c55e',
  borderRadius: '12px',
  padding: '20px 24px',
  margin: '0 0 24px 0',
};

const successTitle = {
  color: '#15803d',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 4px',
};

const successSubtitle = {
  color: '#16a34a',
  fontSize: '14px',
  margin: '0',
};

const content = {
  padding: '40px',
};

const greeting = {
  color: '#1f2937',
  fontSize: '18px',
  margin: '0 0 20px',
  fontWeight: '500',
};

const h2 = {
  color: '#1f2937',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 12px',
};

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
};

const bookingCard = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderLeft: '4px solid',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
};

const cardTitle = {
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 8px',
};

const cardDescription = {
  color: '#6b7280',
  fontSize: '15px',
  margin: '0',
  fontStyle: 'italic',
};

const detailsContainer = {
  marginTop: '20px',
  paddingTop: '20px',
  borderTop: '1px solid #e2e8f0',
};

const detailRow = {
  marginBottom: '12px',
  paddingBottom: '8px',
  borderBottom: '1px solid #f1f5f9',
};

const detailLabel = {
  verticalAlign: 'top' as const,
  paddingRight: '16px',
};

const detailValue = {
  verticalAlign: 'top' as const,
};

const labelText = {
  color: '#6b7280',
  fontSize: '13px',
  fontWeight: '600',
  margin: '0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
};

const valueText = {
  color: '#1f2937',
  fontSize: '15px',
  margin: '0',
  fontWeight: '500',
};

const priorityBadge = {
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: '16px',
  fontSize: '13px',
  fontWeight: 'bold',
  margin: '0',
};

const nextStepsSection = {
  backgroundColor: '#eff6ff',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #bfdbfe',
};

const responseTime = {
  color: '#1e40af',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
  padding: '12px 16px',
  backgroundColor: '#dbeafe',
  borderRadius: '8px',
};

const buttonSection = {
  margin: '32px 0',
};

const button = {
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 20px',
  width: '100%',
  boxSizing: 'border-box' as const,
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
};

const featuresSection = {
  margin: '40px 0',
  padding: '24px',
  backgroundColor: '#fafafa',
  borderRadius: '12px',
  border: '1px solid #f3f4f6',
};

const featureColumn = {
  width: '50%',
  padding: '0 8px',
  verticalAlign: 'top' as const,
};

const featureCard = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'center' as const,
  border: '1px solid #e5e7eb',
  height: '120px',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
};

const featureIcon = {
  fontSize: '24px',
  margin: '0 0 8px',
};

const featureTitle = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 6px',
};

const featureText = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '0',
};

const socialProofSection = {
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
  padding: '24px',
  margin: '32px 0',
  textAlign: 'center' as const,
};

const footer = {
  backgroundColor: '#f8fafc',
  padding: '24px 40px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e2e8f0',
};

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '0 0 8px',
};

const link = {
  color: '#1e40af',
  textDecoration: 'underline',
  fontWeight: '500',
};