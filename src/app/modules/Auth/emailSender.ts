import nodemailer from "nodemailer";
import config from "../../config";

const emailSender = async(
  email: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  
    const info = await transporter.sendMail({
      from: '"PH Health Care" <melonali200@gmail.com>',
      to: email,
      subject: "Reset Password Link",
      text: "Hello world?", // Plain-text version of the message
      html, // HTML version of the message
    });

    console.log("Message sent:", info.messageId);
  
};

export default emailSender;



//  Synchronous আর Asynchronous কীভাবে কাজ করে?

// ​১. Synchronous 
// 
// ​এখানে জাভাস্ক্রিপ্ট ইঞ্জিন বা মেইন থ্রেড নিজেই কাজটা করে। যেহেতু সে একবারে একটির বেশি কাজ করতে পারে না, তাই ওই কাজটা শেষ না হওয়া পর্যন্ত সে পরবর্তী লাইনে যেতে পারে না।
// 
// ​বৈশিষ্ট্য: এটি Blocking। অর্থাৎ, একটা বড় কাজ আসলে পুরো প্রোগ্রাম থমকে দাঁড়ায়।
// 
// ​২. Asynchronous 
// 
// ​এখানে মেইন ইঞ্জিন নিজে কাজটা না করে অন্য কাউকে (যেমন: ব্রাউজারের Web API বা Node.js এর  অভ্যন্তরীণ সিস্টেম) দায়িত্বটা দিয়ে দেয়। দায়িত্ব দিয়েই সে নিজে ফ্রি হয়ে যায় এবং পরের লাইনের  কোডগুলো চালাতে থাকে।
// 
// ​বৈশিষ্ট্য: এটি Non-blocking। কাজটা ব্যাকগ্রাউন্ডে হতে থাকে, আর মেইন ইঞ্জিন অন্য কাজে // ব্যস্ত থাকে।
// 
// ​কেন আমরা সবকিছু "নিজে" করি না?
// 
// ​প্রশ্ন আসতে পারে, ইঞ্জিন কেন সব নিজে করে না? ধরুন আপনি ডাটাবেস থেকে ১০০০টি ছবি লোড করবেন।
// 
// ​যদি Synchronous ভাবে করেন: ছবিগুলো লোড হতে ৫ সেকেন্ড সময় লাগলে, ওই ৫ সেকেন্ড আপনার ওয়েবসাইটের কোনো বাটন কাজ করবে না, স্ক্রল হবে না—পুরো ওয়েবসাইট "ফ্রিজ" হয়ে থাকবে।
// 
// ​যদি Asynchronous ভাবে করেন: ইঞ্জিন ব্রাউজারকে বলবে "ছবিগুলো আনো, আমি অন্য কাজ করছি"। তখন ইউজার সাইটটি ব্যবহার করতে পারবে এবং ছবিগুলো লোড হওয়া মাত্র স্ক্রিনে চলে আসবে।
// 
// ​এই পুরো প্রক্রিয়াটি যেভাবে ঘটে 
// 
// ​নিচের লক্ষ্য করুন, এখানে দেখা যাচ্ছে কীভাবে কাজগুলো ভাগ হয়ে যায়:
// 
// ​Call Stack (মেইন ইঞ্জিন): এখানে আপনার কোডগুলো একের পর এক রান হয়।
// 
// ​Web API (সহকারী): যখনই কোনো setTimeout বা API কল আসে, ইঞ্জিন তা এখানে পাঠিয়ে দেয়।
// 
// ​Callback Queue: সহকারী কাজ শেষ করে এখানে রেজাল্ট জমা দেয়।
// 
// ​Event Loop: এটি চেক করে দেখে ইঞ্জিন (Call Stack) ফ্রি কি না। ফ্রি হলেই সে কিউ থেকে কাজটা ইঞ্জিনের কাছে পৌঁছে দেয়।
// 
// ​সহজ কথায় বললে,
// 
// ​Synchronous = ইঞ্জিন নিজে কাজ করছে এবং কাজ শেষ না হওয়া পর্যন্ত অন্য কিছু করছে না।
// 
// Asynchronous = ইঞ্জিন কাজটা অন্যকে বুঝিয়ে দিয়ে নিজে পরবর্তী কাজে চলে যাচ্ছে।

// what is Radis?
// Redis হচ্ছে একটি ওপেন সোর্স, ইন-মেমরি ডেটা স্ট্রাকচার স্টোর যা ডেটা ক্যাশিং, সেশন ম্যানেজমেন্ট, রিয়েল-টাইম অ্যানালিটিক্স এবং মেসেজ ব্রোকারিংয়ের মতো বিভিন্ন অ্যাপ্লিকেশনের জন্য ব্যবহৃত হয়। এটি কী-ভ্যালু পেয়ার, হ্যাশ, লিস্ট, সেট এবং সোর্টেড সেট সহ বিভিন্ন ডেটা স্ট্রাকচার সমর্থন করে। Redis এর উচ্চ কর্মক্ষমতা এবং নমনীয়তা এটিকে দ্রুত ডেটা অ্যাক্সেস এবং প্রসেসিংয়ের জন্য আদর্শ করে তোলে। 

// english: Redis is an open-source, in-memory data structure store used for various applications such as data caching, session management, real-time analytics, and message brokering. It supports various data structures including key-value pairs, hashes, lists, sets, and sorted sets. Redis's high performance and flexibility make it ideal for fast data access and processing.

