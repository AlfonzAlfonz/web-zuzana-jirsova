import { WIDTH } from "@/constants";
import L from "leaflet";

interface CanvasLayer {
  new (options?: L.GridLayerOptions): L.GridLayer & {
    options: L.LayerOptions;
    _map: L.Map;

    unloads: WeakMap<Element, TileHandler>;
    createTile(coords: L.Coords): HTMLElement;
  };
}

const PRIMARY = "#FF2E00";

type TileHandler = {
  unload: () => {};
};

export const CanvasLayer: CanvasLayer = L.GridLayer.extend({
  onAdd: function (this: InstanceType<CanvasLayer>, map: L.Map) {
    L.GridLayer.prototype.onAdd.call(this, map);

    this.on("tileunload", (e) => {
      const handler = this.unloads.get(e.tile)!;
      handler.unload();
    });
  },
  unloads: new WeakMap<Element, TileHandler>(),
  createTile: function (this: InstanceType<CanvasLayer>, coords: L.Coords) {
    const canvas = document.createElement("canvas");
    const tileSize = this.getTileSize();

    const dpr = window.devicePixelRatio;

    canvas.width = tileSize.x * dpr;
    canvas.height = tileSize.y * dpr;

    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = PRIMARY;
    ctx.strokeStyle = PRIMARY;
    ctx.lineWidth = WIDTH * 2 * dpr;

    const absoluteCoords = {
      x: (coords.x * 2 ** 13) / tileSize.x,
      y: -((coords.y + 1) * 2 ** 13) / tileSize.y,
    };

    let prevPoint: { x: number; y: number } | undefined;

    const h = () => {
      const { lat: y, lng: x } = this._map.getCenter();
      const center = { x, y };

      const dy = Math.abs(center.y - 1000 / 64 - absoluteCoords.y);
      const dx = Math.abs(center.x - 1000 / 64 - absoluteCoords.x);
      if (dy < 1000 / 32 && dx < 1000 / 32) {
        const point = {
          x: (center.x - absoluteCoords.x) * (1000 / 125) * dpr,
          y:
            -(center.y - -(coords.y * 2 ** 13) / tileSize.y) *
            (1000 / 125) *
            dpr,
        };

        ctx.beginPath();
        ctx.arc(point.x, point.y, WIDTH * dpr, 0, 2 * Math.PI);
        ctx.fill();

        if (prevPoint) {
          ctx.beginPath();
          ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        }

        prevPoint = point;
      } else {
        prevPoint = undefined;
      }
    };

    this._map.on("move", h);
    this.unloads.set(canvas, {
      unload: () => this._map.off("move", h),
    });

    return canvas;
  },
  _pruneTiles: function () {},
});
