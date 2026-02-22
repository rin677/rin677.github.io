/**
 * themes.js — Reading Heatmap Theme System v5
 */

window.THEMES = {

  /* ════════════════════════════════════════
     CLASSIC FLAT
  ════════════════════════════════════════ */

  default: {
    label: 'GitHub Dark',
    preview: { bg: 'linear-gradient(135deg,#0d1117,#161b22)', color: '#c9d1d9' },
    vars: {
      '--bg-primary':    '#0d1117', '--bg-secondary': '#161b22',
      '--bg-tertiary':   '#21262d', '--border-color': '#30363d',
      '--text-primary':  '#c9d1d9', '--text-secondary':'#8b949e',
      '--accent-color':  '#238636', '--accent-hover':  '#2ea043',
      '--danger-color':  '#da3633', '--danger-hover':  '#f85149',
      '--level-0':'#161b22','--level-1':'#0e4429',
      '--level-2':'#006d32','--level-3':'#26a641','--level-4':'#39d353',
    },
  },

  nord: {
    label: 'Nord',
    preview: { bg: 'linear-gradient(135deg,#2e3440,#3b4252)', color: '#88c0d0' },
    vars: {
      '--bg-primary':    '#2e3440', '--bg-secondary': '#3b4252',
      '--bg-tertiary':   '#434c5e', '--border-color': '#4c566a',
      '--text-primary':  '#eceff4', '--text-secondary':'#d8dee9',
      '--accent-color':  '#88c0d0', '--accent-hover':  '#8fbcbb',
      '--danger-color':  '#bf616a', '--danger-hover':  '#d08770',
      '--level-0':'#3b4252','--level-1':'#4d6780',
      '--level-2':'#5e81ac','--level-3':'#7a99c4','--level-4':'#96b1dc',
    },
  },

  dracula: {
    label: 'Dracula',
    preview: { bg: 'linear-gradient(135deg,#282a36,#44475a)', color: '#bd93f9' },
    vars: {
      '--bg-primary':    '#282a36', '--bg-secondary': '#21222c',
      '--bg-tertiary':   '#343746', '--border-color': '#44475a',
      '--text-primary':  '#f8f8f2', '--text-secondary':'#6272a4',
      '--accent-color':  '#50fa7b', '--accent-hover':  '#69ff94',
      '--danger-color':  '#ff5555', '--danger-hover':  '#ff6e6e',
      '--level-0':'#44475a','--level-1':'#1a4a2e',
      '--level-2':'#1f6b3f','--level-3':'#50fa7b','--level-4':'#69ff94',
    },
    extra: `.month-label,.day-label{color:#bd93f9;}`,
  },

  monokai: {
    label: 'Monokai',
    preview: { bg: 'linear-gradient(135deg,#272822,#49483e)', color: '#a6e22e' },
    vars: {
      '--bg-primary':    '#272822', '--bg-secondary': '#3e3d32',
      '--bg-tertiary':   '#49483e', '--border-color': '#75715e',
      '--text-primary':  '#f8f8f2', '--text-secondary':'#75715e',
      '--accent-color':  '#a6e22e', '--accent-hover':  '#e6db74',
      '--danger-color':  '#f92672', '--danger-hover':  '#fd971f',
      '--level-0':'#3e3d32','--level-1':'#3d5a1a',
      '--level-2':'#5a8024','--level-3':'#a6e22e','--level-4':'#c8f55a',
    },
    extra: `h1{color:#e6db74;}`,
  },

  /* ════════════════════════════════════════
     COMMUNITY NAMED
  ════════════════════════════════════════ */

  gruvbox: {
    label: 'Gruvbox Dark',
    preview: { bg: 'linear-gradient(135deg,#282828,#32302f)', color: '#ebdbb2' },
    vars: {
      '--bg-primary':    '#282828', '--bg-secondary': '#32302f',
      '--bg-tertiary':   '#3c3836', '--border-color': '#504945',
      '--text-primary':  '#ebdbb2', '--text-secondary':'#a89984',
      '--accent-color':  '#b8bb26', '--accent-hover':  '#98971a',
      '--danger-color':  '#fb4934', '--danger-hover':  '#fe8019',
      '--level-0':'#32302f','--level-1':'#3c5a1e',
      '--level-2':'#5a7a28','--level-3':'#b8bb26','--level-4':'#d5c4a1',
    },
    extra: `h1{color:#ebdbb2;}`,
  },

  'gruvbox-light': {
    label: 'Gruvbox Light',
    preview: { bg: 'linear-gradient(135deg,#fbf1c7,#f2e5bc)', color: '#3c3836' },
    vars: {
      '--bg-primary':    '#fbf1c7', '--bg-secondary': '#f2e5bc',
      '--bg-tertiary':   '#ebdbb2', '--border-color': '#d5c4a1',
      '--text-primary':  '#3c3836', '--text-secondary':'#7c6f64',
      '--accent-color':  '#79740e', '--accent-hover':  '#98971a',
      '--danger-color':  '#9d0006', '--danger-hover':  '#cc241d',
      '--level-0':'#f2e5bc','--level-1':'#d5c4a1',
      '--level-2':'#bdae93','--level-3':'#79740e','--level-4':'#427b58',
    },
    extra: `h1{color:#3c3836;}.heatmap-panel,.leaderboard-panel,.modal-content{box-shadow:0 2px 8px rgba(0,0,0,.12);}`,
  },

  catppuccin: {
    label: 'Catppuccin Mocha',
    preview: { bg: 'linear-gradient(135deg,#1e1e2e,#181825)', color: '#cba6f7' },
    vars: {
      '--bg-primary':    '#1e1e2e', '--bg-secondary': '#181825',
      '--bg-tertiary':   '#313244', '--border-color': '#45475a',
      '--text-primary':  '#cdd6f4', '--text-secondary':'#6c7086',
      '--accent-color':  '#a6e3a1', '--accent-hover':  '#94e2d5',
      '--danger-color':  '#f38ba8', '--danger-hover':  '#fab387',
      '--level-0':'#181825','--level-1':'#2a4a2e',
      '--level-2':'#3d7a45','--level-3':'#a6e3a1','--level-4':'#cba6f7',
    },
    extra: `h1{color:#cdd6f4;}`,
  },

  'catppuccin-latte': {
    label: 'Catppuccin Latte',
    preview: { bg: 'linear-gradient(135deg,#eff1f5,#e6e9ef)', color: '#8839ef' },
    vars: {
      '--bg-primary':    '#eff1f5', '--bg-secondary': '#e6e9ef',
      '--bg-tertiary':   '#dce0e8', '--border-color': '#ccd0da',
      '--text-primary':  '#4c4f69', '--text-secondary':'#9ca0b0',
      '--accent-color':  '#40a02b', '--accent-hover':  '#179299',
      '--danger-color':  '#d20f39', '--danger-hover':  '#e64553',
      '--level-0':'#e6e9ef','--level-1':'#c0ddb5',
      '--level-2':'#8dcc78','--level-3':'#40a02b','--level-4':'#179299',
    },
    extra: `h1{color:#4c4f69;}.heatmap-panel,.leaderboard-panel,.modal-content{box-shadow:0 2px 8px rgba(0,0,0,.08);}`,
  },

  rosepine: {
    label: 'Rosé Pine',
    preview: { bg: 'linear-gradient(135deg,#191724,#26233a)', color: '#ebbcba' },
    vars: {
      '--bg-primary':    '#191724', '--bg-secondary': '#1f1d2e',
      '--bg-tertiary':   '#26233a', '--border-color': '#403d52',
      '--text-primary':  '#e0def4', '--text-secondary':'#6e6a86',
      '--accent-color':  '#31748f', '--accent-hover':  '#9ccfd8',
      '--danger-color':  '#eb6f92', '--danger-hover':  '#f6c177',
      '--level-0':'#1f1d2e','--level-1':'#1c4a5e',
      '--level-2':'#256880','--level-3':'#31748f','--level-4':'#9ccfd8',
    },
    extra: `h1{color:#e0def4;}`,
  },

  kanagawa: {
    label: 'Kanagawa',
    preview: { bg: 'linear-gradient(135deg,#1f1f28,#16161d)', color: '#7e9cd8' },
    vars: {
      '--bg-primary':    '#1f1f28', '--bg-secondary': '#16161d',
      '--bg-tertiary':   '#2a2a37', '--border-color': '#363646',
      '--text-primary':  '#dcd7ba', '--text-secondary':'#727169',
      '--accent-color':  '#76946a', '--accent-hover':  '#98bb6c',
      '--danger-color':  '#c34043', '--danger-hover':  '#e82424',
      '--level-0':'#16161d','--level-1':'#2d4a2a',
      '--level-2':'#4a6e42','--level-3':'#76946a','--level-4':'#98bb6c',
    },
    extra: `h1{color:#dcd7ba;}`,
  },

  solarized: {
    label: 'Solarized Dark',
    preview: { bg: 'linear-gradient(135deg,#002b36,#073642)', color: '#2aa198' },
    vars: {
      '--bg-primary':    '#002b36', '--bg-secondary': '#073642',
      '--bg-tertiary':   '#0d3d4a', '--border-color': '#1a5261',
      '--text-primary':  '#839496', '--text-secondary':'#586e75',
      '--accent-color':  '#2aa198', '--accent-hover':  '#859900',
      '--danger-color':  '#dc322f', '--danger-hover':  '#cb4b16',
      '--level-0':'#073642','--level-1':'#1a5261',
      '--level-2':'#257a6f','--level-3':'#2aa198','--level-4':'#859900',
    },
    extra: `h1{color:#93a1a1;}`,
  },

  /* ════════════════════════════════════════
     TUI — TERMINAL
  ════════════════════════════════════════ */

  tui: {
    label: '> TUI [green]',
    preview: { bg: '#080808', color: '#00ff41', border: '2px solid #00ff41' },
    vars: {
      '--bg-primary':    '#080808', '--bg-secondary': '#0d0d0d',
      '--bg-tertiary':   '#111',    '--border-color': '#00aa2b',
      '--text-primary':  '#00ff41', '--text-secondary':'#008f11',
      '--accent-color':  '#00ff41', '--accent-hover':  '#39ff6e',
      '--danger-color':  '#ff0000', '--danger-hover':  '#ff4444',
      '--level-0':'#0d0d0d','--level-1':'#003b0f',
      '--level-2':'#006b1c','--level-3':'#00aa2b','--level-4':'#00ff41',
    },
    extra: `
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
      html,body{background:#080808!important;}
      body::before{content:'';position:fixed;inset:0;
        background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.18) 2px,rgba(0,0,0,.18) 4px);
        pointer-events:none;z-index:9999;}
      body::after{content:'';position:fixed;inset:0;
        background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(0,255,65,.04) 0%,transparent 70%);
        pointer-events:none;z-index:0;animation:tuiPulse 4s ease-in-out infinite alternate;}
      @keyframes tuiPulse{0%{opacity:.7}100%{opacity:1}}
      body,h1,h2,h3,button,input,select,textarea,
      .btn,.log-btn,.form-input,.stat-value,.leaderboard-value{
        font-family:'Share Tech Mono','Courier New',monospace!important;
        text-shadow:0 0 5px rgba(0,255,65,.6);}
      h1{color:#00ff41;letter-spacing:.14em;text-transform:uppercase;}
      h1::before{content:'> ';color:#008f11;}
      h1::after{content:'█';animation:blink 1s step-end infinite;font-size:.8em;margin-left:4px;}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content,
      .entry-item,.leaderboard-entry,.btn,.form-input,
      .quick-book-btn,.toggle-section-btn,.day,.user-profile,
      .metric-toggle,.metric-option,.modal-content{border-radius:0!important;}
      .heatmap-panel,.leaderboard-panel,.goals-section{
        border:1px solid #00aa2b!important;background:#080808!important;
        box-shadow:0 0 12px rgba(0,255,65,.12),inset 0 0 6px rgba(0,0,0,.9)!important;}
      .modal-content{
        border:1px solid #00ff41!important;background:#080808!important;
        box-shadow:0 0 28px rgba(0,255,65,.28)!important;}
      .btn,.toggle-section-btn,.quick-book-btn{
        background:#080808!important;border:1px solid #00aa2b!important;
        color:#00ff41!important;box-shadow:none!important;}
      .btn:hover,.toggle-section-btn:hover,.quick-book-btn:hover{
        background:rgba(0,255,65,.08)!important;border-color:#00ff41!important;transform:none!important;}
      .log-btn{background:rgba(0,255,65,.08)!important;border:1px solid #00ff41!important;
        color:#00ff41!important;filter:none!important;box-shadow:0 0 10px rgba(0,255,65,.25)!important;}
      .log-btn:hover{background:rgba(0,255,65,.16)!important;transform:none!important;
        box-shadow:0 0 20px rgba(0,255,65,.45)!important;}
      .form-input{background:#0d0d0d!important;border:1px solid #00aa2b!important;
        color:#00ff41!important;box-shadow:none!important;}
      .form-input:focus{border-color:#00ff41!important;box-shadow:0 0 8px rgba(0,255,65,.28)!important;}
      .entry-item,.leaderboard-entry{background:#0d0d0d!important;border:1px solid #00aa2b!important;box-shadow:none!important;}
      .metric-toggle{background:#080808!important;border:1px solid #00aa2b!important;}
      .metric-option.active{background:rgba(0,255,65,.1)!important;border-radius:0!important;}
      .day:hover{outline-color:#00ff41!important;box-shadow:0 0 6px rgba(0,255,65,.6)!important;}
      .day.today{outline-color:#ffff00!important;}
      .user-profile{border:1px solid #00aa2b;}
      .container{position:relative;z-index:1;}
    `,
  },

  'tui-amber': {
    label: '> TUI [amber]',
    preview: { bg: '#090700', color: '#ffb000', border: '2px solid #ffb000' },
    vars: {
      '--bg-primary':    '#090700', '--bg-secondary': '#0e0c00',
      '--bg-tertiary':   '#141100', '--border-color': '#b07800',
      '--text-primary':  '#ffb000', '--text-secondary':'#8a6000',
      '--accent-color':  '#ffb000', '--accent-hover':  '#ffd050',
      '--danger-color':  '#ff4400', '--danger-hover':  '#ff6622',
      '--level-0':'#0e0c00','--level-1':'#3d2c00',
      '--level-2':'#7a5800','--level-3':'#b07800','--level-4':'#ffb000',
    },
    extra: `
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
      html,body{background:#090700!important;}
      body::before{content:'';position:fixed;inset:0;
        background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.22) 2px,rgba(0,0,0,.22) 4px);
        pointer-events:none;z-index:9999;}
      body::after{content:'';position:fixed;inset:0;
        background:radial-gradient(ellipse 70% 55% at 50% 50%,rgba(255,176,0,.04) 0%,transparent 70%);
        pointer-events:none;z-index:0;animation:amberPulse 5s ease-in-out infinite alternate;}
      @keyframes amberPulse{0%{opacity:.6}100%{opacity:1}}
      body,h1,h2,h3,button,input,select,textarea,
      .btn,.log-btn,.form-input,.stat-value,.leaderboard-value{
        font-family:'Share Tech Mono','Courier New',monospace!important;
        text-shadow:0 0 5px rgba(255,176,0,.5);}
      h1{color:#ffb000;letter-spacing:.14em;text-transform:uppercase;}
      h1::before{content:'> ';color:#8a6000;}
      h1::after{content:'█';animation:blink 1s step-end infinite;font-size:.8em;margin-left:4px;}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content,
      .entry-item,.leaderboard-entry,.btn,.form-input,
      .quick-book-btn,.toggle-section-btn,.day,.user-profile,
      .metric-toggle,.metric-option{border-radius:0!important;}
      .heatmap-panel,.leaderboard-panel,.goals-section{
        border:1px solid #b07800!important;background:#090700!important;
        box-shadow:0 0 12px rgba(255,176,0,.1),inset 0 0 6px rgba(0,0,0,.9)!important;}
      .modal-content{border:1px solid #ffb000!important;background:#090700!important;
        box-shadow:0 0 28px rgba(255,176,0,.22)!important;}
      .btn,.toggle-section-btn,.quick-book-btn{
        background:#090700!important;border:1px solid #b07800!important;
        color:#ffb000!important;box-shadow:none!important;}
      .btn:hover,.toggle-section-btn:hover,.quick-book-btn:hover{
        background:rgba(255,176,0,.08)!important;border-color:#ffb000!important;transform:none!important;}
      .log-btn{background:rgba(255,176,0,.08)!important;border:1px solid #ffb000!important;
        color:#ffb000!important;filter:none!important;}
      .log-btn:hover{background:rgba(255,176,0,.16)!important;transform:none!important;}
      .form-input{background:#0e0c00!important;border:1px solid #b07800!important;
        color:#ffb000!important;box-shadow:none!important;}
      .entry-item,.leaderboard-entry{background:#0e0c00!important;border:1px solid #b07800!important;box-shadow:none!important;}
      .metric-toggle{background:#090700!important;border:1px solid #b07800!important;}
      .metric-option.active{background:rgba(255,176,0,.1)!important;}
      .day.today{outline-color:#fff!important;}
      .user-profile{border-radius:0!important;border:1px solid #b07800;}
      .container{position:relative;z-index:1;}
    `,
  },

  /* ════════════════════════════════════════
     LIQUID GLASS
     Like the Hyprland screenshot: panels are
     neutral dark-tinted glass, ~28% opacity.
     backdrop-filter blur does the work.
     The only color is the wallpaper bleeding
     through the blur — panels add none.
     Thin bright top edge = only glass signal.
  ════════════════════════════════════════ */

  aurora: {
    label: '🫧 Aurora Glass',
    preview: { bg: 'linear-gradient(135deg,#041018,#0a1a30,#1a0836)', color: '#88ffcc' },
    vars: {
      '--bg-primary':    'rgba(0,0,0,0)',
      '--bg-secondary':  'rgba(255,255,255,0.04)',
      '--bg-tertiary':   'rgba(255,255,255,0.07)',
      '--border-color':  'rgba(255,255,255,0.12)',
      '--text-primary':  '#e8f8f0',
      '--text-secondary':'rgba(200,240,220,0.55)',
      '--accent-color':  '#4fd1a0',
      '--accent-hover':  '#6ee8b8',
      '--danger-color':  '#f06a8a',
      '--danger-hover':  '#f590a8',
      '--level-0': 'rgba(255,255,255,0.06)',
      '--level-1': 'rgba(0,160,100,0.45)',
      '--level-2': 'rgba(0,195,120,0.62)',
      '--level-3': '#4fd1a0',
      '--level-4': '#a8ffd8',
    },
    extra: `
      html, body {
        background:
          radial-gradient(ellipse 100% 80% at 0% 0%,   #001a10 0%, transparent 60%),
          radial-gradient(ellipse 80%  70% at 100% 100%,#0e0020 0%, transparent 60%),
          #020e08 !important;
        background-attachment: fixed !important;
      }
      body::before {
        content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
        background:
          radial-gradient(ellipse 55% 40% at 20% 25%, rgba(0,200,120,.10) 0%, transparent 65%),
          radial-gradient(ellipse 40% 50% at 82% 72%, rgba(100,0,200,.07)  0%, transparent 60%);
        animation: glassAmbient 20s ease-in-out infinite alternate;
      }
      @keyframes glassAmbient {
        0%   { opacity: .7; transform: translateY(0); }
        100% { opacity: 1;  transform: translateY(-10px); }
      }
      .container { position: relative; z-index: 1; }

      .heatmap-panel, .leaderboard-panel, .goals-section {
        background: rgba(0,0,0,0.28) !important;
        backdrop-filter: blur(24px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(24px) saturate(160%) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top-color: rgba(255,255,255,0.22) !important;
        border-bottom-color: rgba(0,0,0,0.30) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.12) inset, 0 16px 40px rgba(0,0,0,0.50) !important;
      }
      .modal-content {
        background: rgba(0,0,0,0.32) !important;
        backdrop-filter: blur(32px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(32px) saturate(160%) !important;
        border: 1px solid rgba(255,255,255,0.12) !important;
        border-top-color: rgba(255,255,255,0.26) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.14) inset, 0 24px 60px rgba(0,0,0,0.60) !important;
      }
      .entry-item, .leaderboard-entry {
        background: rgba(255,255,255,0.05) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border: 1px solid rgba(255,255,255,0.08) !important;
        border-top-color: rgba(255,255,255,0.16) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.08) inset, 0 2px 8px rgba(0,0,0,0.35) !important;
      }
      .entry-item:hover, .leaderboard-entry:hover {
        background: rgba(255,255,255,0.09) !important;
        border-color: rgba(255,255,255,0.16) !important;
      }
      .btn, .toggle-section-btn, .quick-book-btn {
        background: rgba(255,255,255,0.06) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top-color: rgba(255,255,255,0.20) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.10) inset, 0 2px 8px rgba(0,0,0,0.30) !important;
        color: #e8f8f0 !important;
      }
      .btn:hover, .toggle-section-btn:hover, .quick-book-btn:hover {
        background: rgba(255,255,255,0.11) !important;
        border-color: rgba(255,255,255,0.22) !important;
      }
      .form-input {
        background: rgba(0,0,0,0.20) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top-color: rgba(255,255,255,0.18) !important;
        color: #e8f8f0 !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.07) inset !important;
      }
      .form-input:focus {
        border-color: rgba(79,209,160,0.50) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.10) inset, 0 0 12px rgba(79,209,160,0.18) !important;
      }
      .form-input::placeholder { color: rgba(200,240,220,0.30) !important; }
      .log-btn {
        background: rgba(0,0,0,0.30) !important;
        border: 1px solid rgba(79,209,160,0.40) !important;
        border-top-color: rgba(255,255,255,0.25) !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.14) inset, 0 4px 16px rgba(0,0,0,0.45) !important;
        filter: none !important; color: #e8f8f0 !important;
      }
      .log-btn:hover {
        background: rgba(79,209,160,0.14) !important;
        border-color: rgba(79,209,160,0.55) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.18) inset, 0 6px 20px rgba(0,0,0,0.50) !important;
      }
      .tooltip {
        background: rgba(0,0,0,0.70) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top-color: rgba(255,255,255,0.18) !important;
      }
      .metric-toggle {
        background: rgba(0,0,0,0.22) !important;
        border: 1px solid rgba(255,255,255,0.09) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
      }
      .metric-option.active { background: rgba(255,255,255,0.10) !important; color: #a8ffd8 !important; }
      .goals-section {
        background: rgba(0,0,0,0.24) !important;
        backdrop-filter: blur(20px) saturate(150%) !important;
        -webkit-backdrop-filter: blur(20px) saturate(150%) !important;
        border: 1px solid rgba(255,255,255,0.09) !important;
        border-top-color: rgba(255,255,255,0.20) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.10) inset, 0 8px 24px rgba(0,0,0,0.40) !important;
      }
      h1 { color: #c8f0e0; text-shadow: 0 1px 8px rgba(0,0,0,0.8); }
      .modal { background: rgba(0,0,0,0.55) !important; backdrop-filter: blur(6px) !important; }
    `,
  },

  midnight: {
    label: '🫧 Midnight Glass',
    preview: { bg: 'linear-gradient(135deg,#020610,#060c20,#0a0430)', color: '#7aa2f7' },
    vars: {
      '--bg-primary':    'rgba(0,0,0,0)',
      '--bg-secondary':  'rgba(255,255,255,0.04)',
      '--bg-tertiary':   'rgba(255,255,255,0.07)',
      '--border-color':  'rgba(255,255,255,0.12)',
      '--text-primary':  '#d8e8ff',
      '--text-secondary':'rgba(180,205,255,0.55)',
      '--accent-color':  '#6b96f5',
      '--accent-hover':  '#8fb0ff',
      '--danger-color':  '#f06a80',
      '--danger-hover':  '#f590a0',
      '--level-0': 'rgba(255,255,255,0.06)',
      '--level-1': 'rgba(40,80,220,0.45)',
      '--level-2': 'rgba(60,105,240,0.62)',
      '--level-3': '#6b96f5',
      '--level-4': '#b0ccff',
    },
    extra: `
      html, body {
        background:
          radial-gradient(ellipse 100% 80% at 5%  5%,  #00053a 0%, transparent 60%),
          radial-gradient(ellipse 80%  70% at 95% 95%,  #140030 0%, transparent 60%),
          #010210 !important;
        background-attachment: fixed !important;
      }
      body::before {
        content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
        background:
          radial-gradient(ellipse 50% 38% at 22% 22%, rgba(60,100,255,.09) 0%, transparent 65%),
          radial-gradient(ellipse 38% 48% at 80% 75%, rgba(120,50,255,.07)  0%, transparent 60%);
        animation: glassAmbient 22s ease-in-out infinite alternate;
      }
      @keyframes glassAmbient {
        0%   { opacity: .7; transform: translateY(0); }
        100% { opacity: 1;  transform: translateY(-10px); }
      }
      .container { position: relative; z-index: 1; }

      .heatmap-panel, .leaderboard-panel, .goals-section {
        background: rgba(0,0,0,0.28) !important;
        backdrop-filter: blur(24px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(24px) saturate(160%) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top-color: rgba(255,255,255,0.22) !important;
        border-bottom-color: rgba(0,0,0,0.30) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.12) inset, 0 16px 40px rgba(0,0,0,0.52) !important;
      }
      .modal-content {
        background: rgba(0,0,0,0.32) !important;
        backdrop-filter: blur(32px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(32px) saturate(160%) !important;
        border: 1px solid rgba(255,255,255,0.12) !important;
        border-top-color: rgba(255,255,255,0.26) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.14) inset, 0 24px 60px rgba(0,0,0,0.62) !important;
      }
      .entry-item, .leaderboard-entry {
        background: rgba(255,255,255,0.05) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border: 1px solid rgba(255,255,255,0.08) !important;
        border-top-color: rgba(255,255,255,0.16) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.08) inset, 0 2px 8px rgba(0,0,0,0.38) !important;
      }
      .entry-item:hover, .leaderboard-entry:hover {
        background: rgba(255,255,255,0.09) !important;
        border-color: rgba(255,255,255,0.16) !important;
      }
      .btn, .toggle-section-btn, .quick-book-btn {
        background: rgba(255,255,255,0.06) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top-color: rgba(255,255,255,0.20) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.10) inset, 0 2px 8px rgba(0,0,0,0.32) !important;
        color: #d8e8ff !important;
      }
      .btn:hover, .toggle-section-btn:hover, .quick-book-btn:hover {
        background: rgba(255,255,255,0.11) !important;
        border-color: rgba(255,255,255,0.22) !important;
      }
      .form-input {
        background: rgba(0,0,0,0.20) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top-color: rgba(255,255,255,0.18) !important;
        color: #d8e8ff !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.07) inset !important;
      }
      .form-input:focus {
        border-color: rgba(107,150,245,0.50) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.10) inset, 0 0 12px rgba(107,150,245,0.18) !important;
      }
      .form-input::placeholder { color: rgba(180,205,255,0.30) !important; }
      .log-btn {
        background: rgba(0,0,0,0.30) !important;
        border: 1px solid rgba(107,150,245,0.40) !important;
        border-top-color: rgba(255,255,255,0.25) !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.14) inset, 0 4px 16px rgba(0,0,0,0.45) !important;
        filter: none !important; color: #d8e8ff !important;
      }
      .log-btn:hover {
        background: rgba(107,150,245,0.14) !important;
        border-color: rgba(107,150,245,0.55) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.18) inset, 0 6px 20px rgba(0,0,0,0.50) !important;
      }
      .tooltip {
        background: rgba(0,0,0,0.72) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top-color: rgba(255,255,255,0.18) !important;
      }
      .metric-toggle {
        background: rgba(0,0,0,0.22) !important;
        border: 1px solid rgba(255,255,255,0.09) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
      }
      .metric-option.active { background: rgba(255,255,255,0.10) !important; color: #b0ccff !important; }
      .goals-section {
        background: rgba(0,0,0,0.24) !important;
        backdrop-filter: blur(20px) saturate(150%) !important;
        -webkit-backdrop-filter: blur(20px) saturate(150%) !important;
        border: 1px solid rgba(255,255,255,0.09) !important;
        border-top-color: rgba(255,255,255,0.20) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.10) inset, 0 8px 24px rgba(0,0,0,0.42) !important;
      }
      h1 { color: #c0d4ff; text-shadow: 0 1px 8px rgba(0,0,0,0.8); }
      .modal { background: rgba(0,0,0,0.55) !important; backdrop-filter: blur(6px) !important; }
    `,
  },

  sunset: {
    label: '🫧 Sunset Glass',
    preview: { bg: 'linear-gradient(135deg,#1a0400,#200810,#0e0018)', color: '#ffb07a' },
    vars: {
      '--bg-primary':    'rgba(0,0,0,0)',
      '--bg-secondary':  'rgba(255,255,255,0.04)',
      '--bg-tertiary':   'rgba(255,255,255,0.07)',
      '--border-color':  'rgba(255,255,255,0.12)',
      '--text-primary':  '#ffe8d5',
      '--text-secondary':'rgba(255,210,170,0.55)',
      '--accent-color':  '#f0904a',
      '--accent-hover':  '#ffaa6a',
      '--danger-color':  '#f05070',
      '--danger-hover':  '#f07090',
      '--level-0': 'rgba(255,255,255,0.06)',
      '--level-1': 'rgba(180,60,10,0.45)',
      '--level-2': 'rgba(220,90,20,0.62)',
      '--level-3': '#f0904a',
      '--level-4': '#ffc890',
    },
    extra: `
      html, body {
        background:
          radial-gradient(ellipse 100% 80% at 8%  5%,  #3a0800 0%, transparent 58%),
          radial-gradient(ellipse 80%  75% at 92% 92%,  #220030 0%, transparent 58%),
          #0e0200 !important;
        background-attachment: fixed !important;
      }
      body::before {
        content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
        background:
          radial-gradient(ellipse 55% 40% at 18% 20%, rgba(220,80,10,.10) 0%, transparent 62%),
          radial-gradient(ellipse 40% 50% at 80% 78%, rgba(180,20,80,.07)  0%, transparent 60%);
        animation: glassAmbient 18s ease-in-out infinite alternate;
      }
      @keyframes glassAmbient {
        0%   { opacity: .7; transform: translateY(0); }
        100% { opacity: 1;  transform: translateY(-10px); }
      }
      .container { position: relative; z-index: 1; }

      .heatmap-panel, .leaderboard-panel, .goals-section {
        background: rgba(0,0,0,0.28) !important;
        backdrop-filter: blur(24px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(24px) saturate(160%) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top-color: rgba(255,255,255,0.22) !important;
        border-bottom-color: rgba(0,0,0,0.30) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.12) inset, 0 16px 40px rgba(0,0,0,0.50) !important;
      }
      .modal-content {
        background: rgba(0,0,0,0.32) !important;
        backdrop-filter: blur(32px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(32px) saturate(160%) !important;
        border: 1px solid rgba(255,255,255,0.12) !important;
        border-top-color: rgba(255,255,255,0.26) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.14) inset, 0 24px 60px rgba(0,0,0,0.60) !important;
      }
      .entry-item, .leaderboard-entry {
        background: rgba(255,255,255,0.05) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border: 1px solid rgba(255,255,255,0.08) !important;
        border-top-color: rgba(255,255,255,0.16) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.08) inset, 0 2px 8px rgba(0,0,0,0.35) !important;
      }
      .entry-item:hover, .leaderboard-entry:hover {
        background: rgba(255,255,255,0.09) !important;
        border-color: rgba(255,255,255,0.16) !important;
      }
      .btn, .toggle-section-btn, .quick-book-btn {
        background: rgba(255,255,255,0.06) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top-color: rgba(255,255,255,0.20) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.10) inset, 0 2px 8px rgba(0,0,0,0.30) !important;
        color: #ffe8d5 !important;
      }
      .btn:hover, .toggle-section-btn:hover, .quick-book-btn:hover {
        background: rgba(255,255,255,0.11) !important;
        border-color: rgba(255,255,255,0.22) !important;
      }
      .form-input {
        background: rgba(0,0,0,0.20) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top-color: rgba(255,255,255,0.18) !important;
        color: #ffe8d5 !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.07) inset !important;
      }
      .form-input:focus {
        border-color: rgba(240,144,74,0.50) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.10) inset, 0 0 12px rgba(240,144,74,0.18) !important;
      }
      .form-input::placeholder { color: rgba(255,210,170,0.30) !important; }
      .log-btn {
        background: rgba(0,0,0,0.30) !important;
        border: 1px solid rgba(240,144,74,0.40) !important;
        border-top-color: rgba(255,255,255,0.25) !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.14) inset, 0 4px 16px rgba(0,0,0,0.45) !important;
        filter: none !important; color: #ffe8d5 !important;
      }
      .log-btn:hover {
        background: rgba(240,144,74,0.14) !important;
        border-color: rgba(240,144,74,0.55) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.18) inset, 0 6px 20px rgba(0,0,0,0.50) !important;
      }
      .tooltip {
        background: rgba(0,0,0,0.72) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top-color: rgba(255,255,255,0.18) !important;
      }
      .metric-toggle {
        background: rgba(0,0,0,0.22) !important;
        border: 1px solid rgba(255,255,255,0.09) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
      }
      .metric-option.active { background: rgba(255,255,255,0.10) !important; color: #ffc890 !important; }
      .goals-section {
        background: rgba(0,0,0,0.24) !important;
        backdrop-filter: blur(20px) saturate(150%) !important;
        -webkit-backdrop-filter: blur(20px) saturate(150%) !important;
        border: 1px solid rgba(255,255,255,0.09) !important;
        border-top-color: rgba(255,255,255,0.20) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.10) inset, 0 8px 24px rgba(0,0,0,0.40) !important;
      }
      h1 { color: #ffd0a0; text-shadow: 0 1px 8px rgba(0,0,0,0.8); }
      .modal { background: rgba(0,0,0,0.55) !important; backdrop-filter: blur(6px) !important; }
    `,
  },

  crystal: {
    label: '🫧 Crystal Glass',
    preview: { bg: 'linear-gradient(135deg,#050514,#080828,#0e0330)', color: '#e0eeff' },
    vars: {
      '--bg-primary':    'rgba(0,0,0,0)',
      '--bg-secondary':  'rgba(255,255,255,0.04)',
      '--bg-tertiary':   'rgba(255,255,255,0.07)',
      '--border-color':  'rgba(255,255,255,0.12)',
      '--text-primary':  '#eaf0ff',
      '--text-secondary':'rgba(200,215,255,0.55)',
      '--accent-color':  '#90aeff',
      '--accent-hover':  '#aac4ff',
      '--danger-color':  '#f06a88',
      '--danger-hover':  '#f090a8',
      '--level-0': 'rgba(255,255,255,0.06)',
      '--level-1': 'rgba(80,110,255,0.38)',
      '--level-2': 'rgba(100,140,255,0.56)',
      '--level-3': '#90aeff',
      '--level-4': '#d0e0ff',
    },
    extra: `
      html, body {
        background:
          radial-gradient(ellipse 110% 80% at 0%  0%,  #060025 0%, transparent 55%),
          radial-gradient(ellipse 90%  80% at 100% 100%,#000530 0%, transparent 55%),
          radial-gradient(ellipse 60%  60% at 50% 50%,  #040018 0%, transparent 65%),
          #010008 !important;
        background-attachment: fixed !important;
      }
      body::before {
        content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
        background:
          radial-gradient(ellipse 48% 36% at 22% 22%, rgba(80,110,255,.09) 0%, transparent 62%),
          radial-gradient(ellipse 36% 44% at 78% 75%, rgba(140,60,255,.07)  0%, transparent 58%),
          radial-gradient(ellipse 28% 28% at 55% 10%, rgba(40,180,255,.05)  0%, transparent 52%);
        animation: glassAmbient 26s ease-in-out infinite alternate;
      }
      @keyframes glassAmbient {
        0%   { opacity: .6; transform: translateY(0); }
        100% { opacity: .9; transform: translateY(-8px); }
      }
      .container { position: relative; z-index: 1; }

      /* Crystal gets slightly brighter top edge + left edge to suggest prismatic refraction */
      .heatmap-panel, .leaderboard-panel, .goals-section {
        background: rgba(0,0,0,0.26) !important;
        backdrop-filter: blur(28px) saturate(170%) !important;
        -webkit-backdrop-filter: blur(28px) saturate(170%) !important;
        border: 1px solid rgba(255,255,255,0.11) !important;
        border-top-color: rgba(255,255,255,0.26) !important;
        border-left-color: rgba(255,255,255,0.14) !important;
        border-bottom-color: rgba(0,0,0,0.28) !important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.15) inset,
          1px 0 0 rgba(255,255,255,0.06) inset,
          0 16px 40px rgba(0,0,0,0.50) !important;
      }
      .modal-content {
        background: rgba(0,0,0,0.30) !important;
        backdrop-filter: blur(36px) saturate(170%) !important;
        -webkit-backdrop-filter: blur(36px) saturate(170%) !important;
        border: 1px solid rgba(255,255,255,0.13) !important;
        border-top-color: rgba(255,255,255,0.30) !important;
        border-left-color: rgba(255,255,255,0.16) !important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.17) inset,
          1px 0 0 rgba(255,255,255,0.08) inset,
          0 24px 60px rgba(0,0,0,0.62) !important;
      }
      .entry-item, .leaderboard-entry {
        background: rgba(255,255,255,0.05) !important;
        backdrop-filter: blur(14px) !important;
        -webkit-backdrop-filter: blur(14px) !important;
        border: 1px solid rgba(255,255,255,0.09) !important;
        border-top-color: rgba(255,255,255,0.20) !important;
        border-left-color: rgba(255,255,255,0.11) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.10) inset, 0 2px 8px rgba(0,0,0,0.36) !important;
      }
      .entry-item:hover, .leaderboard-entry:hover {
        background: rgba(255,255,255,0.09) !important;
        border-color: rgba(255,255,255,0.20) !important;
      }
      .btn, .toggle-section-btn, .quick-book-btn {
        background: rgba(255,255,255,0.06) !important;
        backdrop-filter: blur(14px) !important;
        -webkit-backdrop-filter: blur(14px) !important;
        border: 1px solid rgba(255,255,255,0.11) !important;
        border-top-color: rgba(255,255,255,0.24) !important;
        border-left-color: rgba(255,255,255,0.13) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.12) inset, 0 2px 8px rgba(0,0,0,0.32) !important;
        color: #eaf0ff !important;
      }
      .btn:hover, .toggle-section-btn:hover, .quick-book-btn:hover {
        background: rgba(255,255,255,0.12) !important;
        border-color: rgba(255,255,255,0.26) !important;
      }
      .form-input {
        background: rgba(0,0,0,0.20) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top-color: rgba(255,255,255,0.22) !important;
        color: #eaf0ff !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.09) inset !important;
      }
      .form-input:focus {
        border-color: rgba(144,174,255,0.50) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.12) inset, 0 0 14px rgba(144,174,255,0.18) !important;
      }
      .form-input::placeholder { color: rgba(200,215,255,0.30) !important; }
      .log-btn {
        background: rgba(0,0,0,0.28) !important;
        border: 1px solid rgba(144,174,255,0.40) !important;
        border-top-color: rgba(255,255,255,0.28) !important;
        border-left-color: rgba(255,255,255,0.16) !important;
        backdrop-filter: blur(18px) !important;
        -webkit-backdrop-filter: blur(18px) !important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.18) inset,
          1px 0 0 rgba(255,255,255,0.08) inset,
          0 4px 16px rgba(0,0,0,0.45) !important;
        filter: none !important; color: #eaf0ff !important;
      }
      .log-btn:hover {
        background: rgba(144,174,255,0.14) !important;
        border-color: rgba(144,174,255,0.55) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.22) inset, 0 6px 20px rgba(0,0,0,0.50) !important;
      }
      .tooltip {
        background: rgba(0,0,0,0.72) !important;
        backdrop-filter: blur(24px) !important;
        -webkit-backdrop-filter: blur(24px) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top-color: rgba(255,255,255,0.20) !important;
        border-left-color: rgba(255,255,255,0.12) !important;
      }
      .metric-toggle {
        background: rgba(0,0,0,0.22) !important;
        border: 1px solid rgba(255,255,255,0.09) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
      }
      .metric-option.active { background: rgba(255,255,255,0.10) !important; color: #d0e0ff !important; }
      .goals-section {
        background: rgba(0,0,0,0.22) !important;
        backdrop-filter: blur(22px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(22px) saturate(160%) !important;
        border: 1px solid rgba(255,255,255,0.09) !important;
        border-top-color: rgba(255,255,255,0.24) !important;
        border-left-color: rgba(255,255,255,0.11) !important;
        box-shadow: 0 1px 0 rgba(255,255,255,0.12) inset, 0 8px 24px rgba(0,0,0,0.40) !important;
      }
      h1 { color: #d0e4ff; text-shadow: 0 1px 8px rgba(0,0,0,0.8); }
      .modal { background: rgba(0,0,0,0.55) !important; backdrop-filter: blur(6px) !important; }
    `,
  },

};

/* ═══════════════════════════════════════════
   CORE API
═══════════════════════════════════════════ */

window.applyTheme = function(name, save=true) {
  const theme = window.THEMES[name] || window.THEMES['default'];
  document.body.className = name === 'default' ? '' : `theme-${name}`;

  let css = ':root{\n';
  for (const [p,v] of Object.entries(theme.vars)) css += `  ${p}:${v};\n`;
  css += '}\n';
  if (theme.extra) css += theme.extra;

  let el = document.getElementById('applied-theme');
  if (!el) { el = document.createElement('style'); el.id='applied-theme'; document.head.appendChild(el); }
  el.textContent = css;

  if (save) { localStorage.setItem('reading_heatmap_theme', name); window.renderThemeSelector(); }
};

/* ═══════════════════════════════════════════
   SELECTOR
═══════════════════════════════════════════ */

window.renderThemeSelector = function() {
  const grid = document.getElementById('themeSelectorGrid');
  if (!grid) return;

  const current = localStorage.getItem('reading_heatmap_theme') || 'default';

  const modalContent = grid.closest('.modal-content');
  if (modalContent) {
    modalContent.style.maxHeight = '90vh';
    modalContent.style.overflowY = 'auto';
    modalContent.style.scrollbarWidth = 'thin';
    modalContent.style.scrollbarColor = 'var(--border-color) transparent';
  }

  if (!document.getElementById('theme-scrollbar-style')) {
    const s = document.createElement('style');
    s.id = 'theme-scrollbar-style';
    s.textContent = `
      .modal-content::-webkit-scrollbar{width:5px;}
      .modal-content::-webkit-scrollbar-track{background:transparent;}
      .modal-content::-webkit-scrollbar-thumb{background:var(--border-color);border-radius:3px;}
      .modal-content::-webkit-scrollbar-thumb:hover{background:var(--text-secondary);}
    `;
    document.head.appendChild(s);
  }

  const groups = [
    { label: 'Classic',          keys: ['default','nord','dracula','monokai'] },
    { label: 'Community',        keys: ['gruvbox','gruvbox-light','catppuccin','catppuccin-latte','rosepine','kanagawa','solarized'] },
    { label: '> Terminal / TUI', keys: ['tui','tui-amber'] },
    { label: '🫧 Liquid Glass',  keys: ['aurora','midnight','sunset','crystal'] },
  ];

  grid.innerHTML = '';

  groups.forEach(group => {
    const h = document.createElement('div');
    h.style.cssText = `
      grid-column:1/-1;font-size:10px;font-weight:700;letter-spacing:.1em;
      text-transform:uppercase;color:var(--text-secondary);opacity:.75;
      padding:10px 0 4px;border-bottom:1px solid var(--border-color);margin-top:8px;
    `;
    h.textContent = group.label;
    grid.appendChild(h);

    group.keys.forEach(key => {
      const t = window.THEMES[key]; if (!t) return;
      const p = t.preview || {};
      const active = key === current;

      const el = document.createElement('div');
      el.style.cssText = `
        padding:14px 8px;border-radius:8px;cursor:pointer;
        border:2px solid ${active ? 'var(--accent-color)' : (p.border||'rgba(255,255,255,0.07)')};
        background:${p.bg||'#111'};color:${p.color||'#fff'};
        text-align:center;font-size:11px;font-weight:600;letter-spacing:.02em;
        transition:transform .15s,border-color .15s,box-shadow .15s;
        box-shadow:${active?'0 0 0 3px rgba(255,255,255,.08)':'0 2px 6px rgba(0,0,0,.4)'};
        min-height:52px;display:flex;align-items:center;justify-content:center;
        user-select:none;line-height:1.35;
      `;
      el.textContent = t.label;
      el.onclick = () => window.applyTheme(key);
      el.onmouseenter = () => { el.style.transform='scale(1.06)'; el.style.boxShadow='0 6px 18px rgba(0,0,0,.5)'; };
      el.onmouseleave = () => { el.style.transform='scale(1)'; el.style.boxShadow=active?'0 0 0 3px rgba(255,255,255,.08)':'0 2px 6px rgba(0,0,0,.4)'; };
      grid.appendChild(el);
    });
  });
};

/* ═══════════════════════════════════════════
   AUTO-INIT
═══════════════════════════════════════════ */
(function(){
  const saved = localStorage.getItem('reading_heatmap_theme') || 'default';
  window.applyTheme(saved, false);
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', window.renderThemeSelector);
  else window.renderThemeSelector();
})();