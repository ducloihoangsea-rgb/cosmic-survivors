// High-Performance Spatial Hash Grid for O(1) Collision & Proximity Queries
export class SpatialHashGrid {
  constructor(cellSize = 96) {
    this.cellSize = cellSize;
    this.grid = new Map();
    this.querySet = new Set();
    this.queryResult = [];
  }

  clear() {
    this.grid.clear();
  }

  _hash(cx, cy) {
    return (cx & 0xffff) | ((cy & 0xffff) << 16);
  }

  insert(entity) {
    if (!entity || entity.isDead) return;
    const r = entity.radius || 16;
    const minCx = Math.floor((entity.x - r) / this.cellSize);
    const maxCx = Math.floor((entity.x + r) / this.cellSize);
    const minCy = Math.floor((entity.y - r) / this.cellSize);
    const maxCy = Math.floor((entity.y + r) / this.cellSize);

    for (let cx = minCx; cx <= maxCx; cx++) {
      for (let cy = minCy; cy <= maxCy; cy++) {
        const key = this._hash(cx, cy);
        let cell = this.grid.get(key);
        if (!cell) {
          cell = [];
          this.grid.set(key, cell);
        }
        cell.push(entity);
      }
    }
  }

  insertAll(entities) {
    this.clear();
    for (let i = 0, len = entities.length; i < len; i++) {
      this.insert(entities[i]);
    }
  }

  query(x, y, radius) {
    this.querySet.clear();
    this.queryResult.length = 0;

    const minCx = Math.floor((x - radius) / this.cellSize);
    const maxCx = Math.floor((x + radius) / this.cellSize);
    const minCy = Math.floor((y - radius) / this.cellSize);
    const maxCy = Math.floor((y + radius) / this.cellSize);

    for (let cx = minCx; cx <= maxCx; cx++) {
      for (let cy = minCy; cy <= maxCy; cy++) {
        const key = this._hash(cx, cy);
        const cell = this.grid.get(key);
        if (cell) {
          for (let i = 0, len = cell.length; i < len; i++) {
            const e = cell[i];
            if (!this.querySet.has(e)) {
              this.querySet.add(e);
              this.queryResult.push(e);
            }
          }
        }
      }
    }
    return this.queryResult;
  }

  getNearest(x, y, maxRadius = 500) {
    const candidates = this.query(x, y, maxRadius);
    let nearest = null;
    let minDistSq = maxRadius * maxRadius;

    for (let i = 0, len = candidates.length; i < len; i++) {
      const c = candidates[i];
      if (c.isDead) continue;
      const dx = c.x - x;
      const dy = c.y - y;
      const distSq = dx * dx + dy * dy;
      if (distSq < minDistSq) {
        minDistSq = distSq;
        nearest = c;
      }
    }
    return nearest;
  }
}
