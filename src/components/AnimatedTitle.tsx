import  { useRef, useEffect } from 'react'
import gsap from 'gsap'

const AnimatedTitle = ({ title, containerClass,  }: { title: string, containerClass: string, sectionId?: string }) => {

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
                transform : 'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)',
                scrub : 1,
                duration : 0.5,
                stagger : 0.1
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div 
        ref={containerRef}
        className={`animated-title ${containerClass} `}>
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
