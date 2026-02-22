/**
 * themes.js — Reading Heatmap Theme System v2
 *
 * HOW TO USE (same as before):
 *  - Drop next to index.html
 *  - <script src="themes.js"></script> before </body>
 *  - setTheme / loadTheme thin wrappers stay in index.html
 *  - <div id="themeSelectorGrid" class="theme-selector"></div> in menu
 */

window.THEMES = {

  /* ═══════════════════════════════════════════
     CLASSIC FLAT
  ═══════════════════════════════════════════ */

  default: {
    label: 'GitHub Dark',
    preview: { bg: 'linear-gradient(135deg,#0d1117 0%,#161b22 100%)', color: '#c9d1d9' },
    vars: {
      '--bg-primary':    '#0d1117',
      '--bg-secondary':  '#161b22',
      '--bg-tertiary':   '#21262d',
      '--border-color':  '#30363d',
      '--text-primary':  '#c9d1d9',
      '--text-secondary':'#8b949e',
      '--accent-color':  '#238636',
      '--accent-hover':  '#2ea043',
      '--danger-color':  '#da3633',
      '--danger-hover':  '#f85149',
      '--level-0': '#161b22',
      '--level-1': '#0e4429',
      '--level-2': '#006d32',
      '--level-3': '#26a641',
      '--level-4': '#39d353',
    },
  },

  nord: {
    label: 'Nord',
    preview: { bg: 'linear-gradient(135deg,#2e3440 0%,#3b4252 100%)', color: '#88c0d0' },
    vars: {
      '--bg-primary':    '#2e3440',
      '--bg-secondary':  '#3b4252',
      '--bg-tertiary':   '#434c5e',
      '--border-color':  '#4c566a',
      '--text-primary':  '#eceff4',
      '--text-secondary':'#d8dee9',
      '--accent-color':  '#88c0d0',
      '--accent-hover':  '#8fbcbb',
      '--danger-color':  '#bf616a',
      '--danger-hover':  '#d08770',
      '--level-0': '#3b4252',
      '--level-1': '#4d6780',
      '--level-2': '#5e81ac',
      '--level-3': '#7a99c4',
      '--level-4': '#96b1dc',
    },
  },

  dracula: {
    label: 'Dracula',
    preview: { bg: 'linear-gradient(135deg,#282a36 0%,#44475a 100%)', color: '#bd93f9' },
    vars: {
      '--bg-primary':    '#282a36',
      '--bg-secondary':  '#21222c',
      '--bg-tertiary':   '#343746',
      '--border-color':  '#44475a',
      '--text-primary':  '#f8f8f2',
      '--text-secondary':'#6272a4',
      '--accent-color':  '#50fa7b',
      '--accent-hover':  '#69ff94',
      '--danger-color':  '#ff5555',
      '--danger-hover':  '#ff6e6e',
      '--level-0': '#44475a',
      '--level-1': '#1a4a2e',
      '--level-2': '#1f6b3f',
      '--level-3': '#50fa7b',
      '--level-4': '#69ff94',
    },
    extra: `.month-label,.day-label{color:#bd93f9;}`,
  },

  monokai: {
    label: 'Monokai',
    preview: { bg: 'linear-gradient(135deg,#272822 0%,#49483e 100%)', color: '#a6e22e' },
    vars: {
      '--bg-primary':    '#272822',
      '--bg-secondary':  '#3e3d32',
      '--bg-tertiary':   '#49483e',
      '--border-color':  '#75715e',
      '--text-primary':  '#f8f8f2',
      '--text-secondary':'#75715e',
      '--accent-color':  '#a6e22e',
      '--accent-hover':  '#e6db74',
      '--danger-color':  '#f92672',
      '--danger-hover':  '#fd971f',
      '--level-0': '#3e3d32',
      '--level-1': '#3d5a1a',
      '--level-2': '#5a8024',
      '--level-3': '#a6e22e',
      '--level-4': '#c8f55a',
    },
    extra: `h1{color:#e6db74;}`,
  },

  /* ═══════════════════════════════════════════
     POPULAR / NAMED COMMUNITY THEMES
  ═══════════════════════════════════════════ */

  gruvbox: {
    label: 'Gruvbox Dark',
    preview: { bg: 'linear-gradient(135deg,#282828 0%,#32302f 100%)', color: '#ebdbb2' },
    vars: {
      '--bg-primary':    '#282828',
      '--bg-secondary':  '#32302f',
      '--bg-tertiary':   '#3c3836',
      '--border-color':  '#504945',
      '--text-primary':  '#ebdbb2',
      '--text-secondary':'#a89984',
      '--accent-color':  '#b8bb26',
      '--accent-hover':  '#98971a',
      '--danger-color':  '#fb4934',
      '--danger-hover':  '#fe8019',
      '--level-0': '#32302f',
      '--level-1': '#3c5a1e',
      '--level-2': '#5a7a28',
      '--level-3': '#b8bb26',
      '--level-4': '#d5c4a1',
    },
    extra: `h1{color:#ebdbb2;}`,
  },

  'gruvbox-light': {
    label: 'Gruvbox Light',
    preview: { bg: 'linear-gradient(135deg,#fbf1c7 0%,#f2e5bc 100%)', color: '#3c3836' },
    vars: {
      '--bg-primary':    '#fbf1c7',
      '--bg-secondary':  '#f2e5bc',
      '--bg-tertiary':   '#ebdbb2',
      '--border-color':  '#d5c4a1',
      '--text-primary':  '#3c3836',
      '--text-secondary':'#7c6f64',
      '--accent-color':  '#79740e',
      '--accent-hover':  '#98971a',
      '--danger-color':  '#9d0006',
      '--danger-hover':  '#cc241d',
      '--level-0': '#f2e5bc',
      '--level-1': '#d5c4a1',
      '--level-2': '#bdae93',
      '--level-3': '#79740e',
      '--level-4': '#427b58',
    },
    extra: `
      h1{color:#3c3836;}
      .heatmap-panel,.leaderboard-panel,.modal-content{box-shadow:0 2px 8px rgba(0,0,0,.12);}
    `,
  },

  catppuccin: {
    label: 'Catppuccin Mocha',
    preview: { bg: 'linear-gradient(135deg,#1e1e2e 0%,#181825 100%)', color: '#cba6f7' },
    vars: {
      '--bg-primary':    '#1e1e2e',
      '--bg-secondary':  '#181825',
      '--bg-tertiary':   '#313244',
      '--border-color':  '#45475a',
      '--text-primary':  '#cdd6f4',
      '--text-secondary':'#6c7086',
      '--accent-color':  '#a6e3a1',
      '--accent-hover':  '#94e2d5',
      '--danger-color':  '#f38ba8',
      '--danger-hover':  '#fab387',
      '--level-0': '#181825',
      '--level-1': '#2a4a2e',
      '--level-2': '#3d7a45',
      '--level-3': '#a6e3a1',
      '--level-4': '#cba6f7',
    },
    extra: `h1{color:#cdd6f4;}`,
  },

  'catppuccin-latte': {
    label: 'Catppuccin Latte',
    preview: { bg: 'linear-gradient(135deg,#eff1f5 0%,#e6e9ef 100%)', color: '#8839ef' },
    vars: {
      '--bg-primary':    '#eff1f5',
      '--bg-secondary':  '#e6e9ef',
      '--bg-tertiary':   '#dce0e8',
      '--border-color':  '#ccd0da',
      '--text-primary':  '#4c4f69',
      '--text-secondary':'#9ca0b0',
      '--accent-color':  '#40a02b',
      '--accent-hover':  '#179299',
      '--danger-color':  '#d20f39',
      '--danger-hover':  '#e64553',
      '--level-0': '#e6e9ef',
      '--level-1': '#c0ddb5',
      '--level-2': '#8dcc78',
      '--level-3': '#40a02b',
      '--level-4': '#179299',
    },
    extra: `
      h1{color:#4c4f69;}
      .heatmap-panel,.leaderboard-panel,.modal-content{box-shadow:0 2px 8px rgba(0,0,0,.08);}
    `,
  },

  rosepine: {
    label: 'Rosé Pine',
    preview: { bg: 'linear-gradient(135deg,#191724 0%,#26233a 100%)', color: '#ebbcba' },
    vars: {
      '--bg-primary':    '#191724',
      '--bg-secondary':  '#1f1d2e',
      '--bg-tertiary':   '#26233a',
      '--border-color':  '#403d52',
      '--text-primary':  '#e0def4',
      '--text-secondary':'#6e6a86',
      '--accent-color':  '#31748f',
      '--accent-hover':  '#9ccfd8',
      '--danger-color':  '#eb6f92',
      '--danger-hover':  '#f6c177',
      '--level-0': '#1f1d2e',
      '--level-1': '#1c4a5e',
      '--level-2': '#256880',
      '--level-3': '#31748f',
      '--level-4': '#9ccfd8',
    },
    extra: `h1{color:#e0def4;}`,
  },

  'rosepine-dawn': {
    label: 'Rosé Pine Dawn',
    preview: { bg: 'linear-gradient(135deg,#faf4ed 0%,#f2e9e1 100%)', color: '#907aa9' },
    vars: {
      '--bg-primary':    '#faf4ed',
      '--bg-secondary':  '#fffaf3',
      '--bg-tertiary':   '#f2e9e1',
      '--border-color':  '#dfdad9',
      '--text-primary':  '#575279',
      '--text-secondary':'#9893a5',
      '--accent-color':  '#286983',
      '--accent-hover':  '#56949f',
      '--danger-color':  '#b4637a',
      '--danger-hover':  '#ea9d34',
      '--level-0': '#f2e9e1',
      '--level-1': '#b8d8e0',
      '--level-2': '#7bbfcc',
      '--level-3': '#286983',
      '--level-4': '#56949f',
    },
    extra: `
      h1{color:#575279;}
      .heatmap-panel,.leaderboard-panel,.modal-content{box-shadow:0 2px 8px rgba(0,0,0,.09);}
    `,
  },

  kanagawa: {
    label: 'Kanagawa',
    preview: { bg: 'linear-gradient(135deg,#1f1f28 0%,#16161d 100%)', color: '#7e9cd8' },
    vars: {
      '--bg-primary':    '#1f1f28',
      '--bg-secondary':  '#16161d',
      '--bg-tertiary':   '#2a2a37',
      '--border-color':  '#363646',
      '--text-primary':  '#dcd7ba',
      '--text-secondary':'#727169',
      '--accent-color':  '#76946a',
      '--accent-hover':  '#98bb6c',
      '--danger-color':  '#c34043',
      '--danger-hover':  '#e82424',
      '--level-0': '#16161d',
      '--level-1': '#2d4a2a',
      '--level-2': '#4a6e42',
      '--level-3': '#76946a',
      '--level-4': '#98bb6c',
    },
    extra: `h1{color:#dcd7ba;}`,
  },

  solarized: {
    label: 'Solarized Dark',
    preview: { bg: 'linear-gradient(135deg,#002b36 0%,#073642 100%)', color: '#2aa198' },
    vars: {
      '--bg-primary':    '#002b36',
      '--bg-secondary':  '#073642',
      '--bg-tertiary':   '#0d3d4a',
      '--border-color':  '#1a5261',
      '--text-primary':  '#839496',
      '--text-secondary':'#586e75',
      '--accent-color':  '#2aa198',
      '--accent-hover':  '#859900',
      '--danger-color':  '#dc322f',
      '--danger-hover':  '#cb4b16',
      '--level-0': '#073642',
      '--level-1': '#1a5261',
      '--level-2': '#257a6f',
      '--level-3': '#2aa198',
      '--level-4': '#859900',
    },
    extra: `h1{color:#93a1a1;}`,
  },

  /* ═══════════════════════════════════════════
     TUI — TERMINAL USER INTERFACE
  ═══════════════════════════════════════════ */

  tui: {
    label: '> TUI [green]',
    preview: { bg: '#0a0a0a', color: '#00ff41', border: '2px solid #00ff41' },
    vars: {
      '--bg-primary':    '#0a0a0a',
      '--bg-secondary':  '#0d0d0d',
      '--bg-tertiary':   '#111111',
      '--border-color':  '#00aa2b',
      '--text-primary':  '#00ff41',
      '--text-secondary':'#008f11',
      '--accent-color':  '#00ff41',
      '--accent-hover':  '#39ff6e',
      '--danger-color':  '#ff0000',
      '--danger-hover':  '#ff4444',
      '--level-0': '#0d0d0d',
      '--level-1': '#003b0f',
      '--level-2': '#006b1c',
      '--level-3': '#00aa2b',
      '--level-4': '#00ff41',
    },
    extra: `
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

      html,body{ background:#0a0a0a !important; }

      /* Scanlines */
      body::before{
        content:'';position:fixed;inset:0;
        background:repeating-linear-gradient(
          0deg,transparent,transparent 2px,
          rgba(0,0,0,0.18) 2px,rgba(0,0,0,0.18) 4px
        );
        pointer-events:none;z-index:9999;
      }
      /* Phosphor glow */
      body::after{
        content:'';position:fixed;inset:0;
        background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(0,255,65,0.04) 0%,transparent 70%);
        pointer-events:none;z-index:0;
        animation:tuiPulse 4s ease-in-out infinite alternate;
      }
      @keyframes tuiPulse{0%{opacity:.7;}100%{opacity:1;}}

      body,h1,h2,h3,button,input,select,textarea,
      .btn,.log-btn,.form-input,.stat-value,.leaderboard-value{
        font-family:'Share Tech Mono','Courier New',monospace !important;
        text-shadow:0 0 6px rgba(0,255,65,0.65);
      }

      h1{color:#00ff41;letter-spacing:.15em;text-transform:uppercase;}
      h1::before{content:'> ';color:#008f11;}
      h1::after{content:'█';animation:blink 1s step-end infinite;font-size:.8em;margin-left:4px;}
      @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}

      /* No border-radius anywhere */
      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content,
      .entry-item,.leaderboard-entry,.btn,.form-input,
      .quick-book-btn,.toggle-section-btn,.day,.user-profile,
      .metric-toggle,.metric-option{border-radius:0 !important;}

      .heatmap-panel,.leaderboard-panel,.goals-section{
        border:1px solid #00aa2b !important;
        box-shadow:0 0 14px rgba(0,255,65,0.14),inset 0 0 8px rgba(0,0,0,0.85) !important;
        background:#0a0a0a !important;
      }
      .modal-content{
        border:1px solid #00ff41 !important;
        box-shadow:0 0 28px rgba(0,255,65,0.28) !important;
        background:#0a0a0a !important;
      }
      .btn,.toggle-section-btn,.quick-book-btn{
        background:#0a0a0a !important;border:1px solid #00aa2b !important;
        color:#00ff41 !important;box-shadow:none !important;
      }
      .btn:hover,.toggle-section-btn:hover,.quick-book-btn:hover{
        background:rgba(0,255,65,0.09) !important;
        border-color:#00ff41 !important;
        box-shadow:0 0 10px rgba(0,255,65,0.22) !important;
        transform:none !important;
      }
      .log-btn{
        background:rgba(0,255,65,0.09) !important;
        border:1px solid #00ff41 !important;
        color:#00ff41 !important;
        filter:none !important;
        box-shadow:0 0 12px rgba(0,255,65,0.28) !important;
      }
      .log-btn:hover{
        background:rgba(0,255,65,0.18) !important;
        box-shadow:0 0 22px rgba(0,255,65,0.48) !important;
        transform:none !important;
      }
      .form-input{
        background:#0d0d0d !important;
        border:1px solid #00aa2b !important;
        color:#00ff41 !important;
        box-shadow:none !important;
      }
      .form-input:focus{border-color:#00ff41 !important;box-shadow:0 0 8px rgba(0,255,65,0.28) !important;}
      .entry-item,.leaderboard-entry{
        background:#0d0d0d !important;
        border:1px solid #00aa2b !important;
        box-shadow:none !important;
      }
      .metric-toggle{background:#0a0a0a !important;border:1px solid #00aa2b !important;}
      .metric-option.active{background:rgba(0,255,65,0.12) !important;color:#00ff41 !important;}
      .day:hover{outline-color:#00ff41 !important;box-shadow:0 0 6px rgba(0,255,65,0.6) !important;}
      .day.today{outline-color:#ffff00 !important;}
      .user-profile{border:1px solid #00aa2b;}
      .container{position:relative;z-index:1;}
    `,
  },

  'tui-amber': {
    label: '> TUI [amber]',
    preview: { bg: '#0b0800', color: '#ffb000', border: '2px solid #ffb000' },
    vars: {
      '--bg-primary':    '#0b0800',
      '--bg-secondary':  '#0e0c00',
      '--bg-tertiary':   '#141100',
      '--border-color':  '#b07800',
      '--text-primary':  '#ffb000',
      '--text-secondary':'#8a6000',
      '--accent-color':  '#ffb000',
      '--accent-hover':  '#ffd050',
      '--danger-color':  '#ff4400',
      '--danger-hover':  '#ff6622',
      '--level-0': '#0e0c00',
      '--level-1': '#3d2c00',
      '--level-2': '#7a5800',
      '--level-3': '#b07800',
      '--level-4': '#ffb000',
    },
    extra: `
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

      html,body{background:#0b0800 !important;}
      body::before{
        content:'';position:fixed;inset:0;
        background:repeating-linear-gradient(
          0deg,transparent,transparent 2px,
          rgba(0,0,0,0.22) 2px,rgba(0,0,0,0.22) 4px
        );
        pointer-events:none;z-index:9999;
      }
      body::after{
        content:'';position:fixed;inset:0;
        background:radial-gradient(ellipse 70% 55% at 50% 50%,rgba(255,176,0,0.04) 0%,transparent 70%);
        pointer-events:none;z-index:0;
        animation:amberPulse 5s ease-in-out infinite alternate;
      }
      @keyframes amberPulse{0%{opacity:.6;}100%{opacity:1;}}

      body,h1,h2,h3,button,input,select,textarea,
      .btn,.log-btn,.form-input,.stat-value,.leaderboard-value{
        font-family:'Share Tech Mono','Courier New',monospace !important;
        text-shadow:0 0 6px rgba(255,176,0,0.55);
      }

      h1{color:#ffb000;letter-spacing:.15em;text-transform:uppercase;}
      h1::before{content:'> ';color:#8a6000;}
      h1::after{content:'█';animation:blink 1s step-end infinite;font-size:.8em;margin-left:4px;}
      @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}

      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content,
      .entry-item,.leaderboard-entry,.btn,.form-input,
      .quick-book-btn,.toggle-section-btn,.day,.user-profile,
      .metric-toggle,.metric-option{border-radius:0 !important;}

      .heatmap-panel,.leaderboard-panel,.goals-section{
        border:1px solid #b07800 !important;
        box-shadow:0 0 14px rgba(255,176,0,0.12),inset 0 0 8px rgba(0,0,0,0.85) !important;
        background:#0b0800 !important;
      }
      .modal-content{
        border:1px solid #ffb000 !important;
        box-shadow:0 0 28px rgba(255,176,0,0.24) !important;
        background:#0b0800 !important;
      }
      .btn,.toggle-section-btn,.quick-book-btn{
        background:#0b0800 !important;border:1px solid #b07800 !important;
        color:#ffb000 !important;box-shadow:none !important;
      }
      .btn:hover,.toggle-section-btn:hover,.quick-book-btn:hover{
        background:rgba(255,176,0,0.09) !important;
        border-color:#ffb000 !important;transform:none !important;
      }
      .log-btn{
        background:rgba(255,176,0,0.09) !important;
        border:1px solid #ffb000 !important;
        color:#ffb000 !important;filter:none !important;
      }
      .log-btn:hover{background:rgba(255,176,0,0.18) !important;transform:none !important;}
      .form-input{
        background:#0e0c00 !important;border:1px solid #b07800 !important;
        color:#ffb000 !important;box-shadow:none !important;
      }
      .entry-item,.leaderboard-entry{background:#0e0c00 !important;border:1px solid #b07800 !important;box-shadow:none !important;}
      .metric-toggle{background:#0b0800 !important;border:1px solid #b07800 !important;}
      .metric-option.active{background:rgba(255,176,0,0.12) !important;}
      .day.today{outline-color:#ffffff !important;}
      .user-profile{border-radius:0 !important;border:1px solid #b07800;}
      .container{position:relative;z-index:1;}
    `,
  },

  /* ═══════════════════════════════════════════
     FROSTED GLASS (deep transparency)
  ═══════════════════════════════════════════ */

  aurora: {
    label: '✦ Aurora',
    preview: { bg: 'linear-gradient(135deg,#060e1a 0%,#0a1a28 40%,#1a0a2e 100%)', color: '#7fffd4' },
    vars: {
      '--bg-primary':    'rgba(6,14,26,0.28)',
      '--bg-secondary':  'rgba(4,12,20,0.24)',
      '--bg-tertiary':   'rgba(10,22,36,0.34)',
      '--border-color':  'rgba(0,220,150,0.22)',
      '--text-primary':  '#ddfff6',
      '--text-secondary':'#4d9e82',
      '--accent-color':  '#00e5a0',
      '--accent-hover':  '#00ffb3',
      '--danger-color':  '#ff6b9d',
      '--danger-hover':  '#ff8fb5',
      '--level-0': 'rgba(4,12,20,0.40)',
      '--level-1': 'rgba(0,70,55,0.55)',
      '--level-2': 'rgba(0,130,95,0.62)',
      '--level-3': '#00e5a0',
      '--level-4': '#7fffd4',
    },
    extra: `
      html,body{
        background:linear-gradient(135deg,#050c18 0%,#091822 30%,#0b2030 55%,#170826 80%,#050c18 100%) !important;
        background-attachment:fixed !important;
      }
      body::before{
        content:'';position:fixed;inset:0;
        background:
          radial-gradient(ellipse 80% 55% at 15% 12%,rgba(0,220,150,0.16) 0%,transparent 60%),
          radial-gradient(ellipse 60% 50% at 85% 82%,rgba(80,40,200,0.13) 0%,transparent 60%),
          radial-gradient(ellipse 50% 65% at 50% 48%,rgba(0,140,200,0.08) 0%,transparent 68%);
        pointer-events:none;z-index:0;
        animation:auroraShift 14s ease-in-out infinite alternate;
      }
      @keyframes auroraShift{0%{opacity:.75;}50%{opacity:.45;}100%{opacity:.85;}}
      .container{position:relative;z-index:1;}

      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content{
        background:rgba(4,12,22,0.24) !important;
        backdrop-filter:blur(40px) saturate(190%) brightness(1.12) !important;
        -webkit-backdrop-filter:blur(40px) saturate(190%) brightness(1.12) !important;
        border:1px solid rgba(0,220,150,0.24) !important;
        box-shadow:0 8px 40px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.09),inset 0 -1px 0 rgba(0,220,150,0.06) !important;
      }
      .entry-item,.leaderboard-entry{
        background:rgba(4,14,24,0.28) !important;
        border:1px solid rgba(0,220,150,0.15) !important;
        backdrop-filter:blur(16px) !important;-webkit-backdrop-filter:blur(16px) !important;
      }
      .btn,.toggle-section-btn,.quick-book-btn{
        background:rgba(4,14,24,0.24) !important;
        border:1px solid rgba(0,220,150,0.20) !important;
        backdrop-filter:blur(12px) !important;-webkit-backdrop-filter:blur(12px) !important;
      }
      .btn:hover,.toggle-section-btn:hover{
        background:rgba(0,200,140,0.16) !important;
        border-color:rgba(0,220,150,0.50) !important;
        box-shadow:0 0 18px rgba(0,220,150,0.22) !important;
      }
      .log-btn{filter:drop-shadow(0 4px 16px rgba(0,229,160,0.55)) !important;}
      .form-input{
        background:rgba(4,12,20,0.36) !important;
        border:1px solid rgba(0,220,150,0.20) !important;
        backdrop-filter:blur(10px) !important;-webkit-backdrop-filter:blur(10px) !important;
      }
      .tooltip{
        background:rgba(3,10,18,0.68) !important;
        backdrop-filter:blur(24px) !important;-webkit-backdrop-filter:blur(24px) !important;
        border:1px solid rgba(0,220,150,0.24) !important;
      }
      h1{color:#7fffd4;}
      .modal{background:rgba(0,0,0,0.60) !important;}
    `,
  },

  midnight: {
    label: '✦ Midnight',
    preview: { bg: 'linear-gradient(135deg,#020408 0%,#060b1c 100%)', color: '#7aa2f7' },
    vars: {
      '--bg-primary':    'rgba(3,6,20,0.28)',
      '--bg-secondary':  'rgba(2,4,14,0.24)',
      '--bg-tertiary':   'rgba(6,12,30,0.34)',
      '--border-color':  'rgba(90,140,255,0.22)',
      '--text-primary':  '#c4d4ff',
      '--text-secondary':'#3e5890',
      '--accent-color':  '#5b8cff',
      '--accent-hover':  '#85aaff',
      '--danger-color':  '#ff5c7a',
      '--danger-hover':  '#ff7f98',
      '--level-0': 'rgba(2,4,14,0.42)',
      '--level-1': 'rgba(18,42,120,0.58)',
      '--level-2': 'rgba(32,66,185,0.64)',
      '--level-3': '#5b8cff',
      '--level-4': '#a0c0ff',
    },
    extra: `
      html,body{
        background:linear-gradient(165deg,#010308 0%,#04091a 35%,#060c22 65%,#010308 100%) !important;
        background-attachment:fixed !important;
      }
      body::before{
        content:'';position:fixed;inset:0;
        background:
          radial-gradient(ellipse 90% 60% at 50% 0%,  rgba(55,95,255,0.11) 0%,transparent 60%),
          radial-gradient(ellipse 40% 48% at 88% 92%, rgba(80,60,220,0.09) 0%,transparent 55%),
          radial-gradient(ellipse 30% 32% at 8%  68%, rgba(100,150,255,0.07) 0%,transparent 55%);
        pointer-events:none;z-index:0;
      }
      .container{position:relative;z-index:1;}

      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content{
        background:rgba(3,6,20,0.24) !important;
        backdrop-filter:blur(44px) saturate(165%) brightness(1.06) !important;
        -webkit-backdrop-filter:blur(44px) saturate(165%) brightness(1.06) !important;
        border:1px solid rgba(90,140,255,0.22) !important;
        box-shadow:0 8px 40px rgba(0,0,0,0.65),inset 0 1px 0 rgba(140,180,255,0.08) !important;
      }
      .entry-item,.leaderboard-entry{
        background:rgba(4,8,26,0.28) !important;
        border:1px solid rgba(90,140,255,0.14) !important;
        backdrop-filter:blur(18px) !important;-webkit-backdrop-filter:blur(18px) !important;
      }
      .btn,.toggle-section-btn,.quick-book-btn{
        background:rgba(4,8,26,0.24) !important;
        border:1px solid rgba(90,140,255,0.20) !important;
        backdrop-filter:blur(12px) !important;-webkit-backdrop-filter:blur(12px) !important;
      }
      .btn:hover,.toggle-section-btn:hover{
        background:rgba(55,95,255,0.16) !important;
        border-color:rgba(90,140,255,0.50) !important;
        box-shadow:0 0 18px rgba(55,95,255,0.22) !important;
      }
      .log-btn{filter:drop-shadow(0 4px 16px rgba(91,140,255,0.55)) !important;}
      .form-input{
        background:rgba(2,4,16,0.36) !important;
        border:1px solid rgba(90,140,255,0.20) !important;
        backdrop-filter:blur(10px) !important;-webkit-backdrop-filter:blur(10px) !important;
      }
      .tooltip{
        background:rgba(2,4,14,0.70) !important;
        backdrop-filter:blur(24px) !important;-webkit-backdrop-filter:blur(24px) !important;
        border:1px solid rgba(90,140,255,0.24) !important;
      }
      h1{color:#7aa2f7;}
      .modal{background:rgba(0,0,0,0.65) !important;}
    `,
  },

  sunset: {
    label: '✦ Sunset',
    preview: { bg: 'linear-gradient(135deg,#120300 0%,#1e0812 100%)', color: '#ff9f43' },
    vars: {
      '--bg-primary':    'rgba(16,4,0,0.28)',
      '--bg-secondary':  'rgba(12,3,0,0.24)',
      '--bg-tertiary':   'rgba(24,7,3,0.34)',
      '--border-color':  'rgba(255,125,38,0.22)',
      '--text-primary':  '#ffe8c8',
      '--text-secondary':'#8a4a20',
      '--accent-color':  '#ff8c32',
      '--accent-hover':  '#ffaa5a',
      '--danger-color':  '#ff3a5a',
      '--danger-hover':  '#ff5a78',
      '--level-0': 'rgba(12,3,0,0.42)',
      '--level-1': 'rgba(130,42,6,0.58)',
      '--level-2': 'rgba(200,70,10,0.64)',
      '--level-3': '#ff8c32',
      '--level-4': '#ffcc80',
    },
    extra: `
      html,body{
        background:linear-gradient(155deg,#0d0200 0%,#1a0606 30%,#200a18 60%,#0d0200 100%) !important;
        background-attachment:fixed !important;
      }
      body::before{
        content:'';position:fixed;inset:0;
        background:
          radial-gradient(ellipse 80% 55% at 22% 14%,rgba(255,105,18,0.16) 0%,transparent 60%),
          radial-gradient(ellipse 62% 46% at 82% 86%,rgba(180,28,75,0.13) 0%,transparent 55%),
          radial-gradient(ellipse 42% 36% at 58% 42%,rgba(255,55,0,0.08) 0%,transparent 50%);
        pointer-events:none;z-index:0;
      }
      .container{position:relative;z-index:1;}

      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content{
        background:rgba(14,4,0,0.24) !important;
        backdrop-filter:blur(38px) saturate(175%) !important;
        -webkit-backdrop-filter:blur(38px) saturate(175%) !important;
        border:1px solid rgba(255,125,38,0.24) !important;
        box-shadow:0 8px 40px rgba(0,0,0,0.58),inset 0 1px 0 rgba(255,200,100,0.08) !important;
      }
      .entry-item,.leaderboard-entry{
        background:rgba(16,4,0,0.28) !important;
        border:1px solid rgba(255,125,38,0.16) !important;
        backdrop-filter:blur(16px) !important;-webkit-backdrop-filter:blur(16px) !important;
      }
      .btn,.toggle-section-btn,.quick-book-btn{
        background:rgba(16,4,0,0.24) !important;
        border:1px solid rgba(255,125,38,0.20) !important;
        backdrop-filter:blur(12px) !important;-webkit-backdrop-filter:blur(12px) !important;
      }
      .btn:hover,.toggle-section-btn:hover{
        background:rgba(255,95,28,0.16) !important;
        border-color:rgba(255,125,38,0.50) !important;
        box-shadow:0 0 18px rgba(255,95,28,0.24) !important;
      }
      .log-btn{filter:drop-shadow(0 4px 16px rgba(255,140,50,0.55)) !important;}
      .form-input{
        background:rgba(12,3,0,0.36) !important;
        border:1px solid rgba(255,125,38,0.20) !important;
        backdrop-filter:blur(10px) !important;-webkit-backdrop-filter:blur(10px) !important;
      }
      .tooltip{
        background:rgba(12,3,0,0.70) !important;
        backdrop-filter:blur(24px) !important;-webkit-backdrop-filter:blur(24px) !important;
        border:1px solid rgba(255,125,38,0.24) !important;
      }
      h1{color:#ff9f43;}
      .modal{background:rgba(0,0,0,0.62) !important;}
    `,
  },

  ocean: {
    label: '✦ Ocean',
    preview: { bg: 'linear-gradient(135deg,#010508 0%,#030c18 100%)', color: '#4fc3f7' },
    vars: {
      '--bg-primary':    'rgba(1,5,12,0.28)',
      '--bg-secondary':  'rgba(1,4,10,0.24)',
      '--bg-tertiary':   'rgba(3,10,22,0.34)',
      '--border-color':  'rgba(38,175,210,0.22)',
      '--text-primary':  '#c5eef8',
      '--text-secondary':'#306880',
      '--accent-color':  '#2ec4c4',
      '--accent-hover':  '#60e0e0',
      '--danger-color':  '#ff6b8a',
      '--danger-hover':  '#ff8faa',
      '--level-0': 'rgba(1,4,10,0.42)',
      '--level-1': 'rgba(3,55,75,0.58)',
      '--level-2': 'rgba(5,95,115,0.64)',
      '--level-3': '#2ec4c4',
      '--level-4': '#4fc3f7',
    },
    extra: `
      html,body{
        background:linear-gradient(175deg,#010406 0%,#021018 40%,#031420 70%,#010406 100%) !important;
        background-attachment:fixed !important;
      }
      body::before{
        content:'';position:fixed;inset:0;
        background:
          radial-gradient(ellipse 100% 55% at 50% 110%,rgba(14,135,165,0.14) 0%,transparent 60%),
          radial-gradient(ellipse 55% 42% at 8% 18%,  rgba(18,85,135,0.10) 0%,transparent 55%),
          radial-gradient(ellipse 42% 52% at 92% 62%, rgba(0,175,195,0.08) 0%,transparent 50%);
        pointer-events:none;z-index:0;
      }
      .container{position:relative;z-index:1;}

      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content{
        background:rgba(1,5,12,0.24) !important;
        backdrop-filter:blur(42px) saturate(165%) !important;
        -webkit-backdrop-filter:blur(42px) saturate(165%) !important;
        border:1px solid rgba(38,175,210,0.24) !important;
        box-shadow:0 8px 40px rgba(0,0,0,0.60),inset 0 1px 0 rgba(80,220,230,0.08) !important;
      }
      .entry-item,.leaderboard-entry{
        background:rgba(2,8,18,0.28) !important;
        border:1px solid rgba(38,175,210,0.14) !important;
        backdrop-filter:blur(18px) !important;-webkit-backdrop-filter:blur(18px) !important;
      }
      .btn,.toggle-section-btn,.quick-book-btn{
        background:rgba(2,8,18,0.24) !important;
        border:1px solid rgba(38,175,210,0.20) !important;
        backdrop-filter:blur(12px) !important;-webkit-backdrop-filter:blur(12px) !important;
      }
      .btn:hover,.toggle-section-btn:hover{
        background:rgba(18,145,165,0.16) !important;
        border-color:rgba(38,175,210,0.50) !important;
        box-shadow:0 0 18px rgba(18,145,165,0.24) !important;
      }
      .log-btn{filter:drop-shadow(0 4px 16px rgba(46,196,196,0.55)) !important;}
      .form-input{
        background:rgba(1,4,10,0.36) !important;
        border:1px solid rgba(38,175,210,0.20) !important;
        backdrop-filter:blur(10px) !important;-webkit-backdrop-filter:blur(10px) !important;
      }
      .tooltip{
        background:rgba(1,4,10,0.70) !important;
        backdrop-filter:blur(24px) !important;-webkit-backdrop-filter:blur(24px) !important;
        border:1px solid rgba(38,175,210,0.24) !important;
      }
      h1{color:#4fc3f7;}
      .modal{background:rgba(0,0,0,0.62) !important;}
    `,
  },

};

/* ═══════════════════════════════════════════════════════
   CORE API
═══════════════════════════════════════════════════════ */

window.applyTheme = function applyTheme(name, save = true) {
  const theme = window.THEMES[name] || window.THEMES['default'];
  document.body.className = name === 'default' ? '' : `theme-${name}`;

  let css = ':root {\n';
  for (const [prop, val] of Object.entries(theme.vars)) {
    css += `  ${prop}: ${val};\n`;
  }
  css += '}\n';
  if (theme.extra) css += theme.extra;

  let styleEl = document.getElementById('applied-theme');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'applied-theme';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;

  if (save) {
    localStorage.setItem('reading_heatmap_theme', name);
    window.renderThemeSelector();
  }
};

/* ═══════════════════════════════════════════════════════
   THEME SELECTOR (grouped)
═══════════════════════════════════════════════════════ */

window.renderThemeSelector = function renderThemeSelector() {
  const grid = document.getElementById('themeSelectorGrid');
  if (!grid) return;

  const current = localStorage.getItem('reading_heatmap_theme') || 'default';
  grid.innerHTML = '';

  const groups = [
    { label: 'Classic',        keys: ['default', 'nord', 'dracula', 'monokai'] },
    { label: 'Community',      keys: ['gruvbox', 'gruvbox-light', 'catppuccin', 'catppuccin-latte', 'rosepine', 'rosepine-dawn', 'kanagawa', 'solarized'] },
    { label: '> Terminal / TUI', keys: ['tui', 'tui-amber'] },
    { label: '✦ Frosted Glass', keys: ['aurora', 'midnight', 'sunset', 'ocean'] },
  ];

  groups.forEach(group => {
    const heading = document.createElement('div');
    heading.style.cssText = `
      grid-column:1/-1;
      font-size:11px;font-weight:600;letter-spacing:0.09em;
      text-transform:uppercase;color:var(--text-secondary);
      padding:10px 0 4px;border-bottom:1px solid var(--border-color);
      margin-top:6px;
    `;
    heading.textContent = group.label;
    grid.appendChild(heading);

    group.keys.forEach(key => {
      const theme = window.THEMES[key];
      if (!theme) return;
      const p = theme.preview || {};
      const isActive = key === current;

      const el = document.createElement('div');
      el.style.cssText = `
        padding:16px 10px;
        border-radius:8px;
        cursor:pointer;
        border:2px solid ${isActive ? 'var(--accent-color)' : (p.border || 'rgba(255,255,255,0.06)')};
        background:${p.bg || '#111'};
        color:${p.color || '#fff'};
        text-align:center;
        font-size:12px;font-weight:500;
        transition:transform .16s,border-color .16s,box-shadow .16s;
        box-shadow:${isActive ? '0 0 14px rgba(255,255,255,0.14)' : '0 2px 6px rgba(0,0,0,0.35)'};
        min-height:60px;
        display:flex;align-items:center;justify-content:center;
        user-select:none;
      `;
      el.textContent = theme.label;
      el.onclick = () => window.applyTheme(key);

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.07)';
        el.style.boxShadow = '0 5px 16px rgba(0,0,0,0.5)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        el.style.boxShadow = isActive ? '0 0 14px rgba(255,255,255,0.14)' : '0 2px 6px rgba(0,0,0,0.35)';
      });

      grid.appendChild(el);
    });
  });
};

/* ═══════════════════════════════════════════════════════
   AUTO-INIT
═══════════════════════════════════════════════════════ */

(function init() {
  const saved = localStorage.getItem('reading_heatmap_theme') || 'default';
  window.applyTheme(saved, false);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.renderThemeSelector);
  } else {
    window.renderThemeSelector();
  }
})();