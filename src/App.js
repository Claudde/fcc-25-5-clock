
import './App.scss';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faRotate} from '@fortawesome/free-solid-svg-icons';
import { faSquareCaretDown, faSquareCaretUp} from '@fortawesome/free-regular-svg-icons';
import beeper  from './sounds/beep.mp3';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLeftMin: 25,
      timeLeftSec: 0,
      timerLbl: "Session",
      pause: false
      
    }
    this.intervalId = 0;
    this.startTimer = this.startTimer.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.increaseSession = this.increaseSession.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.countdown =  this.countdown.bind(this);
    this.audioTimer = this.audioTimer.bind(this);
  }

  decreaseBreak(){
    if(this.state.breakLength > 1){
      this.setState({
        breakLength: this.state.breakLength - 1
      });
    }
  }
  increaseBreak(){
    if(this.state.breakLength < 60){
      this.setState({
        breakLength: this.state.breakLength + 1
      });
    }
  }
  decreaseSession(){
    if(this.state.sessionLength > 1){
      let newSession = this.state.sessionLength - 1;
      this.setState({
        sessionLength: newSession,
        timeLeftMin: newSession 
      });
    }
  }
  increaseSession(){
    if(this.state.sessionLength < 60){
      let newSession = this.state.sessionLength + 1;
      this.setState({
        sessionLength: newSession,
        timeLeftMin: newSession
      });
    }
  }
  resetTimer(){
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeftSec: 0,
      timeLeftMin: 25,
      timerLbl: "Session",
      pause: false
    });
    clearInterval(this.timer);
    this.timer = 0;
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    document.getElementById("time-left").classList.remove("time-left-time-up");
  }
  startTimer(){
    if (!this.state.pause){
      if(!this.timer){
        this.timer = setInterval(this.countdown, 1000);
        this.setState({
          pause: true
        });
      }
    } else {
      clearInterval(this.timer);
      this.timer = 0;
      this.setState({
        pause: false
      });
      document.getElementById("beep").pause();
    }
  }
  audioTimer(){
    let audioFile = document.getElementById("beep");

    audioFile.currentTime = 0;
    audioFile.play();
    setTimeout(() => {
      audioFile.pause();
    }, 3000);

  }
  countdown(){
    if(this.state.timeLeftSec === 0){
      if(this.state.timeLeftMin === 0){
        this.audioTimer();
        document.getElementById("time-left").classList.remove("time-left-time-up");
        if (this.state.timerLbl === "Session"){
          this.setState({
            timerLbl: "Break",
            timeLeftMin: this.state.breakLength,
            timeLeftSec: 0
          });
        } else {
          this.setState({
            timerLbl: "Session",
            timeLeftMin: this.state.sessionLength,
            timeLeftSec: 0
          });
        }
      } else {
        if(this.state.timeLeftMin === 1){
          document.getElementById("time-left").classList.add("time-left-time-up");
        }
        this.setState({
          timeLeftSec: 59,
          timeLeftMin: this.state.timeLeftMin - 1
        });
      }
    } else {
      
      this.setState({
        timeLeftSec: this.state.timeLeftSec - 1
      });
    }
  }

  render(){
    return (
      <div className="App">
        <div className='timer'>
          <p id='timer-label'>{this.state.timerLbl}</p>
          <p id="time-left">{this.state.timeLeftMin.toLocaleString('en-US', {
                                                    minimumIntegerDigits: 2,
                                                    useGrouping: false
                            })}:{this.state.timeLeftSec.toLocaleString('en-US', {
                                                          minimumIntegerDigits: 2,
                                                          useGrouping: false})} </p>
          <div className='timer-btn'>
            <button id="start_stop" title="Start" onClick={this.startTimer}><FontAwesomeIcon icon={faPlay} size="4x"/></button>
            <button id="reset" title="Reset" onClick={this.resetTimer}><FontAwesomeIcon icon={faRotate} size="4x"/></button>
          </div>
        </div>


        <div className='controls'>
          <div className='break'>
            <p id="break-label" className='control-lbl'>Break Length</p>
            <div className='ctrl break-ctrl'>
              <button id='break-decrement' title="decrease" onClick={this.decreaseBreak}>
                <FontAwesomeIcon icon={faSquareCaretDown} size="3x"/>
                
              </button>
              <p id="break-length">{this.state.breakLength}</p>
              <button id='break-increment' title='increase' onClick={this.increaseBreak}><FontAwesomeIcon icon={faSquareCaretUp} size="3x"/></button>
            </div>
          </div>


          <div className='session'>
            <p id="session-label" className='control-lbl'>Session Length</p>
            <div className='ctrl session-ctrl'>
              <button id='session-decrement' title="decrease" onClick={this.decreaseSession}><FontAwesomeIcon icon={faSquareCaretDown} size="3x"/> </button>
              <p id="session-length">{this.state.sessionLength}</p>
              <button id='session-increment' title='increase' onClick={this.increaseSession}><FontAwesomeIcon icon={faSquareCaretUp} size="3x"/></button>
            </div>
          </div>
        </div>
        <audio id='beep' preload='auto' src={"https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"}></audio>
      </div>
      
    );
  }
}

export default App;
