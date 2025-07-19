import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
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

interface InternalBookingNotificationProps {
  booking: BookingData;
}

export default function InternalBookingNotification({
  booking,
}: InternalBookingNotificationProps) {
  const getBookingTypeInfo = (type: string) => {
    switch (type) {
      case 'demo':
        return {
          title: 'Demo Request',
          priority: 'High',
          color: '#1e40af',
          bgColor: '#eff6ff',
          lightColor: '#dbeafe',
          icon: '🎯'
        };
      case 'sales':
        return {
          title: 'Sales Inquiry',
          priority: 'High',
          color: '#7c3aed',
          bgColor: '#f3e8ff',
          lightColor: '#e9d5ff',
          icon: '💼'
        };
      default:
        return {
          title: 'Consultation Call',
          priority: 'Medium',
          color: '#059669',
          bgColor: '#ecfdf5',
          lightColor: '#d1fae5',
          icon: '📞'
        };
    }
  };

  const bookingInfo = getBookingTypeInfo(booking.bookingType);
  const formattedDate = new Date(booking.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <Html>
      <Head />
      <Preview>New {bookingInfo.title} from {booking.name} at {booking.companyName}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={headerTitle}>🚨 New Booking Alert</Text>
            <Text style={headerSubtitle}>Aegis AI Admin Notification</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            {/* Alert Banner */}
            <Section style={{...alertBanner, backgroundColor: bookingInfo.bgColor, borderLeftColor: bookingInfo.color}}>
              <Row>
                <Column style={{width: '40px', paddingRight: '12px'}}>
                  <Text style={{fontSize: '24px', margin: '0', textAlign: 'center'}}>{bookingInfo.icon}</Text>
                </Column>
                <Column>
                  <Text style={{...alertText, color: bookingInfo.color}}>
                    <strong>Priority: {bookingInfo.priority}</strong>
                  </Text>
                  <Text style={{...alertSubText, color: bookingInfo.color}}>
                    New {bookingInfo.title} received
                  </Text>
                </Column>
              </Row>
            </Section>

            <Heading style={h1}>New {bookingInfo.title}</Heading>
            
            <Text style={text}>
              A new booking request has been submitted and requires your immediate attention.
            </Text>

            {/* Customer Details Card */}
            <Section style={customerCard}>
              <Row>
                <Column style={{width: '100%'}}>
                  <Heading style={cardTitle}>👤 Customer Information</Heading>
                </Column>
              </Row>
              
              <Row style={detailRow}>
                <Column style={{width: '140px', ...detailLabel}}>
                  <Text style={labelText}>Full Name</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={valueText}>{booking.name}</Text>
                </Column>
              </Row>
              
              <Row style={detailRow}>
                <Column style={{width: '140px', ...detailLabel}}>
                  <Text style={labelText}>Email Address</Text>
                </Column>
                <Column style={detailValue}>
                  <Link href={`mailto:${booking.email}`} style={{...valueText, ...link}}>
                    {booking.email}
                  </Link>
                </Column>
              </Row>
              
              <Row style={detailRow}>
                <Column style={{width: '140px', ...detailLabel}}>
                  <Text style={labelText}>Phone Number</Text>
                </Column>
                <Column style={detailValue}>
                  <Link href={`tel:${booking.contact}`} style={{...valueText, ...link}}>
                    {booking.contact}
                  </Link>
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
                  <Text style={{...priorityBadge, backgroundColor: bookingInfo.lightColor, color: bookingInfo.color}}>
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

            {/* Action Items */}
            <Section style={actionSection}>
              <Heading style={h2}>📋 Recommended Actions</Heading>
              <Row>
                <Column style={{width: '100%'}}>
                  <Text style={{...text, marginBottom: '16px'}}>
                    <strong>⏰ Response Time Target:</strong> Within 24 hours
                  </Text>
                  
                  {booking.bookingType === 'demo' && (
                    <Section style={actionList}>
                      <Text style={actionItem}>✅ Schedule a personalized demo session</Text>
                      <Text style={actionItem}>🎯 Prepare relevant use cases for their industry</Text>
                      <Text style={actionItem}>📅 Send calendar invite with demo link</Text>
                    </Section>
                  )}
                  
                  {booking.bookingType === 'sales' && (
                    <Section style={actionList}>
                      <Text style={actionItem}>👨‍💼 Assign to senior sales representative</Text>
                      <Text style={actionItem}>🔍 Research company background and needs</Text>
                      <Text style={actionItem}>📊 Prepare enterprise pricing and proposals</Text>
                    </Section>
                  )}
                  
                  {booking.bookingType === 'call' && (
                    <Section style={actionList}>
                      <Text style={actionItem}>📞 Schedule consultation call</Text>
                      <Text style={actionItem}>❓ Prepare discovery questions</Text>
                      <Text style={actionItem}>✉️ Send meeting confirmation</Text>
                    </Section>
                  )}
                </Column>
              </Row>
            </Section>

            {/* Quick Actions */}
            <Section style={buttonSection}>
              <Text style={{...h2, textAlign: 'center', marginBottom: '20px'}}>⚡ Quick Actions</Text>
              <Row>
                <Column style={{width: '50%', paddingRight: '10px'}}>
                  <Button style={{...button, backgroundColor: '#059669', ...buttonHover}} href={`mailto:${booking.email}`}>
                    📧 Reply to Customer
                  </Button>
                </Column>
                <Column style={{width: '50%', paddingLeft: '10px'}}>
                  <Button style={{...button, backgroundColor: '#1e40af', ...buttonHover}} href="https://aegis-ai-next.vercel.app/admin/dashboard">
                    📊 View Dashboard
                  </Button>
                </Column>
              </Row>
              
              <Row style={{marginTop: '12px'}}>
                <Column style={{width: '100%'}}>
                  <Button style={{...button, backgroundColor: bookingInfo.color, ...buttonHover}} href={`tel:${booking.contact}`}>
                    📱 Call Customer Directly
                  </Button>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              🤖 This is an automated notification from the Aegis AI booking system.
            </Text>
            <Text style={footerText}>
              Manage notification settings in the admin dashboard.
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
  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
  padding: '24px 40px',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '22px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
};

const headerSubtitle = {
  color: '#fecaca',
  fontSize: '14px',
  margin: '0',
  fontWeight: '500',
};

const alertBanner = {
  borderLeft: '4px solid',
  borderRadius: '8px',
  padding: '16px 20px',
  margin: '0 0 24px 0',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
};

const alertText = {
  fontSize: '15px',
  fontWeight: 'bold',
  margin: '0 0 4px',
};

const alertSubText = {
  fontSize: '13px',
  margin: '0',
  opacity: 0.8,
};

const content = {
  padding: '40px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 16px',
  textAlign: 'left' as const,
};

const h2 = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '24px 0 16px',
};

const text = {
  color: '#4b5563',
  fontSize: '15px',
  lineHeight: '22px',
  margin: '0 0 16px',
};

const customerCard = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
};

const cardTitle = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 20px',
  borderBottom: '1px solid #e2e8f0',
  paddingBottom: '12px',
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
  fontSize: '14px',
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

const actionSection = {
  backgroundColor: '#fffbeb',
  border: '1px solid #fbbf24',
  borderRadius: '12px',
  padding: '20px',
  margin: '24px 0',
};

const actionList = {
  margin: '0',
};

const actionItem = {
  color: '#92400e',
  fontSize: '14px',
  margin: '0 0 8px',
  paddingLeft: '0',
  lineHeight: '20px',
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
  transition: 'all 0.2s ease',
};

const buttonHover = {
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.12)',
};

const footer = {
  backgroundColor: '#f8fafc',
  padding: '20px 40px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e2e8f0',
};

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '0 0 6px',
};

const link = {
  color: '#1e40af',
  textDecoration: 'underline',
  fontWeight: '500',
};