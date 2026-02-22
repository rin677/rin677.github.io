

window.THEMES = {

  /* ── Classic / flat themes (kept from original) ── */

  default: {
    label: 'GitHub Dark',
    preview: { bg: 'linear-gradient(135deg,#0d1117 0%,#161b22 100%)', color: '#c9d1d9' },
    vars: {
      '--bg-primary':   '#0d1117',
      '--bg-secondary': '#161b22',
      '--bg-tertiary':  '#21262d',
      '--border-color': '#30363d',
      '--text-primary': '#c9d1d9',
      '--text-secondary':'#8b949e',
      '--accent-color': '#238636',
      '--accent-hover': '#2ea043',
      '--danger-color': '#da3633',
      '--danger-hover': '#f85149',
      '--level-0': '#161b22',
      '--level-1': '#0e4429',
      '--level-2': '#006d32',
      '--level-3': '#26a641',
      '--level-4': '#39d353',
    },
  },

  nord: {
    label: 'Nord',
    preview: { bg: 'linear-gradient(135deg,#2e3440 0%,#3b4252 100%)', color: '#eceff4' },
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

  tokyo: {
    label: 'Tokyo Night',
    preview: { bg: 'linear-gradient(135deg,#1a1b26 0%,#24283b 100%)', color: '#c0caf5' },
    vars: {
      '--bg-primary':    '#1a1b26',
      '--bg-secondary':  '#16161e',
      '--bg-tertiary':   '#24283b',
      '--border-color':  '#414868',
      '--text-primary':  '#a9b1d6',
      '--text-secondary':'#565f89',
      '--accent-color':  '#7aa2f7',
      '--accent-hover':  '#7dcfff',
      '--danger-color':  '#f7768e',
      '--danger-hover':  '#ff9e64',
      '--level-0': '#24283b',
      '--level-1': '#3d5a8f',
      '--level-2': '#5678c4',
      '--level-3': '#7aa2f7',
      '--level-4': '#a4c0ff',
    },
  },

  dracula: {
    label: 'Dracula',
    preview: { bg: 'linear-gradient(135deg,#282a36 0%,#44475a 100%)', color: '#ff5555' },
    vars: {
      '--bg-primary':    '#282a36',
      '--bg-secondary':  '#21222c',
      '--bg-tertiary':   '#343746',
      '--border-color':  '#44475a',
      '--text-primary':  '#f8f8f2',
      '--text-secondary':'#6272a4',
      '--accent-color':  '#ff5555',
      '--accent-hover':  '#ff6e6e',
      '--danger-color':  '#ff5555',
      '--danger-hover':  '#ff6e6e',
      '--level-0': '#44475a',
      '--level-1': '#6e3a3a',
      '--level-2': '#8b4545',
      '--level-3': '#ff5555',
      '--level-4': '#ff7979',
    },
    extra: `.month-label,.day-label{color:#ff5555;}`,
  },

  everforest: {
    label: 'Everforest',
    preview: { bg: 'linear-gradient(135deg,#fdf6e3 0%,#f3ead3 100%)', color: '#5c6a72' },
    vars: {
      '--bg-primary':    '#fdf6e3',
      '--bg-secondary':  '#f4f0d9',
      '--bg-tertiary':   '#efebd4',
      '--border-color':  '#e0dcc7',
      '--text-primary':  '#5c6a72',
      '--text-secondary':'#939f91',
      '--accent-color':  '#8da101',
      '--accent-hover':  '#a7b901',
      '--danger-color':  '#f85552',
      '--danger-hover':  '#e66868',
      '--level-0': '#f4f0d9',
      '--level-1': '#b9ca4a',
      '--level-2': '#a7c080',
      '--level-3': '#8da101',
      '--level-4': '#6f8800',
    },
    extra: `
      h1{color:var(--text-primary);}
      .heatmap-panel,.leaderboard-panel,.modal-content{box-shadow:0 2px 8px rgba(0,0,0,.1);}
      .btn,.day{box-shadow:0 1px 2px rgba(0,0,0,.1);}
    `,
  },

  onedark: {
    label: 'One Dark',
    preview: { bg: 'linear-gradient(135deg,#282c34 0%,#21252b 100%)', color: '#abb2bf' },
    vars: {
      '--bg-primary':    '#282c34',
      '--bg-secondary':  '#21252b',
      '--bg-tertiary':   '#2c313c',
      '--border-color':  '#3e4451',
      '--text-primary':  '#abb2bf',
      '--text-secondary':'#5c6370',
      '--accent-color':  '#98c379',
      '--accent-hover':  '#b5cea8',
      '--danger-color':  '#e06c75',
      '--danger-hover':  '#be5046',
      '--level-0': '#21252b',
      '--level-1': '#5a8a5e',
      '--level-2': '#74a774',
      '--level-3': '#98c379',
      '--level-4': '#b5d8a0',
    },
  },

  'nord-light': {
    label: 'Nord Light',
    preview: { bg: 'linear-gradient(135deg,#eceff4 0%,#e5e9f0 100%)', color: '#2e3440' },
    vars: {
      '--bg-primary':    '#eceff4',
      '--bg-secondary':  '#e5e9f0',
      '--bg-tertiary':   '#d8dee9',
      '--border-color':  '#c2c9d6',
      '--text-primary':  '#2e3440',
      '--text-secondary':'#4c566a',
      '--accent-color':  '#5e81ac',
      '--accent-hover':  '#81a1c1',
      '--danger-color':  '#bf616a',
      '--danger-hover':  '#d08770',
      '--level-0': '#e5e9f0',
      '--level-1': '#a8c5db',
      '--level-2': '#81a1c1',
      '--level-3': '#5e81ac',
      '--level-4': '#4c6a95',
    },
    extra: `
      h1{color:var(--text-primary);}
      .heatmap-panel,.leaderboard-panel,.modal-content{box-shadow:0 2px 8px rgba(0,0,0,.1);}
    `,
  },

  phoenix: {
    label: 'Phoenix Night',
    preview: { bg: 'linear-gradient(135deg,#170f1e 0%,#1c1521 100%)', color: '#f5c2e7' },
    vars: {
      '--bg-primary':    '#170f1e',
      '--bg-secondary':  '#1c1521',
      '--bg-tertiary':   '#2b2032',
      '--border-color':  '#3d2f47',
      '--text-primary':  '#f5c2e7',
      '--text-secondary':'#988ba2',
      '--accent-color':  '#cba6f7',
      '--accent-hover':  '#d4b4f8',
      '--danger-color':  '#f38ba8',
      '--danger-hover':  '#f5a7bc',
      '--level-0': '#1c1521',
      '--level-1': '#8b6ba8',
      '--level-2': '#a888c7',
      '--level-3': '#cba6f7',
      '--level-4': '#e0c8ff',
    },
  },

  ereader: {
    label: 'E-Reader',
    preview: { bg: 'linear-gradient(135deg,#ffffff 0%,#f5f5f5 100%)', color: '#000000', border: '2px solid #d0d0d0' },
    vars: {
      '--bg-primary':    '#ffffff',
      '--bg-secondary':  '#f5f5f5',
      '--bg-tertiary':   '#e8e8e8',
      '--border-color':  '#d0d0d0',
      '--text-primary':  '#000000',
      '--text-secondary':'#666666',
      '--accent-color':  '#333333',
      '--accent-hover':  '#000000',
      '--danger-color':  '#555555',
      '--danger-hover':  '#333333',
      '--level-0': '#ffffff',
      '--level-1': '#d0d0d0',
      '--level-2': '#a0a0a0',
      '--level-3': '#666666',
      '--level-4': '#333333',
    },
    extra: `
      h1{color:#000000;}
      .heatmap-panel,.leaderboard-panel,.modal-content{box-shadow:none;border:2px solid #d0d0d0;}
      .btn,.log-btn,select,input{border:2px solid #333333;box-shadow:none;}
      .log-btn{background:#333333;color:#ffffff;box-shadow:none;}
      .log-btn:hover{background:#000000;box-shadow:none;transform:none;}
      .day{width:16px;height:16px;border:1px solid #d0d0d0;}
    `,
  },

  /* ── ✨ NEW: Frosted-glass / translucent themes ── */

  aurora: {
    label: '✨ Aurora',
    preview: { bg: 'linear-gradient(135deg,#0a0e27 0%,#0d2a2a 50%,#1a0a2e 100%)', color: '#a8ffd4' },
    glass: true,
    bodyBg: 'linear-gradient(135deg, #0a0e27 0%, #0d2a30 40%, #1a0a2e 70%, #0a1a1f 100%)',
    glassBg: 'rgba(10, 25, 35, 0.45)',
    glassBorder: 'rgba(100, 255, 200, 0.15)',
    vars: {
      '--bg-primary':    'rgba(10,14,39,0.7)',
      '--bg-secondary':  'rgba(15,30,45,0.6)',
      '--bg-tertiary':   'rgba(20,40,55,0.7)',
      '--border-color':  'rgba(100,255,200,0.12)',
      '--text-primary':  '#e0fff5',
      '--text-secondary':'#6bbfa0',
      '--accent-color':  '#00e5a0',
      '--accent-hover':  '#00ffb3',
      '--danger-color':  '#ff6b9d',
      '--danger-hover':  '#ff8fb5',
      '--level-0': 'rgba(15,30,45,0.5)',
      '--level-1': 'rgba(0,80,60,0.6)',
      '--level-2': 'rgba(0,140,100,0.7)',
      '--level-3': '#00e5a0',
      '--level-4': '#7fffd4',
    },
    extra: `
      html,body{
        background: linear-gradient(135deg, #0a0e27 0%, #0d2a30 40%, #1a0a2e 70%, #0a1a1f 100%) !important;
        background-attachment: fixed !important;
        min-height: 100vh;
      }
      /* Subtle animated aurora shimmer behind content */
      body::before{
        content:'';
        position:fixed;
        inset:0;
        background:
          radial-gradient(ellipse 80% 50% at 20% 10%, rgba(0,200,130,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 80%, rgba(100,50,200,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 50% 50%, rgba(0,150,200,0.08) 0%, transparent 70%);
        pointer-events:none;
        z-index:0;
        animation: auroraShift 12s ease-in-out infinite alternate;
      }
      @keyframes auroraShift{
        0%{opacity:1;}50%{opacity:0.6;}100%{opacity:1;}
      }
      .container{position:relative;z-index:1;}
      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content{
        background: rgba(10,25,40,0.45) !important;
        backdrop-filter: blur(24px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(24px) saturate(160%) !important;
        border: 1px solid rgba(0,220,150,0.18) !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06) !important;
      }
      .entry-item,.leaderboard-entry{
        background: rgba(15,35,50,0.5) !important;
        border: 1px solid rgba(0,220,150,0.10) !important;
        backdrop-filter: blur(8px) !important;
      }
      .btn{
        background: rgba(20,45,60,0.55) !important;
        border: 1px solid rgba(0,220,150,0.15) !important;
        backdrop-filter: blur(8px) !important;
      }
      .btn:hover{
        background: rgba(0,200,140,0.2) !important;
        border-color: rgba(0,220,150,0.4) !important;
      }
      h1{color:#a8ffd4;}
    `,
  },

  sakura: {
    label: '🌸 Sakura',
    preview: { bg: 'linear-gradient(135deg,#1a0a14 0%,#2d1020 100%)', color: '#ffb8d9' },
    glass: true,
    bodyBg: 'linear-gradient(150deg, #0f0810 0%, #1e0a18 35%, #2a0f22 65%, #150810 100%)',
    glassBg: 'rgba(40,10,30,0.4)',
    glassBorder: 'rgba(255,140,190,0.18)',
    vars: {
      '--bg-primary':    'rgba(20,8,16,0.75)',
      '--bg-secondary':  'rgba(30,10,22,0.65)',
      '--bg-tertiary':   'rgba(42,15,33,0.70)',
      '--border-color':  'rgba(255,140,190,0.15)',
      '--text-primary':  '#ffe0ee',
      '--text-secondary':'#c07898',
      '--accent-color':  '#ff85b5',
      '--accent-hover':  '#ffaad0',
      '--danger-color':  '#ff4a6e',
      '--danger-hover':  '#ff6b87',
      '--level-0': 'rgba(30,10,22,0.5)',
      '--level-1': 'rgba(120,30,70,0.6)',
      '--level-2': 'rgba(180,50,100,0.7)',
      '--level-3': '#ff85b5',
      '--level-4': '#ffb8d9',
    },
    extra: `
      html,body{
        background: linear-gradient(150deg, #0f0810 0%, #1e0a18 35%, #2a0f22 65%, #150810 100%) !important;
        background-attachment: fixed !important;
      }
      body::before{
        content:'';
        position:fixed;inset:0;
        background:
          radial-gradient(ellipse 70% 50% at 30% 20%, rgba(255,100,160,0.10) 0%, transparent 65%),
          radial-gradient(ellipse 55% 45% at 75% 70%, rgba(180,60,120,0.08) 0%, transparent 60%);
        pointer-events:none;z-index:0;
      }
      .container{position:relative;z-index:1;}
      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content{
        background: rgba(40,10,30,0.42) !important;
        backdrop-filter: blur(28px) saturate(150%) !important;
        -webkit-backdrop-filter: blur(28px) saturate(150%) !important;
        border: 1px solid rgba(255,140,190,0.18) !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,200,230,0.06) !important;
      }
      .entry-item,.leaderboard-entry{
        background: rgba(45,12,34,0.52) !important;
        border: 1px solid rgba(255,140,190,0.12) !important;
        backdrop-filter: blur(8px) !important;
      }
      .btn{
        background: rgba(50,15,38,0.55) !important;
        border: 1px solid rgba(255,140,190,0.15) !important;
        backdrop-filter: blur(8px) !important;
      }
      .btn:hover{
        background: rgba(255,100,160,0.18) !important;
        border-color: rgba(255,140,190,0.40) !important;
      }
      h1{color:#ffb8d9;}
    `,
  },

  midnight: {
    label: '🌙 Midnight',
    preview: { bg: 'linear-gradient(135deg,#060914 0%,#0c1428 100%)', color: '#8ab4ff' },
    glass: true,
    bodyBg: 'linear-gradient(160deg, #060914 0%, #0b1229 40%, #0d1a3a 70%, #060a18 100%)',
    glassBg: 'rgba(8,15,38,0.42)',
    glassBorder: 'rgba(90,140,255,0.16)',
    vars: {
      '--bg-primary':    'rgba(6,9,20,0.80)',
      '--bg-secondary':  'rgba(10,16,36,0.70)',
      '--bg-tertiary':   'rgba(14,22,48,0.75)',
      '--border-color':  'rgba(90,140,255,0.14)',
      '--text-primary':  '#d0dcff',
      '--text-secondary':'#5a7ab0',
      '--accent-color':  '#5b8cff',
      '--accent-hover':  '#85aaff',
      '--danger-color':  '#ff5c7a',
      '--danger-hover':  '#ff7f98',
      '--level-0': 'rgba(10,16,36,0.5)',
      '--level-1': 'rgba(20,40,120,0.65)',
      '--level-2': 'rgba(35,65,180,0.70)',
      '--level-3': '#5b8cff',
      '--level-4': '#a0c0ff',
    },
    extra: `
      html,body{
        background: linear-gradient(160deg, #060914 0%, #0b1229 40%, #0d1a3a 70%, #060a18 100%) !important;
        background-attachment: fixed !important;
      }
      body::before{
        content:'';
        position:fixed;inset:0;
        background:
          radial-gradient(ellipse 90% 60% at 50% 0%, rgba(60,100,255,0.09) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 85% 85%, rgba(80,60,200,0.07) 0%, transparent 55%);
        pointer-events:none;z-index:0;
      }
      .container{position:relative;z-index:1;}
      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content{
        background: rgba(8,15,38,0.45) !important;
        backdrop-filter: blur(30px) saturate(140%) !important;
        -webkit-backdrop-filter: blur(30px) saturate(140%) !important;
        border: 1px solid rgba(90,140,255,0.16) !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(120,160,255,0.06) !important;
      }
      .entry-item,.leaderboard-entry{
        background: rgba(12,20,48,0.55) !important;
        border: 1px solid rgba(90,140,255,0.10) !important;
        backdrop-filter: blur(8px) !important;
      }
      .btn{
        background: rgba(14,24,56,0.60) !important;
        border: 1px solid rgba(90,140,255,0.15) !important;
        backdrop-filter: blur(8px) !important;
      }
      .btn:hover{
        background: rgba(60,100,255,0.20) !important;
        border-color: rgba(90,140,255,0.40) !important;
      }
      h1{color:#8ab4ff;}
    `,
  },

  sunset: {
    label: '🌅 Sunset',
    preview: { bg: 'linear-gradient(135deg,#1a0a00 0%,#2d1000 50%,#1a0820 100%)', color: '#ffb347' },
    glass: true,
    bodyBg: 'linear-gradient(160deg, #12080a 0%, #271008 35%, #200820 65%, #120808 100%)',
    glassBg: 'rgba(35,12,8,0.42)',
    glassBorder: 'rgba(255,140,50,0.16)',
    vars: {
      '--bg-primary':    'rgba(18,8,10,0.80)',
      '--bg-secondary':  'rgba(28,12,8,0.70)',
      '--bg-tertiary':   'rgba(38,16,10,0.75)',
      '--border-color':  'rgba(255,140,50,0.14)',
      '--text-primary':  '#ffe8c8',
      '--text-secondary':'#b06840',
      '--accent-color':  '#ff8c32',
      '--accent-hover':  '#ffaa5a',
      '--danger-color':  '#ff4060',
      '--danger-hover':  '#ff607a',
      '--level-0': 'rgba(28,12,8,0.5)',
      '--level-1': 'rgba(140,50,10,0.65)',
      '--level-2': 'rgba(210,80,15,0.70)',
      '--level-3': '#ff8c32',
      '--level-4': '#ffcc80',
    },
    extra: `
      html,body{
        background: linear-gradient(160deg, #12080a 0%, #271008 35%, #200820 65%, #120808 100%) !important;
        background-attachment: fixed !important;
      }
      body::before{
        content:'';
        position:fixed;inset:0;
        background:
          radial-gradient(ellipse 80% 55% at 30% 15%, rgba(255,120,20,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 45% at 80% 80%, rgba(180,30,80,0.10) 0%, transparent 55%);
        pointer-events:none;z-index:0;
      }
      .container{position:relative;z-index:1;}
      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content{
        background: rgba(35,12,8,0.45) !important;
        backdrop-filter: blur(28px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(28px) saturate(160%) !important;
        border: 1px solid rgba(255,140,50,0.16) !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,200,100,0.06) !important;
      }
      .entry-item,.leaderboard-entry{
        background: rgba(40,14,9,0.55) !important;
        border: 1px solid rgba(255,140,50,0.10) !important;
        backdrop-filter: blur(8px) !important;
      }
      .btn{
        background: rgba(45,15,10,0.60) !important;
        border: 1px solid rgba(255,140,50,0.15) !important;
        backdrop-filter: blur(8px) !important;
      }
      .btn:hover{
        background: rgba(255,100,30,0.20) !important;
        border-color: rgba(255,140,50,0.40) !important;
      }
      h1{color:#ffb347;}
    `,
  },

  ocean: {
    label: '🌊 Ocean',
    preview: { bg: 'linear-gradient(135deg,#020c1b 0%,#0a1f35 100%)', color: '#64ffda' },
    glass: true,
    bodyBg: 'linear-gradient(175deg, #020c1b 0%, #0a1f35 45%, #051525 80%, #020c1b 100%)',
    glassBg: 'rgba(5,18,35,0.44)',
    glassBorder: 'rgba(50,200,200,0.16)',
    vars: {
      '--bg-primary':    'rgba(2,12,27,0.80)',
      '--bg-secondary':  'rgba(6,20,38,0.70)',
      '--bg-tertiary':   'rgba(10,28,50,0.75)',
      '--border-color':  'rgba(50,200,200,0.14)',
      '--text-primary':  '#cdf0ea',
      '--text-secondary':'#4a9090',
      '--accent-color':  '#2ec4c4',
      '--accent-hover':  '#60e0e0',
      '--danger-color':  '#ff6b8a',
      '--danger-hover':  '#ff8faa',
      '--level-0': 'rgba(6,20,38,0.5)',
      '--level-1': 'rgba(5,70,80,0.65)',
      '--level-2': 'rgba(8,110,120,0.70)',
      '--level-3': '#2ec4c4',
      '--level-4': '#64ffda',
    },
    extra: `
      html,body{
        background: linear-gradient(175deg, #020c1b 0%, #0a1f35 45%, #051525 80%, #020c1b 100%) !important;
        background-attachment: fixed !important;
      }
      body::before{
        content:'';
        position:fixed;inset:0;
        background:
          radial-gradient(ellipse 100% 50% at 50% 100%, rgba(20,150,180,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 10% 20%,  rgba(30,100,150,0.08) 0%, transparent 55%);
        pointer-events:none;z-index:0;
      }
      .container{position:relative;z-index:1;}
      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content{
        background: rgba(5,18,35,0.46) !important;
        backdrop-filter: blur(26px) saturate(150%) !important;
        -webkit-backdrop-filter: blur(26px) saturate(150%) !important;
        border: 1px solid rgba(50,200,200,0.16) !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(100,220,220,0.06) !important;
      }
      .entry-item,.leaderboard-entry{
        background: rgba(8,22,42,0.55) !important;
        border: 1px solid rgba(50,200,200,0.10) !important;
        backdrop-filter: blur(8px) !important;
      }
      .btn{
        background: rgba(10,26,48,0.60) !important;
        border: 1px solid rgba(50,200,200,0.15) !important;
        backdrop-filter: blur(8px) !important;
      }
      .btn:hover{
        background: rgba(30,160,160,0.18) !important;
        border-color: rgba(50,200,200,0.40) !important;
      }
      h1{color:#64ffda;}
    `,
  },

  obsidian: {
    label: '🪨 Obsidian',
    preview: { bg: 'linear-gradient(135deg,#0d0d0d 0%,#1a1a1a 100%)', color: '#c0a0ff' },
    glass: true,
    bodyBg: 'linear-gradient(145deg, #080808 0%, #141414 50%, #0a0a0a 100%)',
    glassBg: 'rgba(20,20,20,0.50)',
    glassBorder: 'rgba(160,120,255,0.14)',
    vars: {
      '--bg-primary':    'rgba(8,8,8,0.85)',
      '--bg-secondary':  'rgba(14,14,14,0.75)',
      '--bg-tertiary':   'rgba(22,22,22,0.80)',
      '--border-color':  'rgba(160,120,255,0.12)',
      '--text-primary':  '#e8e0ff',
      '--text-secondary':'#706080',
      '--accent-color':  '#9d72ff',
      '--accent-hover':  '#bc98ff',
      '--danger-color':  '#ff5f7e',
      '--danger-hover':  '#ff8099',
      '--level-0': 'rgba(14,14,14,0.5)',
      '--level-1': 'rgba(60,30,120,0.65)',
      '--level-2': 'rgba(90,50,180,0.70)',
      '--level-3': '#9d72ff',
      '--level-4': '#c8aaff',
    },
    extra: `
      html,body{
        background: linear-gradient(145deg, #080808 0%, #141414 50%, #0a0a0a 100%) !important;
        background-attachment: fixed !important;
      }
      body::before{
        content:'';
        position:fixed;inset:0;
        background:
          radial-gradient(ellipse 70% 50% at 50% 50%, rgba(100,60,200,0.06) 0%, transparent 65%);
        pointer-events:none;z-index:0;
      }
      .container{position:relative;z-index:1;}
      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content{
        background: rgba(18,18,18,0.52) !important;
        backdrop-filter: blur(32px) saturate(120%) !important;
        -webkit-backdrop-filter: blur(32px) saturate(120%) !important;
        border: 1px solid rgba(160,120,255,0.14) !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.70), inset 0 1px 0 rgba(180,150,255,0.06) !important;
      }
      .entry-item,.leaderboard-entry{
        background: rgba(22,22,22,0.58) !important;
        border: 1px solid rgba(160,120,255,0.09) !important;
        backdrop-filter: blur(8px) !important;
      }
      .btn{
        background: rgba(24,24,24,0.65) !important;
        border: 1px solid rgba(160,120,255,0.14) !important;
        backdrop-filter: blur(8px) !important;
      }
      .btn:hover{
        background: rgba(100,60,200,0.18) !important;
        border-color: rgba(160,120,255,0.38) !important;
      }
      h1{color:#c0a0ff;}
    `,
  },

};

/* ─────────────────────────────────────────────────────────────
   CORE API
   ───────────────────────────────────────────────────────────── */

/**
 * applyTheme(name, save = true)
 * Injects CSS variables + any extra CSS for the chosen theme.
 * Also regenerates the theme selector grid so the active mark is correct.
 */
window.applyTheme = function applyTheme(name, save = true) {
  const theme = window.THEMES[name] || window.THEMES['default'];

  // Body class — only needed if a theme has component-level overrides
  // that can't be expressed via variables alone (glass pseudo-elements etc.)
  document.body.className = name === 'default' ? '' : `theme-${name}`;

  // Build the injected stylesheet
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
    // Refresh selector UI if it's open
    renderThemeSelector();
  }
};

/* ─────────────────────────────────────────────────────────────
   THEME SELECTOR RENDERER
   ───────────────────────────────────────────────────────────── */

/**
 * Call this once to populate #themeSelectorGrid, and again whenever
 * the menu opens to refresh the active state.
 */
window.renderThemeSelector = function renderThemeSelector() {
  const grid = document.getElementById('themeSelectorGrid');
  if (!grid) return;

  const current = localStorage.getItem('reading_heatmap_theme') || 'default';
  grid.innerHTML = '';

  for (const [key, theme] of Object.entries(window.THEMES)) {
    const p = theme.preview || {};
    const isActive = key === current;

    const el = document.createElement('div');
    el.style.cssText = `
      padding: 20px 12px;
      border-radius: 8px;
      cursor: pointer;
      border: 2px solid ${isActive ? 'var(--accent-color)' : (p.border || 'transparent')};
      background: ${p.bg || '#111'};
      color: ${p.color || '#fff'};
      text-align: center;
      font-size: 13px;
      font-weight: 500;
      transition: transform .18s, border-color .18s, box-shadow .18s;
      box-shadow: ${isActive ? '0 0 14px rgba(255,255,255,0.15)' : '0 2px 8px rgba(0,0,0,0.3)'};
      letter-spacing: 0.01em;
      min-height: 72px;
      display: flex; align-items: center; justify-content: center;
    `;
    el.textContent = theme.label;
    el.title = theme.label;
    el.onclick = () => window.applyTheme(key);

    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.05)';
      el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.5)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)';
      el.style.boxShadow = isActive
        ? '0 0 14px rgba(255,255,255,0.15)'
        : '0 2px 8px rgba(0,0,0,0.3)';
    });

    grid.appendChild(el);
  }
};

/* ─────────────────────────────────────────────────────────────
   AUTO-LOAD ON DOM READY
   ───────────────────────────────────────────────────────────── */

(function init() {
  const saved = localStorage.getItem('reading_heatmap_theme') || 'default';
  // Apply immediately so there's no flash of unstyled theme
  window.applyTheme(saved, false);

  // Populate the selector grid when the DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.renderThemeSelector);
  } else {
    window.renderThemeSelector();
  }
})();