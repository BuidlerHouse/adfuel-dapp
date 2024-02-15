import React, { Component } from 'react';
import { Player, ControlBar, BigPlayButton, LoadingSpinner, Shortcut, PlayerReference } from 'video-react';
import { Turnstile } from '@marsidev/react-turnstile';
import 'video-react/dist/video-react.css';

interface AdsVideoProps {
    src: string;
    onEnd: (token: string) => void; // Callback function to be called when the video ends
}

interface AdsVideoState {
    counter: number;
    countdown: number;
    playing: boolean;
    verified: boolean;
    startTime: number;
    token: string;
}

class AdsVideo extends Component<AdsVideoProps, AdsVideoState> {
    player = React.createRef() as any;
    countdownInterval: NodeJS.Timeout | null = null;

    constructor(props: AdsVideoProps) {
        super(props);
        this.state = {
            startTime: 0,
            counter: 0,
            countdown: 0,
            playing: false,
            verified: false,
            token: ""
        };
    }

    handleStateChange(state: any, prevState: any) {
        this.setState({ counter: this.state.counter + 1});
        if (!state.paused && prevState.paused) {
            console.log('Started');
        } else if (state.ended) {
            if(this.state.playing)
            {
                this.setState({ playing: false });
                this.stopCountdown();
                console.log('Ended', this.state.counter);
                const endTime = Date.now();
                if(this.state.counter < 40) {
                    return;
                }
                const elapsedTime = endTime - this.state.startTime;
                const duration = this.player.current.getState().player.duration;
                if(elapsedTime < (duration-2) * 1000) {
                    return
                }
                this.props.onEnd(this.state.token);
            }
            
        }
    }
    
    componentDidMount() {
        if (this.player.current) {
        } else {
            console.log('Player not found');
        }
    }
    
    play() {
        this.setState({ playing: true, startTime: Date.now(), verified: true});
        console.log('Call Play');
        this.startCountdown();
        this.player.current.subscribeToStateChange(this.handleStateChange.bind(this));
        this.player.current.play();
    }

    startCountdown() {
        this.countdownInterval = setInterval(() => {
            if(this.player.current)
            {
                const remainingTime = Math.floor(this.player.current.getState().player.duration - this.player.current.getState().player.currentTime);
                this.setState({ countdown: remainingTime });
            }
        }, 1000);
    }

    stopCountdown() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
    }

    handleSuccess = (token: string) => {
        console.log('Turnstile success:', token);
        this.setState({ token });
        this.play();
    }


    render() {
        const src = this.props.src || "ads.mov";
        return (
            <Player

                ref={this.player as React.RefObject<PlayerReference>}
                src={src}
                playsInline={true}
                preload={"auto"}
                autoPlay={false}
                poster='banner.png'
                fluid={true}
                muted={true}
            >
                {/* Disable the big play button by setting its prop to false */}
                <BigPlayButton position="center" />
                
                {/* Custom loading spinner */}
                <LoadingSpinner />
                
                {/* Custom shortcut to disable clickable and double clickable features */}
                <Shortcut clickable={false} dblclickable={false} />
                
                {/* Hide the control bar completely */}
                <ControlBar disableCompletely={true} />
                {this.state.playing && this.state.countdown > 0 && (
                    <div style={{
                        position: 'absolute',
                        top: 10,
                        zIndex: 10000,
                        right: 10,
                        padding: '10px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        fontSize: '20px',
                        borderRadius: '20px'
                    }}>
                        {this.state.countdown}
                    </div>
                )}
                {!this.state.verified && (
                    <Turnstile
                        className='turnstile'
                        siteKey='0x4AAAAAAAQOibHgLITTAGU8'
                        onSuccess={this.handleSuccess}
                    />
                )}
                
            </Player>
        );
    }
}

export default AdsVideo;