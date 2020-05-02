var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;
var WINDOW_HALF_X = WIDTH / 2;
var WINDOW_HALF_Y = HEIGHT / 2;
var malusClearColor = 0xb44b39;
var malusClearAlpha = 0;

var INITIAL_STATE = 'initial';
var PAUSE_STATE = 'pause';
var GAME_STATE = 'game';
var GAMEOVER_STATE = 'game_over';
var SCOREBOARD_STATE = 'scoreboard';

var currentState = INITIAL_STATE;

var defaultCameraValues = {
    'FOV': 50,
    'ASPECT_RATIO': WIDTH / HEIGHT,
    'NEAR_PLANE': 1,
    'FAR_PLANE': 2000,
    'POS_X': 120,
    'POS_Y': 60,
    'POS_Z': 200,
    'LOOT_AT': new THREE.Vector3(0, 30, 0),
}

var CAMERA_SETTINGS = {
    [INITIAL_STATE]: defaultCameraValues,
    [PAUSE_STATE]: {
        ...defaultCameraValues,
        'POS_X': 0,
        'POS_Y': 30,
    },
    [GAME_STATE]: {
        ...defaultCameraValues,
        'POS_X': 0,
        'POS_Y': 30,
    },
    [GAMEOVER_STATE]: {
        ...defaultCameraValues,
        'POS_X': 0,
        'POS_Y': 30,
    },
    [SCOREBOARD_STATE]: {
        ...defaultCameraValues,
        'POS_X': 0,
        'POS_Y': 30,
    },
}


var DEFAULT_MODE = 'defalut';
var EASY_MODE = 'easy';
var HARD_MODE = 'hard';

var currentGameMode = DEFAULT_MODE;

var BLOCKS_SPEED = {
    [DEFAULT_MODE]: 2,
    [EASY_MODE]: 3,
    [HARD_MODE]: 5,
}

/* 
    {
        [INITIAL_STATE]: ,
        [PAUSE_STATE]: ,
        [GAME_STATE]: ,
        [GAMEOVER_STATE]: ,
        [SCOREBOARD_STATE]: ,
    }
*/