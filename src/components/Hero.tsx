import React, { useRef, useState, useEffect } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideo, setLoadedVideo] = useState(0);

    const totalVideos = 4;
    const nextVideoRef = useRef<HTMLVideoElement>(null);

    const handleVideoLoad = () => {
        setLoadedVideo((prev) => prev + 1);
    }

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVdClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);

    }

    const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`;

    useEffect(() => {
        if(loadedVideo === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideo])


    // first animation of hero section
    useGSAP(() => {
        if (hasClicked) {
            gsap.set('#next-video', { visibility: 'visible' });

            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width : '100%',
                height : '100%',
                duration : 1,
                ease : 'power1.inOut',
                onStart: () => {
                    nextVideoRef.current?.play().catch(() => {});
                },
            })

            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale : 0,
                duration : 1.5,
                ease: 'power1.inOut',
                
            })

        }

    }, {dependencies : [currentIndex], revertOnUpdate : true})

    // second animation of hero section for the video frame
    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath : 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius : '0 0 40% 10%'
        })

        gsap.from('#video-frame', {
            clipPath : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius : '0 0 0 0',
            ease : 'power1.inOut',
            scrollTrigger : {
                trigger : '#video-frame',
                start : 'center center',
                end : 'bottom center',
                scrub : true,
            }
        })
    })



    return (

        <div className='relative h-dvh w-screen overflow-x-hidden'>

            {isLoading && (
                <div className=' flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
                    <div className='three-body'>
                        <div className='three-body__dot'></div>
                        <div className='three-body__dot'></div>
                        <div className='three-body__dot'></div>
                    </div>
                </div>
            )}

            <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-colors-blue-75'>
                <div>
                    <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                        <div onClick={handleMiniVdClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                            <video
                                ref={nextVideoRef}
                                src={getVideoSrc(upcomingVideoIndex)}
                                loop
                                muted
                                className='size-64 origin-center scale-150 object-cover object-center'
                                onLoadedData={handleVideoLoad}
                            >
                            </video>
                        </div>
                    </div>
                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        id='next-video'
                        loop
                        muted
                        className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                        onLoadedData={handleVideoLoad}
                    >
                    </video>

                    <video
                        src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        autoPlay
                        loop
                        muted
                        className='absolute left-0 top-0 size-full object-cover object-center'
                        onLoadedData={handleVideoLoad}
                    ></video>
                </div>
                <h1 className='special-font hero-heading absolute bottom-5 z-40 text-colors-blue-75'>
                    G<b>A</b>ming
                </h1>

                <div className='absolute left-0 top-0 z-40 size-full '>
                    <div className='m-24 px-5 sm:px-10'>
                        <h1 className='special-font hero-heading text-blue-100'>redifi <b>n</b>e</h1>
                        <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
                            Enter the Metagame Layer <br />
                            Unleash the Play Economy
                        </p>
                        <Button
                            id='watch-trailer'
                            title='Watch Trailer'
                            leftIcon={<TiLocationArrow />}
                            containerClass='!bg-yellow-300 flex-center gap-1'
                        />
                    </div>
                </div>
            </div>

            <h1 className='special-font hero-heading absolute bottom-5 text-colors-black'>
                G<b>A</b>ming
            </h1>


        </div>
    )
}

export default Hero
