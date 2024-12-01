# Firebase/Google Cloud Infrastructure

> All services require Blaze (pay-as-you-go) plan for HIPAA compliance
> No minimum spend, only pay for what you use above free tiers

# Core Services

## 1. Website Hosting (Firebase Hosting)
> Where the static website files live - No PHI stored here

### Features
- Static file hosting (HTML, CSS, JavaScript files only)
- Global CDN (Makes the site fast worldwide)
- SSL certificates (Keeps the site secure, shows the padlock in browser)
- Custom domain support (Use your own website address)

### What's NOT Stored Here:
- ❌ No PHI (Protected Health Information)
- ❌ No user data
- ❌ No questions or answers
- ❌ No medical information

### What IS Stored Here:
- ✅ Website code
- ✅ Images for the website design
- ✅ CSS styles
- ✅ JavaScript files
- ✅ Static assets (logos, icons)

Note: This is just for the website files themselves. 
All sensitive data is handled by other services 
(Database, Storage) with appropriate HIPAA controls.

### Real-World Usage Examples:

#### Small Scale Example
> Based on 50 questions/day

Website Hosting:
- 50MB of website files
- ~8.5MB/day transfer
- Cost: $0 (within Blaze free tier)

#### Medium Scale Example
> Based on 250 questions/day

Website Hosting:
- 100MB of website files
- ~42.5MB/day transfer
- Cost: ~$5-10/month

#### Large Scale Example
> Based on 500 questions/day

Website Hosting:
- 200MB of website files
- ~285MB/day transfer
- Cost: ~$25-50/month

### Paid Tier Costs:
- Storage: $0.026/GB/month
- Data transfer: $0.15/GB
- SSL and domain: Always free

### Typical Monthly Costs:
- Small site (5K users/month): $0-5
- Medium site (25K users/month): $5-25
- Large site (100K users/month): $25-100

### Why Firebase Hosting?
> Best choice to start because:
1. HIPAA Compliance
   - Easy BAA setup
   - Built-in security features
   - Automatic encryption
   - Compliance logging

2. Development Speed
   - Quick to set up
   - Easy deployments
   - Built-in CI/CD
   - Works with other Firebase services

3. Cost Effective to Start
   - Generous free tier
   - Pay as you grow
   - No upfront costs
   - Only pay for what you use

### Migration Flexibility
> System can grow with your needs
- Can move to other providers if needed
- No vendor lock-in
- Built with scalability in mind
- Migration possible without downtime

Note: Firebase gives us the fastest path to launch while keeping 
our options open for future scaling.

## 2. Database (Firebase/Firestore)
> Where data lives - Contains both PHI and de-identified data

### What's Stored Here:
- ✅ De-identified questions and answers
- ✅ PHI (requires special handling)
- ✅ User profiles and credentials
- ✅ Expert information
- ✅ Platform operational data

### PHI Considerations:
- 🔒 Requires special security controls
- 🔒 Real-time data encryption
- 🔒 Access audit logging
- 🔒 Subject to HIPAA requirements
- 🔒 Requires BAA with Google

### Features
- NoSQL database (Flexible data structure)
- Real-time updates (Instant data changes)
- Automatic scaling (Handles growth automatically)
- Built-in security rules (Control who sees what)

### Blaze Plan (Required for HIPAA)
> Pay-as-you-go with free usage included
- First 50,000 reads/day free
- First 20,000 writes/day free
- First 20,000 deletes/day free
- First 1GB storage free

### Real-World Usage Examples:

#### Small Scale Example
> Based on 50 questions/day
- Questions stored: 1,500/month
- Reads per question: ~30
- Daily reads: ~1,500
- Daily writes: ~100
- Storage needed: ~30MB/month
Database Cost: $0 (within Blaze free tier)

#### Medium Scale Example
> Based on 250 questions/day
- Questions stored: 7,500/month
- Reads per question: ~30
- Daily reads: ~7,500
- Daily writes: ~500
- Storage needed: ~150MB/month
Database Cost: ~$25-50/month

#### Large Scale Example
> Based on 500 questions/day
- Questions stored: 15,000/month
- Reads per question: ~30
- Daily reads: ~15,000
- Daily writes: ~1,000
- Storage needed: ~300MB/month
Database Cost: ~$75-100/month

### Why Firestore?
> Best choice to start because:
1. HIPAA Compliance
   - Automatic encryption
   - Secure data separation
   - Access controls
   - Audit logging

2. Development Speed
   - No database setup
   - Built-in security rules
   - Real-time by default
   - Works with Firebase Auth

3. Cost Effective to Start
   - Generous free tier in Blaze
   - Pay for actual usage
   - Automatic scaling
   - No server management

### Migration Flexibility
> System can grow with your needs
- Can export to MongoDB
- Standard JSON format
- Data is portable
- Zero-downtime migration possible

## 3. Background Functions (Firebase Functions)
> Where automated tasks run - Handles background processing

### What's Managed Here:
- ✅ PHI de-identification
- ✅ Email/SMS triggers
- ✅ Expert matching
- ✅ Data processing
- ✅ Scheduled tasks

### Security Considerations:
- 🔒 Secure environment
- 🔒 Isolated execution
- 🔒 Access controls
- 🔒 Memory cleanup
- 🔒 Execution logging

### Features
- Automated processing
- Scheduled tasks
- Event triggers
- Error handling
- Performance monitoring

### Blaze Plan (Required for HIPAA)
> Pay-as-you-go with free tier
- First 2M invocations free
- 400,000 GB-seconds free
- 200,000 CPU-seconds free
- HIPAA compliance included

### Real-World Usage Examples:

#### Small Scale Example
> Based on 50 questions/day
- Function calls: ~3,000/month
- Processing time: ~100 CPU-seconds/day
- Memory usage: 256MB
Functions Cost: $0 (within Blaze free tier)

#### Medium Scale Example
> Based on 250 questions/day
- Function calls: ~15,000/month
- Processing time: ~500 CPU-seconds/day
- Memory usage: 512MB
Functions Cost: ~$25-35/month

#### Large Scale Example
> Based on 500 questions/day
- Function calls: ~30,000/month
- Processing time: ~1000 CPU-seconds/day
- Memory usage: 1GB
Functions Cost: ~$70-80/month

### Why Firebase Functions?
> Best choice to start because:
1. HIPAA Compliance
   - Secure environment
   - Access controls
   - Audit logging
   - Data isolation

2. Development Speed
   - Easy deployment
   - Event triggers
   - Built-in monitoring
   - Auto-scaling

3. Cost Effective
   - Large free tier
   - Pay per use
   - No server costs
   - Automatic scaling

### Migration Flexibility
> System can grow with your needs
- Standard Node.js
- Portable code
- Container support
- Cloud agnostic

## 4. Authentication (Firebase Auth)
> Where user identities live - Handles login security

### What's Managed Here:
- ✅ User login credentials
- ✅ Authentication tokens
- ✅ Session management
- ✅ Role assignments
- ✅ Login history

### Security Considerations:
- 🔒 Password hashing and salting
- 🔒 Brute force protection
- 🔒 Session timeout controls
- 🔒 Multi-factor authentication
- 🔒 Login attempt monitoring

### Features
- User authentication (Login/signup system)
- Multi-factor auth (Extra security options)
- Role management (Admin/expert/user controls)
- Session handling (Login state management)
- Security monitoring (Track login attempts)

### Blaze Plan (Required for HIPAA)
> Pay-as-you-go with free tier included
- First 50,000 authentications/month free
- Unlimited user accounts stored
- All security features included
- All auth methods available

### Real-World Usage Examples:

#### Small Scale Example
> Based on 50 questions/day
- 1,000 total users
- ~2,000 logins/month
- Basic auth methods
- Standard security
Auth Service Cost: $0 (within Blaze free tier)

#### Medium Scale Example
> Based on 250 questions/day
- 5,000 total users
- ~60,000 logins/month
- Multiple auth methods
- Enhanced security
Auth Service Cost: $0.10/month

#### Large Scale Example
> Based on 500 questions/day
- 10,000+ total users
- ~100,000 logins/month
- All auth methods
- Maximum security
Auth Service Cost: $0.50/month

## 5. File Storage (Firebase Storage)
> Where large files live - Different from database storage

### What's Managed Here:
- ✅ Expert credentials (PDFs, licenses)
- ✅ Supporting medical images
- ✅ Profile pictures
- ✅ Document attachments
- ✅ System backups

### Security Considerations:
- 🔒 File-level encryption
- 🔒 Access control rules
- 🔒 Download restrictions
- 🔒 Upload validation
- 🔒 Virus scanning

### Features
- Large file support
- Secure file sharing
- Image optimization
- Upload/download management
- Access control rules

### Blaze Plan (Required for HIPAA)
> Pay-as-you-go with free tier included
- First 5GB storage free
- First 1GB/day download free
- Upload bandwidth free
- Security rules included

### Real-World Usage Examples:

#### Small Scale Example
> Based on 50 questions/day
- Expert credentials: ~500MB
- Profile images: ~200MB
- System backups: ~300MB
Storage Cost: $0 (within Blaze free tier)

#### Medium Scale Example
> Based on 250 questions/day
- Expert credentials: ~2.5GB
- Profile images: ~1GB
- System backups: ~1.5GB
Storage Cost: ~$12-18/month

#### Large Scale Example
> Based on 500 questions/day
- Expert credentials: ~5GB
- Profile images: ~2GB
- System backups: ~3GB
Storage Cost: ~$30-40/month

### Why Firebase Storage?
> Best choice to start because:
1. HIPAA Compliance
   - Built-in encryption
   - Access controls
   - Audit logging
   - Secure file handling

2. Development Speed
   - Simple integration
   - Built-in security rules
   - Image optimization
   - Direct upload/download

3. Cost Effective
   - Large free tier
   - Pay per use
   - No setup costs
   - Automatic scaling

### Migration Flexibility
> System can grow with your needs
- Standard file formats
- Easy export process
- Multiple backup options
- Cloud agnostic storage

# Communication Services

## 6. Email Service (SendGrid)
> Where emails are sent from - Handles all email communications

### What's Managed Here:
- ✅ Verification emails
- ✅ Expert notifications
- ✅ System alerts
- ✅ Password resets
- ✅ Email tracking

### Security Considerations:
- 🔒 Email encryption
- 🔒 HIPAA compliance
- 🔒 Delivery tracking
- 🔒 Access controls
- 🔒 Email validation

### Features
- Email templating
- Delivery monitoring
- Bounce handling
- Analytics tracking
- Spam prevention

### Professional Plan (Required for HIPAA)
> Pay-as-you-go with base fee
- 100K emails/month included
- Email authentication
- Dedicated IP address
- 24/7 support

### Real-World Usage Examples:

#### Small Scale Example
> Based on 50 questions/day
- Verification emails: ~100/month
- Notifications: ~1,500/month
- System alerts: ~50/month
Email Cost: $14.95/month (base plan)

#### Medium Scale Example
> Based on 250 questions/day
- Verification emails: ~500/month
- Notifications: ~7,500/month
- System alerts: ~250/month
Email Cost: $14.95/month (within base plan)

#### Large Scale Example
> Based on 500 questions/day
- Verification emails: ~1,000/month
- Notifications: ~15,000/month
- System alerts: ~500/month
Email Cost: $14.95/month (within base plan)

### Why SendGrid?
> Best choice to start because:
1. HIPAA Compliance
   - BAA available
   - Secure transmission
   - Audit logging
   - Access controls

2. Development Speed
   - Easy integration
   - API libraries
   - Email templates
   - Webhook support

3. Cost Effective
   - Predictable pricing
   - High deliverability
   - No setup costs
   - Scales easily

### Migration Flexibility
> System can grow with your needs
- Standard SMTP
- API-based sending
- Template export
- Easy provider switch

## 7. SMS Service (Twilio)
> Where text messages are sent from - Handles all SMS communications

### What's Managed Here:
- ✅ Two-factor authentication
- ✅ Expert notifications
- ✅ Urgent alerts
- ✅ Status updates
- ✅ Delivery tracking

### Security Considerations:
- 🔒 Message encryption
- 🔒 Number verification
- 🔒 Access logging
- 🔒 Rate limiting
- 🔒 Delivery confirmation

### Features
- SMS messaging
- Phone verification
- Delivery tracking
- Number pooling
- Automated responses

### Pay-as-you-go Plan (Required for HIPAA)
> Costs based on usage
- Phone number: $1/month each
- Outbound SMS: $0.0079/message
- Inbound SMS: $0.0075/message
- HIPAA compliance included

### Real-World Usage Examples:

#### Small Scale Example
> Based on 50 questions/day
- 2FA messages: ~100/month
- Notifications: ~200/month
- Phone number: 1
SMS Cost: ~$3-4/month
($1 number + $2-3 messages)

#### Medium Scale Example
> Based on 250 questions/day
- 2FA messages: ~500/month
- Notifications: ~1,000/month
- Phone numbers: 2
SMS Cost: ~$12-15/month
($2 numbers + $10-13 messages)

#### Large Scale Example
> Based on 500 questions/day
- 2FA messages: ~1,000/month
- Notifications: ~2,000/month
- Phone numbers: 3
SMS Cost: ~$25-30/month
($3 numbers + $22-27 messages)

### Why Twilio?
> Best choice to start because:
1. HIPAA Compliance
   - BAA available
   - Message encryption
   - Audit logging
   - Access controls

2. Development Speed
   - Simple API
   - Good documentation
   - SDK support
   - Quick setup

3. Cost Effective
   - Pay per use
   - No monthly minimum
   - Volume discounts
   - Flexible scaling

### Migration Flexibility
> System can grow with your needs
- Standard SMS protocols
- Number portability
- API compatibility
- Easy provider switch

# Data Growth & Cost Projections

> As our platform grows, we manage costs by intelligently handling two distinct types of data:
>
> Working Data (High Cost, High Value):
> - Powers platform features (search, recommendations)
> - Requires instant access for user experience
> - Only keep 2 years in active storage
> - Cost is justified by platform functionality
>
> Compliance Data (Low Cost, Required):
> - Required by HIPAA (10-year retention)
> - Moved to ultra-low-cost storage
> - 98% cheaper than active storage
> - Example: 10 years of PHI = only ~$1.72/year

## Cost Control & 10-Year Projections
> Complete cost breakdown at different scales

### Cost Control Strategy
- Active Storage: Only keep what's needed for platform operation
- Older Data: Automatically moved to cold storage
- PHI Storage: Uses ultra-low-cost storage from day one
- Even at 1.8M questions (500/day for 10 years):
  • Active costs stay manageable (~$20-60/month)
  • Compliance storage remains minimal (~$0.15/month)
  • No risk of unexpected cost escalation

### Small Scale (50 questions/day)
Year 1:
- Core Services: ~$18/month ($216/year)
  • Working Data: Covered in free tier
  • Compliance Data: ~$0.02/month
- Annual Total: ~$216

Year 3:
- Core Services: ~$25/month ($300/year)
  • Working Data: ~$5/month
  • Compliance Data: ~$0.05/month
- Annual Total: ~$360

Year 5:
- Core Services: ~$35/month ($420/year)
  • Working Data: ~$10/month
  • Compliance Data: ~$0.08/month
- Annual Total: ~$540

Year 10:
- Core Services: ~$50/month ($600/year)
  • Working Data: ~$15/month
  • Compliance Data: ~$0.15/month
- Annual Total: ~$780

### Medium Scale (250 questions/day)
Year 1:
- Core Services: ~$94/month ($1,128/year)
  • Working Data: ~$10-15/month
  • Compliance Data: ~$0.07/month
- Annual Total: ~$1,260-1,320

Year 3:
- Core Services: ~$110/month ($1,320/year)
  • Working Data: ~$20-25/month
  • Compliance Data: ~$0.21/month
- Annual Total: ~$1,560-1,620

Year 5:
- Core Services: ~$125/month ($1,500/year)
  • Working Data: ~$30-35/month
  • Compliance Data: ~$0.35/month
- Annual Total: ~$1,860-1,920

Year 10:
- Core Services: ~$140/month ($1,680/year)
  • Working Data: ~$40-45/month
  • Compliance Data: ~$0.70/month
- Annual Total: ~$2,160-2,220

### Large Scale (500 questions/day)
Year 1:
- Core Services: ~$240/month ($2,880/year)
  • Working Data: ~$20-30/month
  • Compliance Data: ~$0.14/month
- Annual Total: ~$3,120-3,240

Year 3:
- Core Services: ~$260/month ($3,120/year)
  • Working Data: ~$35-45/month
  • Compliance Data: ~$0.42/month
- Annual Total: ~$3,540-3,660

Year 5:
- Core Services: ~$280/month ($3,360/year)
  • Working Data: ~$50-60/month
  • Compliance Data: ~$0.70/month
- Annual Total: ~$3,960-4,080

Year 10:
- Core Services: ~$300/month ($3,600/year)
  • Working Data: ~$65-75/month
  • Compliance Data: ~$1.40/month
- Annual Total: ~$4,380-4,500

### Notes & Key Takeaways
1. Even at large scale (500/day), annual costs stay under $5,000
2. 10-year PHI retention has minimal impact on total cost
3. Costs increase more slowly than usage:
   • 5x more questions (50 → 250/day) doesn't mean 5x cost
   • 10x more questions (50 → 500/day) doesn't mean 10x cost
   • Example: 
     - Small scale (50/day) = $780/year
     - Medium scale (250/day) = $2,220/year (not $3,900)
     - Large scale (500/day) = $4,500/year (not $7,800)
   • Our optimization strategies keep costs manageable as we grow
4. Most cost comes from core services, not data storage
5. Clear predictability in long-term cost structure
6. Core Services include hosting, functions, auth, email, SMS
7. Working Data costs reflect 2-year active retention policy
8. Compliance Data uses cold storage pricing
9. All costs include HIPAA compliance

