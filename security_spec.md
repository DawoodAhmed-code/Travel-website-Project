# Security Specification & Data Invariants

## Data Invariants
1. **Tours**:
   - Anyone can read published tours.
   - Only authenticated administrators (such as dawoodahmed0175@gmail.com or role==admin) can create, update, or delete tours.
   - Tour prices, duration, and titles must be positive values and bounded strings.

2. **Booking Enquiries**:
   - Guests or authenticated users can create booking enquiries.
   - The enquiry must have valid contact details, positive traveller counts, valid date, and legitimate tour reference.
   - Authenticated travelers can read their own enquiries (`resource.data.userId == request.auth.uid` or matching email).
   - Only admins can modify enquiry status or write administrative notes.
   - Ordinary users cannot view or tamper with other travelers' booking enquiries.

3. **Contact Messages**:
   - Anyone can create a contact message with bounded length and valid email.
   - Only admins can read, update, or delete contact messages.

4. **User Profiles**:
   - A user can only create or update their own profile matching `request.auth.uid`.
   - Users cannot escalate their own role to 'admin' without administrative authorization.
   - Admins can read user profiles for customer support and booking verification.

5. **Newsletter Subscribers**:
   - Anyone can subscribe with a valid email.
   - Only admins can list subscribers.

## The Dirty Dozen Payloads
1. Unauthorized Tour Creation (non-admin attempts to inject a fake tour).
2. Tour Price Tampering (non-admin attempts to overwrite `pricePerPerson` to 0 PKR).
3. Enquiry Impersonation (user A attempts to read user B's booking enquiry).
4. Privilege Escalation (regular user sets `role: "admin"` in user profile).
5. Oversized Payload Injection (enquiry with 10MB malicious buffer payload).
6. State Shortcutting (traveller attempts to unilaterally set status from `Pending` to `Confirmed`).
7. ID Poisoning (crafting document IDs with illegal URI/path characters).
8. Anonymous Enquiry Tampering (attempting to mutate existing guest enquiry).
9. Contact Message Scraping (unauthenticated user trying to read all contact messages).
10. System Field Poisoning (overwriting `createdAt` with arbitrary past date).
11. Ghost Field Injection (adding arbitrary extra permissions fields in tour update).
12. Denial of Wallet through unbounded queries (requesting unbounded data sets).
