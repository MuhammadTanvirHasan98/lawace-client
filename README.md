# My Legal Advisor

[**My Legal Advisor**](https://my-legal-advisor.netlify.app) is a full-stack law consultancy platform designed to connect users with expert lawyers. It provides a seamless experience for legal consultations, blog interactions, and expert ratings. The platform is built with a **user-friendly interface** and a **robust backend**, ensuring smooth navigation, secure transactions, and effective case management.

## Key Features:

- **Lawyer Consultancy – Users can send consultation requests to expert lawyers and receive automated email confirmations upon approval.**
- **Blog System – Users can post blogs, which require admin approval before being published. Users can also search blogs, comment on them, and engage in discussions.**
- **Expert Rating System – Users can rate lawyers on the expert lawyer page based on their consultation experience.**
- **Three User Roles – The platform supports different roles:**
  - **Users** can request consultations, post and comment on blogs, and rate lawyers.
  - **Lawyers** can receive and respond to consultation requests.
  - **Admins** have the ability to approve or delete blog posts, manage users, and oversee the entire platform. 

Start your legal consultation journey with **My Legal Advisor** today!

## Key Features:

- **Consult Expert Lawyers –** Users can browse expert lawyers, check their ratings, and request consultations for legal advice.  
- **Automated Email Notifications –** Users receive email notifications upon lawyer approval for consultation, providing online meeting details.  
- **User Ratings & Comments –** Users can rate lawyers and leave feedback on their profiles.  
- **Secure & Efficient Backend –** The platform is built with Firebase authentication and a strong backend to ensure a smooth and safe user experience.  
- **Admin Dashboard –** Admins can **approve or delete blog posts**, **manage user roles**, and oversee all platform activities.  

---

## Technologies & Packages Used:

- **Frontend:** React.js, Next.js, Redux Toolkit, React Router Dom  
- **Backend:** Node.js, Express.js, Firebase, MongoDB  
- **State Management:** @tanstack/react-query  
- **UI & Animations:** @headlessui/react, Tailwind CSS, animate.css  
- **Forms & Validations:** react-select, react-hot-toast, react-tabs, match-sorter  
- **Payments & Notifications:** @stripe/react-stripe-js, SweetAlert2  
- **Other:** axios, swiper, @smastrom/react-rating, sort-by  

---

## All Credits:
This website is developed by **Muhammad Tanvir Hasan**

### Getting Started

#### Prerequisites
Make sure you have the following installed on your system:
- Node.js (v14.x or higher)
- npm (v6.x or higher) or yarn (v1.x or higher)

### Installation
1.Clone the repository:
```bash
git clone https://github.com/MuhammadTanvirHasan98/lawace-client.git
cd lawace-client
```
2.Installation:
```bash
npm install
```
3.Set up Firebase
- Create a Firebase project: Visit [Firebase Console](https://console.firebase.google.com/)
- Add a web app to generate Firebase configuration details.
- Create a .env file in your project's root directory with the following Firebase configuration:
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
4.Run the development server:
```bash
npm run dev
```
5.Build for production:
```bash
npm run build
```
