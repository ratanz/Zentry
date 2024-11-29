import React, { useRef, useEffect } from 'react'
import AnimatedTitle from './AnimatedTitle'
import gsap from 'gsap'
import Button from './Button'

const Story = () => {

    const frameRef = useRef<HTMLImageElement>(null);

    const handleMouseLeave = () => {
        gsap.to(frameRef.current, {
            duration: 0.3,
            rotateX: 0,
            rotateY: 0,
            ease: 'power2.out'
        });
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const element = frameRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateX = (y - 0.5) * -10; // Adjust multiplier for sensitivity
        const rotateY = (x - 0.5) * 10;  // Adjust multiplier for sensitivity

        gsap.to(element, {
            duration: 0.3,
            rotateX,
            rotateY,
            transformPerspective: 500,
            ease: 'power2.out',
            overwrite: 'auto'
        });
    }

    useEffect(() => {
        const element = frameRef.current;
        if (!element) return;

        const onMouseMove = (e: MouseEvent) => handleMouseMove(e as unknown as React.MouseEvent<HTMLDivElement>);
        const onMouseLeave = handleMouseLeave;

        element.addEventListener('mousemove', onMouseMove);
        element.addEventListener('mouseleave', onMouseLeave);

        return () => {
            element.removeEventListener('mousemove', onMouseMove);
            element.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return (
        <section id='story' className='min-h-dvh w-screen bg-black text-blue-50'>
            <div className='flex size-full flex-col items-center py-10 pb-24'>
                <p className='font-general text-sm uppercase md:text-[10px]'>
                    the multiversal ip world
                </p>
                <div className='relative size-full'>
                    <AnimatedTitle
                        title='The st<b>o<b/>ry of <br/> a hidden real<b>m<b/>'
                        sectionId='#story'
                        containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10'
                    />

                    <div className='story-img-container'>
                        <div className='story-img-mask'>
                            <div className='story-img-content'>
                                <img
                                    ref={frameRef}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseUp={handleMouseLeave}
                                    onMouseEnter={handleMouseLeave}
                                    onMouseMove={handleMouseMove}
                                    src="/img/entrance.webp"
                                    alt="entrance"
                                    className='object-contain'
                                />

                                {/* for the rounded corner */}
                                <svg
                                    className="invisible absolute size-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <defs>
                                        <filter id="flt_tag">
                                            <feGaussianBlur
                                                in="SourceGraphic"
                                                stdDeviation="8"
                                                result="blur"
                                            />
                                            <feColorMatrix
                                                in="blur"
                                                mode="matrix"
                                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                                                result="flt_tag"
                                            />
                                            <feComposite
                                                in="SourceGraphic"
                                                in2="flt_tag"
                                                operator="atop"
                                            />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>



                </div>

                <div className='-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end'>
                    <div className='flex h-full w-fit flex-col items-center md:items-start'>
                        <p className='mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start'>
                            Where realms converge, lies Zentry and the boundless pillar. Discover its secrets and shape your fate amidst infinite opportunities.
                        </p>
                        <Button
                        id='realm-button'
                            title='discover prologue'
                            containerClass='mt-5 hover:bg-yellow-300 text-black transition-colors duration-300'
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Story
