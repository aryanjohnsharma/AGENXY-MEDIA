import { useEffect, useRef, useState } from 'react'
import './Testimonial.css'
import jamesPfp from '../../assets/JAMES PFP.jpeg'
import jamesAudio from '../../assets/James Testimonial.mp3'

function AnimatedMetric({ end, suffix = '', decimals = 0, duration = 1500 }) {
    const [value, setValue] = useState(0)
    const [hasAnimated, setHasAnimated] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true)
                    const startTime = performance.now()

                    const animate = (now) => {
                        const elapsed = now - startTime
                        const progress = Math.min(elapsed / duration, 1)
                        const eased = 1 - Math.pow(1 - progress, 3)
                        setValue(eased * end)
                        if (progress < 1) {
                            requestAnimationFrame(animate)
                        } else {
                            setValue(end)
                        }
                    }
                    requestAnimationFrame(animate)
                }
            },
            { threshold: 0.5 }
        )

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [end, duration, hasAnimated])

    const display = decimals > 0
        ? value.toFixed(decimals)
        : Math.round(value)

    return <span className="metric-value" ref={ref}>{display}{suffix}</span>
}

function Testimonial() {
    const sectionRef = useRef(null)
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.2 }
        )

        const elements = sectionRef.current?.querySelectorAll('.reveal')
        elements?.forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <section className="testimonial" ref={sectionRef}>
            <div className="container">
                <div className="testimonial-header reveal">
                    <div className="quote-mark">"</div>
                    <span className="testimonial-label mono">Testimonial</span>
                    <h2 className="testimonial-title">
                        What our <span className="accent">clients say</span>
                    </h2>
                </div>
                <div className="testimonial-layout">
                    {/* Left — Author card */}
                    <div className="testimonial-left reveal">
                        <div className="testimonial-author-card vertical-layout">
                            <audio ref={audioRef} src={jamesAudio} onEnded={() => setIsPlaying(false)} />
                            
                            <div className="author-square-avatar-container">
                                <img src={jamesPfp} alt="James Ferrell" className="author-square-img" />
                                
                                <button className={`voicenote-button ${isPlaying ? 'playing' : ''}`} onClick={toggleAudio} aria-label="Play testimonial">
                                    {isPlaying ? (
                                        <div className="audio-bars">
                                            <span className="bar"></span>
                                            <span className="bar"></span>
                                            <span className="bar"></span>
                                            <span className="bar"></span>
                                        </div>
                                    ) : (
                                        <i className="ri-play-fill"></i>
                                    )}
                                </button>
                            </div>

                            <div className="author-info-vertical">
                                <div className="author-name-row">
                                    <span className="author-name-large">James Ferrell</span>
                                    <span className="author-verified" title="Verified Client">
                                        <i className="ri-verified-badge-fill"></i>
                                    </span>
                                </div>
                                <span className="author-role mono">Content Creator</span>
                                
                                <div className="author-stats-boxes">
                                    <a href="https://www.youtube.com/@Jamesferrell_/shorts" target="_blank" rel="noopener noreferrer" className="author-stat-box">
                                        <i className="ri-youtube-fill"></i>
                                        <div className="stat-box-info">
                                            <span className="stat-box-val">51.1K</span>
                                            <span className="stat-box-lbl">subs</span>
                                        </div>
                                    </a>
                                    <a href="https://www.tiktok.com/@surftock" target="_blank" rel="noopener noreferrer" className="author-stat-box">
                                        <i className="ri-tiktok-fill"></i>
                                        <div className="stat-box-info">
                                            <span className="stat-box-val">305K</span>
                                            <span className="stat-box-lbl">followers</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right — Quote text */}
                    <div className="testimonial-right reveal reveal-delay-1">
                        <blockquote className="testimonial-quote">
                            <p>Aryan did an <em>amazing job</em> with the video editing. He makes the videos highly engaging with text, sound effects, and graphics while keeping everything <em>clean and polished.</em></p>
                            <p>Super easy to work with and communicate with, and there are rarely any major revisions needed. Most videos come out <em>ready to post right away.</em></p>
                            <p>Overall, an amazing experience and very affordable rates. I would definitely recommend Aryan if you're looking to <em>upgrade your content quality</em> without worrying about how the editing will turn out. It's consistently great and optimized for social media.</p>
                        </blockquote>

                        {/* Metrics bar */}
                        <div className="metrics-bar">
                            <div className="metric-item">
                                <AnimatedMetric end={4.9} suffix="" decimals={1} duration={1200} />
                                <span className="metric-label mono">Avg. Rating</span>
                            </div>
                            <div className="metric-divider"></div>
                            <div className="metric-item">
                                <AnimatedMetric end={24} suffix="h" decimals={0} duration={1000} />
                                <span className="metric-label mono">Avg. Turnaround</span>
                            </div>
                            <div className="metric-divider"></div>
                            <div className="metric-item">
                                <AnimatedMetric end={100} suffix="%" decimals={0} duration={1400} />
                                <span className="metric-label mono">Client Satisfaction</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonial
