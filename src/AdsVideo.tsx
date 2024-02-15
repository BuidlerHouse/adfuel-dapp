import React, { Component } from 'react';
import { Player, ControlBar, BigPlayButton, LoadingSpinner, Shortcut, PlayerReference } from 'video-react';
import 'video-react/dist/video-react.css';

interface AdsVideoProps {
    src: string;
    onEnd: () => void; // Callback function to be called when the video ends
}

interface AdsVideoState {
    counter: number;
    countdown: number;
    playing: boolean;
}

class AdsVideo extends Component<AdsVideoProps, AdsVideoState> {
    player = React.createRef() as any;
    countdownInterval: NodeJS.Timeout | null = null;

    constructor(props: AdsVideoProps) {
        super(props);
        this.state = {
            counter: 0,
            countdown: 0,
            playing: false
        };
    }

    handleStateChange(state: any, prevState: any) {
        if (!state.paused && prevState.paused) {
            console.log('Started');
        } else if (state.ended) {
            if(this.state.playing)
            {
                this.setState({ playing: false });
                this.stopCountdown();
                console.log('Ended');
                this.props.onEnd();
            }
            
        }
    }
    
    componentDidMount() {
        if (this.player.current) {
            this.player.current.subscribeToStateChange(this.handleStateChange.bind(this));
            // this.play();
        } else {
            console.log('Player not found');
        }
    }
    
    play() {
        this.startCountdown();
        this.setState({ playing: true });
        this.player.current.play();
    }

    // pause() {
    //     this.player.current.pause();
    // }

    startCountdown() {
        this.countdownInterval = setInterval(() => {
            if(this.player.current)
            {
                const remainingTime = Math.floor(this.player.current.getState().player.duration - this.player.current.getState().player.currentTime);
                this.setState({ countdown: remainingTime });
                if (this.state.countdown <= 0) {
                    this.stopCountdown();
                }
            }
        }, 1000);
    }

    stopCountdown() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
    }

    render() {
        const src = this.props.src || "ads.mov";
        return (
            <Player
                ref={this.player as React.RefObject<PlayerReference>}
                src={src}
                playsInline={true}
                preload={"auto"}
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
            </Player>
        );
    }
}

export default AdsVideo;