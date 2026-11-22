import { WIDTH, HEIGHT, createRun, lift, step, levelFor } from './engine.mjs';

const canvas = document.querySelector('#field');
const ctx = canvas.getContext('2d');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const liftButton = document.querySelector('#lift');
const overlay = document.querySelector('#overlay');
let run = createRun();
run.state = 'ready';
let last = 0;
let lag = 0;
let frame = 0;
let previous = null;

function readBest() {
    try { return Math.min(50, Math.max(0, Number(localStorage.getItem('phong-paper-best')) || 0)); }
    catch { return 0; }
}
let best = readBest();

function polygon(points, fill) {
    ctx.fillStyle = fill;
    ctx.beginPath();
    points.forEach(([x,y], i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
    ctx.closePath();
    ctx.fill();
}

function render(blend = 1) {
    const sky = ctx.createLinearGradient(0,0,0,HEIGHT);
    sky.addColorStop(0,'#112d48');
    sky.addColorStop(1,'#56b4b4');
    ctx.fillStyle = sky;
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    ctx.fillStyle = '#f8dfae';
    ctx.beginPath(); ctx.arc(475,112,47,0,Math.PI*2); ctx.fill();
    polygon([[0,324],[100,208],[187,290],[278,186],[395,316],[508,228],[600,301],[600,420],[0,420]],'#234d66');
    polygon([[0,365],[133,275],[249,350],[345,256],[510,358],[600,309],[600,420],[0,420]],'#2f6d7d');
    for (const t of run.towers) {
        const oldX = previous?.towers.get(t) ?? t.x;
        const x = oldX + (t.x - oldX) * blend;
        const top = t.y - t.gap / 2;
        const bottom = t.y + t.gap / 2;
        for (const [a,b,edge] of [[0,top,top-9],[bottom,HEIGHT,bottom]]) {
            ctx.fillStyle='#a3543f'; ctx.fillRect(x+6,a,42,b-a);
            ctx.fillStyle='#c77e58'; ctx.fillRect(x+8,a,13,b-a);
            ctx.fillStyle='#f1bf83'; ctx.fillRect(x,edge,54,9);
            for (let y=Math.ceil(a/19)*19+8; y<b-10; y+=19) {
                ctx.fillStyle='#6d463b';ctx.fillRect(x+27,y,10,6);
            }
        }
    }
    const oldY = previous?.y ?? run.y;
    ctx.save(); ctx.translate(130,oldY + (run.y - oldY) * blend);ctx.rotate(Math.max(-.30,Math.min(.35,run.vy/900)));
    polygon([[-21,-12],[25,-2],[-17,13],[-8,0]],'#fff3ce');
    polygon([[-8,0],[25,-2],[-17,13]],'#e7a953');
    polygon([[-8,0],[25,-2],[-4,7]],'#ffdb8d');
    ctx.restore();
    document.querySelector('#score').textContent = `${run.score} / 50`;
    document.querySelector('#level').textContent = `Level ${levelFor(run.score).number}`;
    document.querySelector('#best').textContent = `Kỷ lục ${Math.max(best,run.score)}`;
}

function status(title, message) {
    overlay.hidden = !title;
    document.querySelector('#scene-title').textContent = title;
    document.querySelector('#scene-message').textContent = message;
}

function end() {
    if (run.score > best) {
        best = run.score;
        try { localStorage.setItem('phong-paper-best', String(best)); } catch { /* Optional storage. */ }
    }
    status(run.state === 'won' ? 'Chiến thắng!' : 'Kết thúc lượt bay', `Điểm ${run.score} / 50. Bạn có thể bắt đầu lượt mới.`);
    start.disabled = false; start.textContent = 'Chơi lại';
    liftButton.disabled = true; pause.disabled = true;
}

function loop(now) {
    if (run.state !== 'running') return;
    lag += last ? Math.min((now-last)/1000, .07) : 0;
    last = now;
    let interval = levelFor(run.score).interval / 1000;
    while (lag >= interval && run.state === 'running') {
        previous = { y: run.y, towers: new Map(run.towers.map(tower => [tower, tower.x])) };
        step(run, interval);
        lag -= interval;
        interval = levelFor(run.score).interval / 1000;
    }
    render(run.state === 'running' ? lag / interval : 1);
    if (run.state === 'running') frame = requestAnimationFrame(loop);
    else end();
}

function startRun() {
    cancelAnimationFrame(frame);
    run = createRun(); last=0; lag=0; previous=null;
    status('',''); start.disabled = true; liftButton.disabled = false; pause.disabled = false;
    pause.textContent = 'Tạm dừng'; pause.focus();
    frame = requestAnimationFrame(loop);
}

function togglePause() {
    if (run.state === 'running') {
        run.state = 'paused'; cancelAnimationFrame(frame);
        status('Tạm dừng','Nhấn P hoặc chọn Tiếp tục.');
        pause.textContent = 'Tiếp tục'; liftButton.disabled = true;
    } else if (run.state === 'paused') {
        run.state = 'running'; last=0; lag=0; previous=null; status('','');
        pause.textContent='Tạm dừng'; liftButton.disabled = false;
        frame=requestAnimationFrame(loop);
    }
}

start.addEventListener('click', startRun);
pause.addEventListener('click', togglePause);
liftButton.addEventListener('click', () => lift(run));
window.addEventListener('keydown', event => {
    if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowDown' && run.state === 'running') { event.preventDefault(); lift(run); }
    if (event.key.toLowerCase() === 'p') togglePause();
});
document.addEventListener('visibilitychange', () => { if (document.hidden && run.state === 'running') togglePause(); });
render();
