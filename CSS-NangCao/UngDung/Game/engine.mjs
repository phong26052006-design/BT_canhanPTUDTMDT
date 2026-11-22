export const WIDTH = 600;
export const HEIGHT = 420;
const PLANE_X = 130;
const PLANE_HALF_WIDTH = 14;
const PLANE_HALF_HEIGHT = 9;
const TOWER_WIDTH = 54;
export const WIN_SCORE = 50;

export function levelFor(score) {
    if (score >= 40) return { number: 4, interval: 20, gap: 163 };
    if (score >= 20) return { number: 3, interval: 25, gap: 171 };
    if (score >= 5) return { number: 2, interval: 30, gap: 179 };
    return { number: 1, interval: 40, gap: 192 };
}

export function createRun(random = Math.random) {
    let nextCenter = HEIGHT / 2;
    function tower(x, score) {
        nextCenter = Math.max(116, Math.min(304, nextCenter + (random() - 0.5) * 106));
        return { x, y: nextCenter, gap: levelFor(score).gap, passed: false };
    }
    return { y: HEIGHT / 2, vy: 0, score: 0, state: 'running', towers: [tower(390, 0), tower(665, 0)], tower };
}

export function lift(run) {
    if (run.state === 'running') run.vy = -244;
}

export function step(run, seconds) {
    if (run.state !== 'running') return;
    const { interval } = levelFor(run.score);
    const velocity = 5200 / interval;
    run.vy = Math.min(365, run.vy + 755 * seconds);
    run.y += run.vy * seconds;
    if (run.y < PLANE_HALF_HEIGHT || run.y > HEIGHT - PLANE_HALF_HEIGHT) {
        run.state = 'lost';
        return;
    }
    for (const tower of run.towers) {
        tower.x -= velocity * seconds;
        const overlaps = tower.x < PLANE_X + PLANE_HALF_WIDTH && tower.x + TOWER_WIDTH > PLANE_X - PLANE_HALF_WIDTH;
        if (overlaps && Math.abs(run.y - tower.y) + PLANE_HALF_HEIGHT > tower.gap / 2) {
            run.state = 'lost';
            return;
        }
        if (!tower.passed && tower.x + TOWER_WIDTH <= PLANE_X - PLANE_HALF_WIDTH) {
            tower.passed = true;
            run.score += 1;
            if (run.score >= WIN_SCORE) {
                run.state = 'won';
                return;
            }
        }
    }
    if (run.towers[0].x < -TOWER_WIDTH) {
        run.towers.shift();
        run.towers.push(run.tower(run.towers.at(-1).x + 275, run.score));
    }
}
