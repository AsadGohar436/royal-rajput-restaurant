# 🥘 Dastarkhwan Pakistan — Royal Desi & Charcoal BBQ Ordering Platform

> **Hackathon Part A Implementation (Tailored for Pakistan in English)**  
> Responsive full-stack Pakistani restaurant web platform featuring authentic desi dishes, Pakistani Rupee (`Rs.`) pricing, Pakistani address formats, form validation, Gmail SMTP order notifications, and live Supabase database persistence.

---

## 🌟 Key Features (Part A Requirements)

### 1. Home & Menu Section
- **Bold Branding & Pakistani Heritage**:
  - Brand name: **Dastarkhwan Pakistan — Royal Pakistani & Charcoal BBQ**.
  - Accolades: 100% Halal certified, pure organic Desi Ghee from Punjab farms, live natural oak charcoal sigri, 30-45 min express doorstep delivery in Pakistan, 4.9★ rating.
  - Interactive call-to-actions for instantaneous menu browsing and Cash on Delivery (COD) checkout.
- **Authentic Pakistani Food Dishes (10 Dishes)**:
  - **Karachi Special Chicken Dum Biryani** (Rs. 650)
  - **Lahori Mutton Karahi (Desi Ghee)** (Rs. 2,650)
  - **Boneless Creamy Chicken Handi** (Rs. 1,450)
  - **Authentic Peshawari Chapli Kabab** (Rs. 750)
  - **Charcoal Grilled Chicken Malai Boti** (Rs. 850)
  - **Smoked Beef Seekh Kabab** (Rs. 820)
  - **Shahi Beef Nalli Nihari** (Rs. 1,150)
  - **Tandoori Roghani Naan** (Rs. 120)
  - **Warm Shahi Gulab Jamun** (Rs. 280)
  - **Chilled Lahori Mint Margarita** (Rs. 290)
  - Each dish includes high-resolution photography, price in `Rs.`, category pill, spice level badge (Mild, Medium, Desi Spiced 🔥), prep time, and serving size.

### 2. Order Placement Form (Pakistani Context)
- **Form Fields**:
  - Customer Full Name (Required).
  - Mobile Number with Pakistani format (e.g. `0300-1234567` or `+92 3XX XXXXXXX`).
  - Delivery Address (House / Street / Sector / City across Pakistan).
  - Cooking / Delivery Notes (Optional).
- **Dish Selection & Real-Time Calculation**:
  - Live quantity adjustment (`+` / `-`), item removal, and subtotal.
  - Free delivery on orders over Rs. 2,000 (otherwise flat Rs. 150 rider delivery fee).
  - Standard restaurant GST (5%) calculated automatically.
- **Strict Validation**:
  - Prevents order submission if required fields are missing or if cart is empty.
  - Inline error feedback and loading state during placement.

### 3. Email Notification (Gmail Integration)
- Dispatches a clean, formatted HTML order confirmation email to the restaurant's Gmail inbox immediately upon placement.
- **Email Contents**:
  - Order ID & Default Status (`Pending`).
  - Customer Name & Clickable Phone Link (`tel:`).
  - Full Delivery Address in Pakistan.
  - Complete breakdown of ordered dishes with quantities, unit prices, and subtotals in `Rs.`.
  - Clear Grand Total amount in Pakistani Rupees.

### 4. Database Integration (Live Supabase `orders` Table)
- Every order is saved directly to the Supabase **`orders`** table with default status set to **`'Pending'`**.
- Connected to active Supabase project with Row Level Security (RLS) policies allowing public insertions and reads.
- Dedicated live monitor available at `/admin`.

---

## 🚀 Running the Project

```bash
# 1. Start the server
npm run dev

# 2. Open website in your browser
http://localhost:3001

# 3. View live Supabase orders
http://localhost:3001/admin
```
