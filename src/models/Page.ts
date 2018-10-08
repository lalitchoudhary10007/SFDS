import { NativePageTransitions } from '@ionic-native/native-page-transitions';

export class Page {

    private isCached: boolean;
    nativePageTransitions: NativePageTransitions;

    
    constructor(transitions: NativePageTransitions) {
        this.nativePageTransitions = transitions;
        this.isCached = false;
    }
    
   
    animateTransition(enterDirection?: string, resumeDirection?: string) {
       let resumeTransition = resumeDirection ? resumeDirection : 'right';
       let enterTransition = enterDirection ? enterDirection : 'left';
       // Resuming view transition if view was previously created
       if (this.isCached) {
            this.nativePageTransitions.slide({ 
                direction: resumeTransition, 
                iosdelay: 60, 
                androiddelay: 10, 
                slowdownfactor: 1 ,
                fixedPixelsTop: 63
            });
        }
        // Entering View transition if is created for first time
        else {
            this.nativePageTransitions.slide({ 
                direction: enterTransition, 
                iosdelay: 60, 
                androiddelay: 10, 
                slowdownfactor: 1,
                fixedPixelsTop: 63
            });
            this.isCached = true;
        }   
    }
}