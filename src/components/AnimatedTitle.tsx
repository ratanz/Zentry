import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const AnimatedTitle = ({ title, containterClass }: { title: string, containterClass: string }) => {

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start : 'start bottom',
                    end : 'center bottom',
                   toggleActions : 'play none none reverse'
                }
            })

            titleAnimation.to('.animated-word', {
                opacity : 1,
                transform : 'translate3d(0,0,0) rotateY(10deg) rotateX(5deg)',
           
                scrub : true,
                duration : 0.5,
                stagger : 0.2
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div 
        ref={containerRef}
        className={`animated-title ${containterClass} `}>
            {title.split('<br/>').map((line, index) => (
                <div key={index} className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'>
                    {line.split(' ').map((word, i) => (
                        <span key={i} className='animated-word' dangerouslySetInnerHTML={{ __html: word }} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default AnimatedTitle
