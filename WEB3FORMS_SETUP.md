# Web3Forms Contact Form Setup

Your contact form now uses **Web3Forms** - a free, backend-free form service that sends emails directly to your inbox without requiring any server setup or API configuration.

## ✅ Advantages

- **No Backend Required**: Works entirely client-side
- **No API Keys Needed**: Simple integration
- **Free Forever**: 250 submissions/month on free plan
- **No Errors**: Unlike Resend, this won't break if not configured
- **Instant Setup**: Takes 2 minutes
- **Spam Protection**: Built-in honeypot and reCAPTCHA support

## 🚀 Quick Setup (2 Minutes)

### Step 1: Create Free Account

1. Go to https://web3forms.com
2. Click "Get Started Free"
3. Sign up with your email (or GitHub)
4. Verify your email address

### Step 2: Create Access Key

1. Once logged in, click "Create New Form"
2. Enter your email: `admin@albertonbatterymart.co.za`
3. Give it a name: "Alberton Battery Mart Contact Form"
4. Copy the **Access Key** (looks like: `8f2e8c3a-4d7b-4e9a-9f2c-1a3b5c7d9e0f`)

### Step 3: Update Your Website

1. Open `src/components/content/ContactForm.tsx`
2. Find this line (around line 37):
   ```typescript
   access_key: '8f2e8c3a-4d7b-4e9a-9f2c-1a3b5c7d9e0f', // Public key, will be replaced
   ```
3. Replace the placeholder with your actual Access Key
4. Save the file
5. Rebuild and redeploy: `pnpm build`

### Step 4: Test It!

1. Go to your contact form
2. Fill it out and submit
3. Check your inbox at `admin@albertonbatterymart.co.za`
4. You should receive the email within seconds

## 📧 Email Format

Emails will arrive with:
- **From**: noreply@web3forms.com
- **To**: admin@albertonbatterymart.co.za
- **Subject**: Contact Form: [User's Subject]
- **Body**: Includes name, email, subject, and message

## 🎯 Features Included

- ✅ Email delivery to admin@albertonbatterymart.co.za
- ✅ Success/error messages for users
- ✅ Google Analytics conversion tracking
- ✅ Form validation
- ✅ Loading states
- ✅ Mobile-friendly
- ✅ No "demo mode" warnings

## 🔧 Advanced Options (Optional)

### Custom Email Template
You can customize the email template in your Web3Forms dashboard.

### Add reCAPTCHA
To prevent spam:
1. Get a reCAPTCHA site key from Google
2. Add it to the form configuration in your Web3Forms dashboard

### Email Notifications
Web3Forms supports:
- Multiple recipients
- CC/BCC
- Custom from names
- Reply-to customization

### Webhooks
You can set up webhooks to integrate with:
- Slack notifications
- CRM systems
- Google Sheets
- Custom applications

## 💰 Pricing

- **Free Plan**: 250 submissions/month (perfect for most small businesses)
- **Pro Plan**: $10/month for 10,000 submissions
- **Business Plan**: $25/month for unlimited submissions

## 🆘 Troubleshooting

### Not receiving emails?
1. Check your spam folder
2. Verify the Access Key is correct
3. Make sure you verified your Web3Forms email
4. Check the form submission in your Web3Forms dashboard

### Form showing errors?
1. Check browser console for error messages
2. Verify the Access Key is set correctly
3. Check internet connection
4. Try in incognito mode

### Want to switch back to Resend?
The old implementation is still available in `src/app/api/contact/route.ts`. Just update the ContactForm component to use `/api/contact` instead of Web3Forms API.

## 📚 Resources

- Web3Forms Documentation: https://docs.web3forms.com
- Support: support@web3forms.com
- Status Page: https://status.web3forms.com

---

**Need Help?** Contact Web3Forms support or your developer.
