import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Placeholder from "./components/Placeholder";
import ContactForm from "./components/ContactForm";
import Spline from "@splinetool/react-spline";
import Chatbot from "./components/Chatbot";
import "./styles/App.css";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const cameraRef = useRef();
  const scrollContainerRef = useRef();
  const [currentSection, setCurrentSection] = useState("intro");
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState(0);

  const displayText = "Hi! I'm Akshita Singh";

  // Rotating subtitles
  const subtitles = [
    "Computer Science Master's Student",
    "A Designer",
    "A Story Teller",
    "An Ethical AI Advocate",
    "A Full-Stack Developer",
    "A Creative Problem Solver",
  ];

  // Project data
  const projects = [
    {
      name: "DevOnBoard",
      description: "A platform to help onboarding of developers through troubleshooting and coding challenges",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop&crop=center",
      link: "https://devonboard.netlify.app/"
    },
    {
      name: "NU Marketplace",
      description: "Student marketplace for furniture and supplies",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop&crop=center",
      link: "https://github.com/akshita-as02/nu-marketplace"
    },
    {
      name: "Imogen Editor",
      description: "Java Based desktop image editing application with advanced tools",
      image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=200&fit=crop&crop=center",
      link: "#"
    },
    {
      name: "WanderWise",
      description: "AI-Powered Personalized travel planning and exploration platform",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop&crop=center",
      link: "https://684086df0f7771000721d0c7--wanderrwise.netlify.app/"
    }
  ];

  useEffect(() => {
    // Rotating subtitle effect
    const subtitleInterval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    }, 3000);

    return () => clearInterval(subtitleInterval);
  }, [subtitles.length]);

  // Camera positions for each section
  const cameraPositions = {
    intro: { position: [0, 5, 15], target: [0, 0, 0] },
    projects: { position: [-8, 2, 5], target: [0, 0, 0] },
    skills: { position: [8, 2, 5], target: [0, 0, 0] },
    about: { position: [-8, 0, 10], target: [0, 0, 0] },
    contact: { position: [0, -5, 15], target: [0, 0, 0] },
  };

  // Enhanced scroll triggers with better detection
  useEffect(() => {
    const sections = ["intro", "projects", "skills", "about", "contact"];
    const triggers = [];

    sections.forEach((section, index) => {
      const element = document.getElementById(section);

      if (element) {
        const trigger = ScrollTrigger.create({
          trigger: element,
          scroller: scrollContainerRef.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setCurrentSection(section);
          },
          onEnterBack: () => {
            setCurrentSection(section);
          },
        });

        triggers.push(trigger);
      }
    });

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  // Alternative scroll detection using Intersection Observer as backup
  useEffect(() => {
    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.id;
            setCurrentSection(sectionId);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.5,
        rootMargin: "0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Smooth scroll navigation
  const handleNavClick = (section) => {
    if (isScrolling) return;

    setIsScrolling(true);
    const element = document.getElementById(section);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      // Update current section immediately for navbar
      setCurrentSection(section);

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  return (
    <div className="app">
      <Navbar onNavClick={handleNavClick} currentSection={currentSection} />

      <div className="scroll-container" ref={scrollContainerRef}>
        <section id="intro" className="section">
          <div className="intro-content">
            <div className="intro-spline-container">
              <Spline scene="https://prod.spline.design/R6aJt-6mh4pHIy6a/scene.splinecode" />
            </div>

            <div className="intro-text">
              <h1 className="animated-name">{displayText}</h1>
              <p className="rotating-subtitle">
                <span key={currentSubtitle} className="subtitle-text">
                  {subtitles[currentSubtitle]}
                </span>
              </p>
              <div className="scroll-indicator">
                <p>Scroll to know more about me!</p>
                <div className="arrow">↓</div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="content projects-content-with-bg">
            <img src="/images/cauldron.png" alt="Cauldron" className="cauldron-bg-image" />
            <h2>My Projects</h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <div 
                    className="project-image"
                    style={{ backgroundImage: `url(\"${project.image}\")` }}
                  >
                    <div className="project-overlay">
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        View Project →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="github-section">
              <p className="github-text">For more projects, visit my</p>
              <a
                href="https://github.com/akshita-as02"
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="content">
            <h2>My Skills</h2>
            <div className="skills-container">
              <div className="skill-category">
                <h3>Programming</h3>
                <ul>
                  <li>Python</li>
                  <li>Java</li>
                  <li>JavaScript/TypeScript</li>
                  <li>C/C++</li>
                  <li>HTML/CSS</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Frameworks & Libraries</h3>
                <ul>
                  <li>MERN Stack</li>
                  <li>Next.js</li>
                  <li>React</li>
                  <li>Three.js</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Tools & Technologies</h3>
                <ul>
                  <li>Figma</li>
                  <li>Adobe Suite</li>
                  <li>Blender</li>
                  <li>Git</li>
                  <li>AWS</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="content about-content-flex">
            <div className="about-image-container">
              <img
                src="/images/profile.jpg"
                alt="Profile"
                className="about-profile-image"
              />
            </div>
            <div className="about-description">
              <h2>About Me</h2>
              <p>
                Creative technologist from the Himalayas, now building quirky digital experiences. My journey from Haldwani to Chennai, Bengaluru, and Delhi taught me that the best solutions come from blending diverse perspectives with unconventional thinking.
                <br />I've designed for startups, dabbled in web3, and love turning wild ideas into things that actually work. Computer Science gave me the tools, but curiosity drives the creativity.
                <br />Want to know more? Ask my chatbot below—it knows all my stories.
              </p>
              <Chatbot />
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="content">
            <h2>Contact Me</h2>
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;