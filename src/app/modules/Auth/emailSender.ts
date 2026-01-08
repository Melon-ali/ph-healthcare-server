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


// what is Containerization?
// Containerization হচ্ছে একটি প্রযুক্তি যা সফটওয়্যার অ্যাপ্লিকেশন এবং তাদের নির্ভরশীলতাগুলিকে একটি একক, পোর্টেবল ইউনিটে প্যাকেজ করতে ব্যবহৃত হয়, যা কন্টেইনার নামে পরিচিত। কন্টেইনারগুলি অপারেটিং সিস্টেমের লেভেলে ভার্চুয়ালাইজেশন ব্যবহার করে, যা তাদের হোস্ট সিস্টেমের কার্নেল শেয়ার করতে দেয়, ফলে তারা হালকা ওজনের এবং দ্রুত চালানো যায়। কন্টেইনারাইজড অ্যাপ্লিকেশনগুলি বিভিন্ন পরিবেশে (যেমন ডেভেলপমেন্ট, টেস্টিং, প্রোডাকশন) একই রকমভাবে চালানো যায়, কারণ কন্টেইনারগুলি সমস্ত প্রয়োজনীয় ফাইল এবং লাইব্রেরি সহ আসে। এটি ডিপ্লয়মেন্ট প্রক্রিয়াকে সহজ করে তোলে এবং পরিবেশগত পার্থক্যের কারণে সৃষ্ট সমস্যা কমায়।

// english: Containerization is a technology used to package software applications and their dependencies into a single, portable unit called a container. Containers utilize operating system-level virtualization, allowing them to share the host system's kernel, making them lightweight and fast to run. Containerized applications can run consistently across different environments (such as development, testing, production) because containers come with all the necessary files and libraries. This simplifies the deployment process and reduces issues caused by environmental differences.

// what is Docker? 
// Docker হচ্ছে tool যা container তৈরি এবং পরিচালনা করতে ব্যবহৃত হয়। এটি একটি ওপেন সোর্স প্ল্যাটফর্ম যা ডেভেলপারদের অ্যাপ্লিকেশন এবং তাদের নির্ভরশীলতাগুলি একটি একক প্যাকেজে প্যাকেজ করতে সক্ষম করে, যা যেকোনো পরিবেশে দ্রুত এবং নির্ভুলভাবে চালানো যায়। Docker ব্যবহার করে, ডেভেলপাররা তাদের অ্যাপ্লিকেশনগুলি বিভিন্ন পরিবেশে (যেমন ডেভেলপমেন্ট, টেস্টিং, প্রোডাকশন) একই রকমভাবে চালাতে পারে, কারণ Docker কন্টেইনারগুলি সমস্ত প্রয়োজনীয় ফাইল এবং লাইব্রেরি সহ আসে। এটি ডিপ্লয়মেন্ট প্রক্রিয়াকে সহজ করে তোলে এবং পরিবেশগত পার্থক্যের কারণে সৃষ্ট সমস্যা কমায়।

// Docker হচ্ছে একটি tool বা একটি platform যেটা আমাদের help করে bulld করতে , run করতে এবং container কে manage করতে । 

// english: Docker is a tool used to create and manage containers. It is an open-source platform that enables developers to package applications and their dependencies into a single package that can be run quickly and consistently in any environment. By using Docker, developers can run their applications the same way across different environments (such as development, testing, production) because Docker containers come with all the necessary files and libraries. This simplifies the deployment process and reduces issues caused by environmental differences.

// what is Dockerfile?
// Dockerfile হচ্ছে একটি টেক্সট ফাইল যা নির্দেশনা এবং কমান্ডের একটি সেট ধারণ করে, যা Docker কে বলে কিভাবে একটি Docker ইমেজ তৈরি করতে হয়। এই ফাইলটি সাধারণত একটি বেস ইমেজ থেকে শুরু হয় এবং তারপর অ্যাপ্লিকেশন কোড, নির্ভরশীলতা, কনফিগারেশন সেটিংস এবং অন্যান্য প্রয়োজনীয় উপাদানগুলি যোগ করার জন্য ধাপগুলি নির্দিষ্ট করে। Dockerfile ব্যবহার করে, ডেভেলপাররা তাদের অ্যাপ্লিকেশনগুলির জন্য পুনরায় ব্যবহারযোগ্য এবং স্বয়ংক্রিয়ভাবে বিল্ড করা যায় এমন ইমেজ তৈরি করতে পারে, যা বিভিন্ন পরিবেশে সহজেই ডিপ্লয় করা যায়।

// english: A Dockerfile is a text file that contains a set of instructions and commands that tell Docker how to build a Docker image. This file typically starts from a base image and then specifies the steps to add application code, dependencies, configuration settings, and other necessary components. By using a Dockerfile, developers can create reusable and automatically buildable images for their applications, which can be easily deployed across different environments. 

// what is Docker Hub?
// Docker Hub হচ্ছে একটি ক্লাউড-ভিত্তিক রেজিস্ট্রি সার্ভিস যা ডেভেলপারদের তাদের Docker ইমেজগুলি সংরক্ষণ, ভাগ এবং পরিচালনা করতে সক্ষম করে। এটি একটি কেন্দ্রীয় প্ল্যাটফর্ম যেখানে ব্যবহারকারীরা পাবলিক এবং প্রাইভেট Docker রেপোজিটরি তৈরি করতে পারে, যা অন্যদের সাথে শেয়ার করা যায় বা ব্যক্তিগত ব্যবহারের জন্য রাখা যায়। Docker Hub ব্যবহার করে, ডেভেলপাররা সহজেই তাদের অ্যাপ্লিকেশন ইমেজগুলি ডাউনলোড এবং আপলোড করতে পারে, যা ডিপ্লয়মেন্ট প্রক্রিয়াকে দ্রুত এবং আরও কার্যকর করে তোলে।

// english: Docker Hub is a cloud-based registry service that enables developers to store, share, and manage their Docker images. It serves as a central platform where users can create public and private Docker repositories, which can be shared with others or kept for personal use. By using Docker Hub, developers can easily download and upload their application images, making the deployment process faster and more efficient.

// what is docker compose?
// Docker Compose হচ্ছে একটি টুল যা মাল্টি-কন্টেইনার Docker অ্যাপ্লিকেশনগুলি সংজ্ঞায়িত এবং চালানোর জন্য ব্যবহৃত হয়। এটি একটি YAML ফাইল ব্যবহার করে যেখানে ডেভেলপাররা তাদের অ্যাপ্লিকেশনের বিভিন্ন সার্ভিস, নেটওয়ার্ক এবং ভলিউমগুলি কনফিগার করতে পারে। Docker Compose ব্যবহার করে, ডেভেলপাররা একক কমান্ডের মাধ্যমে সম্পূর্ণ অ্যাপ্লিকেশন স্ট্যাকটি শুরু, বন্ধ এবং পরিচালনা করতে পারে, যা ডেভেলপমেন্ট এবং টেস্টিং প্রক্রিয়াকে সহজ করে তোলে।

// english: Docker Compose is a tool used to define and run multi-container Docker applications. It uses a YAML file where developers can configure the various services, networks, and volumes of their application. By using Docker Compose, developers can start, stop, and manage the entire application stack with a single command, simplifying the development and testing process.

// what is the difference between Docker and Docker Compose?
// Docker হচ্ছে একটি প্ল্যাটফর্ম যা কন্টেইনার তৈরি এবং চালানোর জন্য ব্যবহৃত হয়, যেখানে Docker Compose হচ্ছে একটি টুল যা মাল্টি-কন্টেইনার অ্যাপ্লিকেশনগুলি সংজ্ঞায়িত এবং পরিচালনা করার জন্য ব্যবহৃত হয়। সহজ কথায়, Docker একক কন্টেইনারের জন্য, আর Docker Compose মাল্টি-কন্টেইনার সেটআপের জন্য ব্যবহৃত হয়।

// english: Docker is a platform used to create and run containers, while Docker Compose is a tool used to define and manage multi-container applications. In simple terms, Docker is used for single containers, whereas Docker Compose is used for multi-container setups.

// what is docker swarm?
// Docker Swarm হচ্ছে Docker এর একটি অর্চেস্ট্রেশন টুল যা মাল্টি-কন্টেইনার অ্যাপ্লিকেশনগুলি পরিচালনা এবং স্কেল করার জন্য ব্যবহৃত হয়। এটি একটি ক্লাস্টার তৈরি করতে সক্ষম করে যেখানে একাধিক Docker হোস্ট একসাথে কাজ করে, এবং এটি স্বয়ংক্রিয় লোড ব্যালান্সিং, সার্ভিস ডিসকভারি এবং ফেইলওভার সমর্থন করে। Docker Swarm ব্যবহার করে, ডেভেলপাররা সহজেই তাদের অ্যাপ্লিকেশনগুলি বড় পরিসরে চালাতে এবং পরিচালনা করতে পারে।

// english: Docker Swarm is an orchestration tool for Docker that is used to manage and scale multi-container applications. It enables the creation of a cluster where multiple Docker hosts work together, supporting features like automatic load balancing, service discovery, and failover. By using Docker Swarm, developers can easily run and manage their applications at a larger scale.

// what is Kubernetes?
// Kubernetes হচ্ছে একটি ওপেন সোর্স কন্টেইনার অর্চেস্ট্রেশন প্ল্যাটফর্ম যা কন্টেইনারাইজড অ্যাপ্লিকেশনগুলি ডিপ্লয়, স্কেল এবং পরিচালনা করার জন্য ব্যবহৃত হয়। এটি স্বয়ংক্রিয় লোড ব্যালান্সিং, সার্ভিস ডিসকভারি, সেল্ফ-হিলিং এবং রোলিং আপডেটের মতো বৈশিষ্ট্যগুলি প্রদান করে। Kubernetes ব্যবহার করে, ডেভেলপাররা সহজেই তাদের অ্যাপ্লিকেশনগুলি বড় পরিসরে চালাতে এবং পরিচালনা করতে পারে, যা ক্লাউড-নেটিভ আর্কিটেকচারের জন্য আদর্শ।

// english: Kubernetes is an open-source container orchestration platform used to deploy, scale, and manage containerized applications. It provides features like automatic load balancing, service discovery, self-healing, and rolling updates. By using Kubernetes, developers can easily run and manage their applications at a larger scale, making it ideal for cloud-native architectures.

// what is the difference between Docker Swarm and Kubernetes?
// Docker Swarm এবং Kubernetes উভয়ই কন্টেইনার অর্চেস্ট্রেশন টুল, তবে তাদের মধ্যে কিছু মূল পার্থক্য রয়েছে। Docker Swarm হল Docker এর নিজস্ব অর্চেস্ট্রেশন টুল যা সহজ এবং সরল, যেখানে Kubernetes একটি পূর্ণাঙ্গ এবং জটিল প্ল্যাটফর্ম যা বৃহত্তর স্কেল এবং বৈশিষ্ট্য সমর্থন করে। সহজ কথায়, Docker Swarm ছোট এবং মাঝারি আকারের প্রকল্পের জন্য উপযুক্ত, যেখানে Kubernetes বড় এবং জটিল অ্যাপ্লিকেশনগুলির জন্য বেশি উপযোগী।

// english: Both Docker Swarm and Kubernetes are container orchestration tools, but there are some key differences between them. Docker Swarm is Docker's own orchestration tool that is simple and straightforward, while Kubernetes is a comprehensive and complex platform that supports larger scale and features. In simple terms, Docker Swarm is suitable for small to medium-sized projects, whereas Kubernetes is more appropriate for large and complex applications.

// what is node js?
// Node.js হচ্ছে একটি ওপেন সোর্স, ক্রস-প্ল্যাটফর্ম জাভাস্ক্রিপ্ট রানটাইম এনভায়রনমেন্ট যা সার্ভার-সাইড এবং নেটওয়ার্কিং অ্যাপ্লিকেশন তৈরি করতে ব্যবহৃত হয়। এটি গুগলের V8 জাভাস্ক্রিপ্ট ইঞ্জিনের উপর ভিত্তি করে তৈরি, যা জাভাস্ক্রিপ্ট কোডকে দ্রুত এবং দক্ষতার সাথে এক্সিকিউট করতে সক্ষম করে। Node.js এর ইভেন্ট-ড্রিভেন, নন-ব্লকিং I/O মডেল এটিকে হালকা ওজনের এবং কার্যকর করে তোলে, বিশেষ করে ডেটা-ইনটেনসিভ রিয়েল-টাইম অ্যাপ্লিকেশনগুলির জন্য।

// english: Node.js is an open-source, cross-platform JavaScript runtime environment used for building server-side and networking applications. It is built on Google's V8 JavaScript engine, which allows for fast and efficient execution of JavaScript code. Node.js's event-driven, non-blocking I/O model makes it lightweight and efficient, especially for data-intensive real-time applications.

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

